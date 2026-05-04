# 📚 Highflyer Adult Education Centre — Website

**Teaching adults to read, write, and communicate with confidence since 2009.**
Port Harcourt, Rivers State, Nigeria.

---

## 🌐 Live Website

**[https://highflyeraec.github.io](https://highflyeraec.github.io)**

---

## 📋 About This Project

This is the official website of **Highflyer Adult Education Centre**, a free adult literacy centre in Port Harcourt, Rivers State, Nigeria. The site is a single-page application built in pure HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies beyond Google Fonts.

It is hosted entirely on **GitHub Pages** and requires zero server infrastructure.

---

## 🗂️ File Structure

```
highflyer/
├── index.html       ← Main website (all 10 pages in one file)
├── 404.html         ← Custom "page not found" page
├── _config.yml      ← GitHub Pages / Jekyll configuration
├── robots.txt       ← Search engine crawling rules
├── sitemap.xml      ← Site map for Google indexing
└── README.md        ← This file
```

---

## 📄 Pages Included

| Page | Description |
|---|---|
| 🏠 Home | Hero section, impact stats, class previews, testimonials |
| 📖 About Us | Founding story, mission, values, team, milestones timeline |
| 🎓 Programmes | Foundation, Builder's & Expression classes — full details |
| ⭐ Learner Stories | 4 full personal stories + Graduate Achievement Wall |
| ✏️ Enrolment | Free registration form + FAQ |
| 🤝 Get Involved | Volunteer, donate, corporate sponsorship, community partnerships |
| 📰 News & Resources | Articles + 5 free downloadable literacy resources |
| 🎮 Literacy Games | 3 interactive mini-games (Letter Match, Missing Letter, Word-Picture) |
| 🖥️ Learner Portal | Login page + sample progress dashboard |
| 📞 Contact | Full contact info, map, contact form, social links |

---

## ✨ Key Features

- **Audio Read-Aloud** — any page can be read aloud using the Web Speech API (accessibility for learners with low literacy)
- **WhatsApp Float Button** — direct link to WhatsApp for the Nigerian context
- **3 Interactive Literacy Games** — Letter Sound Match, Fill the Missing Letter, Word & Picture Match
- **Fully Responsive** — works on all screen sizes, especially mobile phones
- **SEO Optimised** — structured data (JSON-LD), Open Graph tags, meta description, sitemap
- **WCAG Accessible** — skip links, ARIA labels, focus styles, semantic HTML
- **Custom 404 Page** — branded, redirects back to home
- **No dependencies** — zero npm, zero build step, pure HTML/CSS/JS

---

## 🚀 How to Deploy to GitHub Pages

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click **"New repository"**
3. Name it exactly: `highflyeraec.github.io`
   *(Replace `highflyeraec` with your actual GitHub username)*
4. Set it to **Public**
5. Click **"Create repository"**

---

### Step 2 — Upload the Files

**Option A — Drag and Drop (Easiest)**

1. Open the repository on GitHub
2. Click **"Add file" → "Upload files"**
3. Drag all files from this folder into the upload area:
   - `index.html`
   - `404.html`
   - `_config.yml`
   - `robots.txt`
   - `sitemap.xml`
   - `README.md`
4. Write a commit message: `Initial website upload`
5. Click **"Commit changes"**

**Option B — Git Command Line**

```bash
# Clone the empty repository
git clone https://github.com/highflyeraec/highflyeraec.github.io.git
cd highflyeraec.github.io

# Copy all files into this folder, then:
git add .
git commit -m "Launch: Highflyer Adult Education Centre website"
git push origin main
```

---

### Step 3 — Enable GitHub Pages

1. In your repository, click **Settings** (top tab)
2. Scroll down to **"Pages"** in the left sidebar
3. Under **"Source"**, select: **"Deploy from a branch"**
4. Branch: **main** | Folder: **/ (root)**
5. Click **Save**
6. Wait 2–5 minutes, then visit: `https://highflyeraec.github.io`

---

### Step 4 — Verify It's Working

Visit your live site. Check:
- [ ] Home page loads with gold and navy design
- [ ] All 10 navigation links work
- [ ] Literacy games start automatically
- [ ] WhatsApp button appears bottom-right
- [ ] Audio read-aloud button works
- [ ] Forms show toast confirmations
- [ ] Mobile hamburger menu opens and closes
- [ ] 404 page shows if you visit a wrong URL

---

## 🔧 Customisation Guide

### Update Contact Details
Search in `index.html` for:
```
+234 801 234 5678
hello@highflyeraec.org
```
Replace with the real phone number and email address.

### Update WhatsApp Link
Find in `index.html`:
```html
href="https://wa.me/2348012345678
```
Replace `2348012345678` with the real WhatsApp number (country code + number, no spaces or +).

### Update Social Media Links
Search for `@HighflyerAEC` and replace with the real Facebook/YouTube handles.

### Add Google Analytics
In `_config.yml`, add your GA4 Measurement ID:
```yaml
google_analytics: "G-XXXXXXXXXX"
```
Then add the GA4 script tag just before `</head>` in `index.html`.

### Update Bank Details for Donations
Search for:
```
Bank: GTBank · Account: Highflyer Adult Education Centre · Number: 0123456789
```
Replace with the real bank details.

### Add a Real Google Map
Replace the map placeholder `div` in the Contact page with:
```html
<iframe
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
  width="100%" height="280" style="border:0;border-radius:16px"
  allowfullscreen loading="lazy">
</iframe>
```
Get your embed code from Google Maps → Share → Embed a map.

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `--blue-dark` | `#0f2347` | Navbar, hero, footer |
| `--blue` | `#1a3a6b` | Buttons, accents |
| `--gold` | `#e8a020` | Primary CTA, highlights |
| `--green` | `#2e7d52` | Beginner level, audio bar |
| `--cream` | `#fdf8f0` | Page background |
| Heading font | Playfair Display | All section titles |
| Body font | Nunito | All paragraph text |

---

## ♿ Accessibility

This site is built with the following accessibility features:
- Skip-to-content link (keyboard users)
- ARIA labels on all interactive elements
- `role` attributes on navigation, tables, games
- `aria-live` on toast notifications
- Focus-visible styles on all focusable elements
- Semantic HTML5 elements (`nav`, `main`, `footer`, `article`, `section`)
- Minimum 4.5:1 colour contrast ratio
- Audio read-aloud for low-literacy visitors
- Large text (17px base, generous line-height 1.8)

---

## 📞 Contact

**Highflyer Adult Education Centre**
Behind Rumuola Baptist Church, Rumuola Road,
Port Harcourt, Rivers State, Nigeria.

📞 +234 801 234 5678
📧 hello@highflyeraec.org
💬 WhatsApp: +234 801 234 5678

---

## 📜 Licence

This website was built for Highflyer Adult Education Centre. All content, stories, and design are the property of Highflyer Adult Education Centre. Not for redistribution without permission.

---

*Built with care. Every line of code written in service of the belief that it is never too late to learn to read.*

