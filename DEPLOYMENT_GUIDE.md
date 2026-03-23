# College Pro - Deployment Guide

This guide covers deploying your full-stack application with:
- **Frontend**: Vercel (https://college-pro-client.vercel.app/)
- **Backend**: Render (https://college-pro.onrender.com/)
- **Database**: MongoDB Atlas

---

## Part 1: MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new project named "College Pro"

### Step 2: Create a Cluster
1. Click "Create a Cluster"
2. Select "M0 Free" tier
3. Choose your region (preferably close to your users)
4. Click "Create Deployment"

### Step 3: Get Connection String
1. In your cluster, click "Connect"
2. Select "Drivers" → "Node.js"
3. Copy the connection string
4. Replace `<username>`, `<password>`, and database name with your details
5. Your URI should look like:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/college-pro?retryWrites=true&w=majority
   ```

### Step 4: Create Database User
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create username and password (save these!)
4. Choose "Built-in Role" → "Read and write to any database"
5. Click "Add User"

### Step 5: Configure IP Whitelist
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Select "Allow access from anywhere" (0.0.0.0/0) for development
4. For production, add specific IP addresses only

---

## Part 2: Backend Deployment (Render)

### Step 1: Prepare Backend Repository
1. Ensure your backend has:
   - `package.json` with `start` script: `node server.js`
   - `.env.example` file with required environment variables
   - `render.yaml` file (already created)

2. Make sure your `.env` file is NOT committed (add to `.gitignore`)

### Step 2: Push to GitHub
```bash
git add .
git commit -m "Deploy config for Render"
git push origin main
```

### Step 3: Deploy on Render
1. Go to [Render.com](https://render.com)
2. Sign up and connect your GitHub account
3. Click "New +" → "Web Service"
4. Select your repository
5. Configure:
   - **Name**: college-pro-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 4: Add Environment Variables
In Render dashboard, go to Environment section and add:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/college-pro?retryWrites=true&w=majority
FRONTEND_URL=https://college-pro-client.vercel.app
NODE_ENV=production
PORT=5000
JWT_SECRET=your_secure_random_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Step 5: Deploy
- Click "Create Web Service"
- Render will automatically build and deploy
- Your backend URL: `https://college-pro.onrender.com`

---

## Part 3: Frontend Deployment (Vercel)

### Step 1: Prepare Frontend Repository
1. Ensure your frontend has:
   - `package.json` with `build` script
   - `vercel.json` file (already created)
   - `.env.production` with `VITE_API_URL`

### Step 2: Update Environment Variable
Edit [Frontend/.env.production](../Frontend/.env.production):
```
VITE_API_URL=https://college-pro.onrender.com
```

### Step 3: Push to GitHub
```bash
git add .
git commit -m "Frontend Vercel deployment config"
git push origin main
```

### Step 4: Deploy on Vercel
1. Go to [Vercel.com](https://vercel.com)
2. Sign up and connect GitHub account
3. Click "Add New..." → "Project"
4. Import your repository
5. Configure:
   - **Framework**: Vite
   - **Root Directory**: Frontend/
   - **Build Command**: `npm run build`
   - **Output Directory**: dist

### Step 5: Add Environment Variables
In Vercel dashboard, go to Settings → Environment Variables:
```
VITE_API_URL=https://college-pro.onrender.com
```

### Step 6: Deploy
- Click "Deploy"
- Vercel will build and deploy automatically
- Your frontend URL: `https://college-pro-client.vercel.app`

---

## Part 4: Update Your Code (Already Done)

The following have been configured:
- ✅ Backend `server.js`: Uses `process.env.PORT`
- ✅ Backend `app.js`: CORS configured with `FRONTEND_URL`
- ✅ Frontend API calls: Already using `https://college-pro.onrender.com`
- ✅ Backend `package.json`: Added proper scripts
- ✅ Frontend `vite.config.js`: Configured for production build

---

## Part 5: Testing & Verification

### Test Backend
```bash
curl https://college-pro.onrender.com/auth/login -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

### Test Frontend
1. Visit `https://college-pro-client.vercel.app`
2. Try signing up with an account
3. Check that data is saved to MongoDB Atlas
4. Log in with your new credentials

### Monitor Logs
- **Render**: Dashboard → Logs section
- **Vercel**: Dashboard → Deployments → Logs
- **MongoDB Atlas**: Activity Feed in cluster

---

## Troubleshooting

### CORS Issues
- Verify `FRONTEND_URL` in backend `.env` matches your Vercel URL
- Ensure `Access-Control-Allow-Credentials: true` is set

### MongoDB Connection Issues
- Check IP whitelist in MongoDB Atlas (allow 0.0.0.0/0 for testing)
- Verify `MONGO_URI` format and credentials
- Ensure database user has correct permissions

### Build Failures
- Check build logs in Render and Vercel dashboards
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### Environment Variables Not Loading
- Re-deploy after adding environment variables
- Clear browser cache (Ctrl+Shift+Delete)
- Restart the server

---

## Production Checklist

- [ ] MongoDB Atlas: Change IP whitelist to specific IPs only
- [ ] Render: Set up automatic deployments from GitHub
- [ ] Vercel: Enable production domain
- [ ] Update JWT_SECRET with a strong random key
- [ ] Configure email service (if using)
- [ ] Set up monitoring and error tracking
- [ ] Backup MongoDB database regularly
- [ ] Review security settings on all platforms
- [ ] Test payment gateway (if applicable)
- [ ] Load testing for production readiness

---

## Useful Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Render Deployment Guide](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Express CORS Guide](https://expressjs.com/en/resources/middleware/cors.html)
- [Vite Documentation](https://vitejs.dev/)

