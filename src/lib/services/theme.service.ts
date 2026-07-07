import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { MIXOLOGY_UI_CONFIG, MixologyTheme } from '../config/mixology-ui.config';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly config = inject(MIXOLOGY_UI_CONFIG);

  constructor() {
    const defaultTheme = this.config.defaultTheme;
    if (defaultTheme && defaultTheme !== 'default') {
      this.setTheme(defaultTheme);
    }
  }

  setTheme(theme: MixologyTheme): void {
    if (!theme || theme === 'default') {
      this.clearTheme();
      return;
    }

    this.document.documentElement.setAttribute('data-theme', theme);
  }

  clearTheme(): void {
    this.document.documentElement.removeAttribute('data-theme');
  }

  getTheme(): MixologyTheme {
    return this.document.documentElement.getAttribute('data-theme') ?? 'default';
  }
}
