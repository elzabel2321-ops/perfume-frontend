const GENERIC_FROM = "A ROMANOVA <onboarding@resend.dev>";

export async function sendResetOtpEmail(to: string, otp: string) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const from = process.env.RESEND_FROM_EMAIL || GENERIC_FROM;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "A ROMANOVA - Password Reset Code",
      text:
        `A ROMANOVA\n\n` +
        `Your password reset verification code is ${otp}.\n` +
        `This code expires in 10 minutes.\n\n` +
        `If you did not request a password reset, ignore this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; background: #faf7f2;">
          <div style="background: white; padding: 35px; border-radius: 15px; text-align: center;">
            <h1 style="letter-spacing: 6px; color: #171717;">A ROMANOVA</h1>
            <h2>Password Reset</h2>
            <p style="color: #555; font-size: 16px;">Your verification code is:</p>
            <div style="margin: 30px 0; padding: 20px; background: #faf7f2; border-radius: 10px; font-size: 32px; font-weight: bold; letter-spacing: 10px; color: #b38c2b;">
              ${otp}
            </div>
            <p style="color: #777;">This code expires in <strong>10 minutes</strong>.</p>
            <p style="color: #999; font-size: 13px;">If you did not request a password reset, please ignore this email.</p>
          </div>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Resend request failed.", {
      status: response.status,
      body: errorText.slice(0, 300),
    });
    throw new Error("Failed to send verification email.");
  }
}
