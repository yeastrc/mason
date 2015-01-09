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
Note, only the `mainRowsLabel_callbackFunctions`, `mainRowsBlocks_callbackFunctions`, and `combinedRow_callbackFunctions` properties are required:
  - If the property `rowTotalBar_callbackFunctions` does not exist, the totals bar to the right of the main rows will not be created.
  - If the property `combinedRowTotalBar_callbackFunctions` does not exist, the totals bar to the right of the combined row will not be created.
  - If the property `mainRowsVerticalLines_callbackFunctions` does not exist, the vertical lines in the main rows will not
be created.
  - If the property `combinedRowVerticalLines_callbackFunctions` does not exist, the vertical lines in the combined row will not be created.
  - If the property `allRowsVerticalLines_callbackFunctions` does not exist, the vertical lines that span all the rows will not be created.

- `mainRowsLabel_callbackFunctions` is covered in detail <a href="callbacks/mainRowsLabel_callbackFunctions.md">here</a>.
- `mainRowsBlocks_callbackFunctions` is covered in detail <a href="callbacks/mainRowsBlocks_callbackFunctions.md">here</a>.
- `rowTotalBar_callbackFunctions` is covered in detail <a href="callbacks/rowTotalBar_callbackFunctions.md">here</a>.
- `combinedRow_callbackFunctions` is covered in detail <a href="callbacks/combinedRow_callbackFunctions.md">here</a>.
- `combinedRowTotalBar_callbackFunctions` is covered in detail <a href="callbacks/combinedRowTotalBar_callbackFunctions.md">here</a>.
- `mainRowsVerticalLines_callbackFunctions` is covered in detail <a href="callbacks/mainRowsVerticalLines_callbackFunctions.md">here</a>.
- `combinedRowVerticalLines_callbackFunctions` is covered in detail <a href="callbacks/combinedRowVerticalLines_callbackFunctions.md">here</a>.
- `allRowsVerticalLines_callbackFunctions` is covered in detail <a href="callbacks/allRowsVerticalLines_callbackFunctions.md">here</a>.

## When are the callback functions called?
Below is a description of when the various callback functions are called by the Mason viewer and what parameters are passed into them. Note that all functions take as their parameter a single properties object that associates specific property names with values. Every properties object should contain a property named `callbackDataStorage`, which can store data and retrieve it in subsequent function calls. An example use would be to precompute the the tool tip text and then return that on subsequent calls.

For every block in the viewer, the following logic determines when a callback function will be called. For the specific callback function called, see the next section.

1. A "precompute" function is called first.  This can be used to support complicated computations that can be shared between determining the color, the tool tip text, and the click handling.
2. A get color function is then called to get the color of the block.
3. When a mouseover event occurs on the block, a get tool tip function is called to get the tool tip text to display.
4. When a click event occurs on the block, a handle click function is called.

The specific callback function called in these cases is determined by the state of the row or the block. 

