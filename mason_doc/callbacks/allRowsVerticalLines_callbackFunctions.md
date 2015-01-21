
# allRowsVerticalLines_callbackFunctions

Below is a description of when the various callback functions are called by the Mason viewer and what parameters are passed into them. For the vertical lines that span all the rows, the following logic determines when a callback function will be called. For the specific callback function called, see the next section.

`callbackDataStorage` is an object used to store and retrieve data in subsequent function calls. This can be used to store and retrieve data derived from time-consuming computation which would be necessary with each successive function call. `vertLineData` is the `vertLineData` from the `vertLinesAllRowsItems` array for a given line, passed into Mason on start up. `linePos` is the value of the `linePos` property from the `vertLinesAllRowsItems` array for a given line, passed into Mason on start up. `forHiddenLines` is true if a given line only appears when a row is expanded, false otherwise.

```javascript

	// A "precompute" function is called first.  This can be used to support complicated computations that can be shared between determining the color, the tool tip text, and the click handling.
	allRowsVerticalLines_callbackFunctions.precomputeValuesOnCreate( precomputeParams )
	//precomputeParams = { linePos, vertLineData, forHiddenLines, callbackDataStorage }

	/* A get color function is then called to get the color of the vertical line.
	
			This function returns an String of the format "#RRGGBB"
			where the colors use hex values for the red, green, and blue for this line.
			"RR" is the hex value for the red color
			"GG" is the hex value for the green color
			"BB" is the hex value for the blue color
			The hex values are 00 to FF
		
	*/
	allRowsVerticalLines_callbackFunctions.getColorForLine( getColorForBlockParams )
	//getColorForBlockParams = { linePos, vertLineData, forHiddenLines, callbackDataStorage }

	// When a mouseover event occurs on the vertical line, a get tool tip function is called to get the tool tip text to display.
	allRowsVerticalLines_callbackFunctions.getLinesToolTipText( getToolTipTextParams )
	//getToolTipTextParams = { blockDataItems, startPos, endPos, rowItem, callbackDataStorage }
```

<a href="../callback_functions.md">Back to the callback functions page</a>.
