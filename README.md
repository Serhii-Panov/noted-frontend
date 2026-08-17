# 📝 Noted

**Noted** is a modern full-stack web application designed for seamlessly creating, editing, and managing personal notes.

The project features a clean separation of concerns, built with a Next.js frontend and a FastAPI REST API backend utilizing session-based cookie authentication and request proxying.

---

## 🚀 Tech Stack

### Frontend
* **Framework:** [Next.js](https://nextjs.org/) (App Router, TypeScript)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **API & Data Fetching:** Axios, Next.js Route Handlers & Rewrites
* **Testing:** Jest
* **Deployment:** [Vercel](https://vercel.com/)

### Backend
* **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python, Pydantic)
* **Authentication:** HTTP-only Cookie / Sessions
* **Deployment:** [Render](https://render.com/)
* **Repository:** [GitHub](https://github.com/Serhii-Panov/noted-backend)
---

## 🛠️ Key Features & Architecture

* **Secure Session Auth:** Full registration, sign-in, and sign-out workflows using `HTTP-only`, `Secure`, and `SameSite` cookies.
* **BFF (Backend-For-Frontend) Pattern:** Next.js Route Handlers proxy requests to the FastAPI backend, handling CORS seamlessly and keeping sensitive session credentials secure.
* **Unified API Client:** Standardized Axios configuration enforcing global `/api` endpoint prefixes across server and client layers.
* **Responsive UI:** Clean, polished user interface built with Tailwind CSS.

---

## 📋 Local Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/PanovSerhii/noted-frontend.git
cd noted-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the project root (refer to `.env.example`):

```env
API_URL=https://noted-backend-h249.onrender.com
NEXT_PUBLIC_API_URL=https://noted-backend-h249.onrender.com
```

### 4. Run Development Server
```bash
npm run dev
```
Open http://localhost:3000 in your browser to view the application.

---

## 🧪 Testing

* **Run Unit Tests:**
  ```bash
  npm test
  ```
