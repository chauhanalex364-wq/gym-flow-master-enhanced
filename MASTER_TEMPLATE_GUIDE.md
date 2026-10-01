# Gym Flow Master Template

This repository is the reusable master website for creating separate branded gym websites.

## Where to customize

Edit `src/config.js` for the gym's:
- name, logo initials, tagline
- phone / WhatsApp destination
- location and hours
- accent color
- which sections/features are enabled
- trainers, facilities and demo testimonials

## Feature-removal rule

For a specific gym, duplicate the master project first. Then remove any unwanted feature from the duplicate, not the master.

When removing a feature, remove its UI, routes, imports, navigation links, data model/config, API/backend calls, notification hooks and unused assets/dependencies. Do not merely hide the button.

## Important demo-content rule

Testimonials in the master are clearly labeled as demo content. Replace them with genuine customer reviews before publishing. Do not publish invented reviews as real customer experiences.

## Product model

This is a responsive web app / website. No native Android or iOS app is included in this master.
