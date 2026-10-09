# বাজার দর · BazarDor

> Today's grocery market prices in Bangladesh, at a glance.

---

## Description

**বাজার দর (BazarDor)** is a grocery price tracker built for everyday shoppers in Bangladesh. It brings the daily prices of rice, lentils, oil, vegetables, fish, meat, eggs and spices into one clean, fast, Bangla-first interface. You can see what got more expensive today, what got cheaper, and how prices compare from one market to another, before you leave home.

**Live Link:** https://bazardor-nasir.vercel.app/

## Technologies Used

| Layer | Technology |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) (App Router, Server Components) |
| UI library | [React](https://react.dev) with the React Compiler |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| Authentication | [Better Auth](https://www.better-auth.com) (email/password, Google, GitHub) |
| Database | [MongoDB](https://www.mongodb.com) |
| Notifications | [react-hot-toast](https://react-hot-toast.com) |

## Key Features

1. **Daily price dashboard.** The home page shows today's date written in Bangla, a continuously scrolling price ticker, and the full product list, with prices shown in Bangla numerals and local units (কেজি, লিটার, ডজন, পিস).
2. **Risers and fallers.** Dedicated sections highlight which items went up and which went down compared with yesterday. Every product card shows the percentage change.
3. **Market-by-market price breakdown.** Each product page shows the lowest, highest and average price, plus a table comparing prices across markets and divisions, so you can find the cheapest place to buy.
4. **Browse and sort by category.** Eight categories (rice, lentils, oil, vegetables, fish, meat, eggs and dairy, spices) are one click away from the navbar. Within a category you can sort by price, low to high or high to low.
5. **Secure sign-in with protected pages.** Users can sign up with email and password or continue with Google or GitHub. Product details and the profile page are guarded by a session check that redirects visitors to sign in. Signed-in users can view and update their profile.
