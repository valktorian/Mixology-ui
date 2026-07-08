import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation, effect, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { catchError, of } from 'rxjs';
import { MIXOLOGY_UI_CONFIG } from '../../config/mixology-ui.config';

@Component({
  selector: 'mix-icon',
  standalone: true,
  templateUrl: './icon.html',
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: currentColor;
      }

      .app-icon__svg {
        display: inline-flex;
        line-height: 0;
      }

      .app-icon__svg svg {
        width: 100%;
        height: 100%;
        display: block;
      }

      .app-icon__svg svg * {
        fill: currentColor;
        stroke: currentColor;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class Icon {
  private readonly document = inject(DOCUMENT);
  private readonly http = inject(HttpClient);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly config = inject(MIXOLOGY_UI_CONFIG);

  readonly name = input('');
  readonly size = input(20);
  readonly ariaLabel = input('icon');
  readonly decorative = input(false);
  readonly svgContentSafe = signal<SafeHtml>('');

  constructor() {
    effect(() => {
      const iconName = this.name();
      if (!iconName) {
        this.svgContentSafe.set('');
        return;
      }

      this.loadIcon(iconName, true);
    });
  }

  private loadIcon(iconName: string, allowFallback: boolean): void {
    const fileName = iconName.endsWith('.svg') ? iconName : `${iconName}.svg`;
    const path = `${this.iconBasePath()}/${fileName}`.replace(/\/+/g, '/');

    this.http
      .get(this.assetUrl(path), { responseType: 'text' })
      .pipe(catchError(() => of('')))
      .subscribe((svg) => {
        if (!svg && allowFallback) {
          const fallbackName = this.config.iconFallbackName?.trim();
          if (fallbackName && fallbackName !== iconName) {
            this.loadIcon(fallbackName, false);
            return;
          }
        }

        this.svgContentSafe.set(svg ? this.sanitizer.bypassSecurityTrustHtml(svg) : '');
      });
  }

  private iconBasePath(): string {
    return (this.config.iconBasePath ?? '/assets/icons').replace(/\/$/, '');
  }

  private assetUrl(path: string): string {
    return new URL(path, this.document.baseURI).toString();
  }
}
