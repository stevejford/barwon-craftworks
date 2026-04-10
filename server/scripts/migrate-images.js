import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const {
    R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME,
    R2_PUBLIC_URL,
    DATABASE_URL
} = process.env;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME || !DATABASE_URL) {
    console.error('Missing required env vars. Check .env file.');
    process.exit(1);
}

const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
});

const pool = new pg.Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function migrateImages() {
    console.log('🔄 Fetching products from database...');
    const { rows } = await pool.query('SELECT id, name, image_url FROM products WHERE image_url IS NOT NULL ORDER BY id');
    console.log(`Found ${rows.length} products with images.\n`);

    for (const product of rows) {
        const { id, name, image_url } = product;

        // Skip if already on R2
        if (image_url.includes('r2.dev') || image_url.includes('r2.cloudflarestorage.com')) {
            console.log(`✅ #${id} "${name}" — already on R2, skipping`);
            continue;
        }

        try {
            console.log(`⬇️  #${id} "${name}" — downloading from ${image_url.substring(0, 60)}...`);

            const response = await fetch(image_url);
            if (!response.ok) {
                console.log(`❌ #${id} — failed to download (${response.status})`);
                continue;
            }

            const buffer = Buffer.from(await response.arrayBuffer());
            const contentType = response.headers.get('content-type') || 'image/jpeg';
            const ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg';
            const key = `products/${id}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${ext}`;

            console.log(`⬆️  #${id} — uploading to R2 as ${key} (${(buffer.length / 1024).toFixed(0)} KB)...`);

            await s3.send(new PutObjectCommand({
                Bucket: R2_BUCKET_NAME,
                Key: key,
                Body: buffer,
                ContentType: contentType,
            }));

            const newUrl = `${R2_PUBLIC_URL}/${key}`;

            await pool.query('UPDATE products SET image_url = $1, updated_at = NOW() WHERE id = $2', [newUrl, id]);

            console.log(`✅ #${id} "${name}" — migrated to ${newUrl}\n`);
        } catch (err) {
            console.error(`❌ #${id} "${name}" — error:`, err.message);
        }
    }

    console.log('\n🎉 Migration complete!');
    await pool.end();
}

migrateImages().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});
