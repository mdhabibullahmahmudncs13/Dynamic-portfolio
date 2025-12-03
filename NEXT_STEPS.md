# ⚠️ IMPORTANT: Configure Your Environment Variables

Your dev server is ready, but you need to configure Appwrite credentials first!

## Quick Setup (5 minutes)

### Step 1: Edit .env file

Open the `.env` file in your project root and update these values:

```env
PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
PUBLIC_APPWRITE_PROJECT_ID=YOUR_PROJECT_ID_HERE

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

### Step 2: Get Your Appwrite Project ID

1. Go to https://cloud.appwrite.io
2. Sign up or log in
3. Create a new project (name it "Portfolio" or similar)
4. Click on your project
5. Go to **Settings** → Copy the **Project ID**
6. Paste it in `.env` file as `PUBLIC_APPWRITE_PROJECT_ID`

### Step 3: Restart Dev Server

After saving .env:
```bash
# Stop the server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

## Full Appwrite Setup

For complete backend setup including database collections:

**Read:** [APPWRITE_SETUP.md](APPWRITE_SETUP.md)

This includes:
- Creating database and collections
- Setting up storage bucket  
- Creating admin user
- Setting permissions

**Estimated time:** 15 minutes

## Current Status

✅ Dependencies installed  
✅ .env file created  
⚠️ Needs Appwrite configuration  
⚠️ Needs database collections  

## Next Steps

1. **Quick test:** Just add Project ID to .env and restart server
2. **Full setup:** Follow APPWRITE_SETUP.md to create all collections
3. **Add content:** Login at /login and use admin panel

---

**Don't worry!** The hardest part is done. Just need to configure Appwrite and you're ready to go! 🚀
