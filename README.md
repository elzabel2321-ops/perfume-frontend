# Perfume Shop (next-learning)

This is the Next.js (App Router) demo site for the Perfume Shop project.

Available scripts (run inside the `next-learning` folder):

- npm install
- npm run dev # run development server (Next.js)
- npm run build # build for production
- npm run lint # run ESLint

Notes:

- The global site background image is at `public/images/hero.jpg` and is applied site-wide via `app/layout.tsx`.
- The navbar is a responsive horizontal nav that collapses to a mobile menu.
- If you see a warning about multiple lockfiles during build, it's because this repository contains multiple package-lock.json files. That's harmless for local dev but can be cleaned up if desired.

If you want additional organization steps (formatting with Prettier, commit history cleanup, or CI config), tell me which one to add and I'll apply it.

Additional setup notes:

- Image conversion: run the converter from the repository root to produce WebP and responsive sizes for images used by the app:

  npm install --save-dev sharp
  npm run convert-images

  This writes .webp and -480/-768/-1200 webp files to next-learning/public/images.

- Environment: create a .env.local file in the next-learning folder with your SendGrid key to enable real password reset emails.

  NEXT_PUBLIC_SITE_URL=http://localhost:3000
  SENDGRID_API_KEY=your_sendgrid_api_key_here
  FROM_EMAIL=no-reply@example.com

- Husky (pre-commit hooks): the repo includes lint-staged config. To enable hooks locally:

  npm install
  npx husky install
  npx husky add .husky/pre-commit "npx lint-staged"

  Note: the repository must be a git repo for husky to install hooks.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
