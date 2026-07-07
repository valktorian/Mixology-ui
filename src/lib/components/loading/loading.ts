import { Component, input } from '@angular/core';
import { Icon } from '../icon/icon';

@Component({
  selector: 'mix-loading',
  standalone: true,
  imports: [Icon],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {
  readonly ariaLabel = input('Loading');
  readonly iconName = input('spinner-solid-full');
}
