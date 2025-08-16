# DreamBoard - Personal Goal & Financial Planning Application

DreamBoard is a modern, intuitive web application that helps users visualize, plan, and track their personal goals and financial aspirations. It combines goal-setting with financial planning to provide users with a comprehensive view of their dreams and the financial feasibility of achieving them.

## Features

- **Visual Goal Planning**: Create beautiful dream boards with drag-and-drop functionality
- **Financial Integration**: Track income streams and analyze affordability
- **Timeline Planning**: Multi-year planning with monthly granularity
- **Progress Tracking**: Monitor progress with comprehensive analytics
- **User Authentication**: Secure login with email/password and OAuth providers
- **Responsive Design**: Mobile-first approach with beautiful UI

## Tech Stack

- **Frontend**: Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL
- **Authentication**: NextAuth.js v5
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **UI Components**: Radix UI, Lucide React icons
- **Styling**: Tailwind CSS with custom design system

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd dreamboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the environment example file and configure your variables:

```bash
cp env.example .env.local
```

Update `.env.local` with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/dreamboard"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""

# File Storage (Cloudinary)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Email (Resend)
RESEND_API_KEY=""
```

### 4. Set up the database

Initialize Prisma and create your database:

```bash
# Initialize Prisma
npx prisma init

# Generate Prisma client
npx prisma generate

# Create and apply database migrations
npx prisma migrate dev --name init

# (Optional) Seed the database with sample data
npm run seed
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
dreamboard/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # Dashboard page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── header.tsx        # Header component
│   │   ├── footer.tsx        # Footer component
│   │   └── providers.tsx     # Context providers
│   └── lib/                  # Utility functions and configurations
│       ├── auth.ts           # NextAuth configuration
│       ├── prisma.ts         # Prisma client
│       ├── store.ts          # Zustand store
│       └── utils.ts          # Utility functions
├── prisma/                   # Database schema and migrations
├── public/                   # Static assets
└── package.json             # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Database Schema

The application uses the following main entities:

- **Users**: User accounts and authentication
- **DreamBoards**: Collections of dreams and goals
- **Dreams**: Individual goals with financial details and timelines
- **Categories**: Classification system for dreams
- **IncomeStreams**: Income sources for financial planning

## Authentication

DreamBoard supports multiple authentication methods:

- Email/password registration and login
- Google OAuth
- GitHub OAuth
- JWT-based sessions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

## Roadmap

- [ ] Drag-and-drop dream board editor
- [ ] Advanced financial projections
- [ ] Mobile app development
- [ ] AI-powered goal insights
- [ ] Community features and sharing
- [ ] Integration with financial institutions

---

Built with ❤️ by the DreamBoard team
