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
  styleUrl: './icon.scss',
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
  readonly svgContentSafe = signal<SafeHtml>('');

  constructor() {
    effect(() => {
      const iconName = this.name();
      if (!iconName) {
        this.svgContentSafe.set('');
        return;
      }
      this.loadIcon(iconName);
    });
  }

  private loadIcon(iconName: string): void {
    const fileName = iconName.endsWith('.svg') ? iconName : `${iconName}.svg`;
    const path = `${this.iconBasePath()}/${fileName}`.replace(/\/+/g, '/');

    this.http
      .get(this.assetUrl(path), { responseType: 'text' })
      .pipe(catchError(() => of('')))
      .subscribe((svg) => {
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
