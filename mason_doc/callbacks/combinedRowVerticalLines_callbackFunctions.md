
# Info taken from 1_docs/2.c.h_combinedRowVerticalLines_callbackFunctions.txt

# Callback Functions

## When are the callback functions called?
Below is a description of when the various callback functions are called by the Mason viewer and what parameters are passed into them. Note that all functions take as their parameter a single properties object that associates specific property names with values. Every properties object should contain a property named `callbackDataStorage`, which can store data and retrieve it in subsequent function calls. An example use would be to precompute the the tool tip text and then return that on subsequent calls.

For every vertical line in the viewer, the following logic determines when a callback function will be called. For the specific callback function called, see the next section.

1. A "precompute" function is called first.  This can be used to support complicated computations that can be shared between determining the color, the tool tip text, and the click handling.
2. A get color function is then called to get the color of the vertical line.
3. When a mouseover event occurs on the vertical line, a get tool tip function is called to get the tool tip text to display.

The specific callback function called in these cases is determined by the state of the vertical line (a vertical line here is the displayed area between the start and end position of an annotation). Note the state of a block may be determined using the `forHiddenBlocks` property(true for the vertical lines that appear when a row is expanded to show non-overlapping blocks).


```javascript
	combinedRowVerticalLines_callbackFunctions.precomputeValuesOnCreate( precomputeParams )
	precomputeParams = { linePos, vertLineData, forHiddenLines, callbackDataStorage }

	combinedRowVerticalLines_callbackFunctions.getColorForLine( getColorForBlockParams )
	getColorForBlockParams = { linePos, vertLineData, forHiddenLines, callbackDataStorage }

		This function returns an String of the format "#RRGGBB"
			where the colors use hex values for the red, green, and blue for this line.
			"RR" is the hex value for the red color
			"GG" is the hex value for the green color
			"BB" is the hex value for the blue color
			The hex values are 00 to FF
			
	combinedRowVerticalLines_callbackFunctions.getLinesToolTipText( getToolTipTextParams )
	getToolTipTextParams = { blockDataItems, startPos, endPos, rowItem, callbackDataStorage }

```

