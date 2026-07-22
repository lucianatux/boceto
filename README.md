# Vedanta en Español

A content platform for a Spanish-language Vedanta philosophy project, built as a React SPA with a Firebase backend. Visitors browse curated videos, shorts, books and Q&A; the site owner logs in to manage all content directly from the UI — no CMS, no redeploys.

**Live demo:** [https://vedantaenespanol.com/] · **Stack:** React · React Router · Firebase (Firestore + Auth) · Bootstrap 5
<img width="384" height="256" alt="pa3" src="https://github.com/user-attachments/assets/d4d1dbee-b405-471d-844a-82b41df4b81e" />

---

## Highlights

- **Inline CMS with role-gated editing.** Authenticated users get a floating action button, per-card edit/delete controls and a modal form. Anonymous visitors see a clean read-only site — the same components, driven by auth state.
- **Real-time data.** Firestore `onSnapshot` subscriptions keep the UI in sync instantly across sessions; no manual refresh after create, edit or delete.
- **Global search** across titles and descriptions via a shared Context, bypassing category filters when active.
- **Responsive by design.** A `useIsMobile` hook drives layout branching (desktop shows a video preview panel; mobile scrolls to the selected section), backed by CSS breakpoints.
- **Considered UX details.** Custom confirmation modal instead of `window.confirm`, toast notifications for every write, loading spinners on async actions, truncation with read-more, lazy-loaded images, ARIA labels and visible focus states.

## Tech Stack

| Layer | Choice |
|---|---|
| UI | React 18 (function components + Hooks) |
| Routing | React Router (`HashRouter`, static-host friendly) |
| State | Context API (`AuthContext`, `SearchContext`) |
| Backend | Firebase Firestore + Firebase Auth |
| Styling | Bootstrap 5, React-Bootstrap, custom CSS |

## Architecture

```
src/
├── components/
│   ├── Auth/      # AuthContext, Login, protected-route wrapper
│   ├── Cards/     # CategoryPage (container), CardList, CardForm
│   ├── Layout/    # Header, Menu, Home, Footer
│   └── UI/        # Toast, ConfirmModal
├── hooks/         # useIsMobile
└── Firebase.js    # SDK initialisation
```

`CategoryPage` is the single container: it owns write operations, modal and toast state, and renders `CardList` per subcategory. Card documents carry `category`, `subcategory` and `order` fields, so one generic component renders every section — new content types need data, not code.

## Getting Started

```bash
git clone https://github.com/<user>/<repo>.git
cd <repo>
npm install
npm start
```

Create a `.env` file with your Firebase credentials:

```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
```

Then `npm run build` for a production bundle.

## Roadmap

- Migrate card ordering to drag-and-drop
- Image uploads via Firebase Storage (currently external URLs)
- Unit tests for filtering and search logic

---

Built and maintained by Luciana Caminos Cano — https://github.com/lucianatux · https://lucianatux.github.io/portfolio_LCC/
