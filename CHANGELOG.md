# Changelog

All notable changes to the **DevinBook** project will be documented in this file.

## [1.3.1] - 2026-01-24
### Added
- **Featured Accounts**: Users can now mark specific accounts as "Featured" to highlight their balances directly on the Dashboard overview card.
- **Dedicated Login Portal**: Implemented a standalone `/login` route with forced light-mode styling for a professional first-impression.
- **Account Management**: Added a full Edit Account system with visual badges for featured status.

### Changed
- **PWA Optimization**: Updated launch logic to skip the landing page and open directly into the Dashboard for installed app users.
- **Auth Redirection**: Implemented intelligent redirection logic that sends unauthenticated users to `/login` and authenticated users straight to the dashboard.
- **Transaction UI**: Enhanced entry card visibility with improved rounding, deeper shadows (`shadow-md`), and better background contrast.

### Fixed
- **Transaction Persistence**: Fixed a critical bug where the "Paid From / To" account selection was not being preserved during transaction edits.
- **ID Normalization**: Standardized ID handling between backend and frontend to ensure consistent account and category associations.

## [1.3.0] - 2026-01-21
### Added
- **Landing Page Overhaul**: Entirely new premium, high-density landing page focused on daily expense management.
- **Brand Identity Shift**: Transitioned branding to a vibrant "Electric Purple to Pink" gradient theme.
- **Mobile Guard**: Implemented `DesktopGuard` to enforce mobile-only access for the internal dashboard application while keeping the landing page accessible on PC.
- **SEO & Discoverability**: Added comprehensive SEO metadata, `robots.txt`, and `sitemap.xml`.
- **UX Enhancements**: Enabled smooth scrolling globally and added interactive section anchors.
- **Productivity Features**: Integrated "Live Ledger" and "Daily Burn" widgets into the hero showcase.

## [1.2.6] - 2026-01-20
### Added
- **Rebranding**: Officially renamed application to **DevinBook**.
- **Legal Pages**: Added comprehensive **Terms of Service** and **Privacy Policy** pages.
- **Password Visibility**: Added toggle (eye icon) to show/hide password in the login form.
- **Navigation Logic**: Bottom navigation now automatically hides when the user is not logged in or is on the landing page.

### Changed
- **Auth UI**: Replaced generic icons with the official **Devinsol** logo in the authentication header.
- **Theme Support**: Enhanced `AuthForm` to fully support light mode with system-responsive backgrounds and text.
- **Manifest**: Updated `manifest.json` with new app name and descriptions.
- **Metadata**: Updated SEO metadata and PWA settings in `layout.tsx`.

## [1.2.5] - 2026-01-20
### Added
- **PWA Shortcuts**: Added "Add Transaction", "Categories", and "Profile" shortcuts to `manifest.json` for quick mobile access.
- **Dashboard logic**: Added URL parameter handling (`?action=add`) to trigger the "Add Transaction" modal directly from PWA shortcuts.

### Changed
- **Login Experience**: Completely redesigned the Login/Register page with a **Glassmorphism** aesthetic, improved animations, and a toggle switch.
- **Pie Chart**: Revamped `CategoryPieChart` for better visual density (thicker donut) and added a central "Total Balance" label.

## [1.2.4] - 2026-01-19
### Fixed
- **PDF Generation**: Resolved TypeScript errors related to `jspdf` color handling (`setFillColor` tuples).
- **Chart Tooltips**: Improved styling and data formatting in dashboard charts.

### Changed
- **Mobile Experience**: Set `display: standalone` and `orientation: portrait` in manifest for a native app feel.

## [1.0.0] - 2025-12-29
### Initial Release
- Core Expense Tracking features.
- Dashboard with basic analytics.
- Transaction management (Add/Edit/Delete).
- User Authentication (Login/Register).
