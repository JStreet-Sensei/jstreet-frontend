# Design

## Figma mockup

https://www.figma.com/design/8NGJOCtcVqLFtTrS3P0ht7/Nihongo-Alley---copied-with-new-games?node-id=0-88&node-type=CANVAS&t=FZORUYPPwlmsROs0-0

# Implementation

## Websocket

https://medium.com/@RajeshSharma-dev/websockets-with-nextjs-for-building-real-time-responsive-application-bc4bedd19eec
https://github.com/ryanc268/Typescript-Websocket-Game/tree/main

## Route

### Protected route

Use middleware.ts for protected route.
https://www.freecodecamp.org/news/secure-routes-in-next-js/<br>

## Authentication

We use Nextauth.js.
Detail logic.
https://refine.dev/blog/nextauth-google-github-authentication-nextjs/#for-githubprovider-you-will-need-a-github-account

example:

```bash
const { data: session } = useSession()
```

the session is:

```bash
{user: {…}, expires: '2024-10-02T05:32:22.302Z'}
expires: "2024-10-02T05:32:22.302Z"
user: {email:"testuser@gmail.com"
image:"https://lh3.googleusercontent.com/....."
name:"Test User"}
```

## Backend call

When you need to fetch from the backend instead of the url replace with getFetchBackendURL(path).
Where path is the path of the backend
Like the example:

```
  const response = await axios({
    method: 'get',
    url: getFetchBackendURL('/api/auth/user/'),
    headers: { Authorization: 'Bearer ' + session?.access_token },
  });
```

## Styling

Use noraml css and tailwind css.
You should write normal css within global.css file.
https://nextjs.org/docs/pages/building-your-application/styling/css-modules#css-modules
https://medium.com/@joel.woodyard/how-to-combine-tailwind-and-css-stylesheets-in-next-js-tutorial-39c522ca639

## Socket

The api request are done to `api/Socket.ts (Server)`
The socket client is `SocketProvider.tsx (Client)`

`socket.on` is the event for receive status or data

`socket.emit` is the event for send data to everyone

## Game state

Every game contains 2 context provider

- GameState - Contain all information about the game and the status
- Socket - Contain all information and event about the scoket

# Folder structure

There is two ways in Nextjs for routing. We adopt pages routing, not app routing. <br>
https://medium.com/@CraftedX/should-you-use-next-js-pages-or-app-directory-38e803fe5cb4

Folder structure is related to routing.<br>
https://nextjs.org/docs/pages/building-your-application/routing

Folder structure convention. See page router section.<br>
https://nextjs.org/docs/getting-started/project-structure

The basic behavior of Next.js by naming for file/folders.<br>
There are some part which is defferent in between page router and app router.<br>
https://nextjs.org/docs/app/building-your-application/routing/colocation<br>

The \_app.tsx file is used for rendering every page.<br>
https://nextjs.org/docs/pages/building-your-application/routing/custom-app

Page name is case-sensitive. URL is case-sensitive as well.

- Commponents<br>
  React components used in each page. For example, flash card, card to show score, ...<br>
  The name should be camel case.

- Pages<br>
  These represents pages.<br>

- apis<br>
  https://next-auth.js.org/getting-started/example<br>

* utils<br>
  mocks-tsx.tsx<br>
  mocks.ts<br>
  Mock funcitons for test.

# Commands

- install<br>
  npm install<br>
  ※For development of only frontend, we don't need docker run.<br>
  ※EbisuG haven't checked running app with docker yet.

* run local<br>
  npm run dev<br>

* run test<br>
  npm run test

# Testing

## Plan

The purpose is to prevent degradation and reduce time run test mannually.

Component/Page test<br>
・Check successfully rendering.<br>
・Check fetching data.<br>
・Check state changes correctly.<br>

End-to-end test<br>
・Check scenario of user events.<br>

## Tools

Use Jest + React Testing Libraries
Basic usage for Jest + React:<br>
https://www.robinwieruch.de/react-testing-library/<br>
With Nextjs official tutorial<br>
https://nextjs.org/docs/pages/building-your-application/testing/jest<br>
Tips for mock Next router.<br>
https://github.com/vercel/next.js/issues/7479#issuecomment-587145429<br>
Custom renders for mock context.<br>
https://testing-library.com/docs/react-testing-library/setup/#custom-render

# Errors

- App doesn't run after successful build.
  Make sure you use the latest things. Delete your image, container, and volume. Run docker compose commands again.

# Reference

Using google auth.<br>
https://blog.stackademic.com/building-a-custom-google-authentication-system-with-django-rest-framework-and-reactjs-ii-794fa8592782

Use @react-oauth/google version.<br>
https://muhammedsahad.medium.com/react-js-a-step-by-step-guide-to-google-authentication-926d0d85edbd<br>
https://blog.logrocket.com/guide-adding-google-login-react-app/<br>

React test components whole overview from unit test to integration test with tools<br>
https://medium.com/@dev.emondas/testing-react-components-a-complete-guideline-b84f1e23d176
