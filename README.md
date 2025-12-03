# Dynamic Portfolio Website with Admin Panel

A modern, fully dynamic portfolio website built with **SvelteKit** and **Appwrite** featuring a comprehensive admin panel for content management. Perfect for showcasing your work as a Python Developer, Full Stack Developer, Cybersecurity Expert, and DevOps Engineer.

## ✨ Features

### Frontend
- 🎨 **Dark Cybersecurity Theme** - Professional design with cyan/purple/pink color scheme
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ⚡ **Fast & Optimized** - Built with SvelteKit for blazing-fast performance
- 🎭 **Smooth Animations** - Modern transitions and floating effects
- 🔍 **SEO Optimized** - Meta tags and semantic HTML structure

### Admin Panel
- 🔐 **Secure Authentication** - Protected with Appwrite authentication
- ✏️ **Content Management** - Edit all portfolio sections without code
- 📸 **Media Upload** - Direct file upload to Appwrite Storage
- 🎯 **CRUD Operations** - Create, Read, Update, Delete for all content
- 📊 **Real-time Updates** - Changes reflect immediately

### Portfolio Sections
- **Hero Section** - Name, tagline, description, profile image
- **Skills** - Categorized skills with proficiency levels
- **Projects** - Showcase with images, technologies, and links
- **Experience** - Work history with dates and descriptions
- **Certifications** - Professional credentials with badges
- **Contact** - Contact information and availability
- **Blog** - Markdown-based blog posts (optional)

## 🛠️ Tech Stack

- **Frontend Framework:** SvelteKit
- **Backend/BaaS:** Appwrite (Pro)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Vercel/Netlify compatible

## 📋 Prerequisites

- Node.js 18+ installed
- Appwrite account (Free or Pro)
- Basic knowledge of terminal/command line

## 🚀 Quick Start

### 1. Clone and Install

```bash
cd Dynamic-portfolio
npm install
```

### 2. Set Up Appwrite

