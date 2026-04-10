import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resendKey = process.env.RESEND_API_KEY;
const isResendLive = resendKey && !resendKey.includes('PLACEHOLDER');
let resend = null;
if (isResendLive) {
    resend = new Resend(resendKey);
}

const MAKER_EMAIL = process.env.MAKER_EMAIL || 'hello@barwoncraftworks.com.au';
const FROM_EMAIL = 'Barwon Craftworks <orders@barwoncraftworks.com.au>';

// Send order confirmation to customer
export async function sendOrderConfirmation({ orderNumber, customerName, customerEmail, total, items }) {
    if (!isResendLive) {
        console.log(`📧 [PLACEHOLDER] Order confirmation email would be sent to ${customerEmail} for order ${orderNumber}`);
        return;
    }

    const itemsHtml = items.map(item =>
        `<tr><td style="padding:12px;border-bottom:1px solid #e5dec9;">${item.description}</td>
         <td style="padding:12px;border-bottom:1px solid #e5dec9;text-align:center;">${item.quantity}</td>
         <td style="padding:12px;border-bottom:1px solid #e5dec9;text-align:right;">$${(item.amount_total / 100).toFixed(2)}</td></tr>`
    ).join('');

    await resend.emails.send({
        from: FROM_EMAIL,
        to: customerEmail,
        subject: `Order Confirmed — ${orderNumber} | Barwon Craftworks`,
        html: `
            <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fdfaf3;padding:40px;">
                <div style="text-align:center;margin-bottom:30px;">
                    <h1 style="font-size:28px;color:#203c35;margin:0;">Barwon Craftworks</h1>
                    <p style="color:#d4af37;font-size:10px;letter-spacing:4px;text-transform:uppercase;margin:5px 0 0;">Handcrafted in Geelong</p>
                </div>

                <div style="background:white;border-radius:16px;padding:30px;border:1px solid #e5dec9;">
                    <h2 style="color:#203c35;font-size:22px;margin:0 0 10px;">Thank you, ${customerName}.</h2>
                    <p style="color:#203c35;opacity:0.7;line-height:1.6;margin:0 0 20px;">
                        Your order <strong style="color:#d4af37;">${orderNumber}</strong> has been confirmed and I'm preparing it at the bench now.
                        Every piece is personally inspected before it leaves the workshop.
                    </p>

                    <table style="width:100%;border-collapse:collapse;margin:20px 0;">
                        <thead>
                            <tr style="background:#f5f0e1;">
                                <th style="padding:12px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#203c35;">Item</th>
                                <th style="padding:12px;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#203c35;">Qty</th>
                                <th style="padding:12px;text-align:right;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#203c35;">Price</th>
                            </tr>
                        </thead>
                        <tbody>${itemsHtml}</tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2" style="padding:12px;text-align:right;font-weight:bold;color:#203c35;">Total</td>
                                <td style="padding:12px;text-align:right;font-weight:bold;color:#d4af37;font-size:18px;">$${total}</td>
                            </tr>
                        </tfoot>
                    </table>

                    <p style="color:#203c35;opacity:0.7;line-height:1.6;font-size:14px;">
                        You'll receive a shipping notification with tracking details once your order is packed and dispatched.
                        Most orders ship within 2–3 business days from the Geelong workshop.
                    </p>
                </div>

                <div style="text-align:center;margin-top:30px;color:#203c35;opacity:0.4;font-size:11px;">
                    <p>Barwon Craftworks · Geelong, Victoria · Australia</p>
                    <p>hello@barwoncraftworks.com.au</p>
                </div>
            </div>
        `
    });

    console.log(`✅ Order confirmation sent to ${customerEmail}`);
}

// Send new order alert to maker
export async function sendNewOrderAlert({ orderNumber, customerName, customerEmail, total, items }) {
    if (!isResendLive) {
        console.log(`📧 [PLACEHOLDER] New order alert would be sent to maker for order ${orderNumber} ($${total})`);
        return;
    }

    const itemsList = items.map(item => `• ${item.description} × ${item.quantity}`).join('\n');

    await resend.emails.send({
        from: FROM_EMAIL,
        to: MAKER_EMAIL,
        subject: `🔔 New Order ${orderNumber} — $${total}`,
        html: `
            <div style="font-family:Georgia,serif;max-width:500px;margin:0 auto;padding:30px;">
                <h2 style="color:#203c35;">New Order Received</h2>
                <p><strong>Order:</strong> ${orderNumber}</p>
                <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
                <p><strong>Total:</strong> <span style="color:#d4af37;font-size:20px;font-weight:bold;">$${total}</span></p>
                <p><strong>Items:</strong></p>
                <pre style="background:#f5f0e1;padding:15px;border-radius:8px;font-size:14px;">${itemsList}</pre>
                <p style="color:#203c35;opacity:0.6;font-size:13px;">Head to the admin panel to manage this order.</p>
            </div>
        `
    });

    console.log(`✅ New order alert sent to maker`);
}

// Send contact form notification to maker
export async function sendContactNotification({ name, email, subject, message }) {
    if (!isResendLive) {
        console.log(`📧 [PLACEHOLDER] Contact notification would be sent to maker from ${name} (${email}): ${subject}`);
        return;
    }

    await resend.emails.send({
        from: FROM_EMAIL,
        to: MAKER_EMAIL,
        replyTo: email,
        subject: `📬 New Inquiry: ${subject} — from ${name}`,
        html: `
            <div style="font-family:Georgia,serif;max-width:500px;margin:0 auto;padding:30px;">
                <h2 style="color:#203c35;">New Workshop Inquiry</h2>
                <p><strong>From:</strong> ${name} (${email})</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <div style="background:#f5f0e1;padding:20px;border-radius:8px;margin:15px 0;">
                    <p style="color:#203c35;line-height:1.6;white-space:pre-wrap;">${message}</p>
                </div>
                <p style="color:#203c35;opacity:0.6;font-size:13px;">Reply directly to this email to respond to the customer.</p>
            </div>
        `
    });

    console.log(`✅ Contact notification sent to maker`);
}
