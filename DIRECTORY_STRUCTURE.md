# EventSphere - Directory Structure Guide

## 📁 Project Overview
Multi-event management platform supporting hackathons, conferences, corporate events, weddings, and more.

---

## 🗂️ Frontend Structure

### `/frontend/app/`
Main application routes and pages

#### `/dashboard/` - Organizer Dashboard
- **`layout.tsx`** - Dashboard layout with sidebar and navbar
- **`page.tsx`** - Dashboard home/overview
- **`/events/`** - Event management
  - **`page.tsx`** - List all organizer's events
  - **`[id]/page.tsx`** - Single event details page
  - **`/create/`** - Event creation flow
    - **`details/page.tsx`** - Step 1: Basic event details
    - **`corporate/page.tsx`** - Step 1.5: Corporate event details (optional)
    - **`inventory/page.tsx`** - Step 2: Inventory setup (capacity, tickets, accommodation)
    - **`payments/page.tsx`** - Step 3: Payment settings
    - **`publish/page.tsx`** - Step 4: Publish event
- **`/accommodation/`**
  - **`page.tsx`** - Accommodation dashboard (all events)

#### `/event/[slug]/` - Public Event Pages
- **`page.tsx`** - Event microsite (public view)
- **`/manage/`** - Event management (password protected)
  - **`page.tsx`** - Redirect to login or dashboard
  - **`/manage-login/page.tsx`** - Management password login
  - **`/manage/dashboard/page.tsx`** - Management dashboard
  - **`/manage/accommodation/page.tsx`** - Event-specific accommodation management

#### `/login/` & `/signup/`
- Authentication pages for organizers

---

### `/frontend/components/`
Reusable React components

#### `/ui/` - Shadcn UI Components
- `button.tsx`, `card.tsx`, `input.tsx`, etc.
- Pre-built, styled components

#### `/microsites/`
- **`HackathonMicrosite.tsx`** - Hackathon event microsite template
- **`ConferenceMicrosite.tsx`** - Conference event microsite (if exists)
- **`WeddingMicrosite.tsx`** - Wedding event microsite (if exists)

#### `/management/`
- **`HackathonManagement.tsx`** - Hackathon management dashboard component

#### `/inventory/`
- **`WeddingInventory.tsx`** - Wedding-specific inventory form

#### Root Components
- **`navbar.tsx`** - Top navigation bar
- **`dashboard-sidebar.tsx`** - Sidebar navigation for dashboard
- **`step-progress.tsx`** - Multi-step form progress indicator
- **`protected-route.tsx`** - Route protection wrapper

---

### `/frontend/lib/`
Utility functions and configurations

- **`api.ts`** - API client for backend communication
- **`auth-context.tsx`** - Authentication context provider
- **`event-creation-context.tsx`** - Event creation state management
- **`utils.ts`** - Helper functions

---

## 🗂️ Backend Structure

### `/backend/`

#### `/models/`
MongoDB schemas
- **`Event.js`** - Main event model (supports all event types)
- **`User.js`** - User/organizer model
- **`Registration.js`** - Registration model
- **`RoomAssignment.js`** - Accommodation assignment model
- **`Notification.js`** - Notification model

#### `/routes/`
API endpoints
- **`events.js`** - Event CRUD operations, registrations, accommodation
- **`auth.js`** - Authentication routes

#### `/middleware/`
- **`auth.js`** - JWT authentication middleware

#### `/utils/`
- **`emailService.js`** - Nodemailer email sending service

#### Root Files
- **`server.js`** - Express server entry point
- **`.env`** - Environment variables (MongoDB, email credentials)

---

## 🎯 Key Features by Route

### Organizer Dashboard (`/dashboard`)
- View all events
- Create new events (multi-step form)
- Manage accommodation across events
- View registrations and stats

### Event Microsite (`/event/[slug]`)
- Public-facing event page
- Registration form
- Event details, schedule, sponsors, prizes
- Dynamic based on event type (hackathon/conference/wedding)

### Event Management (`/event/[slug]/manage`)
- Password-protected management panel
- View registrations
- Manage accommodation
- Export data
- Send notifications

---

## 📊 Data Flow

1. **Event Creation**
   ```
   /dashboard/events/create/details → inventory → payments → publish
   ↓
   Saves to MongoDB (Event collection)
   ↓
   Generates slug and management password
   ```

2. **Participant Registration**
   ```
   /event/[slug] (microsite)
   ↓
   POST /api/events/:slug/register
   ↓
   Saves to Event.participants array
   ↓
   Sends confirmation email
   ```

3. **Event Management**
   ```
   /event/[slug]/manage → Login with password
   ↓
   /event/[slug]/manage/dashboard
   ↓
   Loads event data from MongoDB
   ```

---

## 🔑 Important Files

### Configuration
- `frontend/.env.local` - Frontend environment variables
- `backend/.env` - Backend environment variables (MongoDB, email)

### Entry Points
- `frontend/app/layout.tsx` - Root layout
- `backend/server.js` - Backend server

### API Client
- `frontend/lib/api.ts` - All API calls to backend

---

## 🚀 Quick Navigation

**Want to modify:**
- Event creation flow? → `/frontend/app/dashboard/events/create/`
- Microsite design? → `/frontend/components/microsites/`
- Management dashboard? → `/frontend/components/management/`
- API endpoints? → `/backend/routes/events.js`
- Database schema? → `/backend/models/Event.js`
- Email templates? → `/backend/utils/emailService.js`

---

## 📝 Notes

- All event types (hackathon, conference, corporate, wedding) use the same Event model
- Accommodation data stored in `Event.accommodation` or `Event.inventory`
- Management password stored in `Event.managementPassword` or `Event.adminPassword`
- Participants stored in `Event.participants` array
- Each event has unique `slug` for public URL
