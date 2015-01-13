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

- `mainRowsLabel_callbackFunctions` manages the appearance and behavior of the label to the left of each row. `mainRowsLabel_callbackFunctions` is covered in detail <a href="callbacks/mainRowsLabel_callbackFunctions.md">here</a>. (Required)

- `mainRowsBlocks_callbackFunctions` manages the appearance and behavior of the blocks in each row. `mainRowsBlocks_callbackFunctions` is covered in detail <a href="callbacks/mainRowsBlocks_callbackFunctions.md">here</a>. (Required)

- `rowTotalBar_callbackFunctions` manages the apperance and behavior of the totals block to the right of each row. `rowTotalBar_callbackFunctions` is covered in detail <a href="callbacks/rowTotalBar_callbackFunctions.md">here</a>. (Optional)

- `combinedRow_callbackFunctions` manages the appearance and behavior of the blocks in the combined/summary row (if enabled). `combinedRow_callbackFunctions` is covered in detail <a href="callbacks/combinedRow_callbackFunctions.md">here</a>. (Optional)

- `combinedRowTotalBar_callbackFunctions` manages the appearance and behavior of the total block to the right of the combined row (if enabled). `combinedRowTotalBar_callbackFunctions` is covered in detail <a href="callbacks/combinedRowTotalBar_callbackFunctions.md">here</a>. (Optional)

- `mainRowsVerticalLines_callbackFunctions` is covered in detail <a href="callbacks/mainRowsVerticalLines_callbackFunctions.md">here</a>.

- `combinedRowVerticalLines_callbackFunctions` is covered in detail <a href="callbacks/combinedRowVerticalLines_callbackFunctions.md">here</a>.

- `allRowsVerticalLines_callbackFunctions` is covered in detail <a href="callbacks/allRowsVerticalLines_callbackFunctions.md">here</a>.


