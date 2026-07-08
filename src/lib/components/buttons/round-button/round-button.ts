import { Component, input, output } from '@angular/core';
import { MixButtonType, MixButtonVariant, MixComponentSize } from '../../../config/mixology-ui.config';

@Component({
  selector: 'mix-round-button',
  standalone: true,
  host: {
    '[class.is-active]': 'active()',
    '[class.is-icon-only]': 'iconOnly()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
  },
  templateUrl: './round-button.html',
  styles: [''],
})
export class RoundButton {
  readonly active = input(false);
  readonly iconOnly = input(false);
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly type = input<MixButtonType>('button');
  readonly title = input('');
  readonly ariaLabel = input('');
  readonly variant = input<MixButtonVariant>('primary');
  readonly size = input<MixComponentSize>('md');

  readonly clicked = output<void>();

  handleClick(): void {
    if (this.disabled() || this.loading()) {
      return;
    }

    this.clicked.emit();
  }
}
