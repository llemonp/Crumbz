# Crumbz Baking Website

An interactive baking website built from a Figma prototype.

## Pages
- **Home** — Hero landing page with Get Started button
- **Order Online** — Sidebar category nav with product details and Add to Cart
- **How to Order** — Info about online vs in-person ordering
- **Sweets / Gallery** — Product offerings and photo gallery
- **Contact** — Store hours, contact form, and address

Drag and drop your entire `crumbz` folder contents:
   - `index.html`
   - `css/style.css`
   - `js/main.js`
   - `images/` folder (add your photos here!)

## Adding Your Own Images

Place your photos in the `images/` folder with these filenames:
- `cupcakes.jpg` — for Custom Cake section
- `cake.jpg` — for Cake section & gallery
- `cookies.jpg` — for Cookies section & gallery
- `cinnamonrolls.jpg` — for Cinnamon Rolls section & gallery

The site gracefully handles missing images with a pink placeholder color.

## Customizing

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
