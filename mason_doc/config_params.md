# Config Params

Recall that the Mason viewer is instantiated with JavaScript similar to:

```javascript
MasonViewer.createMasonViewer( $rootDiv, requestParams, configParams, callbackFunctionsObj );
```
In this document, we describe the "configParams" object, which contains the configuraton parameters passed into the Mason viewer when it is created. The configParams object must contain the following properties:

```javascript
	TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE : 2,		// number of pixels down first row appears from top of viewer

	LABEL_FONT_SIZE : 12,				// font size, in pixels, of row labels

	ROW_HEIGHT : 15, 				// Adjust the ROW_HEIGHT to accommodate the height of the label

	BLOCK_HEIGHT : 14,  				// Adjust the BLOCK_HEIGHT to accommodate the height of the label

	LABEL_WIDTH : 100,  				// Adjust the LABEL_WIDTH to accommodate the width of the longest label

	ICON_EXPAND_ROW_STARTING_POSITION : 1,		// Adjust the position of the Icon used for expanding and collapsing the row

	ICON_EXPAND_ROW_WIDTH : 15,			// Adjust the width of the Icon used for expanding and collapsing the row

	ICON_EXPAND_ROW_SPACE_AFTER : 2,		// Adjust the space on the right side of the Icon used for expanding and collapsing the row, before the start of the labels

	ROW_TOTALS_BAR_RIGHT_MAX_WIDTH : 30,		// Adjust the maximum width of the Row Totals Bar ( bar to the right of the main viewer block ).  
							// This is the width used when the ratio returned by the callback is 1.

	ROW_TOTAL_BLOCK_MINIMUM_SIZE : 1,		// Adjust the minimum width of the Row Totals Bar ( bar to the right of the main viewer block ).  
							// This is the width used when the ratio returned by the callback is 0.

	ROW_TOTALS_BAR_RIGHT_SPACE_FROM_MAIN_GRID : 10, // Adjust the number of pixels to the right of the main grid the left edge of the Row Totals Bar is positioned at.

	ROW_TOTALS_BAR_RIGHT_SPACE_FROM_RIGHT_EDGE : 4,	// Adjust the number of pixels to the left of the right edge of the Mason viewer the right edge of the Row Totals Bar is positioned at.


	BORDER_COLOR : "black",				// The color of the outside bounding box of the main viewer area

	BORDER_WIDTH : 1,				// The width of the outside bounding box of the main viewer area

	FOOTER_HEIGHT : 2,				// The distance from the bottom of the text below the main viewer to the bottom of the SVG area



	//  Tool tip text

	//     The tool tip text on the icon to collapse a row is the concattenation of the values in
	// 		CLICK_TO_CONTRACT_TO_HIDE_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT_PREFIX and blockTypeLabelPlural
	
	//     The tool tip text on the icon to expand a row is the concattenation of the values in
	// 		CLICK_TO_EXPAND_TO_SHOW_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT_PREFIX and blockTypeLabelPlural

	CLICK_TO_CONTRACT_TO_HIDE_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT_PREFIX : "Click to hide individual ",

	CLICK_TO_EXPAND_TO_SHOW_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT_PREFIX : "Click to show individual ",


	blockTypeLabelPlural : "blocks",

	BLOCK_HIGHLIGHT_BORDER_COLOR : "pink",		//  The color of the border shown to highlight the block the mouse is currently hovering over
	BLOCK_HIGHLIGHT_BORDER_WIDTH : 2,		//  The width of the border shown to highlight the block the mouse is currently hovering over


	createCombinedLineOnly : undefined,  //  set to true to only create combined line

	skipCreateCombinedLine : undefined,  //  set to true to skip create combined line

	combinedLineLabel : "Combined",  //  label on left for combined line

	combinedLineTooltipHTML : undefined,  //  tool tip for label on left for combined line


	ALIGNMENT_LINE_COLOR : "black",			//  The color for showing alignment lines across viewers to show the left and right edges of the block currently being hovered over
	ALIGNMENT_LINE_WIDTH : 2			//  The width for showing alignment lines across viewers to show the left and right edges of the block currently being hovered over
```
