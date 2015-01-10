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

The specific callback function called in these cases is determined by the state of the block (a block here is the displayed area between the start and end position of an annotation). Note the state of a block may be determined using the `splitAnyEntriesForRow` property (true for main row blocks if there were overlapping blocks) and the `forHiddenBlocks` property(true for the blocks that appear when a row is expanded to show non-overlapping blocks).

The specific callback functions called and their corresponding block states are given below. In each case, the specific callback function call is shown first, and the properties of the input parameters are shown second. In this description, `blockItem` is an element from the array `blockItems`.

#### Case 1.  For blocks in rows with no overlapping annotations:

```javascript
	mainRowsPeptideBlocks_callbackFunctions.precomputeValuesOnCreate( precomputeParams )
	precomputeParams = { blockItem, peptideDataItems, startPos, endPos, callbackDataStorage, splitAnyEntriesForRow, forHiddenBlocks }

	mainRowsPeptideBlocks_callbackFunctions.getColorForBlock( getColorForBlockParams )
	getColorForBlockParams = { blockItem, peptideDataItems, callbackDataStorage, forHiddenBlocks }

	mainRowsPeptideBlocks_callbackFunctions.getNonOverlappingPeptidesToolTipText( getToolTipTextParams )
	getToolTipTextParams = { startPos, endPos, peptideDataItems, blockItem, callbackDataStorage	}

	mainRowsPeptideBlocks_callbackFunctions.processClick( processClick_OverlappingPeptides )
	processClick_OverlappingPeptides = { startPos, endPos, peptideDataItems, blockItem, callbackDataStorage	}
```


2.  The main blocks that are displayed for each row when overlapping peptides were detected for that row.

    Not Called:
	mainRowsPeptideBlocks_callbackFunctions.getNonOverlappingPeptidesToolTipText( getToolTipTextParams )

	Called Instead:
	mainRowsPeptideBlocks_callbackFunctions.getOverlappingPeptidesToolTipText( getToolTipTextParams )
		getToolTipTextParams = { startPos, endPos, peptideDataItems, blockItem, callbackDataStorage	}


3.  The blocks that initially hidden for a row for each row when overlapping peptides were detected for that row

		Same params as above but splitAnyEntriesForRow == false and forHiddenBlocks == true

	mainRowsPeptideBlocks_callbackFunctions.precomputeValuesOnCreate( precomputeParams )
	mainRowsPeptideBlocks_callbackFunctions.getColorForBlock( getColorForBlockParams )
	mainRowsPeptideBlocks_callbackFunctions.getNonOverlappingPeptidesToolTipText( getToolTipTextParams )
	mainRowsPeptideBlocks_callbackFunctions.processClick( processClick_OverlappingPeptides )


4.  The totals row at the bottom of the Visualizer - No "blockItem" since totals row

	combinedRow_callbackFunctions.precomputeValuesOnCreate( precomputeValuesOnCreateParams )
		precomputeValuesOnCreateParams = { peptideDataItems, startPos, endPos, callbackDataStorage, splitAnyEntriesForRow }

	combinedRow_callbackFunctions.getColorForBlock( getColorForBlockParams )
		getColorForBlockParams = { peptideDataItems, callbackDataStorage };

	combinedRow_callbackFunctions.getPeptidesToolTipText( getSinglePeptideToolTipTextParams )
		getSinglePeptideToolTipTextParams = { startPos, endPos, peptideDataItems, callbackDataStorage }

	combinedRow_callbackFunctions.processClick( processClickParams )
		processClickParams = { startPos, endPos, peptideDataItems, callbackDataStorage }

5.  The Row totals block at the right of each row

	rowTotalBar_callbackFunctions.precomputeValuesOnCreate( precomputeValuesOnCreateParams )
		precomputeValuesOnCreateParams = { blockItem, callbackDataStorage }

	rowTotalBar_callbackFunctions.getColorAndSize( getColorAndSizeParams )
		getColorAndSizeParams = { blockItem, callbackDataStorage }

	rowTotalBar_callbackFunctions.getTotalBarToolTipText( toolTipTextParams )
		toolTipTextParams = { blockItem, callbackDataStorage }

	rowTotalBar_callbackFunctions.processClick( processClickParams )
		processClickParams = { blockItem, callbackDataStorage }