#### Create Appwrite Project
1. Go to [Appwrite Cloud](https://cloud.appwrite.io)
2. Create a new project
3. Note your Project ID

#### Create Database Collections

Create a database called `portfolio_db` and add these collections:

**Collection: hero**
- Attributes:
  - `name` (string, required)
  - `tagline` (string, required)
  - `description` (string, required)
  - `imageUrl` (string, optional)
  - `resumeUrl` (string, optional)
  - `githubUrl` (string, optional)
  - `linkedinUrl` (string, optional)
  - `twitterUrl` (string, optional)

**Collection: skills**
- Attributes:
  - `name` (string, required)
  - `category` (enum: language, framework, tool, platform, other)
  - `proficiency` (integer, 0-100)
  - `icon` (string, optional)
  - `order` (integer, default: 0)

**Collection: projects**
- Attributes:
  - `title` (string, required)
  - `description` (string, required)
  - `longDescription` (string, optional)
  - `imageUrl` (string, optional)
  - `demoUrl` (string, optional)
  - `githubUrl` (string, optional)
  - `technologies` (string array, required)
  - `category` (enum: cybersecurity, devops, fullstack, python, other)
  - `featured` (boolean, default: false)
  - `order` (integer, default: 0)
  - `createdAt` (datetime, required)

**Collection: experience**
- Attributes:
  - `company` (string, required)
  - `position` (string, required)
  - `startDate` (datetime, required)
  - `endDate` (datetime, optional)
  - `description` (string, required)
  - `technologies` (string array, required)
  - `order` (integer, default: 0)

**Collection: certifications**
- Attributes:
  - `name` (string, required)
  - `issuer` (string, required)
  - `issueDate` (datetime, required)
  - `expiryDate` (datetime, optional)
  - `credentialId` (string, optional)
  - `credentialUrl` (string, optional)
  - `imageUrl` (string, optional)
  - `order` (integer, default: 0)

**Collection: contact**
- Attributes:
  - `email` (string, required)
  - `phone` (string, optional)
  - `location` (string, optional)
  - `availability` (string, required)

**Collection: blog**
- Attributes:
  - `title` (string, required)
  - `slug` (string, required, unique)
  - `excerpt` (string, required)
  - `content` (string, required)
  - `imageUrl` (string, optional)
  - `tags` (string array, required)
  - `published` (boolean, default: false)
  - `publishedAt` (datetime, optional)
  - `createdAt` (datetime, required)
  - `updatedAt` (datetime, required)

#### Create Storage Bucket
1. Go to Storage in your Appwrite console
2. Create a bucket called `portfolio_assets`
3. Set permissions to allow authenticated users to create/read/update/delete

#### Set Permissions
For each collection:
- Go to Settings → Permissions
- Add role: `Any` with Read permission (for public access)
- Add role: `Users` with all permissions (for admin access)

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your Appwrite credentials:

```env
PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here

PUBLIC_APPWRITE_DATABASE_ID=portfolio_db

PUBLIC_APPWRITE_HERO_COLLECTION_ID=hero
PUBLIC_APPWRITE_SKILLS_COLLECTION_ID=skills
PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID=projects
PUBLIC_APPWRITE_EXPERIENCE_COLLECTION_ID=experience
PUBLIC_APPWRITE_CERTIFICATIONS_COLLECTION_ID=certifications
PUBLIC_APPWRITE_CONTACT_COLLECTION_ID=contact
PUBLIC_APPWRITE_BLOG_COLLECTION_ID=blog

PUBLIC_APPWRITE_STORAGE_BUCKET_ID=portfolio_assets
```

### 4. Create Admin Account

In Appwrite Console:
1. Go to Auth → Users
2. Create a new user with email and password
3. Note the credentials for admin login

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## 🔑 Admin Access

1. Navigate to `/login`
2. Enter your Appwrite user credentials
3. Access the admin panel at `/admin`

## 📁 Project Structure

```
Dynamic-portfolio/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── admin/          # Admin panel components
│   │   │   │   ├── HeroEditor.svelte
│   │   │   │   ├── SkillsEditor.svelte
│   │   │   │   ├── ProjectsEditor.svelte
│   │   │   │   ├── ExperienceEditor.svelte
│   │   │   │   ├── CertificationsEditor.svelte
│   │   │   │   ├── ContactEditor.svelte
│   │   │   │   └── BlogEditor.svelte
│   │   │   ├── Navigation.svelte
│   │   │   ├── Hero.svelte
│   │   │   ├── Skills.svelte
│   │   │   ├── Projects.svelte
│   │   │   ├── Experience.svelte
│   │   │   ├── Certifications.svelte
│   │   │   └── Contact.svelte
│   │   ├── services/
│   │   │   ├── auth.ts          # Authentication logic
│   │   │   └── portfolio.ts     # Data fetching/CRUD
│   │   ├── stores/
│   │   │   └── auth.ts          # Auth state management
│   │   ├── appwrite.ts          # Appwrite client config
│   │   └── types.ts             # TypeScript interfaces
│   ├── routes/
│   │   ├── +page.svelte         # Homepage
│   │   ├── +layout.svelte       # Root layout
│   │   ├── admin/
│   │   │   └── +page.svelte     # Admin dashboard
│   │   └── login/
│   │       └── +page.svelte     # Login page
│   ├── app.css                  # Global styles
│   └── app.html                 # HTML template
├── static/                      # Static assets
├── .env                         # Environment variables
├── package.json
├── svelte.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the cybersecurity theme:

```javascript
colors: {
  cyber: {
    dark: '#0a0e27',      // Background
    darker: '#05070f',     // Darker background
    blue: '#00d9ff',       // Primary accent
    purple: '#a259ff',     // Secondary accent
    pink: '#ff006e',       // Tertiary accent
    green: '#00ff88',      // Success/active
  }
}
```

### Fonts
The project uses:
- **JetBrains Mono** for code/monospace
- **Inter** for body text

Change in `src/app.html` if needed.

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy the `build` folder
```

### Environment Variables
Don't forget to add all environment variables in your deployment platform!

## 📝 Content Management Workflow

1. **Login** to admin panel (`/admin`)
2. **Select section** from sidebar
3. **Edit content** using forms
4. **Upload media** for images/files
5. **Save** - changes appear instantly on frontend

## 🔒 Security Notes

- Never commit `.env` file to version control
- Use strong passwords for admin accounts
- Consider adding rate limiting for production
- Enable 2FA on Appwrite account
- Regularly update dependencies

## 🐛 Troubleshooting

**Build Errors:**
- Run `npm install` to ensure all dependencies are installed
- Check that Node.js version is 18+

**Appwrite Connection Issues:**
- Verify `.env` file has correct credentials
- Check Appwrite project ID is correct
- Ensure collections are created with exact names

**Upload Errors:**
- Verify storage bucket permissions
- Check file size limits in Appwrite

## 📚 Resources

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Appwrite Documentation](https://appwrite.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use!

## 📄 License

MIT License - feel free to use this template for your portfolio.

---

**Built with ❤️ using SvelteKit and Appwrite**
