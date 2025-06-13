# 🌺 Afra7na - Wedding Planning Platform

![Platform Showcase](https://via.placeholder.com/1200x600?text=Afra7na+Platform+Showcase)

A comprehensive wedding planning ecosystem connecting couples with premium vendors across the Middle East. Afra7na simplifies wedding planning while empowering vendors with powerful business tools.

## Features

-   comming soon Multi-language support (Arabic, Hebrew, English)
-   Vendor service listings with media galleries (images/videos)
-   Advanced vendor dashboard with analytics
-   User and vendor registration and authentication (JWT)
-   Booking system with calendar integration
-   Admin panel for managing users, vendors
-   PDF receipt generation and download
-   Fully responsive UI built with React, MUI, Bootstrap, and CSS

## Vendor Analytics Dashboard

Vendors can access a comprehensive analytics dashboard that includes:

-   **Key Performance Indicators (KPIs)** such as:

    -   Number of visitors
    -   Average session duration
    -   Bounce rate

-   **Weekly Page Visits Line Chart** using `Recharts`

-   **Visit Sources Pie Chart** (e.g., Google, Facebook, Instagram)

-   **Download Monthly Report** button (PDF format)

The dashboard empowers vendors with data-driven insights to improve their presence and performance on the Afra7na platform.

## Tech Stack

**Client**:

-   React, TypeScript, Vite
-   MUI (Material UI)
-   Tailwind CSS
-   i18next for internationalization

**Server**:

-   Node.js, Express.js
-   MongoDB, Mongoose
-   JWT authentication

**Others**:

-   Formik & Yup (forms & validation)
-   Recharts (data visualization)
-   JsPDF (PDF generation)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/afra7na.git
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` files in both `/client` and `/server` with appropriate environment variables.

4. Run development servers:

```bash
npm run dev
```

## Roadmap

-   Add Stripe/PayPal payment gateway - comming soon
-   Improve SEO with structured data (JSON-LD)
-   Generate dynamic reports (PDF)
-   Add calendar sync with Google Calendar for bookings - comming soon
-   Push notifications for mobile - comming soon

## Contact

For inquiries or suggestions, please contact us at: support@afra7na.com
