
# Info taken from 1_docs/2.c.b_mainRowsLabel_callbackFunctions.txt

# Callback Functions

## When are the callback functions called?
Below is a description of when the various callback functions are called by the Mason viewer and what parameters are passed into them. Note that all functions take as their parameter a single properties object that associates specific property names with values. Every properties object should contain a property named `callbackDataStorage`, which can store data and retrieve it in subsequent function calls. An example use would be to precompute the the tool tip text and then return that on subsequent calls.

For the label on the left side of each main row, the following logic determines when a callback function will be called. For the specific callback function called, see the next section.

1. A "precompute" function is called first.  This can be used to support complicated computations that can be shared between determining the tool tip text and the click handling.
3. When a mouseover event occurs on the block, a get tool tip function is called to get the tool tip text to display.
4. When a click event occurs on the block, a handle click function is called.


```javascript
	mainRowsLabel_callbackFunctions.precomputeValuesOnCreate( precomputeParams )
		where precomputeParams = { rowItem, callbackDataStorage }

	mainRowsLabel_callbackFunctions.getTotalBarToolTipText  ( getToolTipTextParams )
	getToolTipTextParams = { rowItem, callbackDataStorage }

	mainRowsLabel_callbackFunctions.processClick( processClickParams  )
	processClickParams  = { rowItem, callbackDataStorage }

```

