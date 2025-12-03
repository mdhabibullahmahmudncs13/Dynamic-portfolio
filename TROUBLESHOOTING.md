# 🔧 Troubleshooting Guide

Common issues and their solutions for your dynamic portfolio.

---

## 🚨 Installation Issues

### Error: "npm install" fails

**Symptoms:**
- Package installation errors
- Dependency conflicts
- ERESOLVE errors

**Solutions:**

1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Use legacy peer deps:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Update Node.js:**
   - Ensure Node.js 18+ is installed
   - Check version: `node --version`
   - Download from: https://nodejs.org

4. **Check network:**
   - Verify internet connection
   - Try different npm registry
   - Disable VPN if active

---

## 🌐 Development Server Issues

### Error: "npm run dev" fails to start

**Symptoms:**
- Server won't start
- Port already in use
- Module not found errors

**Solutions:**

1. **Port conflict:**
   ```bash
   # Kill process on port 5173
   lsof -ti:5173 | xargs kill -9
   # Or use different port
   npm run dev -- --port 3000
   ```

2. **Missing dependencies:**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Check svelte.config.js:**
   - Ensure adapter is installed
   - Verify config is valid JavaScript

4. **Clear .svelte-kit:**
   ```bash
   rm -rf .svelte-kit
   npm run dev
   ```

### Page shows "Error in svelte.config.js"

**Solution:**
```bash
npm install @sveltejs/adapter-auto --save-dev
```

---

## 🔌 Appwrite Connection Issues

### Error: "Cannot connect to Appwrite"

**Symptoms:**
- Network errors in console
- 401/403 errors
- Data doesn't load

**Solutions:**

1. **Verify environment variables:**
   ```bash
   # Check .env file exists and has:
   PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   PUBLIC_APPWRITE_PROJECT_ID=your_actual_project_id
   ```

2. **Restart dev server after .env changes:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

3. **Check Appwrite project ID:**
   - Go to Appwrite Console
   - Settings → Project ID
   - Copy exact ID (case-sensitive)

4. **Verify endpoint:**
   - For Appwrite Cloud: `https://cloud.appwrite.io/v1`
   - For self-hosted: `https://your-domain.com/v1`

### Error: "Collection not found" or 404

**Symptoms:**
- Collections return 404
- Empty data on frontend

**Solutions:**

1. **Verify collection IDs match:**
   ```env
   # In .env, IDs must match Appwrite Console
   PUBLIC_APPWRITE_HERO_COLLECTION_ID=hero
   ```

2. **Check database ID:**
   - Verify `PUBLIC_APPWRITE_DATABASE_ID` matches database in console

3. **Create missing collections:**
   - Follow `APPWRITE_SETUP.md`
   - Create all 7 collections with exact names

4. **Check spelling/case:**
   - Collection IDs are case-sensitive
   - Must match exactly

### Error: "Permission denied" or 403

**Symptoms:**
- Can read but not write
- Admin actions fail
- Upload fails

**Solutions:**

1. **Fix collection permissions:**
   - Go to Collection → Settings → Permissions
   - Add: `role:all` with Read permission
   - Add: `role:users` with all permissions (Create, Read, Update, Delete)

2. **Fix storage permissions:**
   - Go to Storage → Bucket → Settings → Permissions
   - Same as above

3. **Verify user is logged in:**
   - Check browser console
   - Look for auth token
   - Try logging out and back in

---

## 🔐 Authentication Issues

### Cannot login to admin panel

**Symptoms:**
- Login fails with error
- Redirects to login page
- "Invalid credentials" message

**Solutions:**

1. **Verify user exists:**
   - Go to Appwrite Console → Auth → Users
   - Check if user is created
   - Create one if missing

2. **Check password:**
   - Password is case-sensitive
   - Try password reset in Appwrite Console

3. **Browser issues:**
   ```bash
   # Clear browser cache and cookies
   # Try incognito/private mode
   # Try different browser
   ```

4. **Check CORS:**
   - In Appwrite Console → Settings → Platforms
   - Add your development URL: `http://localhost:5173`
   - Add production URL if deployed

### Logged out unexpectedly

**Solutions:**

1. **Session expired:**
   - Normal behavior after 1 year (default)
   - Just log in again

2. **Check session settings:**
   - Appwrite Console → Auth → Security
   - Adjust session length if needed

---

## 📷 Image Upload Issues

### Images won't upload

**Symptoms:**
- Upload button does nothing
- Error in console
- "File upload failed"

**Solutions:**

1. **Check file size:**
   - Default limit: 50MB
   - Reduce image size if needed
   - Use image compression tools

2. **Check file type:**
   - Supported: jpg, jpeg, png, gif, webp
   - Convert unsupported formats

3. **Verify bucket permissions:**
   - Storage → Bucket → Settings → Permissions
   - `role:users` needs Create permission

4. **Check bucket ID:**
   ```env
   PUBLIC_APPWRITE_STORAGE_BUCKET_ID=portfolio_assets
   ```

### Images load slowly

**Solutions:**

1. **Compress images before upload:**
   - Use TinyPNG.com
   - Recommended max: 500KB per image

2. **Use appropriate formats:**
   - Photos: JPEG
   - Graphics: PNG or WebP
   - Icons: SVG

---

## 💾 Data Not Saving

### Changes don't appear on frontend

**Symptoms:**
- Save succeeds but no changes visible
- Old data still showing

