# Portfolio Website - AI/ML Engineer

## Overview

This is a full-stack portfolio website built for an AI/ML engineer. It features a modern, responsive design with a React frontend and Express backend, showcasing projects, blog posts, and professional information. The application uses a PostgreSQL database with Drizzle ORM for data management and includes a complete content management system for projects and blog posts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **Styling**: Custom CSS variables for theming with dark/light mode support

### Backend Architecture
- **Runtime**: Node.js with Express server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API with JSON responses
- **Session Management**: Built-in session handling for potential authentication

### Build and Development
- **Development**: Vite dev server with HMR (Hot Module Replacement)
- **Production**: esbuild for server bundling, Vite for client bundling
- **Type Safety**: Shared TypeScript types between frontend and backend
- **Path Aliases**: Configured for clean imports (@/, @shared/)

## Key Components

### Database Schema
- **Users**: User authentication and management
- **Projects**: Portfolio projects with categories (CV, NLP, ML, DL)
- **Blog Posts**: Technical blog content with tags and metadata
- **Contact Messages**: Form submissions from visitors

### API Endpoints
- `GET /api/projects` - Retrieve all projects
- `GET /api/projects/category/:category` - Filter projects by category
- `GET /api/blog` - Retrieve all blog posts
- `GET /api/blog/:id` - Get specific blog post
- `POST /api/contact` - Submit contact form

### UI Components
- **Navigation**: Fixed header with smooth scrolling navigation
- **Hero Section**: Introduction with call-to-action buttons
- **About Section**: Skills showcase with progress bars
- **Projects Section**: Filterable project grid with search
- **Blog Section**: Blog posts with tags and search functionality
- **Contact Section**: Contact form with validation
- **Theme Provider**: Dark/light mode toggle

### Content Categories
- **Computer Vision (CV)**: Image processing and analysis projects
- **Natural Language Processing (NLP)**: Text analysis and language models
- **Machine Learning (ML)**: Traditional ML algorithms and applications
- **Deep Learning (DL)**: Neural networks and deep learning projects

## Data Flow

1. **Initial Load**: Client requests data from API endpoints
2. **Caching**: TanStack Query caches responses for performance
3. **Real-time Updates**: No real-time features, but query invalidation for data freshness
4. **Form Submissions**: Contact form data validated and sent to backend
5. **Database Operations**: Drizzle ORM handles all database interactions
6. **Error Handling**: Comprehensive error handling with user-friendly messages

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Query
- **UI Libraries**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Forms**: React Hook Form with Zod validation
- **Utilities**: date-fns for date formatting

### Backend Dependencies
- **Server**: Express.js with middleware for JSON parsing
- **Database**: Drizzle ORM with PostgreSQL adapter
- **Validation**: Zod for schema validation
- **Development**: tsx for TypeScript execution, esbuild for bundling

### Development Tools
- **Vite**: Build tool with React plugin
- **TypeScript**: Type checking and compilation
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing with Tailwind

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server on port 5173 (default)
- **API Development**: Express server with hot reload using tsx
- **Database**: Connection to Neon Database via DATABASE_URL environment variable

### Production Build
1. **Client Build**: Vite builds optimized React application
2. **Server Build**: esbuild bundles Express server with externalized dependencies
3. **Static Assets**: Client build output served from dist/public
4. **Database Migrations**: Drizzle migrations applied before deployment

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment flag for production/development
- **Port Configuration**: Dynamic port assignment for deployment platforms

### Key Features
- **Server-Side Rendering**: Vite SSR setup for development
- **Static File Serving**: Express serves built React application
- **Error Handling**: Comprehensive error middleware
- **Security**: Basic security headers and input validation
- **Performance**: Optimized builds with code splitting and compression

The application follows modern web development best practices with a focus on performance, accessibility, and maintainability. The architecture supports easy scaling and future enhancements while maintaining a clean separation of concerns between frontend and backend.