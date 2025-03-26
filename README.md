![Vue.js Embedded Login Banner](/public/vue-banner.png)

# Vue.js Embedded Login Sample

This sample demonstrates how to add authentication to a Vue.js application using Frontegg's Embedded Login solution.

## Requirements

- [Node.js](https://nodejs.org)
- npm (comes with Node.js)
- A Frontegg account. [Sign up for free](https://portal.frontegg.com/signup).

## Setup

### 1. Configure Frontegg Application

1. Go to [Frontegg Portal](https://portal.frontegg.com/)
2. Configure your application settings
3. Get your Client ID and API key from the Frontegg Portal

### 2. Configuration

This project comes with pre-configured test credentials in `/src/config/sanboxContextOptions.ts`. These credentials are set up for demonstration purposes, allowing you to test the authentication flow immediately.

When deploying to production, make sure to replace these test credentials with your own Frontegg application credentials.

### 3. Install Dependencies

Run the following commands:

```bash
npm install
```

### 4. Run the Application

To start the development server, run:

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### 5. Build for Production

To create a production build:

```bash
npm run build
```

## Features Demonstrated

This application demonstrates:
- Vue.js 3 with TypeScript
- Vue Router integration with Frontegg
- Implementing Frontegg's Embedded Login
- Managing user authentication state
- Accessing user profile information

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Vue components
├── config/          # Configuration files
├── utils/          # Utility functions
└── view/           # Page components
```
