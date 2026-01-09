# Personal Website

Portfolio website built with React + TypeScript + Vite

## Quick Start

1. Install dependencies:
```bash
cd client
npm install
```

2. Run development server:
```bash
npm run dev
```

The site runs on http://localhost:3000

## Build for Production

```bash
npm run build
```

Output will be in `client/dist/`

## Deploy

This is a static site and can be deployed to:
- **Netlify**: Drag and drop the `client/dist` folder
- **Vercel**: Connect your GitHub repo
- **GitHub Pages**: Deploy the `client/dist` folder

### Netlify Deployment Settings:
- Build command: `npm run build`
- Publish directory: `client/dist`
- Base directory: `client`
