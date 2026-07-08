import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'mix-pagination',
  standalone: true,
  templateUrl: './pagination.html',
  styles: [
    `
      :host {
        --mix-pagination-gap: 8px;
        --mix-pagination-btn-bg: var(--surface-solid);
        --mix-pagination-btn-color: var(--text-color);
        --mix-pagination-btn-border: var(--gray-100);
        --mix-pagination-btn-active-bg: var(--primary);
        --mix-pagination-btn-active-color: var(--surface-solid);
        --mix-pagination-input-bg: var(--surface-solid);
        display: block;
      }
    `,
  ],
})
export class Pagination {
  readonly currentPage = input(1);
  readonly totalPages = input(1);
  readonly totalItems = input<number | null>(null);
  readonly pageSize = input<number | null>(null);
  readonly showJump = input(true);
  readonly showPrevNext = input(true);
  readonly maxVisiblePages = input(5);
  readonly ariaLabel = input('Pagination');
  readonly previousLabel = input('Previous');
  readonly nextLabel = input('Next');
  readonly goToPageLabel = input('Go to page');
  readonly pageChange = output<number>();

  readonly resolvedTotalPages = computed(() => {
    const totalItems = this.totalItems();
    const pageSize = this.pageSize();

    if (totalItems !== null && pageSize && pageSize > 0) {
      return Math.max(1, Math.ceil(totalItems / pageSize));
    }

    return Math.max(1, this.totalPages());
  });

  readonly visiblePages = computed(() => {
    const total = this.resolvedTotalPages();
    const current = Math.max(1, Math.min(this.currentPage(), total));
    const maxVisible = Math.max(1, this.maxVisiblePages());

    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, current - half);
    let end = start + maxVisible - 1;

    if (end > total) {
      end = total;
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  goToPage(page: number): void {
    const boundedPage = Math.max(1, Math.min(page, this.resolvedTotalPages()));
    if (boundedPage !== this.currentPage()) {
      this.pageChange.emit(boundedPage);
    }
  }

  commitPageInput(rawValue: string): void {
    const value = Number(rawValue);
    if (!Number.isFinite(value)) {
      return;
    }

    this.goToPage(Math.trunc(value));
  }
}
