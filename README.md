# 🌕 Generated Moon — AI Agency Website

Boutique AI engineering studio website for **Claire Lindstrom / Generated Moon**.
Full-stack: React + Vite frontend, Express backend, Claude AI chatbot, Stripe payments, Resend email.

---

## Quick Start

### 1. Install dependencies

```bash
# Server
cd server && npm install

# Client
cd ../client && npm install
```

### 2. Configure environment

```bash
cp .env.example server/.env
# Then edit server/.env with your API keys
```

**Minimum required to run locally (without payments or email):**
```
HF_API_KEY=hf_...
PORT=3001
CLIENT_URL=http://localhost:5173
```

### 3. Start development servers

In two separate terminals:

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

Open: **http://localhost:5173**

---

## Environment Variables

Copy `.env.example` to `server/.env` and fill in values:

| Variable              | Required | Description |
|-----------------------|----------|-------------|
| `HF_API_KEY`          | ✅ Yes   | From [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) (free) |
| `HF_MODEL`            | Optional | Default: `mistralai/Mistral-7B-Instruct-v0.3` |
| `STRIPE_SECRET_KEY`   | Optional | Enables deposit payments |
| `STRIPE_PUBLISHABLE_KEY` | Optional | Frontend Stripe key |
| `STRIPE_WEBHOOK_SECRET` | Optional | For webhook verification |
| `RESEND_API_KEY`      | Optional | Email notifications via [resend.com](https://resend.com) |
| `EMAIL_TO`            | Optional | Default: `moonravendigital@gmail.com` |
| `EMAIL_FROM`          | Optional | Default: `noreply@generatedmoon.com` |
| `CALENDLY_LINK`       | Optional | Discovery call booking URL |
| `PORT`                | Optional | Server port (default: 3001) |
| `CLIENT_URL`          | Optional | Frontend URL for CORS & Stripe redirects |

> **Note:** Without `RESEND_API_KEY`, email notifications are logged to console.
> Without `STRIPE_SECRET_KEY`, deposit flow shows a friendly error with your email.

---

## Project Structure

```
generated-moon/
├── client/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # Fixed nav with mobile menu
│   │   │   ├── Hero.jsx       # Canvas animation + moon SVG
│   │   │   ├── Services.jsx   # 5 service track cards
│   │   │   ├── Portfolio.jsx  # 4 case study cards
│   │   │   ├── About.jsx      # Claire bio + contact CTA
│   │   │   ├── Footer.jsx     # Links + copyright
│   │   │   ├── ChatBot.jsx    # AI chat panel + pre-chat form
│   │   │   └── ProjectBrief.jsx # AI-generated brief card
│   │   ├── hooks/
│   │   │   └── useChat.js     # Chat state + API integration
│   │   ├── utils/
│   │   │   └── api.js         # Fetch wrappers for all endpoints
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css          # Design system + animations
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                    # Express backend
│   ├── routes/
│   │   ├── chat.js            # Claude API proxy + session management
│   │   ├── payment.js         # Stripe checkout session creation
│   │   ├── notify.js          # Resend email notifications
│   │   └── leads.js           # GET /api/leads admin view
│   ├── store.js               # In-memory sessions + leads store
│   ├── index.js               # Express app entry point
│   └── package.json
│
├── shared/
│   └── services.js            # Service catalog + portfolio data
│
├── .env.example               # Environment variable template
└── README.md
```

---

## API Endpoints

### Chat
| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/chat/session` | Create new chat session |
| `POST` | `/api/chat/message` | Send message, get Claude response |
| `GET`  | `/api/chat/session/:id` | Retrieve session data |

### Payment
| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/payment/create-checkout` | Create Stripe checkout session |
| `POST` | `/api/payment/webhook` | Stripe webhook (raw body) |

### Notifications
| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/notify/lead` | Email notification when brief generated |
| `POST` | `/api/notify/direct` | "Talk to Claire" email |
| `POST` | `/api/notify/deposit` | Deposit confirmation email |

### Leads (Admin)
| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/api/leads` | All captured leads as JSON |
| `GET`  | `/api/leads/:id` | Single lead detail |

---

## AI Chatbot Flow

1. Visitor clicks **"Start Free AI Assessment"**
2. Pre-chat form collects: name, email, business/industry
3. Session created → Claude greets visitor by name
4. Claude asks questions one at a time (5–8 exchanges):
   - Business type & team size
   - Biggest pain point / time-consuming task
   - Budget comfort range
   - Timeline
   - Technical comfort level
5. Claude generates a **Project Brief** in JSON format
6. Brief is displayed as a structured card with:
   - Recommended service
   - Price range
   - Timeline
   - Key features
   - Complexity score
7. Two CTAs: **Reserve My Project Slot** (Stripe) + **Talk to Claire Directly** (email)
8. Owner receives email notification at `moonravendigital@gmail.com`

---

## Stripe Setup (for deposit payments)

1. Create account at [stripe.com](https://stripe.com)
2. Get your test keys from Dashboard → Developers → API Keys
3. Add to `server/.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
4. For webhooks (optional, for deposit confirmations):
   ```bash
   # Install Stripe CLI
   stripe listen --forward-to localhost:3001/api/payment/webhook
   # Copy the webhook secret to STRIPE_WEBHOOK_SECRET
   ```

---

## Email Setup (Resend)

1. Create account at [resend.com](https://resend.com)
2. Add and verify your domain (`generatedmoon.com`)
3. Create an API key
4. Add to `server/.env`:
   ```
   RESEND_API_KEY=re_...
   EMAIL_FROM=noreply@generatedmoon.com
   ```

> **Without Resend configured**, all emails are logged to server console — useful for testing.

---

## Deploy to Railway

### Server

```bash
# From /server directory
railway login
railway init
railway add
railway up
```

Set environment variables in Railway dashboard (Settings → Variables).

### Client

Build and deploy to Vercel, Netlify, or Railway:

```bash
cd client
npm run build
# dist/ folder is your deployable frontend
```

Update `CLIENT_URL` in server env to your production frontend URL.

---

## Admin: Viewing Leads

Hit `GET /api/leads` to see all captured leads:

```bash
curl http://localhost:3001/api/leads
```

Returns JSON array of lead objects with:
- Client name + email + business
- Full chat transcript
- AI-generated project brief
- Deposit status
- Timestamps

> In production, protect this endpoint with an API key header or authentication middleware.

---

## Customization

### Update the AI model
In `server/.env`:
```
HF_MODEL=HuggingFaceH4/zephyr-7b-beta
```
Other good free options: `microsoft/Phi-3-mini-4k-instruct`, `google/gemma-7b-it`

> **Cold starts:** Free HuggingFace models may take 20–30 seconds on the first request while the model loads. Subsequent requests are fast. The chat UI already handles this with a friendly retry message.


### Update Calendly link
In `server/.env`:
```
CALENDLY_LINK=https://calendly.com/your-actual-link
```

### Add Claire's real photo
Replace the avatar SVG placeholder in `client/src/components/About.jsx`:
```jsx
// Find ClairAvatar() and replace the inner SVG with:
<img src="/claire.jpg" alt="Claire Lindstrom" className="w-48 h-48 rounded-full object-cover" />
```
Place `claire.jpg` in `client/public/`.

### Customize system prompt
Edit the `SYSTEM_PROMPT` constant in `server/routes/chat.js`.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS 3 + Custom CSS |
| Icons | Lucide React |
| Fonts | Cormorant Garamond, IBM Plex Mono, Inter |
| Backend | Node.js + Express |
| AI | HuggingFace Inference API (Mistral-7B-Instruct, free tier) |
| Payments | Stripe Checkout |
| Email | Resend |
| Animation | Canvas API (particles), CSS keyframes |

---

## Contact

**Claire Lindstrom** · Generated Moon
moonravendigital@gmail.com
