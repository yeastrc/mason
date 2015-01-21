
# rowTotalBar_callbackFunctions

## When are the callback functions called?
For every row totals block in the viewer, the following logic determines when a callback function will be called. The row totals block is the optional block placed to the right of a row indicating some summary value for that row. For the specific callback function called, see the next section.

```javascript

	// called first, supports complicated computations that only should be run once .
	rowTotalBar_callbackFunctions.precomputeValuesOnCreate( precomputeParams )
	// where precomputeParams = { rowItem, callbackDataStorage }
	
	/*

		Get the color and size of the block
		
		This function returns an object of the format
		{
			"blockSize": ,
			"colorForBlock":
		}
		where the values for the properties of:
		"blockSize" is a decimal between zero and one, which is used as a scaling of the width of the block
		"colorForBlock" is either:
			an object of the format { red: 1, green: 1, blue: 1 }
			where the values for the properties are the 0 to 255 rgb colors for this block
			or
			a String of the format "#RRGGBB" where "RR", "GG", and "BB" are hex colors "00" to "FF"
	*/
	rowTotalBar_callbackFunctions.getColorAndSize( getColorAndSizeParams )
	// where getColorAndSizeParams = { rowItem, callbackDataStorage }

	// When a mouseover event occurs on the block, a get tool tip function is called to get the tool tip text to display.
	rowTotalBar_callbackFunctions.getTotalBarToolTipText  ( getToolTipTextParams )
	getToolTipTextParams = { rowItem, callbackDataStorage }

	// When a click event occurs on the block, a handle click function is called.
	rowTotalBar_callbackFunctions.processClick( processClickParams  )
	processClickParams  = { rowItem, callbackDataStorage }
```
