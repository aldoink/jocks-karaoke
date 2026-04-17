# Contributing to Jock's Karaoke

Thank you for your interest in contributing to Jock's Karaoke! This document outlines the contribution guidelines to help you get started.

## Table of Contents

- [Before You Begin](#before-you-begin)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Branching Strategy](#branching-strategy)
- [Creating a Pull Request](#creating-a-pull-request)
- [Issue Reporting Guidelines](#issue-reporting-guidelines)

## Before You Begin

### Understanding the Project

- **Frontend:** React + TypeScript application in `/frontend`
- **Backend:** Spring Boot + Kotlin API in `/backend`
- **Deployment:** Docker Compose with Caddy reverse proxy

### Code of Conduct

Please be respectful and constructive in all interactions. We welcome contributions from everyone.

## Development Setup

### Option 1: Full Stack with Docker (Recommended)

```bash
cd deploy
docker compose -f docker-compose.dev.yml up -d
# Access:
# - Frontend: http://localhost:8080
# - Backend: http://localhost:8081
# - Portainer: http://localhost:8082
```

### Option 2: Local MySQL Access

```bash
# Ensure .env.dev exists in deploy/
cd deploy
MYSQL_HOST=localhost MYSQL_PORT=3306 docker compose -f docker-compose.dev.yml up -d
```

### Backend Only

```bash
cd backend
./gradlew :backend:bootRun
# Access: http://localhost:9090
```

### Frontend Only

```bash
cd frontend
yarn start
# Access: http://localhost:3000
```

## Development Workflow

### Project Structure

```
frontend/src/
├── atoms/          # Reusable primitives (Button, Input, Modal)
├── molecules/      # Component combinations
├── organisms/      # Complex composed components
├── components/     # Presentational components
├── contexts/       # React Context providers
├── hooks/          # Custom React hooks
├── models/         # TypeScript interfaces/types
├── pages/          # Full-page components
└── services/       # API service layer
```

```
backend/src/main/kotlin/com/jockskaraoke/
├── config/         # Spring configuration
├── controllers/    # REST API endpoints
├── models/         # JPA entity classes
├── repositories/   # Data access layer
├── services/       # Business logic
└── security/       # Authentication/authorization
```

### Adding a New Component

1. **Identify the appropriate location:**
   - Simple reusable UI element → `atoms/`
   - Combination of atoms → `molecules/`
   - Complex UI section → `organisms/`
   - Page-specific component → `components/`

2. **Follow existing patterns:**
   - Use TypeScript interfaces for props
   - Add unit tests for new components
   - Use Emotion for styling (no inline styles)

3. **Example - Adding a Button Atom:**

```tsx
// frontend/src/atoms/Button/index.tsx
import { css } from '@emotion/react';
import { Button as MUIButton } from '@mui/material';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary';
  onClick?: () => void;
  fullWidth?: boolean;
}

export const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  onClick,
  fullWidth = false,
}: ButtonProps) => {
  const buttonStyles = css`
    min-height: 40px;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
  `;

  return (
    <MUIButton
      variant={variant}
      color={color}
      style={buttonStyles}
      onClick={onClick}
      fullWidth={fullWidth}
    >
      {children}
    </MUIButton>
  );
};
```

### Testing Guidelines

- **Frontend:** Use Jest and React Testing Library
- **Backend:** Use Spock with Groovy tests

```tsx
// Example frontend test (frontend/src/atoms/Button/index.test.tsx)
import { render, screen } from '@testing-library/react';
import { Button } from '.';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByText('Click me');
    button.click();
    expect(handleClick).toHaveBeenCalled();
  });
});
```

```groovy
// Example backend test (backend/src/test/groovy/...)
import spock.lang.Specification

class MyServiceTest extends Specification {
    MyService service

    def setup() {
        service = new MyService()
    }

    def "should return correct value"() {
        given:
        String input = "test"
        
        when:
        String result = service.process(input)
        
        then:
        result == "processed-test"
    }
}
```

## Code Style

### TypeScript Guidelines

- Use `interface` for type definitions, not `type`
- Avoid `any` type; prefer explicit typing
- Use `React.FC` sparingly; prefer function components
- Prefer `const` over `let`
- Use `camelCase` for variables/functions
- Use `PascalCase` for classes/components

### React Guidelines

- Use functional components with hooks
- Extract state to custom hooks when reusable
- Use named exports for components
- Keep components small and focused
- Use `React.memo` for performance optimization

### Kotlin Guidelines

- Use data classes for DTOs
- Use extension functions when appropriate
- Prefer `val` over `var`
- Use sealed classes for domain events

### SCSS Guidelines

- Use nesting for related styles
- Use mixins for reusable patterns
- Place global styles in `_variables.scss`

### File Naming

- Components: `PascalCase` (e.g., `Button.tsx`)
- Stylesheets: `_variableName.scss` (e.g., `_variables.scss`)
- Tests: `filename.test.tsx` or `filename.test.ts`

## Branching Strategy

### Main Branches

- `main` - Production code (always deployable)
- `develop` - Integration branch (for larger releases)

### Feature Branches

- Pattern: `feature/<type>-<issue-number>-<description>`
- Examples:
  - `feature/auth-login-123-user-login`
  - `bugfix/search-456-songs-search`
  - `refactor/components-789-button-styling`

### Branch Lifecycle

1. Create feature branch from `develop` or `main`
2. Make changes and commit with conventional commits
3. Push branch to remote
4. Create Pull Request
5. PR is reviewed and merged to `develop` or `main`
6. Delete merged branch

## Creating a Pull Request

### PR Checklist

- [ ] All tests passing (`yarn test` and `./gradlew :backend:test`)
- [ ] Code follows style guidelines
- [ ] No lint errors (`yarn lint` if available)
- [ ] Related issues referenced in PR description
- [ ] Changes are limited to the scope of the issue
- [ ] Documentation updated if needed

### PR Template

```
## Changes

- Brief description of changes
- Screenshots if UI changes

## Related Issue

Closes #{issue_number}

## Testing

- Steps to reproduce testing
- Expected behavior
```

## Issue Reporting Guidelines

### Bug Reports

Please include:

1. **Description:** Clear description of the bug
2. **Steps to Reproduce:** Numbered steps to reproduce
3. **Expected Behavior:** What should happen
4. **Actual Behavior:** What actually happens
5. **Environment:** Browser, OS, version
6. **Screenshots:** If applicable

### Feature Requests

- Describe the feature and use case
- Explain the benefit
- Provide examples if possible

### Questions

Use GitHub Discussions or email for general questions.

## Getting Help

- Check existing issues before creating a new one
- Review existing code in relevant directories
- Contact the maintainers via GitHub

## Thank You!

Your contributions make Jock's Karaoke better for everyone. We appreciate your time and effort!