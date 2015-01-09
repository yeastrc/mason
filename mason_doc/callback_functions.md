# Callback Functions

Recall that the Mason viewer is instantiated with JavaScript similar to:

```javascript
MasonViewer.createMasonViewer( $rootDiv, requestParams, configParams, callbackFunctionsObj );
```
In this document, we describe the `callbackFunctionsObj` object, which contains JavaScript callback functions that define customizable behavior of the Mason viewer--such as tooltips, click event handlers, and advanced coloring or shading. This document is for those intending to write their own module.

Below is example JavaScript for creating the `callbackFunctionsObj` object, which shows the names of the expected properties.
```javascript
  var callbackFunctionsObj = {
    mainRowsLabel_callbackFunctions: mainRowsLabel_callbackFunctions,
    mainRowsBlocks_callbackFunctions: mainRowsBlocks_callbackFunctions,
    rowTotalBar_callbackFunctions: rowTotalBar_callbackFunctions,
    combinedRow_callbackFunctions: combinedRow_callbackFunctions,
    combinedRowTotalBar_callbackFunctions: combinedRowTotalBar_callbackFunctions,
    mainRowsVerticalLines_callbackFunctions: mainRowsVerticalLines_callbackFunctions,
    combinedRowVerticalLines_callbackFunctions: combinedRowVerticalLines_callbackFunctions,
    allRowsVerticalLines_callbackFunctions: allRowsVerticalLines_callbackFunctions
  };
  ```
<b> Note, only the `mainRowsLabel_callbackFunctions`, `mainRowsBlocks_callbackFunctions`, and `combinedRow_callbackFunctions` properties are required:
  -I f the property `rowTotalBar_callbackFunctions` does not exist, the totals bar to the right of the main rows will not be created.
  - If the property `combinedRowTotalBar_callbackFunctions` does not exist, the totals bar to the right of the combined row will not be created.
  - If the property `mainRowsVerticalLines_callbackFunctions` does not exist, the vertical lines in the main rows will not
be created.
  - If the property `combinedRowVerticalLines_callbackFunctions` does not exist, the vertical lines in the combined row will not be created.
  - If the property `allRowsVerticalLines_callbackFunctions` does not exist, the vertical lines that span all the rows will not be created.


  
