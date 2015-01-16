# mainRowsLabel_callbackFunctions

For the label on the left side of each main row, the following logic determines when a callback function will be called. For the specific callback function called, see the next section. `callbackDataStorage` is an object used to store and retrieve data in subsequent function calls. This can be used to store and retrieve data derived from time-consuming computation which would be necessary with each successive function call. `rowItem` is the element from the `rowItems` array corresponding to this row in the <a href="../request_params.md">request_params</a> passed into the Mason viewer when it was created.

1. The `precomputeValuesOnCreate` function is called first.  This can be used to support complicated computations that can be shared between determining the tool tip text and the click handling. It is called as `mainRowsLabel_callbackFunctions.precomputeValuesOnCreate( precomputeParams )` where `precomputeParams = { rowItem, callbackDataStorage }`.
2. 
3. When a mouseover event occurs on the block, the get tool tip function is called to get the tool tip text to display.
4. When a click event occurs on the block, the handle click function is called.


```javascript
	mainRowsLabel_callbackFunctions.precomputeValuesOnCreate( precomputeParams )
		where precomputeParams = { rowItem, callbackDataStorage }

	mainRowsLabel_callbackFunctions.getTotalBarToolTipText  ( getToolTipTextParams )
	getToolTipTextParams = { rowItem, callbackDataStorage }

	mainRowsLabel_callbackFunctions.processClick( processClickParams  )
	processClickParams  = { rowItem, callbackDataStorage }

```

`callbackDataStorage` is an object used to store and retrieve data in subsequent function calls. This can be used to store and retrieve data derived from time-consuming computation which would be necessary with each successive function call.

`rowItem` is the element from the `rowItems` array corresponding to this row in the <a href="../request_params.md">request_params</a> passed into the Mason viewer when it was created.


