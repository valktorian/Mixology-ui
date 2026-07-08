# mixology-ui

Reusable Angular UI components and CSS-variable themes extracted from the cocktail app.

## Install from GitHub

```bash
npm install github:valktorian/mixology-ui
```

## Add the styles

Import the global theme styles once in your app styles file:

```scss
@use 'mixology-ui/styles';
```

## Provide config

```ts
import { provideHttpClient } from '@angular/common/http';
import { provideMixologyUi } from 'mixology-ui';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideMixologyUi({
      defaultTheme: 'moon',
      iconBasePath: '/assets/icons',
      iconFallbackName: 'sparkles-solid-full',
    }),
  ],
});
```

The library applies themes by setting `data-theme` on `document.documentElement`:

```ts
import { ThemeService } from 'mixology-ui';

const theme = inject(ThemeService);
theme.setTheme('night-meteor');
theme.clearTheme();
```

## Use components

```html
<mix-round-button variant="secondary" size="lg" ariaLabel="Save cocktail">
  <mix-icon name="save" ariaLabel="Save" />
  Save
</mix-round-button>

<mix-input
  label="Name"
  placeholder="Cocktail name"
  hint="Used in lists and details pages"
/>

<mix-search-bar
  placeholder="Search cocktails"
  [debounceMs]="300"
  (submitted)="onSearch($event)"
/>

<mix-sorting
  [options]="sortOptions"
  [value]="sortState"
  (sortChange)="onSortChange($event)"
/>

<mix-card variant="elevated">
  <mix-badge variant="success">Published</mix-badge>
  <mix-chip [selected]="true">Gin</mix-chip>
</mix-card>

<mix-empty-state
  title="No results"
  description="Try another search or adjust the filters."
>
  <mix-round-button variant="primary">Reset filters</mix-round-button>
</mix-empty-state>
```

```ts
import { MixSortOption, MixSortState } from 'mixology-ui';

sortOptions: MixSortOption[] = [
  { key: 'name', label: 'Sort by name', iconAsc: 'arrow-up-a-z-solid-full', iconDesc: 'arrow-down-z-a-solid-full' },
  { key: 'createdAt', label: 'Sort by date', iconAsc: 'datefns', iconDesc: 'datefns-down' },
];

sortState: MixSortState = { key: 'name', direction: 'asc' };
```

## Icons

`mix-icon` loads SVG files from `iconBasePath`. Put your SVGs in the consuming app, for example:

```txt
public/assets/icons/save.svg
public/assets/icons/spinner-solid-full.svg
```

Then use:

```html
<mix-icon name="save" />
```

## Customisation

Use `input` / `output` for behaviour and CSS variables for fine styling.

Examples:

```scss
mix-round-button {
  --mix-btn-bg: #17324d;
  --mix-btn-color: white;
}

mix-input {
  --mix-input-border: #94a3b8;
  --mix-input-focus: #bfdbfe;
}
```

## Adding more components

Add new reusable components under `src/lib/components`, then export them from `src/public-api.ts`.

