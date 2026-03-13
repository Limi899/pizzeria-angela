import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, phone, date, time, guests, requests } = body

        // Configure SMTP transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        // Build a clean HTML email
        const htmlBody = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #111; border-radius: 16px; overflow: hidden; border: 1px solid #333;">
            <div style="background: linear-gradient(135deg, #b87333, #d48a47); padding: 32px; text-align: center;">
                <h1 style="color: #fff; margin: 0; font-size: 24px; font-weight: 600;">🍕 New Reservation</h1>
                <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Pizzeria Angela</p>
            </div>
            <div style="padding: 32px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #b87333; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; width: 120px;">Name</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #fdfbf7; font-size: 15px;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #b87333; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #fdfbf7; font-size: 15px;"><a href="mailto:${email}" style="color: #d48a47;">${email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #b87333; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Phone</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #fdfbf7; font-size: 15px;"><a href="tel:${phone}" style="color: #d48a47;">${phone}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #b87333; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Date</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #fdfbf7; font-size: 15px;">${date}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #b87333; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Time</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #fdfbf7; font-size: 15px;">${time}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #b87333; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Guests</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #fdfbf7; font-size: 15px;">${guests}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; color: #b87333; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Requests</td>
                        <td style="padding: 12px 0; color: #fdfbf7; font-size: 15px;">${requests || 'None'}</td>
                    </tr>
                </table>
            </div>
            <div style="padding: 16px 32px; background: #0a0a0a; text-align: center;">
                <p style="color: #666; font-size: 12px; margin: 0;">Sent from Pizzeria Angela website</p>
            </div>
        </div>
        `

        await transporter.sendMail({
            from: `"Pizzeria Angela" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            replyTo: email,
            subject: `🍕 New Reservation: ${name} — ${date} at ${time}`,
            html: htmlBody,
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Reservation email error:', error)
        return NextResponse.json(
            { error: 'Failed to send reservation' },
            { status: 500 }
        )
    }
}
