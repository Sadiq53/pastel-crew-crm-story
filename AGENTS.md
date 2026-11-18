# Agent Guidelines

## Project rules
- The app is a single slide deck at `/` (current slide in `?slide=N`); slide content and module/feature data live in `src/components/deck/`, with `modules.ts` as the single source of truth for modules and features so the coverage test can guard it.
- Slides render at a fixed 1920x1080 and are scaled by `ScaledSlide`; size slide text with the semantic `.slide-*` classes in `src/styles.css`, not Tailwind text sizes.
- Base component classes (`.slide-content`, `.bento`, `.pill`) sit in `@layer components` so Tailwind color/position utilities can override them.
