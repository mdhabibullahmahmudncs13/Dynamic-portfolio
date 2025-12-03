# Appwrite Setup Guide

This guide will walk you through setting up Appwrite for your dynamic portfolio.

## Step 1: Create Appwrite Project

1. Go to https://cloud.appwrite.io
2. Sign up or log in
3. Click "Create Project"
4. Name it "Portfolio" or similar
5. Copy your **Project ID** - you'll need this later

## Step 2: Create Database

1. In your project, go to **Databases**
2. Click **Create Database**
3. Name: `portfolio_db`
4. Database ID: `portfolio_db` (or use auto-generated)
5. Copy the **Database ID**

## Step 3: Create Collections

For each collection below, click "Create Collection" in your database:

### Collection 1: hero

**Collection ID:** `hero`

**Attributes:**

| Key | Type | Size | Required | Default | Array |
|-----|------|------|----------|---------|-------|
| name | String | 255 | ✓ | - | No |
| tagline | String | 500 | ✓ | - | No |
| description | String | 2000 | ✓ | - | No |
| imageUrl | String | 500 | No | - | No |
| resumeUrl | String | 500 | No | - | No |
| githubUrl | String | 500 | No | - | No |
| linkedinUrl | String | 500 | No | - | No |
| twitterUrl | String | 500 | No | - | No |

**Permissions:**
- Read: `role:all`
- Create/Update/Delete: `role:users`

---

### Collection 2: skills

**Collection ID:** `skills`

**Attributes:**

| Key | Type | Size | Required | Default | Array |
|-----|------|------|----------|---------|-------|
| name | String | 100 | ✓ | - | No |
| category | String (Enum) | - | ✓ | language | No |
| proficiency | Integer | - | ✓ | 50 | No |
| icon | String | 50 | No | - | No |
| order | Integer | - | ✓ | 0 | No |

**Enum values for category:** `language`, `framework`, `tool`, `platform`, `other`

**Permissions:**
- Read: `role:all`
- Create/Update/Delete: `role:users`

---

### Collection 3: projects

**Collection ID:** `projects`

**Attributes:**

| Key | Type | Size | Required | Default | Array |
|-----|------|------|----------|---------|-------|
| title | String | 255 | ✓ | - | No |
| description | String | 1000 | ✓ | - | No |
| longDescription | String | 5000 | No | - | No |
| imageUrl | String | 500 | No | - | No |
| demoUrl | String | 500 | No | - | No |
| githubUrl | String | 500 | No | - | No |
| technologies | String | 100 | ✓ | - | ✓ Yes |
| category | String (Enum) | - | ✓ | fullstack | No |
| featured | Boolean | - | ✓ | false | No |
| order | Integer | - | ✓ | 0 | No |
| createdAt | DateTime | - | ✓ | - | No |

**Enum values for category:** `cybersecurity`, `devops`, `fullstack`, `python`, `other`

**Permissions:**
- Read: `role:all`
- Create/Update/Delete: `role:users`

---

### Collection 4: experience

**Collection ID:** `experience`

**Attributes:**

| Key | Type | Size | Required | Default | Array |
|-----|------|------|----------|---------|-------|
| company | String | 255 | ✓ | - | No |
| position | String | 255 | ✓ | - | No |
| startDate | DateTime | - | ✓ | - | No |
| endDate | DateTime | - | No | - | No |
| description | String | 2000 | ✓ | - | No |
| technologies | String | 100 | ✓ | - | ✓ Yes |
| order | Integer | - | ✓ | 0 | No |

**Permissions:**
- Read: `role:all`
- Create/Update/Delete: `role:users`

---

### Collection 5: certifications

**Collection ID:** `certifications`

**Attributes:**

| Key | Type | Size | Required | Default | Array |
|-----|------|------|----------|---------|-------|
| name | String | 255 | ✓ | - | No |
| issuer | String | 255 | ✓ | - | No |
| issueDate | DateTime | - | ✓ | - | No |
| expiryDate | DateTime | - | No | - | No |
| credentialId | String | 255 | No | - | No |
| credentialUrl | String | 500 | No | - | No |
| imageUrl | String | 500 | No | - | No |
| order | Integer | - | ✓ | 0 | No |

**Permissions:**
- Read: `role:all`
- Create/Update/Delete: `role:users`

---

### Collection 6: contact

**Collection ID:** `contact`

**Attributes:**

| Key | Type | Size | Required | Default | Array |
|-----|------|------|----------|---------|-------|
| email | Email | 255 | ✓ | - | No |
| phone | String | 50 | No | - | No |
| location | String | 255 | No | - | No |
| availability | String | 255 | ✓ | - | No |

**Permissions:**
- Read: `role:all`
- Create/Update/Delete: `role:users`

---

### Collection 7: blog

**Collection ID:** `blog`

**Attributes:**

| Key | Type | Size | Required | Default | Array |
|-----|------|------|----------|---------|-------|
| title | String | 255 | ✓ | - | No |
| slug | String | 255 | ✓ | - | No |
| excerpt | String | 500 | ✓ | - | No |
| content | String | 50000 | ✓ | - | No |
| imageUrl | String | 500 | No | - | No |
| tags | String | 100 | ✓ | - | ✓ Yes |
| published | Boolean | - | ✓ | false | No |
| publishedAt | DateTime | - | No | - | No |
| createdAt | DateTime | - | ✓ | - | No |
| updatedAt | DateTime | - | ✓ | - | No |

**Indexes:**
- Key: `slug_unique`
- Type: Unique
- Attributes: `slug`

**Permissions:**
- Read: `role:all`
- Create/Update/Delete: `role:users`

---

## Step 4: Create Storage Bucket

1. Go to **Storage** in Appwrite console
2. Click **Create Bucket**
3. Name: `Portfolio Assets`
4. Bucket ID: `portfolio_assets`
5. Maximum file size: `50 MB` (or as needed)
6. Allowed file extensions: Leave empty (allow all) or specify: `jpg,jpeg,png,gif,webp,pdf`

**Permissions:**
- Read: `role:all`
- Create/Update/Delete: `role:users`

## Step 5: Create Admin User

1. Go to **Auth** → **Users**
2. Click **Create User**
3. Email: Your email
4. Password: Strong password (save it!)
5. Name: Your name
6. Click **Create**

## Step 6: Update .env File

Copy all IDs to your `.env` file:

```env
PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
PUBLIC_APPWRITE_PROJECT_ID=your_project_id

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

## Step 7: Test Connection

Run your development server:

```bash
npm run dev
```

Visit `http://localhost:5173/login` and log in with your admin credentials.

## Troubleshooting

**Can't connect to Appwrite:**
- Check that Project ID is correct
- Verify endpoint is `https://cloud.appwrite.io/v1`
- Check browser console for errors

**Permission errors:**
- Make sure collections have `role:all` for Read
- Make sure collections have `role:users` for Create/Update/Delete
- Verify you're logged in when trying to edit

**Upload errors:**
- Check storage bucket permissions
- Verify file size limits
- Check allowed file extensions

## Optional: Platform Configuration

If deploying to production:

1. Go to **Settings** → **Platforms**
2. Click **Add Platform** → **Web App**
3. Name: Your domain
4. Hostname: `yourdomain.com` (or `*.vercel.app` for Vercel)
5. Add both `www` and non-www versions if needed

---

You're all set! Your Appwrite backend is ready for your dynamic portfolio.
