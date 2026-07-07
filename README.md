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

```ts
import { RoundButton, Icon, AppInput } from 'mixology-ui';
```

```html
<mix-round-button>
  <mix-icon name="save" ariaLabel="Save" />
  Save
</mix-round-button>

<mix-input label="Name" placeholder="Cocktail name" />
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

## Adding more components

Add new reusable components under `src/lib/components`, then export them from `src/public-api.ts`.

