# Deployment Guide

This guide covers deploying your e-commerce application with authentication.

## Quick Fix for Current Issues

### ✅ 1. Fixed TypeScript Conflict
- Added `.npmrc` with `legacy-peer-deps=true`
- Added TypeScript overrides in `package.json`
- Moved `@prisma/client` to devDependencies

### ✅ 2. Fixed "Failed to fetch" Error
- Added fallback demo mode when backend is unavailable
- Frontend now works standalone without backend
- Graceful error handling for API failures

### ✅ 3. Added OAuth Authentication
- Google Sign-in with Firebase Auth
- Facebook Sign-in with Firebase Auth
- Integrated with existing auth context

## Deployment Options

### Option 1: Frontend-Only Deployment (Recommended for now)

**Vercel Deployment:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Environment Variables on Vercel:**
```
REACT_APP_API_URL=https://your-backend-url.com/api
REACT_APP_FIREBASE_API_KEY=AIzaSyB0N-iNRf-C8-uAhht6WDGv5RITebw8kP0
REACT_APP_FIREBASE_AUTH_DOMAIN=e-commerce-b8f01.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=e-commerce-b8f01
REACT_APP_FIREBASE_STORAGE_BUCKET=e-commerce-b8f01.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=145772685143
REACT_APP_FIREBASE_APP_ID=1:145772685143:web:4087c46c70c20b5e40c012
```

### Option 2: Full-Stack Deployment

**Backend Options:**
1. **Railway** (Recommended)
2. **Heroku**
3. **DigitalOcean App Platform**
4. **AWS Elastic Beanstalk**

**Steps:**
1. Deploy backend first
2. Get backend URL
3. Update `REACT_APP_API_URL` in frontend
4. Deploy frontend

### Option 3: Serverless (Advanced)

Convert Express backend to Vercel serverless functions:
```bash
# Move server files to /api directory
# Update imports and exports for serverless
```

## Authentication Modes

### Current Implementation

1. **Demo Mode** (No Backend Required)
   - Works offline
   - Local storage authentication
   - Perfect for showcasing

2. **Firebase OAuth** (Recommended)
   - Google Sign-in ✅
   - Facebook Sign-in ✅
   - Reliable and scalable

3. **Custom Backend** (Full Control)
   - JWT-based authentication
   - Custom user management
   - Requires backend deployment

## Build Optimizations

### Applied Optimizations:
- ✅ Disabled source maps in production
- ✅ Added TypeScript compatibility fixes
- ✅ Configured legacy peer deps resolution
- ✅ Added build size optimization scripts

### Performance Tips:
```bash
# Analyze bundle size
npm run build
npx source-map-explorer 'build/static/js/*.js'

# Test production build locally
npm run preview
```

## Troubleshooting

### Build Errors:
1. **TypeScript conflicts** → Fixed with overrides
2. **Peer dependency issues** → Fixed with `.npmrc`
3. **Missing environment variables** → Check `.env.production`

### Runtime Errors:
1. **Failed to fetch** → Falls back to demo mode
2. **OAuth popup blocked** → User needs to allow popups
3. **CORS errors** → Backend CORS configuration needed

## Environment Variables

### Required:
```bash
REACT_APP_FIREBASE_API_KEY=your_firebase_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
```

### Optional:
```bash
REACT_APP_API_URL=your_backend_url
GENERATE_SOURCEMAP=false
```

## Next Steps

1. **Immediate Fix**: Deploy frontend-only with OAuth
2. **Short Term**: Set up backend on Railway/Heroku
3. **Long Term**: Migrate to serverless functions

## Testing Your Deployment

1. **OAuth Testing**:
   - Test Google sign-in
   - Test Facebook sign-in
   - Verify token storage

2. **Demo Mode Testing**:
   - Test without backend
   - Verify fallback functionality
   - Check local storage persistence

3. **Production Testing**:
   - Test all authentication flows
   - Verify responsive design
   - Check performance metrics

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify environment variables
3. Test in incognito mode
4. Check Firebase console for auth settings

Your app now supports multiple authentication methods and gracefully handles backend unavailability!
