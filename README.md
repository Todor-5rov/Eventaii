# Eventco - AI-Powered Event Planning Marketplace

A modern landing page for Eventco, an automated event planning marketplace that uses AI to instantly match event organizers with the best venues, caterers, and tech providers.

## 🚀 Features

- **Beautiful, Modern Design**: Gradient-based UI with smooth animations
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **TypeScript**: Type-safe code throughout
- **Tailwind CSS**: Utility-first styling for rapid development
- **Next.js 14**: Latest React framework with App Router

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## 🛠️ Installation

1. **Install dependencies**:

```bash
npm install
```

2. **Run the development server**:

```bash
npm run dev
```

3. **Open your browser**:

Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🎨 Project Structure

```
Eventco/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx             # Main landing page
│   │   └── globals.css          # Global styles and Tailwind imports
│   └── components/
│       ├── Navigation.tsx       # Header with navigation
│       ├── Hero.tsx            # Hero section with CTA
│       ├── HowItWorks.tsx      # 4-step process explanation
│       ├── Features.tsx        # Feature showcase grid
│       ├── ForOrganizers.tsx   # Benefits for event organizers
│       ├── ForVendors.tsx      # Benefits for service vendors
│       ├── CTA.tsx             # Call-to-action section
│       └── Footer.tsx          # Footer with links
├── public/                     # Static assets
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── next.config.js             # Next.js configuration
└── package.json               # Dependencies and scripts
```

## 🎯 Landing Page Sections

1. **Navigation**: Sticky header with mobile menu
2. **Hero**: Eye-catching headline with stats and CTA buttons
3. **How It Works**: 4-step process visualization
4. **Features**: Grid of key platform capabilities
5. **For Organizers**: Benefits for event planners
6. **For Vendors**: Benefits for service providers
7. **CTA**: Final call-to-action with gradient background
8. **Footer**: Links and social media

## 🎨 Design System

### Colors

- **Primary**: Blue gradient (`from-primary-600 to-secondary-600`)
- **Secondary**: Purple/Pink gradient
- **Background**: White with subtle gray gradients

### Typography

- Font: Inter (Google Fonts)
- Headings: Bold, large scale
- Body: Regular weight, comfortable line height

## 🔧 Customization

### Update Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* your colors */ },
      secondary: { /* your colors */ },
    },
  },
}
```

### Add New Sections

1. Create a new component in `src/components/`
2. Import and add to `src/app/page.tsx`

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

```bash
npm run build
```

Deploy the `.next` folder to your hosting platform.

## 📄 License

Private project. All rights reserved.

## 🤝 Contributing

This is a private project. Contact the team for contribution guidelines.

## 📞 Support

For support, email support@Eventco.com or join our Slack channel.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

