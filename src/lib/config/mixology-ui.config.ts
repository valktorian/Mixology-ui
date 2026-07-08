import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

export type MixologyTheme = 'default' | 'moon' | 'night-meteor' | string;
export type MixButtonType = 'button' | 'submit' | 'reset';
export type MixComponentSize = 'sm' | 'md' | 'lg';
export type MixButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type MixCardVariant = 'default' | 'elevated' | 'outlined';
export type MixBadgeVariant = 'neutral' | 'success' | 'warning' | 'danger';
export type MixChipVariant = 'filled' | 'outlined' | 'soft';

export interface MixSortOption {
  key: string;
  label: string;
  iconAsc?: string;
  iconDesc?: string;
}

export interface MixSortState {
  key: string;
  direction: 'asc' | 'desc';
}

export interface MixologyUiConfig {
  iconBasePath?: string;
  defaultTheme?: MixologyTheme;
  iconFallbackName?: string;
}

export const MIXOLOGY_UI_CONFIG = new InjectionToken<MixologyUiConfig>('MIXOLOGY_UI_CONFIG', {
  factory: () => ({
    iconBasePath: '/assets/icons',
    defaultTheme: 'default',
    iconFallbackName: '',
  }),
});

export function provideMixologyUi(config: MixologyUiConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: MIXOLOGY_UI_CONFIG, useValue: config }]);
}

