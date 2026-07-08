import { Component, effect, input, output, signal } from '@angular/core';
import { Icon } from '../icon/icon';

@Component({
  selector: 'mix-search-bar',
  standalone: true,
  imports: [Icon],
  templateUrl: './search-bar.html',
  styles: [
    `
      :host {
        --mix-search-border: var(--gray-100);
        --mix-search-bg: var(--surface-solid);
        --mix-search-radius: var(--radius-pill);
        --mix-search-button-bg: transparent;
        --mix-search-button-color: var(--text-color);
        --mix-search-button-hover-bg: var(--action-hover-soft);
      }

      .search-wrap {
        position: relative;
        width: min(460px, 100%);
      }

      .search-input {
        width: 100%;
        min-width: 340px;
        border: 1px solid var(--mix-search-border);
        border-radius: var(--mix-search-radius);
        padding: 8px 56px 8px 14px;
        font: inherit;
        background: var(--mix-search-bg);
        color: var(--text-color);
      }

      .search-submit {
        position: absolute;
        right: 6px;
        top: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border: 0;
        border-radius: 999px;
        background: var(--mix-search-button-bg);
        color: var(--mix-search-button-color);
        cursor: pointer;
        transform: translateY(-50%);
        transition:
          background-color 0.2s ease,
          color 0.2s ease;
      }

      .search-submit:hover:not(:disabled) {
        background: var(--mix-search-button-hover-bg);
        color: var(--accent-700);
      }

      .search-submit:disabled,
      .search-input:disabled {
        opacity: var(--opacity-disabled);
        cursor: not-allowed;
      }

      @media (max-width: 768px) {
        .search-wrap {
          width: 100%;
        }

        .search-input {
          min-width: 0;
        }
      }
    `,
  ],
})
export class SearchBar {
  readonly value = input('');
  readonly placeholder = input('Search');
  readonly ariaLabel = input('Search');
  readonly buttonAriaLabel = input('Submit search');
  readonly iconName = input('magnifying-glass-solid-full');
  readonly debounceMs = input(250);
  readonly disabled = input(false);
  readonly showSubmitButton = input(true);

  readonly valueChange = output<string>();
  readonly submitted = output<string>();

  readonly query = signal('');

  private debounceHandle: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect((onCleanup) => {
      this.query.set(this.value());
      onCleanup(() => this.clearDebounce());
    });
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement | null)?.value ?? '';
    this.query.set(value);
    this.valueChange.emit(value);
    this.scheduleSubmit();
  }

  submit(): void {
    if (this.disabled()) {
      return;
    }

    this.clearDebounce();
    this.submitted.emit(this.query().trim());
  }

  private scheduleSubmit(): void {
    if (this.disabled()) {
      return;
    }

    this.clearDebounce();
    const delay = Math.max(0, this.debounceMs());

    if (delay === 0) {
      this.submit();
      return;
    }

    this.debounceHandle = setTimeout(() => {
      this.debounceHandle = null;
      this.submitted.emit(this.query().trim());
    }, delay);
  }

  private clearDebounce(): void {
    if (this.debounceHandle !== null) {
      clearTimeout(this.debounceHandle);
      this.debounceHandle = null;
    }
  }
}
