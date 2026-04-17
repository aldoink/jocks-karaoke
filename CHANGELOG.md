# Changelog

All notable changes to Jock's Karaoke will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-03-14

### Added
- Emotion CSS-in-JS styling across all components
- Consolidated TypeScript types in shared types file
- Docker Compose development stack
- Caddy reverse proxy with automatic HTTPS
- Flyway database migrations

### Changed
- Migrated all styled-components to emotion (11KB bundle size reduction)
- Updated dependency on `jest-styled-components` (now unused)

### Removed
- `jest-styled-components` (replaced by emotion)

---

## [1.0.0] - Initial Release

### Added
- React + TypeScript frontend application
- Spring Boot + Kotlin backend API
- JWT-based authentication
- Song search functionality
- High score leaderboard
- Docker Compose deployment configuration
- Flyway database migrations

---

## [Unreleased]

### Planned
- Add comprehensive API documentation (OpenAPI/Swagger)
- Implement user profile management
- Add song category filters
- Implement song favorites system
- Add social media sharing integration

### In Progress
- Improve database indexing for faster searches
- Add caching layer for frequently accessed data
- Implement rate limiting on API endpoints