Your primary responsibility is the complete React Web application. You own the Web frontend from start to deployment. You are strictly required to follow the design.md design system—no custom hex codes, no arbitrary padding, and no basic “default” browser styles.

Specific Tasks & Technical Implementation:

Project Setup:

Initialize with npm create vite@latest web -- --template react.

Install Tailwind CSS and configure it to use the exact CSS variables defined in design.md (e.g., --color-bg, --color-surface, --color-primary).

Install zustand for global state management and axios for API calls.

Privacy & Ethics Modal (Forced Flow):

Build a full-screen overlay modal using Headless UI or Radix UI.

It must block access to the upload page until the user checks the agreement box (referencing Section 3 of the problem statement).

Styling: Glassmorphism background (backdrop-blur-sm), central card using --color-surface and --color-border.

Upload Page (/upload):

Implement react-dropzone to create a drag-and-drop zone.

State: Empty → Hover (Border turns --color-primary) → Uploading (Show progress bar with gradient fill) → Success (Green checkmark).

Layout: Split-screen (Hero text on the left using Inter font, Dropzone on the right).

On successful upload (POST /api/upload), extract session_id and total_pairs, store them in Zustand, and redirect to /chat.

Chat Page (/chat):

Top Nav: Display "Conversing as [User Name]" | Badge showing "X memories loaded" | Trash icon (Trash2) to clear session (DELETE /api/session).

Message Flow: Implement an auto-scrolling container. User messages on the right (Primary Gradient background, border-radius: 20px 4px 20px 20px). Clone replies on the left (--color-surface-elevated background, border: 1px solid --color-border, border-radius: 4px 20px 20px 20px).

AI Thinking State: When waiting for the /api/chat response, show a skeleton bubble with the Shimmer Dots animation (as defined in design.md).

Input: Fixed bottom pill (border-radius: 9999px). The "Send" button must be a nested icon inside the right edge of the pill, colored with the Primary Gradient.

Design System Enforcement (The "Vercel/Linear" Look):

Typography: Strictly use the type scale (H1, H2, Body, Small). Do not use generic font-bold everywhere; map them correctly.

Spacing: Stick to the 8px grid (e.g., p-6, gap-4).

Micro-interactions: Add hover:scale-[1.02] on buttons, hover:-translate-y-1 on cards, and a smooth transition-all duration-200.

Scrollbar: Implement the custom dark scrollbar (::-webkit-scrollbar) defined in the design spec.

Background: Implement the subtle "AI Glow" (gradient orb) behind the chat container.

Deployment:

Deploy the final build to Vercel in Sprint 4.

Ensure VITE_API_BASE_URL is correctly set in production.

Timeline Recap:

Week 1: Vite Setup + Upload Page + Tailwind Configuration.

Week 2: Chat Page + Zustand integration with /api/chat.

Week 3: Privacy Modal, Responsive Breakpoints (<768px stack layout), and full UI polish.

Week 4: Deploy to Vercel, cross-browser testing (Chrome/Safari/Firefox), and Lighthouse Performance > 90.