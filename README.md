# JustBlog

Welcome to JustBlog, a full-stack blog application!

This repository contains both the frontend (React) and backend (Node.js/Express) components of the application.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Make sure you have the following installed on your system:

* [Node.js](https://nodejs.org/en/) (which includes npm)

### Frontend Setup (React)

To run the React frontend:

1.  **Navigate into the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```
3.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The React application should now be running, typically accessible at `http://localhost:5173` (or another port if 5173 is in use).

### Backend Setup (Node.js/Express)

To run the Node.js/Express backend:

1.  **Ensure you are in the root `justBlog` folder.** If you are currently in the `frontend` directory, go back to the root:
    ```bash
    cd ..
    ```
2.  **Install backend dependencies:**
    ```bash
    npm install
    ```
    *Note: This `npm install` should be done in the root directory where your `backend/` folder and `package.json` for the backend are located.*
3.  **Start the backend server:**
    ```bash
    npm run dev
    ```
    Your backend server will now be running and listening for requests on **port `5000`**.

## Project Structure

* `frontend/`: Contains the React application for the user interface.
* `backend/`: Contains the Node.js/Express application for the API.

---

**Happy Blogging!**
