# Dos Ríos

Website for Dos Ríos Argentine Tango — a tango community in Winnipeg, Manitoba.

Built with [Astro](https://astro.build) and deployed on [Cloudflare Pages](https://pages.cloudflare.com).

## Development

Requires Docker.

```bash
make dev       # start local dev server at http://localhost:4321
make build     # build for production
make preview   # preview production build locally
```

## Content

Content is managed through Markdown files in `src/content/`:

| Folder | Description |
|--------|-------------|
| `blog/` | Blog posts |
| `events/` | One-off events (milongas, workshops, etc.) |
| `schedule/` | Recurring events (weekly practica, classes) |

### Adding a blog post

Create a new file in `src/content/blog/`:

```markdown
---
title: Post Title
date: 2026-06-01
description: A short description.
---

Post content here.
```

### Adding an event

Create a new file in `src/content/events/`:

```markdown
---
title: Event Name
date: 2026-06-14
time: 8:00 PM - 11:00 PM
location: Venue Name, Address
description: Short description.
type: milonga  # milonga | practica | class | workshop
style: traditional  # traditional | nuevo | mixed (optional)
featured: false
---

Full event details here.
```

## Deployment

Pushes to `master` deploy automatically via Cloudflare Pages.
