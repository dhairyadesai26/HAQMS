# HAQMS: Hospital Appointment & Queue Management System

## Overview

**HAQMS (Hospital Appointment & Queue Management System)** is a modern full-stack healthcare management platform designed to streamline patient appointments, physician scheduling, queue management, and medical record access.

The application provides dedicated workflows for Administrators, Receptionists, Doctors, and Patients while maintaining high standards of security, performance, scalability, and reliability.

Originally developed as an engineering evaluation project containing intentionally introduced bugs, vulnerabilities, performance bottlenecks, race conditions, memory leaks, and incomplete features, the platform has since undergone a complete audit and refactoring process. All critical issues have been identified, resolved, and optimized.

---

## Live Features

### 👨‍⚕️ Patient Management

* Patient registration and profile management
* Appointment booking and scheduling
* Medical history tracking
* Queue token generation
* Diagnostic report viewing
* Clinical record management

### 🩺 Doctor Portal

* Daily patient worklist
* Appointment overview
* Medical history access
* Queue monitoring
* Patient consultation management

### 🏥 Receptionist Dashboard

* Walk-in patient registration
* Appointment booking
* Queue check-in management
* Real-time token assignment

### 🛡️ Administration Panel

* User management
* Physician registry management
* Audit log monitoring
* Operational reporting
* Analytics dashboard

---

# Tech Stack

## Frontend

* Next.js 15 (App Router)
* React
* Tailwind CSS
* Context API
* Lucide React Icons

## Backend

* Node.js
* Express.js
* JWT Authentication
* REST APIs

## Database & ORM

* Supabase PostgreSQL
* Prisma ORM

## DevOps & Tooling

* Docker Compose
* Prisma Migrations
* ESLint
* Concurrently

---

# Key Improvements Completed

The original version intentionally contained multiple issues for engineering evaluation purposes. The application has now been fully audited and enhanced.

## 🔒 Security Enhancements

### Authentication & Authorization

✅ Removed credential logging from authentication flows

✅ Improved JWT signing and verification implementation

✅ Moved secrets and sensitive configuration to environment variables

✅ Added proper token validation middleware

✅ Implemented robust Role-Based Access Control (RBAC)

✅ Fixed authorization bypass vulnerabilities in administrative endpoints

### Database Security

✅ Eliminated SQL Injection vulnerabilities

✅ Replaced unsafe raw SQL with parameterized Prisma queries

✅ Added request validation and sanitization

✅ Improved error handling to prevent information disclosure

✅ Secured API responses against sensitive data leaks

---

## ⚡ Backend Performance Optimizations

### Query Optimization

✅ Fixed N+1 query issues using Prisma relation loading

✅ Optimized nested reporting endpoints

✅ Reduced unnecessary database round trips

✅ Implemented efficient data fetching strategies

### Async & Concurrency Improvements

✅ Converted sequential async operations into parallel execution using Promise.all()

✅ Reduced API response latency

✅ Improved throughput under concurrent load

### Queue Management

✅ Fixed race conditions during patient check-in

✅ Added transactional token generation

✅ Prevented duplicate token assignment

✅ Improved consistency during high-traffic scenarios

---

## 💾 Database Improvements

### Data Integrity

✅ Added unique constraints preventing physician double-booking

✅ Strengthened relational integrity

✅ Improved schema validation

### Indexing

Added optimized indexes on:

* Appointment status
* Queue status
* Doctor references
* Patient references
* Frequently queried reporting fields

### Pagination

✅ Replaced in-memory pagination

✅ Implemented SQL-level pagination

✅ Reduced memory consumption

✅ Improved response times on large datasets

---

## 🖥️ Frontend Optimizations

### Memory Leak Fixes

✅ Resolved memory leak in Live Queue Board

✅ Proper cleanup of timers and intervals

✅ Fixed component unmount handling

### React Performance

✅ Reduced unnecessary re-renders

