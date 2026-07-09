# Source Inventory

This file records where the profile facts came from inside the project.

## Main Sources

### `index.html`

Useful profile content:

- Name: Yashodhar Mahajan.
- Role: Software Developer.
- Homepage intro: automation engineer and software developer on a multidisciplinary journey.
- Newsletter link and description.
- Social links: Substack, LinkedIn, Instagram, Twitter/X.
- About section describing mechanical-engineering roots, programming, automation, labs, schools, businesses, and charity technology education.
- Resume modal with experience, education, skills, project, technologies, email, and masked phone number.

### `projects.html`

Useful project content:

- Portfolio intro text.
- Project cards with titles, years, categories, and image sources.
- GitHub repository names embedded in some image URLs.

Completeness issue:

- Project modals still contain placeholder titles and lorem ipsum text, so modal content should not be treated as real profile data.
- The linked `src/projects/beyond2026.html` file was not found in the scanned project file list.

### `blog.html`

Useful writing content:

- Article cards: "Playing Detective", "It's Complicated", and "Notes to My Younger Self".
- Blog categories: Growth and Life.
- Substack embed link.
- Social links in footer.

### `contact.html`

Useful contact content:

- Footer social links.
- Email address.
- Masked phone number.
- Contact-message positioning around Twitter DM response time.

### `README.txt`

Content:

- "Portfolio Website"

## Other Project Files

### `src/projects/yss.html`

This is a standalone personal/apology interactive page. It is part of the repository, but it does not appear to be a professional portfolio/profile source for Yashodhar Mahajan. It was not used for the professional profile docs.

### Travel itinerary pages

Files such as `src/projects/tallinn_itinerary_3_april_2026.html` and `src/projects/helsinki_3_day_itinerary.html` mention Yash as a traveler in group itineraries. They do not add professional profile information and were not used for the profile docs.

## Known Gaps

- No PDF CV file was found in the scanned file list, even though the UI has a "Download PDF" button.
- Some project details are only available as card titles and images; richer descriptions are missing from the local HTML.
- The phone number is masked in source and should stay masked unless Yashodhar chooses to publish the full number.
- Dates in the resume modal use repeated placeholder `datetime` values, so the visible text dates are more reliable than the HTML date attributes.

