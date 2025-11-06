# EZ Labs Frontend Intern Test - Contact Form

This is a complete, single-page React application for a **Contact Us** form built for the EZ Labs Frontend Intern Test.

## 🚀 Live Features

| Feature | Status | Notes |
|---|---|---|
| Framework & Styling | ✅ | React + Tailwind CSS |
| API Integration (POST) | ✅ | Calls `https://vernanbackend.ezlab.in/api/contact-us/` |
| Client-Side Validation | ✅ | All fields required, Email format, 10-digit Phone |
| Responsiveness | ✅ | Mobile-first layout, adapts to 480p / 720p / 1080p / 1440×823 / 2732×2048 |
| UI/UX | ✅ | Rounded corners, hover effects, Figma-aligned |
| Loading State | ✅ | Spinner on submit |
| Toaster Notifications | ✅ | `react-hot-toast` for success/error |
| Form Reset | ✅ | After success, message input shows **Form Submitted** (per requirement) |
| Animations | ✅ | `framer-motion` |
| Dark Mode | 🌟 | Toggle included |
| Accessibility | ✅ | Labels, aria attributes, focus styling |

## 🛠 Tech Stack
- React (Vite)
- Tailwind CSS
- React Hook Form
- Axios
- Framer Motion
- React Hot Toast
- Lucide React Icons

## 📦 Setup

```bash
npm install
npm run dev
```
App will run on the Vite dev server (shown in terminal).

## 🌐 API
- **Endpoint:** `https://vernanbackend.ezlab.in/api/contact-us/`
- **Method:** `POST`
- **Body JSON:** `{ "name": "...", "email": "...", "phone": "...", "message": "..." }`
- **On success (200/201):** Shows “Form Submitted” in the message field and a success toast.
- **On error:** Shows an error toast and error text.

## 🧪 Postman
A Postman collection is included at `/postman_collection.json` to test the API manually.

## 👨‍💻 Credits
- Your Name: _replace in README if needed_
- Email / GitHub: _replace in README if needed_

## 🖼️ Screenshots
Add screenshots of both Desktop and Mobile views here for submission.
