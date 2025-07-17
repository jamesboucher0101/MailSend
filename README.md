# Mail Sender - Next.js Project

A simple Next.js application with a mail sender API using nodemailer.

## Features

- Simple web interface to test email sending
- REST API endpoint for sending emails
- Uses nodemailer for SMTP email delivery
- All email credentials and content passed as parameters

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Usage

### Endpoint: `/api/mailsender`

**Method:** POST

**Content-Type:** application/json

**Parameters:**
- `user` (string): Email username
- `pass` (string): Email password
- `from` (string): Sender email address (SMTP settings are automatically detected)
- `to` (string): Recipient email address
- `subject` (string): Email subject
- `text` (string): Email body text

**Supported Email Providers:**
- Gmail (gmail.com)
- Outlook/Hotmail (outlook.com, hotmail.com, live.com)
- Yahoo (yahoo.com, yahoo.co.uk, yahoo.ca)
- iCloud (icloud.com, me.com, mac.com)
- ProtonMail (protonmail.com) - requires ProtonMail Bridge
- Other domains (auto-detected)

**Example Request:**
```json
{
  "user": "your-email@gmail.com",
  "pass": "your-app-password",
  "from": "your-email@gmail.com",
  "to": "recipient@example.com",
  "subject": "Test Email",
  "text": "This is a test email sent from the Mail Sender API."
}
```

**Example Response:**
```json
{
  "success": true,
  "messageId": "<random-message-id>",
  "response": "250 Message accepted"
}
```

## Gmail Setup

If using Gmail, you'll need to:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password instead of your regular password

## Security Note

This is a simple demo project. In production:
- Never expose email credentials in client-side code
- Use environment variables for sensitive data
- Implement proper authentication and authorization
- Consider using email service providers like SendGrid, Mailgun, etc.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint 