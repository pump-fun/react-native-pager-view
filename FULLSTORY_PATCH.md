# FullStory Fabric Compatibility Patch

## Problem

The `react-native-pager-view` library throws errors in React Native's new architecture (Fabric) when FullStory sends `dataElement` commands:

```
RNCViewPager received command dataElement, which is not a supported command.
```

## Root Cause

FullStory calls `Commands.dataElement(pagerViewInstance, "data")` on PagerView components, but PagerView's command handler only supports 3 commands (`setPage`, `setPageWithoutAnimation`, `setScrollEnabledImperatively`) and rejects all others with an error.

## Solution

This patch properly declares FullStory commands as supported in the codegen specification and provides no-op implementations, eliminating the "not a supported command" errors.

### Changes Made

1. **Extended `NativeCommands` interface** in `src/PagerViewNativeComponent.ts`:
   - Added FullStory command signatures (`dataElement`, `dataComponent`, etc.)
   - Declared commands as supported in the `supportedCommands` array

2. **Added no-op implementations** in `ios/RNCPagerViewComponentView.mm`:
   - Provided empty method implementations for all FullStory commands
   - Commands are silently handled without side effects

3. **Updated version** in `package.json` to `7.0.0-fullstory-patch` to indicate this is a patched version

### Supported FullStory Commands

The patch now properly supports these FullStory commands with no-op implementations:
- `dataElement` - FullStory data element tracking
- `dataComponent` - FullStory component tracking  
- `dataSourceFile` - FullStory source file tracking
- `fsClass` - FullStory CSS class tracking
- `fsAttribute` - FullStory attribute tracking
- `fsTagName` - FullStory tag name tracking

### Behavior

- **FullStory commands**: Now properly supported with no-op implementations, no errors thrown
- **Legitimate unsupported commands**: Still throw errors as expected  
- **Original commands**: Work normally (`setPage`, `setPageWithoutAnimation`, `setScrollEnabledImperatively`)

## Usage

This patched version can be used as a drop-in replacement for the original `react-native-pager-view@7.0.0` library when using FullStory with React Native's new architecture (Fabric).

## Testing

To test the patch:

1. Use this patched library in a React Native app with Fabric enabled
2. Integrate FullStory
3. Verify that no red box errors appear when FullStory sends `dataElement` commands
4. Verify that legitimate PagerView functionality still works normally
