# Deployment Guide

This guide covers deploying your dynamic portfolio to various platforms.

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

**Pros:**
- Zero configuration for SvelteKit
- Automatic HTTPS
- Global CDN
- Preview deployments for branches
- Free tier available

**Steps:**

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via CLI**
   ```bash
   vercel
   ```
   Follow the prompts to link your project.

3. **Or Deploy via GitHub**
   - Push code to GitHub
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects SvelteKit

4. **Add Environment Variables**
   - In Vercel dashboard → Settings → Environment Variables
   - Add all variables from your `.env` file:
     - `PUBLIC_APPWRITE_ENDPOINT`
     - `PUBLIC_APPWRITE_PROJECT_ID`
     - `PUBLIC_APPWRITE_DATABASE_ID`
     - All collection IDs
     - `PUBLIC_APPWRITE_STORAGE_BUCKET_ID`

5. **Update Appwrite Platform**
   - In Appwrite Console → Settings → Platforms
   - Add Web Platform
   - Hostname: `your-project.vercel.app`
   - Also add custom domain if you have one

---

### Option 2: Netlify

**Pros:**
- Simple drag-and-drop deployment
- Good free tier
- Built-in forms support
- Serverless functions

**Steps:**

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy via CLI**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

3. **Or Deploy via Dashboard**
   - Go to https://netlify.com
   - Drag and drop the `build` folder
   - Or connect GitHub repository

4. **Add Environment Variables**
   - In Netlify dashboard → Site settings → Environment variables
   - Add all your environment variables

5. **Update Netlify Config** (optional)
   
   Create `netlify.toml` in project root:
   ```toml
   [build]
     command = "npm run build"
     publish = "build"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

6. **Update Appwrite Platform**
   - Add your Netlify domain to Appwrite platforms

---

### Option 3: Cloudflare Pages

**Pros:**
- Unlimited bandwidth (free tier)
- Fast global CDN
- Worker functions support
- Good DDoS protection

**Steps:**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Create Cloudflare Pages Project**
   - Go to Cloudflare dashboard
   - Pages → Create a project
   - Connect GitHub repository

3. **Build Settings**
   - Framework preset: SvelteKit
   - Build command: `npm run build`
   - Build output directory: `build`

4. **Environment Variables**
   - Add all environment variables in Pages settings

5. **Update Appwrite**
   - Add `*.pages.dev` domain to Appwrite platforms

---

### Option 4: Self-Hosted (VPS/Docker)

**For Ubuntu/Debian servers:**

1. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone and Setup**
   ```bash
   git clone your-repo-url
   cd Dynamic-portfolio
   npm install
   npm run build
   ```

3. **Install PM2**
   ```bash
   npm install -g pm2
   ```

4. **Create .env file**
   ```bash
   nano .env
   # Add your environment variables
   ```

5. **Start with PM2**
   ```bash
   pm2 start npm --name "portfolio" -- start
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx** (reverse proxy)
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## 📝 Post-Deployment Checklist

After deploying to any platform:

### 1. Update Appwrite Platform Settings

- [ ] Go to Appwrite Console → Settings → Platforms
- [ ] Add Web Platform
- [ ] Enter your production domain
- [ ] Add both `www` and non-`www` versions if applicable

### 2. Test All Features

- [ ] Homepage loads correctly
- [ ] All sections display data
- [ ] Images load properly
- [ ] Login works at `/login`
- [ ] Admin panel accessible at `/admin`
- [ ] Can edit content in admin
- [ ] File uploads work
- [ ] Navigation smooth scrolling works

### 3. SEO & Performance

- [ ] Add custom domain (if not using default)
- [ ] Set up Google Analytics (optional)
- [ ] Test mobile responsiveness
- [ ] Run Lighthouse audit
- [ ] Check page speed

### 4. Security

- [ ] HTTPS enabled (should be automatic)
- [ ] Environment variables secured
- [ ] Strong admin password set
- [ ] Regular backups enabled (Appwrite automatic)

---

## 🌐 Custom Domain Setup

### For Vercel:

1. **Add Domain**
   - Vercel Dashboard → Settings → Domains
   - Add your domain

2. **Configure DNS**
   
   Add these records to your DNS provider:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for DNS propagation** (up to 48 hours)

### For Netlify:

1. **Add Domain**
   - Netlify Dashboard → Domain settings
   - Add custom domain

2. **Configure DNS**
   ```
   Type: A
   Name: @
   Value: 75.2.60.5

   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

### For Cloudflare Pages:

1. **Add Custom Domain**
   - Pages project → Custom domains
   - Add domain

2. **DNS automatically configured** (if using Cloudflare DNS)

---

## 🔄 Continuous Deployment

### GitHub Actions (for Vercel/Netlify)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      # Add deployment steps for your platform
```

---

## 📊 Monitoring & Analytics

### Add Google Analytics

1. Get GA tracking ID from https://analytics.google.com

2. Add to `src/app.html`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

### Appwrite Analytics

- Check Appwrite Console → Usage
- Monitor database requests
- Track storage usage
- Monitor function executions

---

## 🐛 Troubleshooting

**Build fails:**
- Check Node.js version (must be 18+)
- Verify all dependencies installed
- Check environment variables

**Site loads but no content:**
- Verify Appwrite credentials in env vars
- Check Appwrite platform settings
- Verify collection permissions

**Images don't load:**
- Check storage bucket permissions
- Verify bucket ID in env vars
- Check CORS settings in Appwrite

**Can't login to admin:**
- Verify user exists in Appwrite
- Check email/password
- Check browser console for errors

---

## 💡 Tips

1. **Use environment-specific configs**
   - Different Appwrite projects for dev/prod
   - Separate databases for testing

2. **Enable caching**
   - Most platforms enable this by default
   - Improves load times significantly

3. **Monitor costs**
   - Appwrite Pro has usage limits
   - Most platforms have free tiers
   - Watch bandwidth usage

4. **Regular backups**
   - Appwrite backs up automatically
   - Export data periodically
   - Keep git history clean

---

Your portfolio is now live! 🎉
