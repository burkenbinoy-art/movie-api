# Render Deployment Quick-Start Checklist

## ✅ Pre-Deployment: Local Setup (do this first)

- [ ] **Update app.js** - Already done! Now uses `process.env.PORT`
- [ ] **Add start script** - Update package.json with `"start": "node app.js"`
- [ ] **Create public folder** - Already done! Contains frontend files
- [ ] **Test locally** - Run `npm start` and test at `http://localhost:3000`

## 📝 GitHub Setup (5 minutes)

- [ ] **Create GitHub account** at https://github.com (if don't have one)
- [ ] **Create new repo** named `movie-api`
- [ ] **Clone the repo** to your computer
- [ ] **Copy your files** into the cloned folder:
  - `app.js`
  - `package.json`
  - `package-lock.json`
  - `public/` folder with all files
  - `.gitignore` file
- [ ] **Push to GitHub:**
  ```bash
  git add .
  git commit -m "Initial commit: movie API with frontend"
  git push -u origin main
  ```

## 🚀 Render Deployment (10 minutes)

- [ ] **Create Render account** at https://render.com
- [ ] **Sign in with GitHub** (easier setup)
- [ ] **Create New Web Service**
- [ ] **Connect your GitHub repo** (movie-api)
- [ ] **Fill deployment settings:**
  - Name: `movie-api`
  - Environment: `Node`
  - Region: Pick closest to you
  - Branch: `main`
  - Build Command: `npm install`
  - Start Command: `npm start`
- [ ] **Click Deploy** and wait for "Live" status
- [ ] **Get your public URL** from dashboard

## 🌐 After Deployment

- [ ] **Test backend** at `https://your-url/movies` (should return `[]`)
- [ ] **View frontend** at `https://your-url/` (beautiful UI appears!)
- [ ] **Test adding movie** via the web interface
- [ ] **Everything works?** Great! 🎉

## 📍 Optional: Custom Domain

- [ ] **Add custom domain** in Render dashboard
- [ ] **Update DNS** at your domain provider
- [ ] **Get free SSL** automatically

---

## 🔧 Troubleshooting Quick Links

| Problem | Solution |
|---------|----------|
| Can't connect to backend | Change API_URL in `public/app.js` to your Render URL |
| "Start command failed" | Make sure `package.json` has `"start": "node app.js"` |
| Deployment never starts | Check "Build logs" - look for errors |
| Very slow first load | Free tier spins down after 15 min - first request is slow |

---

## Important Files Location

```
movie-api/
├── app.js              ← Main backend file
├── package.json        ← Dependencies and scripts
├── .gitignore          ← Files to ignore in git
│
└── public/             ← Frontend files
    ├── index.html      ← Web page
    ├── style.css       ← Beautiful styling
    └── app.js          ← Frontend logic
```

---

Let me know when you're ready for any step! 🚀
