# 🔧 Deployment Issues Fixed & Troubleshooting

## ✅ Issues Fixed

### 1. **Frontend 404 Error** (/login, /signup, /dashboard routes)
**Problem**: Vercel was treating client-side routes as static file requests  
**Solution**: Updated [Frontend/vercel.json](Frontend/vercel.json) with correct SPA routing config  
```json
"rewrites": [
  {"source": "/(.*)", "destination": "/index.html"}
]
```

### 2. **CORS Cookies Not Working**
**Problem**: Backend had `credentials: true` commented out in [Backend/src/app.js](Backend/src/app.js)  
**Solution**: Uncommented CORS credentials to enable cookie sharing between frontend and backend  
```javascript
credentials: true
```

### 3. **Backend Port Logging Issue**
**Problem**: [Backend/server.js](Backend/server.js) was hardcoding "port 3000" in logs  
**Solution**: Changed to dynamic PORT variable: `console.log('Server running on port ${PORT}')`

---

## 🔴 Common Backend Errors & Solutions

### Issue: "Cannot GET /" or Backend Not Responding

**Cause**: Backend not deployed properly or environment variables missing

**Solution**:
1. Go to Render Dashboard: https://dashboard.render.com
2. Check your web service logs for errors
3. Verify environment variables are set:
   - ✅ `MONGO_URI=mongodb+srv://college-flash:puutGLEkuLVH1jJM@college-cluster.fg2vvo0.mongodb.net/GovtDB`
   - ✅ `FRONTEND_URL=https://college-pro-client.vercel.app`
   - ✅ `JWT_SECRET=fcd3fd89287be3db82c47280bbd24c59`
   - ✅ `PORT=5000` (should be set by Render, but verify)

---

### Issue: MongoDB Connection Fails

**Cause**: MONGO_URI not set or IP not whitelisted

**Solution**:
1. Go to MongoDB Atlas: https://cloud.mongodb.com/
2. Check "Network Access" → Whitelist Render's IP (or use 0.0.0.0/0 for testing)
3. Verify connection string format
4. Test connection locally first

---

### Issue: Signup/Login Returns 400 or 500 Error

**Possible Causes**:
- Database field validation errors
- Missing required fields
- Duplicate email in database

**Solution**:
1. Check Render logs for specific error message
2. Verify request has all required fields:
   - Signup: `username`, `lastname`, `email`, `password`
   - Login: `email`, `password`
3. Check MongoDB Atlas to see if users collection exists

---

## 📝 Next Steps to Complete Deployment

### For Frontend (Vercel):
```
1. Push updated vercel.json to GitHub
2. Vercel will auto-redeploy
3. Test: https://college-pro-client.vercel.app/login (should NOT show 404)
4. Test: https://college-pro-client.vercel.app/signup (should work)
```

### For Backend (Render):
```
1. Push updated app.js and server.js to GitHub
2. Render will auto-redeploy
3. Wait 2-3 minutes for deployment
4. Check Render logs for "Server running on port..."
5. Test: curl https://college-pro.onrender.com/auth/register (should work)
```

### For Database (MongoDB):
```
1. Verify MongoDB Atlas is accessible
2. Ensure IP whitelist includes Render's IP
3. Check that GovtDB database exists
4. Verify usersInfo collection is created
```

---

## 🧪 Quick Test Commands

### Test Backend API:
```bash
# Test registration endpoint
curl -X POST https://college-pro.onrender.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "lastname": "testlast",
    "email": "test@test.com",
    "password": "password123"
  }'

# Test login endpoint
curl -X POST https://college-pro.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "password123"
  }'
```

### Check Frontend Works:
1. Visit https://college-pro-client.vercel.app/
2. Navigate to /login → Should load login page (NOT 404)
3. Navigate to /signup → Should load signup page (NOT 404)
4. Click "Sign In" from signup → Should navigate to /login

---

## 📊 Expected Output After Fixes

| Route | Status | Details |
|-------|--------|---------|
| `GET /` | ✅ | Home page loads |
| `GET /login` | ✅ | Login page (was 404, now fixed) |
| `GET /signup` | ✅ | Signup page (was 404, now fixed) |
| `GET /dashboard` | ✅ | Dashboard (was 404, now fixed) |
| `POST /auth/register` | ✅ | Creates user in MongoDB |
| `POST /auth/login` | ✅ | Returns JWT token & cookie |

---

## 🚨 If Still Getting Errors

**Backend not found (502/503)?**
- Wait 3-5 minutes after pushing (Render needs time to rebuild)
- Check Render logs: https://dashboard.render.com
- Check if service is in "Deploying" state

**Frontend still shows 404?**
- Hard refresh: Ctrl+Shift+Delete (clear cache)
- Check Vercel deployment logs
- Ensure vercel.json is properly formatted

**Cookies not working?**
- Check browser DevTools → Application → Cookies
- Verify CORS origin matches exactly
- Ensure `sameSite: "lax"` in backend cookie settings

---

## 📋 Files Modified

```
✅ Frontend/vercel.json - Fixed SPA routing
✅ Backend/src/app.js - Enabled CORS credentials
✅ Backend/server.js - Fixed port logging
```

**Push to GitHub** to deploy these fixes:
```bash
git add Frontend/vercel.json Backend/src/app.js Backend/server.js
git commit -m "Fix deployment: SPA routing, CORS credentials, port logging"
git push origin main
```

Your deployment should now work! 🎉
