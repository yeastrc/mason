# Request Params

Recall that the Mason viewer is instantiated with JavaScript similar to:

```javascript
MasonViewer.createMasonViewer( $rootDiv, requestParams, configParams, callbackFunctionsObj );
```
In this document, we describe the "requestParams" object, which contains the data to be displayed in the Mason viewer.

```javascript
{"maxSequenceLength": 255,
 "rowItems":
    [
    
    	//  A row in the viewer
    	
	  {"label":"label1",
	  
		"blockItems":
		 [
		 
		 	//  A block block in the row
		   {
			"startPos":25,
			"endPos":37,
			"blockData":{... Other application specific data}
		   }
		 ],
		 
		//  Vertical lines for this row
		
			//  All the line positions in this case are on the half (using ".5") so that they land 
			//     specifically on the edges/boundaries between the blocks.
			
			//  The data under "vertLineData" is passed to the callback for determining the color, tool tip, and click handling

		"vertLinesItems":
			[{"linePos":3.5,"vertLineData":{"type":"CP"}}]	
	  
	  }  //  End of a row in the viewer
	  
	 ],  // End of the rows in the viewer

	  
	//   Viewer wide data
	  
	//   Vertical lines for the "Combined Row" aka "Totals Row"

		//  All the line positions in this case are on the half (using ".5") so that they land 
		//     specifically on the edges/boundaries between the blocks.
		
		//  The data under "vertLinesCombinedRow" is passed to the callback for determining the color, tool tip, and click handling
		
	"vertLinesCombinedRow":[{"linePos":3.5,"vertLineData":{"type":"CP"}}]	
	
	
	
	//  Vertical lines data that will be displayed across all the rows.
	//        If the same lines are needed for all the rows, this is the most efficient as they result in far fewer
	//        SVG elements in the viewer.
	
		//  All the line positions in this case are on the half (using ".5") so that they land 
		//     specifically on the edges/boundaries between the blocks.
		
		//  The data under "vertLineData" is passed to the callback for determining the color, tool tip, and click handling

	 
	"vertLinesAllRowsItems":
		[{"linePos":3.5,"vertLineData":{"type":"CP"}}]		 
	 
   }
	
}
```
