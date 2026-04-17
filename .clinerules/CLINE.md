# Documentation Index - Jock's Karaoke

## Quick Reference: When to Use Each Documentation File

| Task | Documentation File |
|------|-------------------|
| **First-time setup / Getting started** | `README.md` |
| **Deploy to production** | `deploy/DEPLOYMENT.md` |
| **Understand system architecture** | `ARCHITECTURE.md` |
| **Contribute code** | `CONTRIBUTING.md` |
| **Check what changed recently** | `CHANGELOG.md` |
| **Test API endpoints** | `backend/API.md` |
| **Configure environment variables** | `.env.example` |
| **Understand project overview** | `implementation_plan.md` |
| **WordPress deployment** | `deploy/WORDPRESS_SETUP.md` |

---

## File-by-File Guidance

### `README.md`
**Use when:**
- First exploring the project
- Need quick start commands (dev/prod)
- Looking for deployment troubleshooting
- Want to understand project structure at a glance

**What it contains:**
- Quick start (production deploy, local dev)
- Quick development commands
- Deployment tasks using Taskfile
- Environment variables overview
- Troubleshooting common issues
- Project structure tree

### `deploy/DEPLOYMENT.md`
**Use when:**
- Building and pushing Docker images
- Deploying to production server
- Troubleshooting deployment issues
- Rolling back to previous version
- Verifying deployment health
- Resetting database

**What it contains:**
- One-command deployment (`task release:all`)
- Step-by-step deployment instructions
- Environment variables explained
- Post-deployment verification
- Comprehensive troubleshooting
- Rollback procedures
- Docker Hub repository info

### `ARCHITECTURE.md`
**Use when:**
- Understanding how the system works
- Learning about tech stack
- Seeing data flow between components
- Understanding directory structure
- Reviewing security considerations

**What it contains:**
- High-level architecture diagram
- Technology stack (frontend/backend/infra)
- Data flow for auth, songs, high scores
- Database schema overview
- Directory structure explanation
- API endpoints list
- Deployment model

### `CONTRIBUTING.md`
**Use when:**
- You want to contribute to the project
- Need to understand code style
- Creating a new component
- Writing tests
- Submitting a pull request
- Reporting issues

**What it contains:**
- Development setup (Docker, local MySQL)
- Project structure explanation
- Adding new component examples
- Testing guidelines (frontend/backend)
- Code style guidelines
- Branching strategy
- PR checklist
- Issue reporting guidelines

### `CHANGELOG.md`
**Use when:**
- Checking what changed in recent versions
- Understanding migration history
- Planning feature requests
- Looking at future roadmap items

**What it contains:**
- Version 2.0.0 changelog (Emotion migration)
- Version 1.0.0 features
- Unreleased planned features
- Current in-progress work

### `implementation_plan.md`
**Use when:**
- Need project overview
- Want current tech stack details
- Reviewing completed migrations
- Looking at future enhancements
- Understanding API endpoints

**What it contains:**
- Project overview
- Complete technical stack
- Core features list
- Project structure tree
- Documentation index
- Known issues
- Future enhancement priorities

### `.env.example`
**Use when:**
- Setting up new environment
- Understanding what variables are needed
- Generating secure secrets
- Local vs production configuration

**What it contains:**
- MySQL configuration section
- Security secrets section
- Frontend environment variables
- Production template guide
- Local development template guide

### `backend/API.md`
**Use when:**
- Testing API endpoints manually
- Writing frontend service code
- Debugging API responses
- Understanding authentication flow

**What it contains:**
- Authentication instructions
- All API endpoints documented
- Request/response examples
- Error response format
- cURL testing examples
- Rate limiting info

### `deploy/WORDPRESS_SETUP.md`
**Use when:**
- Deploying WordPress (IndustryPlants)
- Setting up WordPress admin account
- Recreating old content
- Troubleshooting WordPress deployment

**What it contains:**
- WordPress environment setup
- Step-by-step WordPress installation
- Admin account creation
- Basic WordPress tasks
- Troubleshooting common issues

### `deploy/Caddyfile`
**Use when:**
- Understanding reverse proxy configuration
- Adding/removing domains
- Troubleshooting proxy issues

**What it contains:**
- Domain route mappings
- Portainer configuration
- Old site redirect
- Backend API routing

---

## Summary Table

| File | Primary Audience | Primary Use Case |
|------|-----------------|------------------|
| `README.md` | All developers | Quick start, common commands |
| `deploy/DEPLOYMENT.md` | DevOps/Developers | Full deployment workflow |
| `ARCHITECTURE.md` | Architects/New dev | System understanding |
| `CONTRIBUTING.md` | Contributors | Contributing code |
| `CHANGELOG.md` | All | Version history |
| `implementation_plan.md` | Developers | Project overview |
| `.env.example` | All developers | Environment setup |
| `backend/API.md` | Frontend devs/API testers | API documentation |
| `deploy/WORDPRESS_SETUP.md` | WordPress admin | WordPress deployment |

---

## Tips for Finding Information

1. **For immediate actions:** Start with `README.md`
2. **For complex tasks:** Check `deploy/DEPLOYMENT.md`
3. **For understanding:** Read `ARCHITECTURE.md`
4. **For contributing:** Follow `CONTRIBUTING.md`
5. **For API testing:** Use `backend/API.md`
6. **For environment setup:** Use `.env.example` as template

---

*Last updated: 2026-03-14*