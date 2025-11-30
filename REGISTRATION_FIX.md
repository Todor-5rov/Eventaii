# 🔧 Registration Error Fix

## Problem

When trying to register as an organizer, you get an error. This is because the `organizers` table doesn't have the proper RLS (Row Level Security) policies.

## ✅ Solution

Run the following SQL in your Supabase SQL Editor:

### Option 1: If You Haven't Created the Organizers Table Yet

Run the updated `database/migrations/003_create_organizers_table.sql` - it now includes the RLS policies.

### Option 2: If Organizers Table Already Exists

Run `database/migrations/006_fix_organizers_rls.sql`:

```sql
-- Enable Row Level Security
ALTER TABLE organizers ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for registration)
CREATE POLICY "Allow public inserts on organizers"
ON organizers
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow public reads (for sign-in)
CREATE POLICY "Allow public reads on organizers"
ON organizers
FOR SELECT
TO anon
USING (true);
```

## 🧪 Test After Fix

1. Go to `/register-organizer`
2. Fill out the registration form
3. Submit
4. You should see "Registration successful!"
5. Check Supabase Table Editor → `organizers` table to see your data

## 📝 About the Password-less Sign-In

### Current Implementation (MVP):
- **Registration**: Only requires email and basic info
- **Sign-In**: Only requires email (looks up user in database)
- **Session**: Stored in localStorage

This is a simple MVP approach that works fine for testing and early development.

### Why No Password?

For the MVP, we're using a simplified authentication system:
- Fast to implement
- Easy to test
- No password management complexity
- Suitable for demo/testing phase

### For Production (Future Enhancement):

You should upgrade to proper authentication using Supabase Auth:

```typescript
// Registration with password
const { data, error } = await supabase.auth.signUp({
  email: formData.email,
  password: formData.password,
  options: {
    data: {
      full_name: formData.fullName,
      company_name: formData.companyName,
    }
  }
})

// Sign in with password
const { data, error } = await supabase.auth.signInWithPassword({
  email: formData.email,
  password: formData.password,
})

// Get current session
const { data: { session } } = await supabase.auth.getSession()
```

## 🔐 Production Authentication Checklist

When you're ready to add proper auth:

- [ ] Add password field to registration form
- [ ] Add password field to sign-in form
- [ ] Use Supabase Auth signUp
- [ ] Use Supabase Auth signInWithPassword
- [ ] Replace localStorage with Supabase session management
- [ ] Add password reset flow
- [ ] Add email verification
- [ ] Update RLS policies to use `auth.uid()`

## 🚀 Quick Fix Steps

1. **Run the SQL** in Supabase Dashboard → SQL Editor:
   ```sql
   ALTER TABLE organizers ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Allow public inserts on organizers"
   ON organizers FOR INSERT TO anon WITH CHECK (true);
   
   CREATE POLICY "Allow public reads on organizers"
   ON organizers FOR SELECT TO anon USING (true);
   ```

2. **Try registering again** - it should work now!

3. **Sign in with your email** - it will find your account

4. **Create an event** - you'll see it in your dashboard

## ✅ Expected Result

After running the SQL fix:

- ✅ Registration works
- ✅ Sign-in works (email lookup)
- ✅ Dashboard shows your events
- ✅ Event creation works
- ✅ n8n webhook triggers

---

**The current password-less system is fine for MVP! You can add proper authentication later when needed.** 🎯

