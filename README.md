🛒 বাজার দর (BazarDor)

Live Preview: https://bazar-dor-ten-omega.vercel.app/

📝 Short Description

BazarDor is a dynamic and fully responsive web application designed to track the daily market prices of essential commodities in Bangladesh. The platform provides users with quick insights into daily price fluctuations (top risers and fallers), categorized product listings, and an infinite scrolling price ticker. Authenticated users gain access to in-depth, market-specific pricing data and analytics (minimum, maximum, and average prices) for smarter daily shopping.

🚀 Technologies Used

1. Frontend Framework: Next.js (App Router)
2. Styling & UI: Tailwind CSS, Component Library, DaisyUI 
3. Language: JavaScript
4. Authentication: BetterAuth (Email/Password, Google, GitHub)
5. Notifications: Hot Toast

Deployment: Vercel

✨ Key Features

1. Interactive Price Tracking: Features a live, infinitely scrolling price ticker in the navbar and dedicated home page sections highlighting the top 6 daily price risers (আজ দাম বেড়েছে ▲) and fallers (আজ দাম কমেছে ▼).

2. Advanced Sorting with Bengali Numerals: Includes a custom sort functionality (Default, Low to High, High to Low) on category pages that intelligently processes and sorts prices written in Bengali numerals.

3. Secure Authentication & Protected Routes: Implements secure user login and registration using BetterAuth (supporting social logins). Product detail pages are strictly protected, requiring users to log in before viewing specific market data.

4. Detailed Market Insights: The dynamic product details page (/product/[slug]) displays comprehensive pricing summaries, including minimum, maximum, and average prices, alongside a detailed breakdown of prices across different local bazars.

5. User Profile Management: Authenticated users have a dedicated profile dashboard where they can seamlessly update their personal information (e.g., updating their Name).

6. Optimized User Experience: Ensures a smooth experience across all devices (Mobile, Tablet, Desktop) with skeleton loading animations during data fetching, friendly 404 pages for invalid routes, and immediate toast notifications for all user actions.
