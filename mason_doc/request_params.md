# Request Params

Recall that the Mason viewer is instantiated with JavaScript similar to:

```javascript
MasonViewer.createMasonViewer( $rootDiv, requestParams, configParams, callbackFunctionsObj );
```
In this document, we describe the "requestParams" object, which contains the data to be displayed in the Mason viewer.

The definition of the requestParams object should adhere to the following format:

```javascript
{"maxSequenceLength": 255,
 "rowItems":
    [
    	//  A row in the viewer
	  {"label":"label1"
		"blockItems":
		 [
		 
		 	//  Features to display in the row
		   {
			"startPos":25,
			"endPos":37,
			"blockData":{... Other application specific data}
		   },
		   {
			"startPos":35,
			"endPos":60,
			"blockData":{... Other application specific data}
		   }
		 ],
		 
		//  Optional: Vertical lines for this row.  The data under "vertLineData" is passed to the callback for determining the color, tool tip, and click handling

		"vertLinesItems":
			[{"linePos":3.5,"vertLineData":{"type":"CP"}}]	
	  
	  }, //  End of a row in the viewer
	  
    	//  Another row in the viewer
	  {"label":"label2"
		"blockItems":
		 [
		 
		 	//  A block block in the row
		   {
			"startPos":38,
			"endPos":56,
			"blockData":{... Other application specific data}
		   }
		 ],
		 
		//  Optional: Vertical lines for this row.  The data under "vertLineData" is passed to the callback for determining the color, tool tip, and click handling

		"vertLinesItems":
			[{"linePos":3.5,"vertLineData":{"type":"CP"}}]	
	  
	  }, //  End of a row in the viewer
	  
	 ],  // End of the rows in the viewer

	//   Viewer wide data
	  
	//   Optional: Vertical lines for the "Combined Row" aka "Totals Row" The data under "vertLinesCombinedRow" is passed to the callback for determining the color, tool tip, and click handling
		
	"vertLinesCombinedRow":[{"linePos":3.5,"vertLineData":{"type":"CP"}}]	

	//  Optional: Vertical lines data that will be displayed across all the rows. If the same lines are needed for all the rows, this is the most efficient as they result in far fewer. SVG elements in the viewer.  The data under "vertLineData" is passed to the callback for determining the color, tool tip, and click handling

	"vertLinesAllRowsItems":
		[{"linePos":3.5,"vertLineData":{"type":"CP"}}]		 
	 
   }
	
}
```
