
# Info taken from 1_docs/2.c.e_combinedRow_callbackFunctions.txt

# Callback Functions

## When are the callback functions called?
Below is a description of when the various callback functions are called by the Mason viewer and what parameters are passed into them. Note that all functions take as their parameter a single properties object that associates specific property names with values. Every properties object should contain a property named `callbackDataStorage`, which can store data and retrieve it in subsequent function calls. An example use would be to precompute the the tool tip text and then return that on subsequent calls.

For every block in the viewer, the following logic determines when a callback function will be called. For the specific callback function called, see the next section.

1. A "precompute" function is called first.  This can be used to support complicated computations that can be shared between determining the color, the tool tip text, and the click handling.
2. A get color function is then called to get the color of the block.
3. When a mouseover event occurs on the block, a get tool tip function is called to get the tool tip text to display.
4. When a click event occurs on the block, a handle click function is called.

The specific callback function called in these cases is determined by the state of the block (a block here is the displayed area between the start and end position of an annotation). Note the state of a block may be determined using the `splitAnyEntriesForRow` property (true for combined row blocks if there were overlapping blocks) and the `forHiddenBlocks` property(true for the blocks that appear when a row is expanded to show non-overlapping blocks).

!!!!!!!!!!!  REWRITE  !!!!!!!!!!!!!  The specific callback functions called and their corresponding block states are given below. In each case, the specific callback function call is shown first, and the properties of the input parameters are shown second. In this description, `blockItem` is an element from the array `blockItems` and `peptideDataItems` is an array of `peptideData` elements from the input data `peptideData` under `peptideItems`.

#### Case 1.  For blocks in combined row with no overlapping annotations:

```javascript
	combinedRow_callbackFunctions.precomputeValuesOnCreate( precomputeParams )
	precomputeParams = { blockDataItems, forHiddenBlocks, splitAnyEntriesForRow, startPos, endPos, rowItem, callbackDataStorage }

	combinedRow_callbackFunctions.getColorForBlock( getColorForBlockParams )
	getColorForBlockParams = { blockDataItems, forHiddenBlocks, startPos, endPos, rowItem, callbackDataStorage }

	combinedRow_callbackFunctions.getNonOverlappingBlocksToolTipText ( getToolTipTextParams )
	getToolTipTextParams = { blockDataItems, startPos, endPos, rowItem, callbackDataStorage }

	combinedRow_callbackFunctions.processClick( processClickParams  )
	processClickParams  = { blockDataItems, startPos, endPos, rowItem, callbackDataStorage	}
```


#### Case 2.  For blocks in combined row with overlapping annotations.


In this case, the set of callbacks is called two different ways for two types of blocks.

  One type of block:
  
	One type of block is the blocks that will be shown initially.
	These blocks are created by Mason as it processes the overlaps of the blocks passed in.
	The blockDataItems array passed to the callbacks will have one or more elements corresponding to the original blocks for all the rows that went into that overlapping block.

	For those blocks, the following callback functions are called

```javascript
		combinedRow_callbackFunctions.precomputeValuesOnCreate( precomputeParams )
		precomputeParams = { blockDataItems, forHiddenBlocks, splitAnyEntriesForRow, startPos, endPos, rowItem, callbackDataStorage }
		
			Where forHiddenBlocks === false, splitAnyEntriesForRow === true

		combinedRow_callbackFunctions.getColorForBlock( getColorForBlockParams )
		getColorForBlockParams = { blockDataItems, forHiddenBlocks, startPos, endPos, rowItem, callbackDataStorage }

			Where forHiddenBlocks === false
			
		combinedRow_callbackFunctions.getOverlappingBlocksToolTipText ( getToolTipTextParams )
		getToolTipTextParams = { blockDataItems, startPos, endPos, rowItem, callbackDataStorage }
```

  Second type of block:
  
	The second type of block is the blocks that will be shown when the row is expanded, showing the blocks as passed into Mason.
	The blockDataItems array passed to the callbacks will have one or more elements corresponding to the original blocks at that position for all the rows.

	For those blocks, the following callback functions are called

```javascript
		combinedRow_callbackFunctions.precomputeValuesOnCreate( precomputeParams )
		precomputeParams = { blockDataItems, forHiddenBlocks, splitAnyEntriesForRow, startPos, endPos, rowItem, callbackDataStorage }
		
			Where forHiddenBlocks === true, splitAnyEntriesForRow === true

		combinedRow_callbackFunctions.getColorForBlock( getColorForBlockParams )
		getColorForBlockParams = { blockDataItems, forHiddenBlocks, startPos, endPos, rowItem, callbackDataStorage }

			Where forHiddenBlocks === true
			
		combinedRow_callbackFunctions.getOverlappingBlocksToolTipText ( getToolTipTextParams )
		getToolTipTextParams = { blockDataItems, startPos, endPos, rowItem, callbackDataStorage }
		
	combinedRow_callbackFunctions.processClick( processClickParams  )
	processClickParams  = { blockDataItems, startPos, endPos, rowItem, callbackDataStorage	}
		
```


