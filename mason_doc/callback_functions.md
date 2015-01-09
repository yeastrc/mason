# Callback Functions

Recall that the Mason viewer is instantiated with JavaScript similar to:

```javascript
MasonViewer.createMasonViewer( $rootDiv, requestParams, configParams, callbackFunctionsObj );
```
In this document, we describe the `callbackFunctionsObj` object, which contains JavaScript callback functions that define customizable behavior of the Mason viewer--such as tooltips, click event handlers, and advanced coloring or shading. This document is for those intending to write their own module.

The definition of the requestParams object must adhere to the following format:
