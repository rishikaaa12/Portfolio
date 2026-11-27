# Rishika Bhardwaj — Portfolio Website

A creative, responsive multi-page portfolio built with plain HTML, CSS, and JavaScript.

## Pages
- `index.html` — Home and featured projects
- `about.html` — About and journey timeline
- `projects.html` — Elixra and JanSeva project details
- `skills.html` — Technical skills, professional strengths, and courses
- `contact.html` — Accessible contact form with client-side validation

## Run locally in VS Code
1. Extract this ZIP to a folder, for example `rishika-portfolio`.
2. Open VS Code → **File → Open Folder** → choose the extracted folder.
3. Install the **Live Server** extension (optional but beginner-friendly).
4. Right-click `index.html` → **Open with Live Server**.
5. Test the links, mobile menu, contact form, and layouts by resizing your browser.

You can also open `index.html` directly in a browser. Live Server is recommended for a smoother development workflow.

## Personalise before publishing
- Replace the initials placeholder in the home page with your own photo if you want. Keep a copy in `assets/` and use an `<img>` with descriptive `alt` text.
- Confirm your email, LinkedIn, GitHub, education dates, skills, and certificate names.
- Add your real resume PDF as `assets/Rishika-Bhardwaj-Resume.pdf`. Until then, the Resume link will not open a real file.
- Replace generic LinkedIn/GitHub links with your profile URLs.
- Skill bars are illustrative; adjust them to your honest self-assessment.
- The contact form validates on the client and opens the visitor's email app via `mailto:`. It does not send to a server. For a real production form, connect a backend or a form service and add spam protection.

## AI-assisted development workflow
Use ChatGPT, GitHub Copilot, or another coding assistant to:
1. Ask for one focused change at a time (for example, “Make the mobile navigation close when Escape is pressed”).
2. Name the exact file and describe the expected result.
3. Ask the AI to explain the change and any accessibility implications.
4. Review the diff, run the site, and test both valid and invalid form input.
5. Never paste passwords, private API keys, or personal data into AI prompts.

## Deploy on Vercel
### Option A — Import from GitHub
1. Create a GitHub repository and upload the contents of this folder (the HTML files must be at the repository root).
2. Sign in at https://vercel.com and choose **Add New → Project**.
3. Import the repository.
4. For a static HTML website, leave the framework preset as **Other**. No build command is needed; the output directory can be `.` (the repository root).
5. Deploy and open the generated URL. Every page is a separate HTML file, so normal links work without extra routing configuration.

### Option B — Vercel CLI
1. Install Node.js if it is not installed.
2. Open a terminal in this project folder.
3. Run `npm install -g vercel`.
4. Run `vercel` and follow the prompts.
5. For a production deployment, run `vercel --prod`.

## Accessibility and responsive features
- Semantic page landmarks and labels
- Visible keyboard focus on form controls
- Mobile navigation with `aria-expanded` and Escape-key support
- Required-field, email, minimum-length, and consent validation
- Reduced-motion preference support
- Responsive layouts for mobile, tablet, and desktop
