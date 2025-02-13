import * as dotenv from 'dotenv';
import Pusher from 'pusher-js';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

// Define the expected email payload structure.
interface OutgoingEmailPayload {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

// Pusher config
const pusherKey = process.env.PUSHER_APP_KEY!;
const pusherCluster = process.env.PUSHER_APP_CLUSTER!;
const channelName = process.env.PUSHER_CHANNEL || 'scx_notifications';
const eventName = process.env.PUSHER_EVENT || 'mail-user';

// Nodemailer SMTP config
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

async function sendEmail(payload: OutgoingEmailPayload): Promise<void> {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: payload.to,
            subject: payload.subject,
            text: payload.text,
            html: payload.html,
        });
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Initialize Pusher client
const pusher = new Pusher(pusherKey, { cluster: pusherCluster, forceTLS: true });

// Subscribe to the Pusher channel
const channel = pusher.subscribe(channelName);
channel.bind(eventName, (data: any) => {
    console.log(`Received '${eventName}' event:`, data);

    // Check if the received event matches expected format
    if (!data.to || !data.data || !data.data.otp) {
        console.error("Invalid email data received:", data);
        return;
    }

    const emailPayload: OutgoingEmailPayload = {
        to: data.to,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${data.data.otp}`,
        html: `<p>Your OTP code is: <strong>${data.data.otp}</strong></p>`
    };

    sendEmail(emailPayload);
});


console.log(`Email Worker is listening for '${eventName}' events on channel '${channelName}'...`);
