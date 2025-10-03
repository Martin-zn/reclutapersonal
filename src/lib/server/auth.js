import EmailProvider from 'next-auth/providers/email';

import { html, text } from '@/config/email-templates/signin';
import { emailConfig, sendMail } from '@/lib/server/mail';

export const authOptions = {
  callbacks: {
    session: async ({ session }) => session,
  },
  debug: !(process.env.NODE_ENV === 'production'),
  events: {},
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      server: emailConfig,
      sendVerificationRequest: async ({ identifier: email, url }) => {
        const { host } = new URL(url);
        await sendMail({
          html: html({ email, url }),
          subject: `[Nextacular] Sign in to ${host}`,
          text: text({ email, url }),
          to: email,
        });
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || null,
  session: {
    jwt: true,
  },
};
