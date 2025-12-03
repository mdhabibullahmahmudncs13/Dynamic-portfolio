# Quick Start Checklist

Follow these steps to get your portfolio up and running:

## ✅ Pre-Setup (5 minutes)

- [ ] Install Node.js 18+ from https://nodejs.org
- [ ] Create Appwrite account at https://cloud.appwrite.io
- [ ] Clone or download this repository

## ✅ Installation (2 minutes)

```bash
cd Dynamic-portfolio
npm install
```

## ✅ Appwrite Configuration (15 minutes)

Follow the detailed guide in `APPWRITE_SETUP.md` or quick steps:

1. **Create Project** in Appwrite Cloud
   - [ ] Copy Project ID

2. **Create Database** named `portfolio_db`
   - [ ] Copy Database ID

3. **Create 7 Collections** (hero, skills, projects, experience, certifications, contact, blog)
   - [ ] Set permissions for each (Read: role:all, Write: role:users)

4. **Create Storage Bucket** named `portfolio_assets`
   - [ ] Set permissions (Read: role:all, Write: role:users)

5. **Create Admin User**
   - [ ] Note email and password

## ✅ Environment Setup (2 minutes)

```bash
cp .env.example .env
```

Edit `.env` with your Appwrite credentials:
- [ ] Add Project ID
- [ ] Add Database ID  
- [ ] Add Collection IDs (usually same as names)
- [ ] Add Bucket ID

## ✅ First Run (1 minute)

```bash
npm run dev
```

Open browser to `http://localhost:5173`

## ✅ Admin Login

1. Navigate to `http://localhost:5173/login`
2. Login with your Appwrite user credentials
3. Access admin panel

## ✅ Add Your Content

Go through each section in admin panel:

- [ ] **Hero** - Add your name, tagline, description, photo
- [ ] **Skills** - Add your technical skills
- [ ] **Projects** - Showcase your work
- [ ] **Experience** - Add work history
- [ ] **Certifications** - Add credentials
- [ ] **Contact** - Add contact info
- [ ] **Blog** (optional) - Write posts

## 🚀 Deployment (10 minutes)

### Option 1: Vercel

```bash
npm install -g vercel
vercel
```

### Option 2: Netlify

```bash
npm run build
# Upload 'build' folder to Netlify
```

**Don't forget:**
- [ ] Add environment variables in deployment platform
- [ ] Add your domain to Appwrite Platform settings

## 📝 Customization Tips

**Change Colors:**
Edit `tailwind.config.js` → `theme.extend.colors.cyber`

**Change Fonts:**
Edit `src/app.html` → Google Fonts links

**Modify Sections:**
Edit components in `src/lib/components/`

## 🆘 Need Help?

- Check `README.md` for detailed documentation
- Check `APPWRITE_SETUP.md` for Appwrite-specific help
- Review browser console for errors
- Verify all environment variables are correct

## 🎉 You're Done!

Your dynamic portfolio is ready. Remember:
- Changes in admin panel update instantly
- Upload images directly through admin
- All content is stored in Appwrite
- No code changes needed to update content

---

**Estimated Total Time: ~30 minutes**
