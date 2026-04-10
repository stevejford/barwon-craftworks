import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function setup() {
    const client = await pool.connect();
    try {
        console.log('🔧 Creating tables...');

        await client.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                category VARCHAR(100) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                description TEXT,
                image_url TEXT,
                stock INTEGER DEFAULT 0,
                status VARCHAR(20) DEFAULT 'active',
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS customers (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                phone VARCHAR(50),
                address TEXT,
                created_at TIMESTAMP DEFAULT NOW()
            )
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                order_number VARCHAR(20) UNIQUE NOT NULL,
                customer_id INTEGER REFERENCES customers(id),
                status VARCHAR(20) DEFAULT 'pending',
                total DECIMAL(10,2) NOT NULL,
                stripe_payment_intent_id VARCHAR(255),
                stripe_session_id VARCHAR(255),
                shipping_address TEXT,
                notes TEXT,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS order_items (
                id SERIAL PRIMARY KEY,
                order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
                product_id INTEGER REFERENCES products(id),
                quantity INTEGER DEFAULT 1,
                price_at_purchase DECIMAL(10,2) NOT NULL
            )
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS inquiries (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                subject VARCHAR(100),
                message TEXT NOT NULL,
                status VARCHAR(20) DEFAULT 'new',
                created_at TIMESTAMP DEFAULT NOW()
            )
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS print_quotes (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50),
                company VARCHAR(255),
                material VARCHAR(100),
                colour VARCHAR(50),
                quantity INTEGER DEFAULT 1,
                infill VARCHAR(10),
                layer_height VARCHAR(10),
                finish VARCHAR(50),
                post_processing TEXT,
                dimensions TEXT,
                application TEXT,
                notes TEXT,
                deadline DATE,
                priority VARCHAR(20) DEFAULT 'standard',
                file_names TEXT,
                file_paths TEXT,
                status VARCHAR(20) DEFAULT 'new',
                admin_notes TEXT,
                quoted_price DECIMAL(10,2),
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )
        `);

        console.log('✅ Tables created successfully');

        // Seed products (only if table is empty)
        const { rows } = await client.query('SELECT COUNT(*) FROM products');
        if (parseInt(rows[0].count) === 0) {
            console.log('🌱 Seeding products...');
            await client.query(`
                INSERT INTO products (name, category, price, description, image_url, stock, status) VALUES
                ('Barwon Classic', 'Fountain', 185.00, 'The pen that started the workshop. A testament to new beginnings.', 'https://images.unsplash.com/photo-1586081435594-06c196aaff3a?q=80&w=2670&auto=format&fit=crop', 12, 'active'),
                ('Executive Walnut', 'Rollerball', 210.00, 'Crafted for the leaders, the dreamers, and the contract-signers.', 'https://images.unsplash.com/photo-1731358361652-b45559fb8af3?q=80&w=2670&auto=format&fit=crop', 8, 'active'),
                ('Ancient Oak', 'Limited Edition', 450.00, 'Holding 500 years of history in your hand.', 'https://images.unsplash.com/photo-1713980050714-64a1645336cf?q=80&w=2670&auto=format&fit=crop', 3, 'active'),
                ('Sleek Stealth', 'Fountain', 195.00, 'Modern technical precision meets traditional soul.', 'https://images.unsplash.com/photo-1620080207549-60efab274c16?q=80&w=2670&auto=format&fit=crop', 10, 'active'),
                ('Artisan Pen Rest', 'Accessories', 45.00, 'Hand-polished timber to cradle your instrument with respect.', 'https://images.unsplash.com/photo-1616782910872-ea77b5bb991c?q=80&w=2670&auto=format&fit=crop', 25, 'active'),
                ('Midnight Inkwell', 'Accessories', 65.00, 'A heavy, architecturally designed vessel for your finest ink.', 'https://images.unsplash.com/photo-1632180807484-776f583dff9b?q=80&w=2670&auto=format&fit=crop', 15, 'active'),
                ('Copper Core', 'Rollerball', 220.00, 'Weighted for those who take time with their words.', 'https://images.unsplash.com/photo-1507978106029-18bbca476d53?q=80&w=2670&auto=format&fit=crop', 6, 'active'),
                ('Polished Resin', 'Fountain', 175.00, 'A vibrant companion for daily entries and quick thoughts.', 'https://images.unsplash.com/photo-1633239894481-f0c59a2b721a?q=80&w=2670&auto=format&fit=crop', 14, 'active')
            `);
            console.log('✅ 8 products seeded');
        } else {
            console.log('⏭️  Products already exist, skipping seed');
        }

        console.log('🎉 Database setup complete!');
    } catch (err) {
        console.error('❌ Setup failed:', err.message);
        throw err;
    } finally {
        client.release();
        await pool.end();
    }
}

setup();
