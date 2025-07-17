import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Function to get SMTP settings based on email domain
function getSmtpSettings(email: string) {
    const domain = email.split('@')[1]?.toLowerCase()

    switch (domain) {
        case 'gmail.com':
            return { host: 'smtp.gmail.com', port: 587, secure: false }
        case 'outlook.com':
        case 'hotmail.com':
        case 'live.com':
            return { host: 'smtp-mail.outlook.com', port: 587, secure: false }
        case 'yahoo.com':
        case 'yahoo.co.uk':
        case 'yahoo.ca':
            return { host: 'smtp.mail.yahoo.com', port: 587, secure: false }
        case 'icloud.com':
        case 'me.com':
        case 'mac.com':
            return { host: 'smtp.mail.me.com', port: 587, secure: false }
        case 'protonmail.com':
            return { host: '127.0.0.1', port: 1025, secure: false } // ProtonMail uses bridge
        default:
            // For other domains, try common SMTP settings
            return { host: `smtp.${domain}`, port: 587, secure: false }
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { user, pass, from, to, subject, text } = body

        // Validate required parameters
        if (!user || !pass || !from || !to || !subject || !text) {
            return NextResponse.json(
                { error: 'Missing required parameters' },
                { status: 400 }
            )
        }

        // Get SMTP settings based on the from email
        const smtpSettings = getSmtpSettings(from)

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: smtpSettings.host,
            port: smtpSettings.port,
            secure: smtpSettings.secure,
            auth: {
                user: user,
                pass: pass,
            },
        })

        // Send email
        const info = await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: text,
        })

        return NextResponse.json({
            success: true,
            messageId: info.messageId,
            response: info.response,
        })

    } catch (error) {
        console.error('Email sending error:', error)
        return NextResponse.json(
            { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
} 