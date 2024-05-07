import { ISendMailOptions } from '@nestjs-modules/mailer';

export function NewVerificationEmailOption(
  to: string,
  name: string,
  code: string,
): ISendMailOptions {
  return {
    to: to,
    subject: 'HShopp - Verification via Email',
    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="text-align: center; padding: 20px 0;">
                    <h1 style="color: #333;">Welcome to HShopp, ${name}!</h1>
                    <p style="font-size: 18px;">To verify your account, please use the following OTP:</p>
                    <h2 style="font-size: 36px; color: #007bff;">${code}</h2>
                    <p style="font-size: 16px;">Thank you for using HShopp!</p>
                </div>
            </div>
        `,
  };
}
