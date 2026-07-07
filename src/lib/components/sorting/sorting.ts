import { Component, input, output } from '@angular/core';
import { RoundButton } from '../buttons/round-button/round-button';
import { Icon } from '../icon/icon';

export type SortBy = 'alcoholic' | 'created_at' | string;
export type SortDir = 'asc' | 'desc';

@Component({
  selector: 'mix-sorting',
  standalone: true,
  imports: [RoundButton, Icon],
  templateUrl: './sorting.html',
  styleUrl: './sorting.scss',
})
export class Sorting {
  readonly sortBy = input<SortBy>('alcoholic');
  readonly alcoholicDir = input<SortDir>('asc');
  readonly createdAtDir = input<SortDir>('asc');
  readonly ariaLabel = input('Sorting');
  readonly alcoholLabel = input('Sort by alcohol');
  readonly dateLabel = input('Sort by date');

  readonly alcoholicToggle = output<void>();
  readonly createdAtToggle = output<void>();
}
