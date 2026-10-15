# Petal & Pixel — Coquette Pink Portfolio

A beginner-friendly, responsive personal portfolio made with plain HTML, CSS, and JavaScript. No framework or build step is required.

## Files
- `index.html` — page structure and sample portfolio content
- `style.css` — coquette-pink visual design and responsive layout
- `script.js` — page navigation, demo login, search, add/delete records, local storage

## Run in VS Code
1. Extract the ZIP file.
2. Open the extracted `coquette-portfolio` folder in VS Code.
3. Open `index.html`.
4. For the easiest preview, install the **Live Server** extension by Ritwick Dey, right-click `index.html`, then choose **Open with Live Server**. You can also open `index.html` directly in a browser.

## Deploy to Vercel using GitHub
1. Sign in to GitHub and create a **new repository**.
2. Upload `index.html`, `style.css`, and `script.js` (you may also upload this README).
3. Open https://vercel.com/dashboard and choose **Add New → Project**.
4. Import the GitHub repository.
5. For a plain HTML site, leave the framework preset as **Other** if asked. No build command is needed; if Vercel asks for an output directory, use `.` (the project root).
6. Click **Deploy** and open the URL it provides.

## Customize it
- In `index.html`, edit “Diane”, the about-me paragraph, project names, and email address.
- In `style.css`, change the colors in `:root` to adjust the theme.
- In `script.js`, edit the `starterRecords` array to change the example saved records.

## Important notes
- The sign-in form is a **visual demo only**. It does not authenticate real users and should not be used to protect private information.
- Records are saved in the current browser using `localStorage`. They do not sync across devices or between visitors. For a real multi-user login and shared database, add a backend/auth provider.
- Google Fonts are loaded online; the site still uses fallback fonts if the connection is unavailable.