✅ Optimized state management

✅ Added memoization where required

✅ Improved rendering efficiency

### Stability Improvements

✅ Fixed null medical history crash

✅ Added defensive rendering

✅ Improved loading states

✅ Added graceful error handling

---

## 🏗️ Feature Completion

### Diagnostic Reports Module

Previously missing route:

```text
src/app/patients/[id]/history-records/page.js
```

Successfully implemented with:

* Patient clinical record retrieval
* Medical history display
* Diagnostic report rendering
* Loading states
* Error handling
* Responsive UI

---

# Project Structure

```bash
HAQMS/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── services/
│   └── public/
│
├── backend/
│   ├── prisma/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── controllers/
│   └── utils/
│
├── docker-compose.yml
├── package.json
└── README.md
```

---

# Getting Started

## 1. Clone Repository

```bash
git clone <repository-url>
cd haqms
```

---

## 2. Install Dependencies

Run the setup script:

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

## 3. Configure Supabase Database

Create a project on Supabase.

Add the following variables to:

```bash
backend/.env
```

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?schema=public"

DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

JWT_SECRET="your-secret-key"

PORT=5000
```

---

## 4. Database Setup

Apply migrations and seed data:

```bash
npm run db:setup --prefix backend
```

This command:

* Creates database tables
* Applies schema migrations
* Configures constraints and indexes
* Seeds test users and sample records

---

## 5. Run Development Environment

```bash
npm run dev
```

Services:

| Service             | Port         |
| ------------------- | ------------ |
| Frontend            | 3000         |
| Backend API         | 5000         |
| Supabase PostgreSQL | Cloud Hosted |

---

# Demo Accounts

Default Password:

```text
password123
```

| Role          | Email                                               |
| ------------- | --------------------------------------------------- |
| Administrator | [admin@haqms.com](mailto:admin@haqms.com)           |
| Receptionist  | [reception1@haqms.com](mailto:reception1@haqms.com) |
| Doctor        | [doctor1@haqms.com](mailto:doctor1@haqms.com)       |

---

# Security Architecture

### Authentication

* JWT-based authentication
* Secure password hashing
* Protected routes
* Role-based permissions

### Authorization

* RBAC implementation
* Endpoint-level access control
* Middleware validation

### Data Protection

* Parameterized database queries
* Input sanitization
* Environment-based secrets
* Protected sensitive fields

---

# Performance Highlights

### Backend

* Optimized database queries
* Reduced API latency
* Parallel async processing
* Transaction-safe operations

### Frontend

* Memory leak free
* Optimized React rendering
* Improved state updates
* Better user experience

### Database

* Indexed queries
* Efficient pagination
* Improved aggregation performance
* Constraint-based consistency

---

# Deployment

Recommended Production Stack

| Component  | Provider            |
| ---------- | ------------------- |
| Frontend   | Vercel              |
| Backend    | Render / Railway    |
| Database   | Supabase PostgreSQL |
| Storage    | Supabase Storage    |
| Monitoring | Sentry              |
| CI/CD      | GitHub Actions      |

---

# Future Roadmap

### Planned Enhancements

* Email appointment reminders
* SMS notifications
* Real-time WebSocket queue updates
* Telemedicine support
* Multi-hospital support
* Advanced analytics dashboard
* Exportable medical reports
* Doctor availability prediction
* AI-assisted appointment scheduling

---

# Project Status

## ✅ Production Ready

The application has undergone a complete engineering audit and refactoring cycle.

All previously identified:

* Security vulnerabilities
* SQL injection risks
* Authorization flaws
* Performance bottlenecks
* Database inefficiencies
* Race conditions
* Memory leaks
* Frontend crashes
* Missing features

have been successfully resolved.

HAQMS is now a secure, scalable, reliable, and production-ready healthcare management platform.

---

# License

This project is intended for educational purposes, internship evaluations, portfolio demonstrations, and healthcare software architecture learning.
