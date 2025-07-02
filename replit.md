# AR-Rahanu - Islamic Gold Financing System

## Overview

This repository contains a full-stack web application for AR-Rahanu, an Islamic Gold Financing System. The application allows users to manage gold-backed loan applications, track loan statuses, perform gold valuations, and handle client management in compliance with Islamic finance principles.

The system is built with a React frontend and Node.js (Express) backend, using a PostgreSQL database with Drizzle ORM for data persistence. The application adopts a modern UI approach with the shadcn/ui component library and Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Framework**: React with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query for server-state management
- **UI Components**: shadcn/ui component library (based on Radix UI primitives)
- **Styling**: Tailwind CSS with a custom theme system
- **Build Tool**: Vite for fast development and optimized production builds

The frontend follows a component-based architecture with reusable UI components. It's organized into pages, components, hooks, and utilities. The application uses a custom theming system that supports both light and dark modes.

### Backend Architecture

- **Framework**: Express.js running on Node.js
- **API Pattern**: RESTful API endpoints
- **Database Access**: Drizzle ORM for database operations
- **Authentication**: Session-based authentication (using connect-pg-simple)
- **Validation**: Zod for schema validation

The backend follows a layered architecture with routes handling API endpoints, storage abstraction for database operations, and middleware for cross-cutting concerns like logging, error handling, and request validation.

### Data Storage

- **Database**: PostgreSQL (via Neon serverless Postgres)
- **ORM**: Drizzle ORM for type-safe database queries
- **Schema Validation**: Drizzle-zod for combining schema definitions with validation

The data model centers around key entities such as users, clients, gold items, loans, payments, and notifications. The schema is defined in a shared location to maintain consistency between backend operations and frontend validations.

## Key Components

### Frontend Components

1. **Pages**: Dashboard, Loan Origination, Loan Management, Loan Servicing, Gold Valuation, Contracts, Reports, and User Management
2. **UI Components**: A comprehensive set of UI components from shadcn/ui, customized to match the application's design language
3. **Layout**: Main application layout with navigation and user interface elements
4. **Forms**: Application forms for loan applications, client registration, and gold item valuation
5. **Data Display**: Tables, cards, and visualizations for displaying loan information, gold prices, and system metrics

### Backend Components

1. **API Routes**: RESTful endpoints for user management, client data, loan processing, payments, gold items, and system operations
2. **Storage Layer**: Abstraction for database operations with Drizzle ORM
3. **Validation**: Request validation using Zod schemas
4. **Error Handling**: Centralized error handling middleware
5. **Logging**: Custom logging for API requests and responses

### Shared Components

1. **Schema Definitions**: Database schema shared between frontend and backend
2. **Type Definitions**: TypeScript types for consistent data representation
3. **Validation Schemas**: Zod schemas for validating data on both client and server

## Data Flow

1. **User Authentication**:
   - Users log in via the frontend
   - Backend validates credentials and establishes a session
   - Session data is stored in the PostgreSQL database

2. **Loan Application Process**:
   - Client data is collected through frontend forms
   - Gold items are registered and valued
   - Application is submitted to the backend
   - Backend validates the data and stores it in the database
   - Loan officers review and approve/reject applications

3. **Loan Management**:
   - Active loans are displayed in the Loan Management interface
   - Payments are scheduled and tracked
   - Notifications are sent for upcoming payments
   - System tracks loan statuses and handles overdue situations

4. **Gold Valuation**:
   - Current gold prices are fetched and displayed
   - Calculation tools help determine gold item values
   - Historical gold price data is visualized

## External Dependencies

### Frontend Dependencies

- **@radix-ui/react-***: UI primitives for accessible components
- **@tanstack/react-query**: Data fetching and cache management
- **clsx** and **tailwind-merge**: Utility libraries for styling
- **date-fns**: Date manipulation library
- **cmdk**: Command menu primitive
- **lucide-react**: Icon library
- **react-hook-form**: Form state management
- **zod**: Schema validation

### Backend Dependencies

- **express**: Web framework for Node.js
- **drizzle-orm**: TypeScript ORM for database access
- **@neondatabase/serverless**: Client for Neon PostgreSQL
- **connect-pg-simple**: PostgreSQL session store
- **zod-validation-error**: Improved Zod error formatting

## Deployment Strategy

The application is configured for deployment on Replit with the following approach:

1. **Development Mode**:
   - Run with `npm run dev` which starts the Express server with Vite in development mode
   - Frontend assets are served through Vite's development server
   - Backend API is accessible through the same origin to avoid CORS issues

2. **Production Build**:
   - Frontend is built with Vite (`vite build`)
   - Backend is bundled with esbuild
   - Static assets are served from the `dist/public` directory

3. **Production Runtime**:
   - Server runs with `node dist/index.js`
   - Environment variables control database connections and other settings

4. **Database**:
   - The application uses Postgres 16 (as specified in .replit modules)
   - Database migrations are managed through Drizzle kit

The deployment is configured to target autoscaling infrastructure, ensuring the application can handle varying loads efficiently.

## Development Workflow

1. **Local Development**:
   - Run `npm run dev` to start the development server
   - Frontend changes are hot-reloaded
   - Backend changes trigger server restart

2. **Database Schema Changes**:
   - Modify schema in `shared/schema.ts`
   - Run `npm run db:push` to apply changes to the database

3. **Type Checking**:
   - Run `npm run check` to verify TypeScript types

4. **Production Build**:
   - Run `npm run build` to create a production-ready build
   - Run `npm run start` to start the production server