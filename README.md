# J-Town Sensei

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

[![Node.js CI](https://github.com/Nihongo-Jouzu/nihongo-jouzu-frontend/actions/workflows/node.js.yml/badge.svg)](https://github.com/Nihongo-Jouzu/nihongo-jouzu-frontend/actions/workflows/node.js.yml)

J-TOWN is a casual Japanese learning app that enables intermediate language learners to enjoy their studies more. Users can engage in self-learning practices and compete with others through simple games.

The uniqueness of this app lies in its content. Learning casual Japanese is key to speaking more fluent Japanese, but it's challenging due to the lack of daily opportunities. J-TOWN provides quality materials and engaging simple games, allowing you to focus on becoming a natural Japanese speaker. You can also use this app as a refreshing break during your main studies.

For our tech stack, we use Next.js for the frontend. On the backend, we employ Django Rest Framework and PostgreSQL. We deploy using Railways with a Docker file. For testing, we utilize Jest and Playwright.

## Initial setup

Create a folder

```bash
  mkdir jsensei
```

Clone backend

```bash
  git clone https://github.com/Nihongo-Jouzu/nihongo-jouzu-backend
```

Clone frontend

```bash
  git clone https://github.com/Nihongo-Jouzu/nihongo-jouzu-frontend
```

Go to the backend directory

```bash
  cd nihongo-jouzu-backend
```

Run docker

```bash
  docker compose build
```

Start the server

```bash
  docker compose up
```

## Installation

Install my-project with npm

```bash
  cd nihongo-jouzu-frontend
  npm install
```

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Demo

https://j-street.up.railway.app/

## API Reference

#### Socket connection

```TCP
   /api/socket
```

| Parameter  | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `player`   | `Player` | **Required**. Player type with his data |
| `lobby_id` | `number` | **Required**. Id of the lobby           |

Create and manage connection with socket for play memo game

#### Connect with backend server

```http
  GET/POST/PUT/DELETE /api/backend
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `path`    | `string` | **Required**. Path with query args |

Forward the fetch to backend server

#### User signup

```http
  POST /api/signup
```

| Parameter  | Type     | Description                        |
| :--------- | :------- | :--------------------------------- |
| `username` | `string` | **Required**. Username of the user |
| `password` | `string` | **Required**. Password of the user |

#### add(num1, num2)

Takes two numbers and returns the sum.

## Running Tests

To run tests, run the following command

```bash
  npm run test
```
