import nodemailer from "nodemailer";

let transporter;

const getTransporter = () => {
  if (!transporter) {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;

    if (!smtpHost) {
      console.warn("SMTP_HOST not configured - email functionality disabled");
      return null;
    }

    console.log(`Configuring SMTP transporter for ${smtpUser}@${smtpHost}:${smtpPort}`);

    try {
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: process.env.SMTP_PASS
        }
      });

      // Verify connection if transporter created
      transporter.verify((error) => {
        if (error) {
          console.error("SMTP verification failed:", error.message);
          transporter = null;
        } else {
          console.log("SMTP connection verified successfully");
        }
      });
    } catch (error) {
      console.error("Failed to create SMTP transporter:", error.message);
      return null;
    }
  }

  return transporter;
};

export const sendMail = async ({ to, subject, html }) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP not configured. Email skipped.", {
      hasHost: !!process.env.SMTP_HOST,
      hasUser: !!process.env.SMTP_USER,
      hasPass: !!process.env.SMTP_PASS
    });
    return;
  }

  try {
    const emailTransporter = getTransporter();
    if (!emailTransporter) {
      console.warn("No SMTP transporter available. Email skipped.");
      return;
    }

    await emailTransporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to,
      subject,
      html
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Failed to send email:", error.message);
    throw error;
  }
};
