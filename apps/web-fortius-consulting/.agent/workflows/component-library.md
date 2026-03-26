---
description: How to add components to the @fortius/ui shared design system package
---

# Adding Components to @fortius/ui

## Prerequisites
- Monorepo is set up with `packages/ui/`
- The component doesn't already exist in the package

## Steps

1. Identify which category the component belongs to:
   - `primitives/` — Atomic UI elements (Button, Input, Card, Badge, Modal)
   - `composites/` — Multi-primitive compositions (Navbar, Footer, HeroSection, PricingTable)
   - `layouts/` — Page-level layout wrappers (PageLayout, SectionLayout, DashboardLayout)

2. Create the component file at the correct path:
```
packages/ui/src/<category>/<ComponentName>.tsx
```

3. Design principles for shared components:
   - **Theme-agnostic**: Use CSS variables or props for colors, never hardcode brand colors
   - **Composable**: Prefer composition over configuration (children > huge prop lists)
   - **Accessible**: Use semantic HTML, ARIA attributes where needed
   - **Typed**: Full TypeScript props interface, export the type too

4. Example component structure:
```tsx
import { type ComponentPropsWithRef } from 'react';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ variant = 'primary', size = 'md', ...props }: ButtonProps) {
  return <button data-variant={variant} data-size={size} {...props} />;
}
```

5. Export from the barrel file:
```ts
// packages/ui/src/index.ts
export { Button, type ButtonProps } from './primitives/Button';
```

6. Verify the package builds:
// turbo
```bash
pnpm turbo build --filter=@fortius/ui
```

7. Use in an app:
```tsx
import { Button } from '@fortius/ui';
```

## Rules
- **Never** import from `packages/ui/src/...` directly — always use the package name `@fortius/ui`
- **Never** put brand-specific styling in shared components — use theme tokens
- **Always** export types alongside components