**Solutions:**

1. **Hard refresh browser:**
   ```
   Windows/Linux: Ctrl + Shift + R
   Mac: Cmd + Shift + R
   ```

2. **Clear browser cache:**
   - DevTools → Application → Clear storage

3. **Check you're editing right item:**
   - Verify correct ID is being updated
   - Check admin panel for confirmation

4. **Verify collection permissions:**
   - Public read access needed for frontend

### Save button doesn't work

**Solutions:**

1. **Check required fields:**
   - All fields marked with * must be filled
   - Check browser console for validation errors

2. **Network error:**
   - Check internet connection
   - Check Appwrite status
   - Look for errors in console

3. **Permission error:**
   - Verify you're logged in
   - Check `role:users` has Update permission

---

## 🎨 Styling Issues

### Tailwind classes not working

**Symptoms:**
- Styles not applying
- Class names visible in DOM but no styles

**Solutions:**

1. **Build Tailwind:**
   ```bash
   # Restart dev server
   npm run dev
   ```

2. **Check PostCSS config:**
   - Verify `postcss.config.js` exists
   - Should include tailwindcss and autoprefixer

3. **Purge issue:**
   - Check `tailwind.config.js`
   - Content paths should include: `'./src/**/*.{html,js,svelte,ts}'`

### Custom colors not working

**Solution:**
- Check `tailwind.config.js` → `theme.extend.colors`
- Use format: `bg-cyber-blue` not `bg-blue`

---

## 🌍 Deployment Issues

### Build fails

**Symptoms:**
- `npm run build` errors
- TypeScript errors
- Missing modules

**Solutions:**

1. **Install dependencies:**
   ```bash
   npm ci  # Clean install
   ```

2. **Check environment variables:**
   - All PUBLIC_ variables must be set
   - No missing values

3. **Fix TypeScript errors:**
   ```bash
   npm run check
   ```

4. **Clear build cache:**
   ```bash
   rm -rf .svelte-kit build
   npm run build
   ```

### Site works locally but not in production

**Solutions:**

1. **Environment variables:**
   - Add all env vars to deployment platform
   - Verify no typos in variable names

2. **Update Appwrite platforms:**
   - Add production domain to Appwrite
   - Settings → Platforms → Add platform

3. **Check HTTPS:**
   - Appwrite requires HTTPS in production
   - Most platforms provide this automatically

4. **Check logs:**
   - View deployment logs
   - Look for errors or warnings

### 404 on routes

**Solutions:**

1. **For Netlify:**
   ```toml
   # Add to netlify.toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **For Vercel:**
   - Usually automatic
   - Check vercel.json if custom config

---

## 🐛 Common Errors & Fixes

### "document is not defined"

**Cause:** Server-side rendering issue

**Solution:**
```javascript
// Use browser check
if (typeof window !== 'undefined') {
  // Browser-only code
}

// Or use onMount
import { onMount } from 'svelte';
onMount(() => {
  // Code here runs only in browser
});
```

### "Module not found: @sveltejs/kit"

**Solution:**
```bash
npm install @sveltejs/kit --save-dev
```

### "Cannot find module 'appwrite'"

**Solution:**
```bash
npm install appwrite
```

### TypeScript errors about types

**Solution:**
```bash
npm run check
# Fix any type errors shown
```

---

## 🔍 Debugging Tips

### Check browser console

1. Open DevTools (F12)
2. Go to Console tab
3. Look for red errors
4. Read error messages carefully

### Check network requests

1. DevTools → Network tab
2. Refresh page
3. Look for failed requests (red)
4. Check request/response details

### Check Appwrite logs

1. Appwrite Console → Functions/Database
2. Look at recent activity
3. Check for errors or warnings

### Enable verbose logging

Add to your components:
```javascript
console.log('Data:', data);
console.error('Error:', error);
```

---

## 📞 Getting More Help

### Check Documentation
- [README.md](README.md) - Main guide
- [APPWRITE_SETUP.md](APPWRITE_SETUP.md) - Appwrite config
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy help

### External Resources
- [SvelteKit Docs](https://kit.svelte.dev/docs)
- [Appwrite Docs](https://appwrite.io/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)

### Community
- SvelteKit Discord
- Appwrite Discord
- Stack Overflow (tag: svelte, appwrite)

---

## ✅ Quick Diagnostic Checklist

When something doesn't work, check:

- [ ] Node.js version 18+
- [ ] All dependencies installed (`npm install`)
- [ ] `.env` file exists and has all variables
- [ ] Dev server is running (`npm run dev`)
- [ ] Appwrite project exists and accessible
- [ ] All collections created in Appwrite
- [ ] Permissions set correctly (read:all, write:users)
- [ ] Storage bucket created
- [ ] Admin user created in Appwrite Auth
- [ ] Browser console shows no errors
- [ ] Network requests succeeding (DevTools → Network)
- [ ] Logged in when trying admin features
- [ ] Tried hard refresh (Ctrl+Shift+R)

---

Still stuck? 

1. Check error message carefully
2. Search error in browser
3. Check GitHub issues for SvelteKit/Appwrite
4. Review all config files
5. Try fresh install in new directory

Most issues are:
- ❌ Wrong environment variables
- ❌ Missing Appwrite collections
- ❌ Wrong permissions
- ❌ Not logged in
- ❌ Typos in IDs

**Good luck! 🍀**
