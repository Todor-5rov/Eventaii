# 🚀 Vercel Deployment Guide

## Environment Variables Required

Your Vercel deployment needs the Supabase environment variables to work properly.

## 📋 Add Environment Variables to Vercel

### Step 1: Go to Vercel Project Settings

1. Go to https://vercel.com/dashboard
2. Select your project (Eventaii)
3. Click on **Settings** tab
4. Click on **Environment Variables** in the left sidebar

### Step 2: Add These Variables

Add the following environment variables:

#### Variable 1: NEXT_PUBLIC_SUPABASE_URL
- **Key**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: Your Supabase project URL
  - Example: `https://your-project.supabase.co`
  - Find it in: Supabase Dashboard → Settings → API → Project URL

#### Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Your Supabase anonymous public key
  - Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
  - Find it in: Supabase Dashboard → Settings → API → Project API keys → `anon` `public`

### Step 3: Set Environment for All

For both variables, make sure they're available for:
- ✅ **Production**
- ✅ **Preview**
- ✅ **Development**

### Step 4: Redeploy

After adding the environment variables:

1. Go to **Deployments** tab
2. Click the **•••** menu on the latest deployment
3. Click **Redeploy**
4. Check "Use existing Build Cache" (optional)
5. Click **Redeploy**

## 🔍 Finding Your Supabase Credentials

### In Supabase Dashboard:

1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **Settings** (gear icon) in the left sidebar
4. Click **API**
5. You'll see:
   - **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys** → Use `anon` `public` key for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## ⚠️ Important Notes

### Security:
- The `anon` key is safe to expose publicly (it's already in your frontend code)
- Never use the `service_role` key in frontend code
- Row Level Security (RLS) policies protect your data

### Variable Names:
- Must start with `NEXT_PUBLIC_` to be available in the browser
- Names are case-sensitive

## 🧪 Verify Deployment

After redeploying with environment variables:

1. Visit your deployed site
2. Try to register as an organizer
3. Try to sign in
4. Create an event
5. Check if data is saved to Supabase

## 📱 Quick Command (After Setting Variables)

You can also redeploy from command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Deploy
vercel --prod
```

## ✅ Checklist

Before your site works correctly, ensure:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set in Vercel
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set in Vercel
- [ ] Both variables are set for Production, Preview, and Development
- [ ] Redeployed after adding variables
- [ ] Supabase database tables are created (run migrations)
- [ ] RLS policies are enabled (run migration 002)

## 🔧 Troubleshooting

### Build Still Fails?
1. Check variable names are exactly: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Check for typos in the values
3. Make sure there are no trailing spaces
4. Try clearing build cache and redeploying

### "Missing Supabase environment variables" Error?
This means the variables aren't being loaded. Double-check:
1. Variable names match exactly (including `NEXT_PUBLIC_` prefix)
2. Variables are set for the correct environment (Production/Preview)
3. You redeployed after adding variables

### Variables Not Working?
1. Check if you clicked "Save" after adding each variable
2. Verify in Settings → Environment Variables that they're listed
3. Try removing and re-adding the variables
4. Force a new deployment (don't use cache)

## 🎯 Expected Result

After successful deployment with environment variables:

```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (8/8)
✓ Finalizing page optimization

Build successful!
```

## 📞 Still Having Issues?

If the deployment still fails:
1. Check Vercel deployment logs for specific errors
2. Verify Supabase project is active and accessible
3. Test the Supabase connection locally first
4. Check if there are any Supabase service outages

---

**Once environment variables are added, your site will deploy successfully!** 🎉

