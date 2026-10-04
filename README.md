

# Moodle

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?logo=vercel)](https://moodle-moodle1.vercel.app)

**Live demo:** [moodle-moodle1.vercel.app](https://moodle-moodle1.vercel.app)

---

## About

Moodle is a web application built with **Next.js**, **Tailwind CSS** and **Firebase**.

## Tech Stack

| Area        | Technology                                                    |
| ----------- | ------------------------------------------------------------- |
| Framework   | [Next.js 16](https://nextjs.org/) (App Router)                |
| Styling     | [Tailwind CSS v4](https://tailwindcss.com/)                   |
| Backend     | [Firebase](https://firebase.google.com/)                      |
| Linting     | ESLint 9                                                      |
| Hosting     | [Vercel](https://vercel.com/)                                 |

## Project Structure

```
Moodle/
├── app/            # Next.js App Router: pages, layouts, routes
├── components/     # Reusable UI components
├── lib/            # Shared helpers and configuration
├── utils/          # Utility functions
├── public/         # Static assets (images, icons)
├── Context/        # Project context / notes
├── Next theory/    # Learning notes on Next.js
├── firebase.js     # Firebase initialisation
└── next.config.mjs # Next.js configuration
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20.9 or newer
- npm, yarn, pnpm, or bun
- A [Firebase](https://console.firebase.google.com/) project

### Installation

1. **Clone the repository**

```bash
   git clone https://github.com/Ompatil45/Moodle.git
   cd Moodle
```

2. **Install dependencies**

```bash
   npm install
```

3. **Set up environment variables**

   Create a `.env.local` file in the project root and add your Firebase credentials
   (found in Firebase Console → Project settings → Your apps):

```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. **Run the development server**

```bash
   npm run dev
```

   Open [http://localhost:3000](http://localhost:3000) in your browser. The page
   auto-updates as you edit files in `app/`.

## Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Create an optimised production build |
| `npm run start` | Run the production build             |
| `npm run lint`  | Lint the codebase with ESLint        |

## Deployment

The easiest way to deploy is with [Vercel](https://vercel.com/new):

1. Push the repo to GitHub.
2. Import it in Vercel.
3. Add the same environment variables from `.env.local` in the project settings.
4. Deploy.

## Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## Author

**[@Ompatil45](https://github.com/Ompatil45)**




