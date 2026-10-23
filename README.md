# Katam Ganesh Reddy — Full-Stack Portfolio & Studio

A dynamic, full-stack web application built with **Next.js 16 (App Router)**, **React 19**, and **Server Actions**, deployed at [tomesphere.in](https://tomesphere.in).

## Features

- **Dynamic Full-Stack Architecture**: Built with Next.js App Router, Server Components, and Server Actions.
- **Flagship Spotlight**: Features [TomeSphere](https://tomesphere.in), a digital book sanctuary and reader application.
- **Live GitHub Stream**: Dynamically fetches public repositories from GitHub API via server caching and route handlers (`/api/github`).
- **Real-Time Visitor Guestbook**: Powered by Next.js Server Actions with server-side validation.
- **Direct Server Messaging**: Dynamic contact form processed server-side with input validation.
- **Developer Dossier Terminal**: Interactive shell executing commands (`whoami`, `skills`, `projects`, `flagship`, `live`, `contact`).
- **Studio Control Room**: Built-in dashboard for managing projects, metadata, and portfolio settings.
- **Modern Design System**: Obsidian dark theme with glassmorphism, glowing ambient aura, and one-click light mode toggle.

## Tech Stack

- **Framework**: Next.js 16 (Turbopack, App Router)
- **Frontend**: React 19, Lucide React
- **Styling**: Vanilla CSS custom properties with responsive breakpoints
- **Backend / API**: Server Actions, Dynamic Route Handlers (`/api/health`, `/api/github`)
- **Hosting**: Vercel with custom domain `tomesphere.in`

## Run Locally

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

To produce an optimized production build:

```sh
npm run build
npm run start
```
