import { ISendMailOptions } from '@nestjs-modules/mailer';
import { CLIENT_SITE_DOMAIN } from './const';

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
          <p style="font-size: 16px;">Please click <a href="${CLIENT_SITE_DOMAIN}/verification">here</a> to enter your code!</p>
          <p style="font-size: 16px;">Thank you for using HShopp!</p>
        </div>
      </div>
    `,
  };
}

export function NewThankyouForRegisterEmailOption(
  to: string,
  name: string,
): ISendMailOptions {
  return {
    to: to,
    subject: 'HShopp - Thank you for your registration!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #333;">Thank you for registering, ${name}!</h1>
          <p style="font-size: 16px;">Please click <a href="${CLIENT_SITE_DOMAIN}/verification">here</a> if you have not yet verified your account!</p>
        </div>
      </div>
    `,
  };
}
