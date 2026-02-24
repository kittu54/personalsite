# Personal Portfolio

A modern, Apple-esque personal portfolio site with 3D kinetic sculptures, ambient flow fields, and premium motion design. Built for a CS × Economics student / engineer.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **3D**: React Three Fiber + Drei
- **Smooth Scroll**: Lenis

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts + metadata
│   ├── page.tsx            # Main portfolio page
│   ├── globals.css         # Global styles + custom theme
│   └── writing/[slug]/     # Blog post pages
├── components/
│   ├── Navbar.tsx           # Fixed nav with blur backdrop
│   ├── Hero.tsx             # Hero section with CTAs
│   ├── Hero3D.tsx           # 3D kinetic torus knot sculpture
│   ├── IntroSequence.tsx    # "System status" typing intro
│   ├── FeaturedProjects.tsx # Project grid with glass cards
│   ├── ProjectModal.tsx     # Expanded project detail modal
│   ├── About.tsx            # Bio + principles
│   ├── Timeline.tsx         # Animated milestone timeline
│   ├── ToolboxConstellation.tsx # Filterable skills layout
│   ├── Writing.tsx          # Blog post cards
│   ├── ContactForm.tsx      # Form with "charging" send button
│   ├── Footer.tsx           # Minimal footer
│   ├── MagneticButton.tsx   # Cursor-responsive magnetic button
│   ├── GlassCard.tsx        # 3D tilt card with light gradient
│   ├── ScrollCue.tsx        # Animated scroll indicator
│   ├── SectionTransition.tsx # Scroll-triggered section reveal
│   ├── FlowField.tsx        # Ambient particle flow canvas
│   └── SmoothScroll.tsx     # Lenis smooth scroll wrapper
├── data/
│   └── content.ts           # All editable portfolio content
├── hooks/
│   ├── useReducedMotion.ts  # Respects prefers-reduced-motion
│   └── useMousePosition.ts  # Mouse tracking hook
└── lib/
    └── utils.ts             # cn() utility
```

## Customization

All content lives in `src/data/content.ts`:

- **siteConfig**: Name, headline, links, resume URL
- **projects**: Featured work with problem/approach/result
- **timeline**: Career milestones
- **skillCategories**: Toolbox categories and skills
- **blogPosts**: Writing content with full markdown-style text
- **principles**: Core values displayed in About section

Replace `public/resume.pdf` with your actual resume.

## Key Features

- **Intro Sequence**: Terminal-style typing animation on first visit (session-cached)
- **3D Kinetic Sculpture**: Morphing torus knot that responds to cursor movement
- **Glass Cards**: 3D tilt with radial light gradient on hover
- **Magnetic Buttons**: Cursor-proximate spring physics
- **Flow Field Particles**: Ultra-subtle ambient canvas particles
- **Kinetic Typography**: Hero headline letter-spacing shifts on scroll
- **Section Transitions**: Scroll-triggered fade + translate reveals
- **Constellation Skills**: Filterable animated layout with category chips
- **Charging Send Button**: Energy-fill animation on hover
- **Smooth Scrolling**: Lenis-powered buttery scroll
- **Reduced Motion**: Respects OS preferences + disables all animation

## Accessibility

- Semantic HTML with proper heading hierarchy
- ARIA labels on interactive elements
- Keyboard-navigable (ESC closes modals)
- Focus-visible outlines
- Respects `prefers-reduced-motion`
- Proper color contrast ratios
