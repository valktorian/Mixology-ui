import { Component, computed, effect, forwardRef, input, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextInputId = 0;

export type MixInputType = 'text' | 'url' | 'number' | 'email' | 'password' | 'search';

@Component({
  selector: 'mix-input',
  standalone: true,
  templateUrl: './input.html',
  styles: [
    `
      :host {
        display: block;
        --mix-input-border: var(--gray-100);
        --mix-input-bg: var(--surface-soft);
        --mix-input-focus: var(--focus-ring);
        --mix-input-radius: 12px;
        --mix-input-padding: 10px 12px;
        --mix-input-error: var(--error-border);
        --mix-input-hint-color: var(--text-muted);
      }

      .app-input__field {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .app-input__label {
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--text-color);
      }

      .app-input__required {
        color: var(--primary);
        margin-left: 2px;
      }

      .app-input__control {
        width: 100%;
        border: 1px solid var(--mix-input-border);
        border-radius: var(--mix-input-radius);
        padding: var(--mix-input-padding);
        font: inherit;
        color: var(--text-color);
        background-color: var(--mix-input-bg);
        outline: none;
        transition:
          border-color 0.2s ease,
          box-shadow 0.2s ease;
      }

      .app-input__control:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 3px var(--mix-input-focus);
      }

      .app-input__control[aria-invalid='true'] {
        border-color: var(--mix-input-error);
      }

      .app-input__control:disabled,
      .app-input__control[readonly] {
        opacity: var(--opacity-disabled);
        cursor: not-allowed;
      }

      .app-input__control--textarea {
        resize: vertical;
        min-height: 90px;
      }

      .app-input__hint,
      .app-input__error {
        font-size: 0.8rem;
        line-height: 1.35;
      }

      .app-input__hint {
        color: var(--mix-input-hint-color);
      }

      .app-input__error {
        color: var(--mix-input-error);
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppInput),
      multi: true,
    },
  ],
})
export class AppInput implements ControlValueAccessor {
  readonly id = input(`mix-input-${nextInputId++}`);
  readonly name = input('');
  readonly label = input('');
  readonly placeholder = input('');
  readonly type = input<MixInputType>('text');
  readonly value = input<string | undefined>(undefined);
  readonly required = input(false);
  readonly multiline = input(false);
  readonly rows = input(3);
  readonly autocomplete = input('');
  readonly hint = input('');
  readonly error = input('');
  readonly readonly = input(false);
  readonly maxlength = input<number | null>(null);
  readonly minlength = input<number | null>(null);
  readonly ariaDescribedBy = input('');
  readonly disabled = signal(false);
  readonly innerValue = signal('');

  readonly valueChange = output<string>();

  readonly describedBy = computed(() => {
    const ids = [this.ariaDescribedBy()];
    if (this.hint()) {
      ids.push(`${this.id()}-hint`);
    }
    if (this.error()) {
      ids.push(`${this.id()}-error`);
    }

    return ids.filter(Boolean).join(' ') || null;
  });

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    effect(() => {
      const externalValue = this.value();
      if (externalValue === undefined) {
        return;
      }

      this.innerValue.set(externalValue);
    });
  }

  onInput(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
      return;
    }

    const nextValue = target.value;
    this.innerValue.set(nextValue);
    this.valueChange.emit(nextValue);
    this.onChange(nextValue);
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: string | null): void {
    this.innerValue.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
