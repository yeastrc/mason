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

Each of these properties references a JavaScript object that contains defined callback functions for separate aspects of the Mason viewer. For example, `mainRowsLabel_callbackFunctions` contains functions pertaining to the row labels and `mainRowsBlocks_callbackFunctions` contains functions pertaining to the blocks being displayed in the viewer. (Note, only the `mainRowsLabel_callbackFunctions` and `mainRowsBlocks_callbackFunctions` properties are required.) Each of these properties is summarized below with links to more detailed information:

- `mainRowsLabel_callbackFunctions` manages the appearance and behavior of the label to the left of each row. This property is required. `mainRowsLabel_callbackFunctions` is covered in detail <a href="callbacks/mainRowsLabel_callbackFunctions.md">here</a>.

- `mainRowsBlocks_callbackFunctions` manages the appearance and behavior of the blocks in each row. This property is required. `mainRowsBlocks_callbackFunctions` is covered in detail <a href="callbacks/mainRowsBlocks_callbackFunctions.md">here</a>.

- `rowTotalBar_callbackFunctions` is covered in detail <a href="callbacks/rowTotalBar_callbackFunctions.md">here</a>.

- `combinedRow_callbackFunctions` is covered in detail <a href="callbacks/combinedRow_callbackFunctions.md">here</a>.

- `combinedRowTotalBar_callbackFunctions` is covered in detail <a href="callbacks/combinedRowTotalBar_callbackFunctions.md">here</a>.

- `mainRowsVerticalLines_callbackFunctions` is covered in detail <a href="callbacks/mainRowsVerticalLines_callbackFunctions.md">here</a>.

- `combinedRowVerticalLines_callbackFunctions` is covered in detail <a href="callbacks/combinedRowVerticalLines_callbackFunctions.md">here</a>.

- `allRowsVerticalLines_callbackFunctions` is covered in detail <a href="callbacks/allRowsVerticalLines_callbackFunctions.md">here</a>.


