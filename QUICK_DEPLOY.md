# Quick Deployment Checklist

## 🔧 Configuration Files Created

✅ **Backend/package.json** - Updated with proper scripts and metadata
✅ **Backend/.env.example** - Template for environment variables
✅ **Backend/render.yaml** - Render deployment configuration
✅ **Frontend/vercel.json** - Vercel deployment configuration
✅ **Frontend/.env.production** - Production environment variables
✅ **Frontend/vite.config.js** - Updated with React plugin

## 🚀 Deployment URLs

- **Frontend**: https://college-pro-client.vercel.app/
- **Backend API**: https://college-pro.onrender.com/
- **Database**: MongoDB Atlas (Cloud)

## 📋 Steps to Deploy

### 1. MongoDB Atlas Setup (5 minutes)
```
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free cluster (M0)
3. Create database user with credentials
4. Whitelist IP addresses (0.0.0.0/0 for testing)
5. Get connection string: mongodb+srv://user:password@cluster.mongodb.net/college-pro
```

### 2. Backend Deployment on Render (10 minutes)
```
1. Go to https://render.com
2. Connect GitHub repository
3. Create new Web Service from Backend/
4. Add environment variables:
   - MONGO_URI=<your_mongodb_connection_string>
   - FRONTEND_URL=https://college-pro-client.vercel.app
   - NODE_ENV=production
   - JWT_SECRET=<random_secure_key>
5. Deploy (will auto-build from render.yaml)
6. Copy your backend URL
```

### 3. Frontend Deployment on Vercel (5 minutes)
```
1. Go to https://vercel.com
2. Connect GitHub repository
3. Create new project from Frontend/
4. Framework: Vite
5. Add environment variable:
   - VITE_API_URL=https://college-pro.onrender.com
6. Deploy
7. Your frontend URL will be assigned
```

## ⚙️ Current Backend API Endpoints

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /enquiry/*` - Enquiry endpoints

## 📝 Environment Variables Needed

### Backend (Render)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/college-pro?retryWrites=true&w=majority
FRONTEND_URL=https://college-pro-client.vercel.app
NODE_ENV=production
PORT=5000
JWT_SECRET=your_secure_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Frontend (Vercel)
```
VITE_API_URL=https://college-pro.onrender.com
```

## 🔐 Security Notes

- ✅ CORS is configured to only accept requests from Vercel frontend
- ✅ Environment variables are NOT committed to Git
- ✅ MongoDB credentials are environment-specific
- ⚠️ For production: Restrict MongoDB IP whitelist to specific servers only

## 🧪 Testing After Deployment

1. Test backend:
   ```bash
   curl https://college-pro.onrender.com/auth/login -X POST \
     -H "Content-Type: application/json" \
     -d '{"email":"test@test.com","password":"test123"}'
   ```

2. Test frontend: Visit https://college-pro-client.vercel.app and try signup/login

3. Verify data: Check MongoDB Atlas for created records

## 📊 Expected Behavior

- ✅ Frontend loads from Vercel without CORS errors
- ✅ Sign up creates user in MongoDB Atlas
- ✅ Login retrieves user credentials from database
- ✅ Cookies are shared between frontend and backend
- ✅ All API calls go to Render backend

## 🐛 If Something Goes Wrong

1. **Check Logs**:
   - Render: Dashboard → Logs
   - Vercel: Deployments → Logs
   - MongoDB: Activity Feed

2. **Common Issues**:
   - CORS error → Check FRONTEND_URL in backend .env
   - MongoDB connection failed → Verify MONGO_URI and IP whitelist
   - Build failed → Check build logs for dependency issues

3. **Re-deploy**:
   - Render: Push changes to GitHub (auto-deploys)
   - Vercel: Push changes to GitHub (auto-deploys)

## 📞 Support

- Render Support: https://render.com/support
- Vercel Support: https://vercel.com/support
- MongoDB Support: https://www.mongodb.com/support

---

**Next Step**: Follow the full guide in [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
