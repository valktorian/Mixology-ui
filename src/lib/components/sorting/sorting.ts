import { Component, input, output } from '@angular/core';
import { MixSortOption, MixSortState } from '../../config/mixology-ui.config';
import { RoundButton } from '../buttons/round-button/round-button';
import { Icon } from '../icon/icon';

@Component({
  selector: 'mix-sorting',
  standalone: true,
  imports: [RoundButton, Icon],
  templateUrl: './sorting.html',
  styles: [
    `
      :host {
        display: block;
      }

      .sorting-actions {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 8px;
        width: 100%;
      }
    `,
  ],
})
export class Sorting {
  readonly options = input<MixSortOption[]>([]);
  readonly value = input<MixSortState | null>(null);
  readonly ariaLabel = input('Sorting');
  readonly buttonVariant = input<'primary' | 'secondary' | 'ghost' | 'danger'>('ghost');
  readonly buttonSize = input<'sm' | 'md' | 'lg'>('md');

  readonly sortChange = output<MixSortState>();

  toggle(option: MixSortOption): void {
    const current = this.value();

    if (!current || current.key !== option.key) {
      this.sortChange.emit({ key: option.key, direction: 'asc' });
      return;
    }

    this.sortChange.emit({
      key: option.key,
      direction: current.direction === 'asc' ? 'desc' : 'asc',
    });
  }

  iconName(option: MixSortOption): string {
    const current = this.value();
    const isActive = current?.key === option.key;
    const direction = isActive ? current.direction : 'asc';

    return direction === 'desc'
      ? (option.iconDesc ?? option.iconAsc ?? 'arrow-down-solid-full')
      : (option.iconAsc ?? option.iconDesc ?? 'arrow-up-solid-full');
  }

  isActive(option: MixSortOption): boolean {
    return this.value()?.key === option.key;
  }
}
