# 🚀 Deployment Guide

## Quick Deploy Options

### 🟢 Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Eshaan-byte/carbon-footprint-tracker)

1. Click the deploy button above
2. Connect your GitHub account
3. Deploy automatically
4. Your app will be live in minutes!

### 🟢 Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Eshaan-byte/carbon-footprint-tracker)

1. Click the deploy button above
2. Connect your GitHub account
3. Build settings are automatically configured
4. Deploy with one click!

### 🟡 Manual Deployment

#### Prerequisites
- Node.js 18+ installed
- Git installed
- Domain (optional)

#### Steps
```bash
# 1. Clone the repository
git clone https://github.com/Eshaan-byte/carbon-footprint-tracker.git
cd carbon-footprint-tracker

# 2. Install dependencies
npm install

# 3. Build for production
npm run build

# 4. Start the application
npm start

# Your app will be available at http://localhost:3000
```

#### Environment Variables (Optional)
```bash
# Create .env.local for production Firebase setup
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 🔧 Firebase Setup (Optional)

The app works without Firebase in demo mode, but for full functionality:

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project
   - Enable Authentication (Google/GitHub)
   - Create Firestore database

2. **Get Configuration**
   - Go to Project Settings
   - Copy your Firebase config
   - Add to environment variables

3. **Set Up Authentication**
   - Enable Google and GitHub providers
   - Add authorized domains for production

## 📱 Mobile-Friendly

The app is fully responsive and works great on:
- 📱 Mobile phones
- 📱 Tablets  
- 💻 Desktops
- 🖥️ Large screens

## 🔗 Custom Domain

### Vercel
1. Go to your project dashboard
2. Click "Domains"
3. Add your custom domain
4. Follow DNS setup instructions

### Netlify
1. Go to "Domain settings"
2. Add custom domain
3. Configure DNS records
4. Enable HTTPS (automatic)

## 🚀 Performance Tips

### Optimization
- ✅ **Images**: Automatically optimized by Next.js
- ✅ **Fonts**: Google Fonts preloaded
- ✅ **Code Splitting**: Automatic route-based splitting
- ✅ **Caching**: Static files cached by CDN

### Monitoring
- Use Vercel Analytics for performance insights
- Enable Web Vitals monitoring
- Set up error tracking (Sentry recommended)

## 🌍 Global Deployment

The app can be deployed globally for best performance:

- 🇺🇸 **US**: Vercel/Netlify US regions
- 🇪🇺 **Europe**: Vercel/Netlify EU regions  
- 🇦🇺 **Asia-Pacific**: Vercel/Netlify APAC regions

## 📊 Analytics Setup

### Google Analytics (Optional)
```bash
# Add to next.config.js
module.exports = {
  env: {
    GOOGLE_ANALYTICS_ID: 'GA_MEASUREMENT_ID'
  }
}
```

### Vercel Analytics
```bash
npm install @vercel/analytics
# Automatically enabled on Vercel deployment
```

## 🔒 Security

### HTTPS
- ✅ Automatically enabled on Vercel/Netlify
- ✅ Free SSL certificates
- ✅ HTTP to HTTPS redirects

### Environment Variables
- ✅ Never commit API keys to Git
- ✅ Use platform environment variable settings
- ✅ Rotate keys regularly

## 🐳 Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t carbon-tracker .
docker run -p 3000:3000 carbon-tracker
```

## 📈 Scaling

### High Traffic
- Use Vercel Pro for higher limits
- Enable CDN caching
- Optimize database queries
- Consider serverless functions

### Global Scale
- Deploy to multiple regions
- Use database read replicas
- Implement proper caching strategies
- Monitor performance metrics

---

**Need help with deployment? [Open an issue](https://github.com/Eshaan-byte/carbon-footprint-tracker/issues) and we'll help! 🚀**