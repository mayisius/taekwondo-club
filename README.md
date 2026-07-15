# Taekwondo Club Web Platform

This project is a full-stack web application developed for a Taekwondo club. It represents an evolution from an initial static website into a more structured and functional system with a custom backend and interactive frontend.

---

## Preview

![Home](screenshots/home-admin-badge.png)

---

## Project Background

The first version of this website was built as a simple static page using HTML and CSS, focused on presenting basic information about the club.

This second version was developed to extend that initial concept into a complete application. The goal was to introduce backend functionality, structured data handling, and a more interactive user experience.

---

## Design Process

The interface was first fully designed in Figma before any implementation.

The design phase included:
- Layout structure
- Navigation flow
- Interactive elements (tatami navigation system)
- Visual hierarchy and transitions

The final implementation was built directly based on this design.

Figma prototype: (https://www.figma.com/proto/fq5wxFZx1ic4ZOZOkoeexy/Sin-t%C3%ADtulo?page-id=0%3A1&node-id=12-252&p=f&viewport=-479%2C18%2C0.39&t=NXWKtCGWDOSU75OB-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A3)

---

## Application Overview

The application consists of two main parts:

### Frontend
- Built with React
- Component-based structure
- Handles navigation, UI rendering, reviews integration, and user interaction

### Backend
- Built with Node.js and Express
- Provides a REST API for all data operations
- Handles authentication, message storage, admin workflows, logging, and email communication

---

## Key Features

### Interactive Navigation
- Central tatami element used as a navigation hub
- Users access different sections by clicking specific areas
- Structured UI flow from intro → home → detailed sections

### Contact System
- Users can submit messages through a form
- Messages are stored in a database

### Admin Panel
- Admin login using JWT authentication
- Current authentication flow based on a single expiring token
- Passwords stored as bcrypt hashes
- Protected message inbox with:
  - Status workflow (pending, answered, trash)
  - Pagination
  - Reply functionality
  - Message status updates
  - Pending message counter displayed in the admin icon

### Email Integration
- Admin responses are sent directly via SMTP
- Implemented using Nodemailer

### Reviews Integration
- Embedded Google Reviews widget for public user feedback
- Direct link for users to leave a review

### Logging
- Backend activity and error logging
- Logs stored in dedicated files for easier debugging and traceability

---

## Backend Architecture

The backend follows a modular structure:

- Routes: define API endpoints
- Controllers: handle request logic
- Services: manage business logic and database operations

This structure improves maintainability and scalability.

---

## Project Status

> **Current status: active development — functional local MVP, not yet deployed to production.**

The core full-stack application is currently functional in a local development environment. It includes a React frontend, a Node.js and Express REST API, SQLite persistence, JWT-based admin authentication, message management workflows, SMTP email integration, and backend logging.

The next stage of the project will focus on production deployment, authentication hardening, infrastructure design, and long-term maintainability. The improvements listed below are planned and have not yet been implemented.

---

## Development Roadmap

### Production Deployment

- [ ] Containerize the backend and supporting services.
- [ ] Use Docker Compose to define and orchestrate the application environment.
- [ ] Serve the frontend and expose the API through Nginx.
- [ ] Configure Nginx as a reverse proxy and TLS termination point.
- [ ] Enable HTTPS for all communication between clients and the public application.
- [ ] Separate development and production environment configuration.

### Authentication and Security

- [ ] Replace `bcryptjs` with Argon2 for password hashing.
- [ ] Replace the current single-JWT authentication flow with short-lived access tokens and rotating refresh tokens.
- [ ] Implement refresh-token revocation and secure logout handling.
- [ ] Evaluate multi-factor authentication for the administrator account.
- [ ] Add request validation, rate limiting, security headers, and stricter production CORS configuration.
- [ ] Improve secret and environment-variable management for production.

### Database and Data Protection

- [ ] Migrate persistence from SQLite to PostgreSQL.
- [ ] Introduce database migrations and production seed scripts.
- [ ] Implement automated database backups.
- [ ] Store backups in S3-compatible object storage, such as MinIO.

### Scalability and Performance

The following components will be introduced if application traffic and deployment requirements justify them:

- [ ] Add PgBouncer to manage PostgreSQL connection pooling when running multiple API instances.
- [ ] Introduce Redis caching for frequently requested or read-heavy data.
- [ ] Define cache invalidation and expiration strategies before enabling caching.
- [ ] Add health checks and prepare the API for horizontal scaling.

### Testing and Operations

- [ ] Add automated unit and integration tests.
- [ ] Add authentication and API endpoint tests.
- [ ] Configure a CI/CD workflow for testing and deployment.
- [ ] Improve monitoring, structured logging, and production error tracking.

---

## Current Tech Stack

Frontend:
- React
- HTML, CSS

Backend:
- Node.js
- Express

Database:
- SQLite

Authentication:
- JWT
- bcrypt

Other:
- Nodemailer (email integration)
- Custom file-based logging
- Git (version control)

---

### Planned Production Infrastructure

- Docker and Docker Compose
- Nginx
- PostgreSQL
- Argon2
- Access and refresh token authentication
- Optional administrator MFA
- PgBouncer, Redis, and MinIO if required by future scale

---

## Screenshots

### Navigation Hub
![Tatami](screenshots/tatami-navigation.png)

### Contact Section
![Contact](screenshots/contact-section.png)

### Reviews Section
![Reviews](screenshots/reviews-section.png)

### Admin Panel
![Admin](screenshots/admin.png)
