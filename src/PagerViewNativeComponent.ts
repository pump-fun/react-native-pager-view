import type * as React from 'react';
import type { HostComponent, ViewProps } from 'react-native';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

import type {
  DirectEventHandler,
  Double,
  Int32,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';

export type OnPageScrollEventData = Readonly<{
  position: Double;
  offset: Double;
}>;

export type OnPageSelectedEventData = Readonly<{
  position: Double;
}>;

export type OnPageScrollStateChangedEventData = Readonly<{
  pageScrollState: 'idle' | 'dragging' | 'settling';
}>;

export interface NativeProps extends ViewProps {
  scrollEnabled?: WithDefault<boolean, true>;
  layoutDirection?: WithDefault<'ltr' | 'rtl', 'ltr'>;
  initialPage?: Int32;
  orientation?: WithDefault<'horizontal' | 'vertical', 'horizontal'>;
  offscreenPageLimit?: Int32;
  pageMargin?: Int32;
  overScrollMode?: WithDefault<'auto' | 'always' | 'never', 'auto'>;
  overdrag?: WithDefault<boolean, false>;
  keyboardDismissMode?: WithDefault<'none' | 'on-drag', 'none'>;
  onPageScroll?: DirectEventHandler<OnPageScrollEventData>;
  onPageSelected?: DirectEventHandler<OnPageSelectedEventData>;
  onPageScrollStateChanged?: DirectEventHandler<OnPageScrollStateChangedEventData>;
}

type PagerViewViewType = HostComponent<NativeProps>;

export interface NativeCommands {
  setPage: (
    viewRef: React.ElementRef<PagerViewViewType>,
    selectedPage: Int32
  ) => void;
  setPageWithoutAnimation: (
    viewRef: React.ElementRef<PagerViewViewType>,
    selectedPage: Int32
  ) => void;
  setScrollEnabledImperatively: (
    viewRef: React.ElementRef<PagerViewViewType>,
    scrollEnabled: boolean
  ) => void;
  // FullStory commands - no-op implementations to prevent errors
  dataElement: (
    viewRef: React.ElementRef<PagerViewViewType>,
    data: string
  ) => void;
  dataComponent: (
    viewRef: React.ElementRef<PagerViewViewType>,
    data: string
  ) => void;
  dataSourceFile: (
    viewRef: React.ElementRef<PagerViewViewType>,
    data: string
  ) => void;
  fsClass: (
    viewRef: React.ElementRef<PagerViewViewType>,
    data: string
  ) => void;
  fsAttribute: (
    viewRef: React.ElementRef<PagerViewViewType>,
    data: string
  ) => void;
  fsTagName: (
    viewRef: React.ElementRef<PagerViewViewType>,
    data: string
  ) => void;
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: [
    'setPage',
    'setPageWithoutAnimation',
    'setScrollEnabledImperatively',
    // FullStory commands - prevent "not supported" errors
    'dataElement',
    'dataComponent', 
    'dataSourceFile',
    'fsClass',
    'fsAttribute',
    'fsTagName',
  ],
});

export default codegenNativeComponent<NativeProps>(
  'RNCViewPager'
) as HostComponent<NativeProps>;
