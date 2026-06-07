# HAQMS: Hospital Appointment & Queue Management System

## Overview

**HAQMS (Hospital Appointment & Queue Management System)** is a full-stack healthcare management platform designed to streamline patient appointments, queue management, physician scheduling, and medical record access.

The system provides dedicated workflows for Administrators, Receptionists, Doctors, and Patients while ensuring security, scalability, and performance across the platform.

This project was originally created as an engineering evaluation platform containing intentionally introduced bugs, vulnerabilities, performance bottlenecks, and incomplete features. All identified issues have now been thoroughly audited, resolved, and optimized.

---

## Features

### Patient Management

* Patient registration and profile management
* Medical history tracking
* Appointment booking and scheduling
* Queue token generation and management
* Clinical record viewing

### Doctor Management

* Physician scheduling
* Daily patient worklists
* Patient medical history access
* Queue monitoring dashboard

### Receptionist Operations

* Appointment booking
* Walk-in patient registration
* Queue check-in management
* Real-time token assignment

### Administration

* User management
* System-wide reporting
* Audit log monitoring
* Physician registry management
* Operational analytics

---

## Tech Stack

### Frontend

* Next.js (App Router)
* React
* Tailwind CSS
* Context API
* Lucide Icons

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* PostgreSQL
* Prisma ORM

### DevOps & Tooling

* Docker Compose
* Concurrently
* ESLint
* Prisma Migrations

---

## Setup Instructions

### 1. Install Dependencies

```bash
chmod +x setup.sh
./setup.sh
```

Or manually:

```bash
npm install
npm install --prefix frontend
npm install --prefix backend
```

---

### 2. Configure Database

Start PostgreSQL using Docker:

```bash
docker-compose up -d
```

Or configure your own PostgreSQL instance and update:

```env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/haqms?schema=public"
```

---

### 3. Setup Database Schema

Run migrations and seed sample data:

```bash
npm run db:setup --prefix backend
```

---

### 4. Start Development Environment

```bash
npm run dev
```

Services:

| Service     | Port |
| ----------- | ---- |
| Frontend    | 3000 |
| Backend API | 5000 |
| PostgreSQL  | 5432 |

---

## Demo Accounts

Default password for all accounts:

```text
password123
```

| Role          | Email                                               |
| ------------- | --------------------------------------------------- |
| Administrator | [admin@haqms.com](mailto:admin@haqms.com)           |
| Receptionist  | [reception1@haqms.com](mailto:reception1@haqms.com) |
| Doctor        | [doctor1@haqms.com](mailto:doctor1@haqms.com)       |

---

## Improvements & Fixes Completed

### Security Enhancements

#### Authentication & Authorization

* Removed credential logging from authentication flow.
* Strengthened JWT signing and verification strategy.
* Moved secrets to environment configuration.
* Added proper token validation middleware.
* Implemented role-based access control (RBAC).
* Fixed authorization bypass vulnerabilities in admin-only endpoints.

#### Database Security

* Eliminated SQL injection vulnerabilities.
* Replaced unsafe raw queries with parameterized Prisma queries.
* Added server-side input validation and sanitization.
* Improved error handling to prevent sensitive information leakage.

---

### Backend Performance Improvements

#### Database Optimization

* Resolved N+1 query issues using Prisma relation loading.
* Converted sequential database operations to parallel execution using `Promise.all()`.
* Optimized reporting and aggregation endpoints.
* Reduced API response times across high-traffic routes.

#### Concurrency Fixes

* Fixed queue token race condition.
* Added transactional token generation.
* Prevented duplicate token assignments during concurrent check-ins.
* Improved consistency of appointment and queue operations.

---

### Database & Schema Enhancements

#### Data Integrity

* Added unique constraints preventing physician double-booking.
* Improved relational integrity across entities.
* Added validation rules for critical healthcare records.

#### Indexing

* Added indexes on:

  * Foreign key columns
  * Appointment status fields
  * Queue status fields
  * Frequently queried reporting fields

#### Pagination

* Replaced in-memory pagination with database-level pagination.
* Reduced memory consumption and query latency.

---

### Frontend Optimizations

#### React Performance

* Eliminated memory leaks in the Live Queue Board.
* Properly cleaned up intervals, timers, and subscriptions.
* Added memoization where appropriate.
* Reduced unnecessary component re-renders.

#### Stability Improvements

* Fixed null medical history rendering crash.
* Added defensive rendering and fallback UI.
* Improved error boundaries and loading states.

#### User Experience

* Faster search experience.
* Improved responsiveness.
* Better loading indicators.
* Enhanced form validation and feedback.

---

### Feature Completion

#### Diagnostic Reports Module

Implemented the previously missing page:

```text
src/app/patients/[id]/history-records/page.js
```

Features:

* Clinical record retrieval
* Medical history visualization
* Diagnostic report display
* Error handling
* Loading states
* Responsive UI

---

## Architecture Highlights

### Secure Authentication Flow

* JWT-based authentication
* Protected API routes
* Role-based permissions
* Session validation

### Scalable Database Design

* Indexed relational schema
* Transaction-safe operations
* Optimized query patterns

### Modern Frontend Architecture

* Next.js App Router
* Reusable UI components
* Context-based state management
* Responsive design

---

## Project Status

### Current Status: Production Ready

All originally identified:

* Security vulnerabilities
* Performance bottlenecks
* Concurrency issues
* Database inefficiencies
* Frontend crashes
* Memory leaks
* Missing features

have been successfully resolved.

The application is now stable, secure, optimized, and fully functional.

---

## Future Enhancements

Potential roadmap items:

* Email appointment reminders
* SMS notifications
* Telemedicine integration
* Advanced analytics dashboard
* Multi-hospital support
* Role-based audit exports
* Real-time WebSocket queue updates
* Automated appointment scheduling

---

## License

This project is intended for educational, internship evaluation, and healthcare management learning purposes.
