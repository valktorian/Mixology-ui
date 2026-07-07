import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

export type MixologyTheme = 'default' | 'moon' | 'night-meteor' | string;

export interface MixologyUiConfig {
  iconBasePath?: string;
  defaultTheme?: MixologyTheme;
}

export const MIXOLOGY_UI_CONFIG = new InjectionToken<MixologyUiConfig>('MIXOLOGY_UI_CONFIG', {
  factory: () => ({
    iconBasePath: '/assets/icons',
    defaultTheme: 'default',
  }),
});

export function provideMixologyUi(config: MixologyUiConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: MIXOLOGY_UI_CONFIG, useValue: config }]);
}

