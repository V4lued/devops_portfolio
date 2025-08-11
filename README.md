# DevOps Portfolio

🚀 **An Interactive DevOps Portfolio showcasing CI/CD expertise through animated pipeline visualizations**

This modern portfolio website demonstrates DevOps engineering skills with an interactive CI/CD pipeline showcase, built with React, TypeScript, and animated visualizations. It features a comprehensive pipeline simulation that walks through the entire software delivery lifecycle from source control to production monitoring.

## ✨ Features

- **Interactive CI/CD Pipeline**: Real-time simulation of a complete DevOps pipeline with animated stages
- **Modern UI/UX**: Responsive design with smooth animations and professional styling
- **Pipeline Stages**:
  - Source Control (Git)
  - Build & Compilation
  - Testing (Unit & Integration)
  - Security Scanning (SAST & DAST)
  - Artifact Storage (Docker Registry)
  - Staging Deployment (Kubernetes)
  - End-to-End Testing (Selenium)
  - Production Deployment (Blue/Green)
  - Monitoring (Prometheus & Grafana)
- **Real-time Status Updates**: Live pipeline execution with success/failure scenarios
- **Professional Sections**: About, Skills, Projects, and Contact information
- **View Counter API**: Optional backend server for tracking portfolio visits
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Styled Components with CSS custom properties
- **Animations**: Framer Motion for smooth transitions
- **Pipeline Visualization**: ReactFlow for interactive diagrams
- **Icons**: React Icons
- **Backend** (Optional): Express.js for view counting
- **Testing**: Jest with React Testing Library
- **Build Tool**: Vite with TypeScript support

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd devops_portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

4. **Optional: Start the backend server** (for view counting)
   ```bash
   npm run server
   ```
   The server will run at `http://localhost:3001`

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run test` - Run the test suite
- `npm run lint` - Run ESLint for code quality checks
- `npm run server` - Start the Express.js backend server

## 🏗️ Project Structure

```
devops_portfolio/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer, Sidebar
│   │   ├── sections/        # Hero, About, Skills, Projects, etc.
│   │   └── ui/              # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── styles/              # Global styles and CSS variables
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Helper functions and data
├── server/                  # Express.js backend (optional)
├── public/                  # Static assets
└── tests/                   # Test files
```

## 🎯 Key Components

- **Pipeline Showcase**: Interactive CI/CD pipeline with real-time animations
- **Hero Section**: Professional introduction with animated profile
- **Skills Section**: Technical competencies with visual indicators
- **Projects Section**: Portfolio of DevOps and development projects
- **Contact Form**: Integrated contact system with EmailJS

## 🔧 Customization

1. **Personal Information**: Update profile details in `src/components/sections/Hero.tsx`
2. **Skills**: Modify skills list in `src/components/sections/Skills.tsx`
3. **Projects**: Add your projects in `src/components/sections/Projects.tsx`
4. **Pipeline Stages**: Customize pipeline configuration in `src/components/sections/PipelineShowcase.tsx`
5. **Styling**: Adjust colors and themes in `src/styles/variables.css`

## 🌐 Deployment

### Frontend (Vite Build)
```bash
npm run build
```
Deploy the `dist` folder to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)

### Backend (Optional)
The Express.js server can be deployed to services like Heroku, Railway, or DigitalOcean.

## 🧪 Testing

Run the comprehensive test suite:
```bash
npm run test
```

Tests cover components, hooks, utilities, and user interactions.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

Built with ❤️ to showcase DevOps engineering expertise and modern web development skills.
