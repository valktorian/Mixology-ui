import { Component, input } from '@angular/core';
import { Icon } from '../icon/icon';

@Component({
  selector: 'mix-loading',
  standalone: true,
  imports: [Icon],
  templateUrl: './loading.html',
  styles: [
    `
      :host {
        display: flex;
        width: 100%;
        min-height: 140px;
        align-items: center;
        justify-content: center;
      }

      .loading-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        color: var(--text-muted);
      }

      .loading-spinner {
        animation: app-spin 0.9s linear infinite;
        pointer-events: none;
      }

      @keyframes app-spin {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class Loading {
  readonly ariaLabel = input('Loading');
  readonly iconName = input('spinner-solid-full');
  readonly size = input(30);
}
