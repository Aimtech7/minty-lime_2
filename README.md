# Minty Lime (Aimtech) — Static Website

## Purpose

This repository contains a static, deployable snapshot of the Minty Lime / Aim Tech marketing website.

It is organized to be easy to maintain and extend (including future AI/Machine Learning integrations) while keeping third‑party dependencies isolated.

## Project Structure

- `index.html`
  - Main landing page.
- `about-us/`, `what-we-do/`, `case-studies/`, `resources/`, etc.
  - Folder-per-page structure (each contains an `index.html`).
  - This preserves pretty URLs when hosted on a static host.

### Assets

- `assets/images/`
  - Site media (moved from the WordPress `uploads/YYYY/` structure).
- `assets/fonts/`
  - Self-hosted web fonts used by the site.
- `assets/videos/`
  - Reserved for video assets (currently may be empty).

### Vendor (third-party)

- `vendor/`
  - Third‑party / exported WordPress assets kept in a preserved directory tree to avoid breaking relative references.
  - Includes:
    - `vendor/wp-content/plugins/` (Elementor, Jet plugins, etc.)
    - `vendor/wp-content/themes/`
    - `vendor/wp-content/uploads/elementor/` (Elementor-generated CSS and font CSS)
    - `vendor/wp-includes/` (WordPress core JS such as jQuery)
    - `vendor/cdn-cgi/` (Cloudflare scripts)

### First-party code (for future work)

- `css/`
  - Place project-specific styles here going forward (overrides, custom components, etc.).
- `js/`
  - Place project-specific scripts here going forward (analytics wrappers, AI widgets, client-side apps, etc.).

## Notes on Refactor

- Asset references in HTML/CSS/JS were updated to use **root-relative paths** (e.g. `/vendor/...`, `/assets/...`) so that nested pages keep working consistently.
- Redundant exported files like `index.html%3Fjet_download=...` were removed.

## Local Preview

You can preview the site with any static server (recommended so root-relative paths work):

- Python:
  - `python3 -m http.server 8080`

Then open:

- `http://localhost:8080/`

## Ownership

Maintained by **Aimtech**.
