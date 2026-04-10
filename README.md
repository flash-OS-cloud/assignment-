# Task Manager

A full-stack task management application built to evaluate frontend and backend fundamentals. 

## Tech Stack

* **Frontend:** Next.js (App Router), React, Tailwind CSS, Jotai (Atomic State Management)
* **Backend:** Next.js Route Handlers (REST API)
* **Database:** SQLite via Prisma ORM
* **Language:** TypeScript

## Setup and Run Instructions

**Prerequisites:** Ensure you have Node.js and `pnpm` installed on your machine.

1.  **Clone the repository**
    ```bash
    git clone <your-repository-url>
    cd task-manager
    ```

2.  **Install dependencies**
    ```bash
    pnpm install
    ```

3.  **Database Setup**
    The project uses a local SQLite database for zero-configuration persistence. Push the Prisma schema to initialize the database:
    ```bash
    pnpm dlx prisma db push
    ```

4.  **Run the development server**
    ```bash
    pnpm dev
    ```

5.  **Access the application**
    Open your browser and navigate to `http://localhost:3000`

## Assumptions and Trade-offs

* **Unified Architecture vs. Microservices:** I opted to use Next.js for both the frontend React UI and the backend REST API via Route Handlers. This decision was made to keep the solution intentionally small and easily executable within the 1-2 hour time constraint, avoiding the overhead of configuring CORS and managing dual servers.
* **Database Choice:** SQLite was chosen alongside Prisma to fulfill the backend requirement for persistence. It provides the robustness of a relational database and ORM without requiring the reviewer to set up a separate database server (like PostgreSQL or MySQL) to evaluate the assignment.
* **State Management:** I implemented Jotai for global state management. While React Context or prop-drilling could suffice for a small app, Jotai provides a highly scalable atomic architecture that prevents unnecessary re-renders and cleanly decouples API logic from component markup.
* **Optimistic UI Updates:** The frontend implements optimistic state updates for toggling and deleting tasks. The UI updates instantly while the API request processes in the background, providing a significantly faster and more responsive user experience. If the API request fails, the state gracefully reverts.
