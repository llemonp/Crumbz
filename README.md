# Crumbz — Baking Website

A beautiful, responsive baking website built from a Figma prototype.

## Pages
- **Home** — Hero landing page with Get Started button
- **Order Online** — Sidebar category nav with product details and Add to Cart
- **How to Order** — Info about online vs in-person ordering
- **Sweets / Gallery** — Product offerings and photo gallery
- **Contact** — Store hours, contact form, and address

## 🚀 Deploy to GitHub Pages

### Step 1 — Create a GitHub repository
1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon → **New repository**
3. Name it `crumbz` (or any name you like)
4. Leave it **Public**
5. Click **Create repository**

### Step 2 — Upload your files
**Option A — GitHub Web Upload (easiest)**
1. In your new repo, click **Add file → Upload files**
2. Drag and drop your entire `crumbz` folder contents:
   - `index.html`
   - `css/style.css`
   - `js/main.js`
   - `images/` folder (add your photos here!)
3. Click **Commit changes**

**Option B — Git CLI**
```bash
cd crumbz
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/crumbz.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. In your repo, go to **Settings → Pages**
2. Under **Source**, select **Deploy from a branch**
3. Select branch: `main`, folder: `/ (root)`
4. Click **Save**
5. Wait ~2 minutes, then your site is live at:
   `https://YOUR_USERNAME.github.io/crumbz`

## 📸 Adding Your Own Images

Place your photos in the `images/` folder with these filenames:
- `cupcakes.jpg` — for Custom Cake section
- `cake.jpg` — for Cake section & gallery
- `cookies.jpg` — for Cookies section & gallery
- `cinnamonrolls.jpg` — for Cinnamon Rolls section & gallery

The site gracefully handles missing images with a pink placeholder color.

## 🎨 Customizing

Edit `css/style.css` — look for the `:root` variables at the top:
```css
--pink-hero: #f9ddd9;    /* hero background */
--pink-nav: #e8a89c;     /* nav bar pink */
--pink-btn: #f0c4bc;     /* button color */
```

Edit `index.html` to update:
- Product descriptions and prices
- Store hours
- Contact details (phone, email, address)
- Social media links
