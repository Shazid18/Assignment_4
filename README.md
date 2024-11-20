# Hotel Details Application

A server-side rendered React application built with Next.js for displaying hotel information. This project demonstrates the implementation of dynamic routing, TypeScript integration, and comprehensive unit testing.

## Features

- Server-side rendering for optimal SEO performance
- Dynamic routing with slug and hotel ID
- TypeScript implementation for type safety
- Unit testing with Jest and React Testing Library
- API integration for hotel data fetching
- Custom 404 page for non-existent hotels
- SEO optimization with meta tags
- Can see hotel details by hotelId

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- ESLint

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Shazid18/Assignment_4.git
cd Assignment_4
```
2. Install dependencies:
```bash
npm install
```

## Development

# Start the development server :
```bash
npm run dev
```
The application will be available at http://localhost:3000

## Build

# Create a production build:
```bash
npm run build
```

# Start the production server:
```bash
npm start
```

## Project Structure

# client side
client/
├── .next/ # Next.js build output
├── public/ # Static assets
├── src/ # Source files
│ ├── app/ # App router directory
│ │ ├── fonts/ # Font files
│ │ ├── hotel-details/[slug]/[id]/ # Dynamic hotel details route
│ │ │ ├── page.tsx
│ │ │ ├── layout.tsx
│ │ │ └── not-found.tsx
│ │ ├── components/ # Reusable components
│ │ ├── globals.css # Global styles
│ │ └── favicon.ico
│ └── types/ # TypeScript type definitions
├── .eslintrc.json # ESLint configuration
├── .gitignore # Git ignore rules
├── next.config.ts # Next.js configuration
├── package.json # Project dependencies and scripts
├── package-lock.json # Locked dependencies
├── postcss.config.js # PostCSS configuration
├── README.md # Project documentation
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json # TypeScript configuration

# server side
server/
├── data/ # Data directory
│ └── hotels/ # Hotels data files
├── src/ # Source files
│ ├── controllers/ # Route controllers
│ ├── middleware/ # Custom middleware
│ ├── models/ # Database models
│ ├── routes/ # API routes
│ ├── app.ts # Application entry point
│ └── tests/ # Test files
│ └── hotel.test.ts
├── uploads/ # Upload directory
│ └── images/ # Hotel images
├── package.json # Project dependencies and scripts
├── package-lock.json # Locked dependencies
└── tsconfig.json # TypeScript configuration


## API Endpoints

# Get Hotel Details
```bash
GET /api/hotel/{hotel-id}
```
Returns detailed information about a specific hotel.
# Example URL:
```bash
http://localhost:3000/hotel-details/radisson-blu/76512
```

## Code Style

This project uses ESLint for code consistency. Rules include:

- Use of semicolons
- Single quotes for strings
- Strict TypeScript checks
    

