# mainRowsLabel_callbackFunctions

For the label on the left side of each main row, the following logic determines when a callback function will be called. For the specific callback function called, see the next section. `callbackDataStorage` is an object used to store and retrieve data in subsequent function calls. This can be used to store and retrieve data derived from time-consuming computation which would be necessary with each successive function call. `rowItem` is the element from the `rowItems` array corresponding to this row in the <a href="../request_params.md">request_params</a> passed into the Mason viewer when it was created.

1. The `precomputeValuesOnCreate` function is called first.  This can be used to support complicated computations that can be shared between determining the tool tip text and the click handling. It is called as `mainRowsLabel_callbackFunctions.precomputeValuesOnCreate( precomputeParams )` where `precomputeParams = { rowItem, callbackDataStorage }`. 

2. When a mouseover event occurs on the label, the `mainRowsLabel_callbackFunctions.getToolTipText` function is called to get the tool tip text to display. It is called as `mainRowsLabel_callbackFunctions.getToolTipText  ( getToolTipTextParams )` where `getToolTipTextParams = { rowItem, callbackDataStorage }`. This function is meant to return a string to be displayed as the tooltip.

3. When a click event occurs on the label, the `processClick` function is called. It is called as `mainRowsLabel_callbackFunctions.processClick( processClickParams  )` where `processClickParams  = { rowItem, callbackDataStorage }`. Code in this function may call an alert to appear or redirect the page to a new URL via `window.open( url )`.

<a href="../callback_functions.md">Back to the callback functions page</a>.
