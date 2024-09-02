# Explanations

## Figma mockup
https://www.figma.com/design/8NGJOCtcVqLFtTrS3P0ht7/Nihongo-Alley---copied-with-new-games?node-id=0-88&node-type=CANVAS&t=FZORUYPPwlmsROs0-0

## Folder structure
There is two ways in Nextjs for routing. We adopt pages routing, not app routing. <br>
https://medium.com/@CraftedX/should-you-use-next-js-pages-or-app-directory-38e803fe5cb4

Folder structure is related to routing.<br>
https://nextjs.org/docs/pages/building-your-application/routing

Folder structure convention. See page router section.<br>
https://nextjs.org/docs/getting-started/project-structure

The basic behavior of Next.js by naming for file/folders.<br>
 There are some part which is defferent in between page router and app router.<br>
https://nextjs.org/docs/app/building-your-application/routing/colocation<br>

The _app.tsx file is used for rendering every page.<br>
https://nextjs.org/docs/pages/building-your-application/routing/custom-app

Page name is case-sensitive. URL is case-sensitive as well.

* Commponents<br>
React components used in each page. For example, flash card, card to show score, ...<br>
The name should be camel case.

* Pages<br>
These represents pages.<br>

* apis<br>
https://next-auth.js.org/getting-started/example<br>



## Commands

* install<br>
npm install<br>
※For development of only frontend, we don't need docker run.<br>

* run local<br>
npm run dev<br>

## Route
### Protected route
Use middleware.ts for protected route.
https://www.freecodecamp.org/news/secure-routes-in-next-js/<br>

## Authentication
We use Nextauth.js.
Detail logic.
https://refine.dev/blog/nextauth-google-github-authentication-nextjs/#for-githubprovider-you-will-need-a-github-account


## Errors
* App doesn't run after successful build.
Make sure you use the latest things. Delete your image, container, and volume. Run docker compose commands again.

### Reference
Using google auth.<br>
https://blog.stackademic.com/building-a-custom-google-authentication-system-with-django-rest-framework-and-reactjs-ii-794fa8592782

Use @react-oauth/google version.<br>
https://muhammedsahad.medium.com/react-js-a-step-by-step-guide-to-google-authentication-926d0d85edbd<br>
https://blog.logrocket.com/guide-adding-google-login-react-app/<br>




# This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
