
//   mason_viewer_55_render_on_page_main_row.js

//     This is a part of MasonViewer




//////////////  !!!!!!!!!!!!!   Order of calling "precompute" call backs.

///////    For the Main blocks and the Hidden blocks, the precompute is called for each block right before the call to get the color

///////    For the Totals Per Row blocks on the right, the precompute is called for all the rows before the get color and size is called for each block

//////     For the Totals Row, the precompute is called for all the rows before the get color is called for each block



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";

//  https://github.com/wout/svg.js#animating-elements

// Svg.js has a dedicated color module handling different types of colors. Accepted values are:
//  hex string; three based (e.g. #f06) or six based (e.g. #ff0066)
//  rgb string; e.g. rgb(255, 0, 102)
//  rgb object; e.g. { r: 255, g: 0, b: 102 }


//   Visible as attributes in the DOM
//		blockBlockSVG.data( "label", { d1: 12, d4: "wwww"} );

//   NOT Visible as attributes in the DOM
//		blockBlockSVG.remember('oldBBox', { d1: 12, d4: "wwww"} );

//   SVG.js remember method doesn't just save a reference to an object so not using it

//  !!!!!!!!!!!  All variables that have SVG in them but not "$" are some instance of a type from the svg.js library  !!!!!!!!





	//////////////////////////////////

	//   Create a callback to create the hidden blocks if not created

	MasonViewerPerInstanceRenderOnPage.prototype. createMainLineHiddenBlocksIfNotCreatedCallbackCreator = function ( outputRow, currentSVGgroupOfRowXandBelow, currentSVGgroupOfRowXandBelowProgramaticDataStorage, rowOffset ) {

		var objectThis = this;

		//  create callback function

		var createHiddenBlocksIfNotCreatedCallback = function() {

			var hiddenBlocksForRowSet = currentSVGgroupOfRowXandBelowProgramaticDataStorage.getHiddenBlocksForRowSet( );

			var outputRow = currentSVGgroupOfRowXandBelowProgramaticDataStorage.getOutputRow();

			if ( outputRow !== undefined && outputRow !== null ) {

				var splitAnyEntries = outputRow.splitAnyEntries;

				if (  splitAnyEntries && ( hiddenBlocksForRowSet === undefined || hiddenBlocksForRowSet === null  ) ) {

					objectThis.processHiddenBlocksForRow( outputRow, currentSVGgroupOfRowXandBelow, currentSVGgroupOfRowXandBelowProgramaticDataStorage, rowOffset );
				}
			}
		};

		//  assign callback function to storage

		currentSVGgroupOfRowXandBelowProgramaticDataStorage.setCreateHiddenBlocksIfNotCreatedCallback( createHiddenBlocksIfNotCreatedCallback );
	};



	//////////////////////////////////

	//   call the precompute call backs for the main rows.

	//  ONLY for main totals blocks on the right

	MasonViewerPerInstanceRenderOnPage.prototype. precomputeValuesOnCreateForMainRows = function ( outputRows ) {

		var objectThis = this;

		for ( var rowIdx = 0; rowIdx < outputRows.length; rowIdx++ ) {


			var outputRow = outputRows[ rowIdx ];



			if ( outputRow.callbackDataStorage === undefined ) {

				outputRow.callbackDataStorage = {};
			}

			//  precomputeValuesOnCreate for Row Totals Bar on Right

			if ( objectThis.constructorParams.callbackFunctionsObj.rowTotalBar_callbackFunctions &&
					objectThis.constructorParams.callbackFunctionsObj.rowTotalBar_callbackFunctions.precomputeValuesOnCreate ) {

				//  Only Call if it exists

				var precomputeValuesOnCreateParams = { rowItem: outputRow.inputRowItem, callbackDataStorage: outputRow.callbackDataStorage };

				objectThis.constructorParams.callbackFunctionsObj.rowTotalBar_callbackFunctions.precomputeValuesOnCreate( precomputeValuesOnCreateParams );

			}
		}

	};



	//////////////////////////////////////////////

	//  Process the row total block, currently added to the right of the main grid

	MasonViewerPerInstanceRenderOnPage.prototype. processRowTotalBlockForRow = function( outputRow, currentSVGgroupOfRowXandBelow, rowIdx ) {

		var objectThis = this;

		if ( ( ! objectThis.constructorParams.callbackFunctionsObj.rowTotalBar_callbackFunctions ) ||
				( ! objectThis.constructorParams.callbackFunctionsObj.rowTotalBar_callbackFunctions.getColorAndSize ) ) {

			return;  // Exit if the call back functions do not exist

		}



		var getColorAndSizeParams = { rowItem: outputRow.inputRowItem, callbackDataStorage: outputRow.callbackDataStorage };

		var colorAndSize = objectThis.constructorParams.callbackFunctionsObj.rowTotalBar_callbackFunctions.getColorAndSize( getColorAndSizeParams );

		var y = ( rowIdx * this.configDisplayOptions.ROW_HEIGHT );

		y = y + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;


		var sizeZeroToOne = colorAndSize.blockSize;

		if ( sizeZeroToOne > 0 ) {


			var colorForBlock = colorAndSize.colorForBlock;

			//  returns  colorForBlock = { red: 10, green: 255, blue: 1 }
			//                or colorForBlock = "#RRGGBB" (6 positions hex color)
			
			var fillColor = this.convertBlockColorTo_SVGJS_FillColor( colorForBlock );

			var rectWidth = sizeZeroToOne * this.configDisplayOptions.ROW_TOTALS_BAR_RIGHT_MAX_WIDTH;;


			if ( rectWidth < this.configDisplayOptions.ROW_TOTAL_BLOCK_MINIMUM_SIZE ) {

				rectWidth = this.configDisplayOptions.ROW_TOTAL_BLOCK_MINIMUM_SIZE;
			}

			var rowTotalBlockSVG = this.GLOBALS.masonViewerSVG.rect( rectWidth, this.configDisplayOptions.BLOCK_HEIGHT ).attr( { fill: fillColor } );

			rowTotalBlockSVG.move( this.GLOBALS.rowTotalsBarRightStartingPoint, y );

			this.addProgramaticDataStorageToSVG_js_Item( rowTotalBlockSVG );

			rowTotalBlockSVG.data( "row-rowIdx", rowIdx );

			rowTotalBlockSVG.data( "placement", "row total blocks" );

			currentSVGgroupOfRowXandBelow.add( rowTotalBlockSVG );

		}

		//  add a cover block of the full width

		var rowTotalBlockCoverBlockFullWidthSVG =
			this.GLOBALS.masonViewerSVG.rect( this.configDisplayOptions.ROW_TOTALS_BAR_RIGHT_MAX_WIDTH, this.configDisplayOptions.BLOCK_HEIGHT )
					.attr( { fill: { r: 255, g: 255, b: 255 },
							stroke: { r: 0, g: 0, b: 0 },
							"stroke-width": 0.3,
							"fill-opacity": 0 } );

		rowTotalBlockCoverBlockFullWidthSVG.move( this.GLOBALS.rowTotalsBarRightStartingPoint, y );

		this.addProgramaticDataStorageToSVG_js_Item( rowTotalBlockCoverBlockFullWidthSVG );

		this.attachMouseOverRowTotalBlock( rowTotalBlockCoverBlockFullWidthSVG, outputRow );

		this.attachClickHandlerRowTotalBlock( rowTotalBlockCoverBlockFullWidthSVG, outputRow );

		rowTotalBlockCoverBlockFullWidthSVG.data( "row-rowIdx", rowIdx );

		rowTotalBlockCoverBlockFullWidthSVG.data( "placement", "row total blocks" );

		currentSVGgroupOfRowXandBelow.add( rowTotalBlockCoverBlockFullWidthSVG );


	};





	////////////////////////////////////////////////////////

	/////    Main Label

	//   Create Tool Tip for label, retrieves HTML from callback, called by wTooltip plugin


	///////////////

	//   Create Tool Tip for the label at the start of the row

	MasonViewerPerInstanceRenderOnPage.prototype. attachMouseOverMainRowLabel = function( labelSVG, outputRow ) {

		var objectThis = this;


		if ( ( ! objectThis.constructorParams.callbackFunctionsObj.mainRowsLabel_callbackFunctions ) ||
				( ! objectThis.constructorParams.callbackFunctionsObj.mainRowsLabel_callbackFunctions.getToolTipText ) ) {

			return;  // Exit if the call back functions do not exist

		}

		var $labelSVG = this.getJQueryObjForRawSVGFromSVG_js_item( labelSVG );

		var getToolTipTextParams = {

			rowItem: outputRow.inputRowItem,

			callbackDataStorage: outputRow.callbackDataStorage
		};

		this.attachToolTipToJqueryHtmlNode( $labelSVG, function( tooltip, node ) {

			var tooltipHTML = objectThis.constructorParams.callbackFunctionsObj.mainRowsLabel_callbackFunctions.getToolTipText( getToolTipTextParams  );

			$(tooltip).html( tooltipHTML );

			return tooltipHTML;

		} );
	};


	///////////////

	//   Handle Click for the label at the start of the row

	MasonViewerPerInstanceRenderOnPage.prototype. attachClickHandlerMainRowLabel = function( labelSVG, outputRow ) {

		var objectThis = this;
		
		if ( objectThis.constructorParams.callbackFunctionsObj === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.mainRowsLabel_callbackFunctions === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.mainRowsLabel_callbackFunctions.processClick === undefined 
				) {
			
			return;  //  No click handler so exit early
		}

		var $labelSVG = this.getJQueryObjForRawSVGFromSVG_js_item( labelSVG );

		var processClickParams = {

			rowItem: outputRow.inputRowItem,

			callbackDataStorage: outputRow.callbackDataStorage
		};


		$labelSVG.click( function( eventObject ) {

			objectThis.constructorParams.callbackFunctionsObj.mainRowsLabel_callbackFunctions.processClick( processClickParams );
		});
	};



	////////////////////////////////////////




	MasonViewerPerInstanceRenderOnPage.prototype. processLabelForRow = function( outputRow, currentSVGgroupOfRowXandBelow, rowIdx  ) {

		var objectThis = this;

		var labelText = outputRow.label;


//		var splitAnyEntries = outputRow.splitAnyEntries;


		var labelTextSVG = this.GLOBALS.masonViewerSVG.text( labelText );

//		var labelTextSVGContent = labelTextSVG.content;

		this.addProgramaticDataStorageToSVG_js_Item( labelTextSVG );

		labelTextSVG.data( "row-rowIdx", rowIdx );

		currentSVGgroupOfRowXandBelow.add( labelTextSVG );

		//  A hack to clear the broken font-size.  Clear dy that was set to compensate
		this.clearStyleAnd_dy_OnSVGtextItem( labelTextSVG );

		//  The "y" for a text item is the "baseline" of the font, the bottom of characters without decenders

		//   SVG.js would have attempted to compensate this to allow the "y" to be at the top of the letters but
		//   the method of specifying the font size was difficult to use and somewhat broken



		var textY = ( rowIdx * this.configDisplayOptions.ROW_HEIGHT ) + ( this.configDisplayOptions.ROW_HEIGHT / 2 );

		textY = textY + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;

		var labelAdditionalStyle = "";

		if ( objectThis.constructorParams.callbackFunctionsObj.mainRowsLabel_callbackFunctions &&
				objectThis.constructorParams.callbackFunctionsObj.mainRowsLabel_callbackFunctions.processClick ) {

			labelAdditionalStyle = "; cursor: pointer;";
		}

		this.setSVGTextPosition( { textSVG: labelTextSVG, x: this.configDisplayOptions.LABEL_STARTING_POSITION, y: textY, otherAttrsToSet: undefined, additionalStyle: labelAdditionalStyle  } );

		var y = ( rowIdx * this.configDisplayOptions.ROW_HEIGHT );


		y = y + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;


//		var labelTextSVG_BBox = labelTextSVG.bbox(); //  The bbox() values are zero if the graph is hidden with the div having display: none;

		if ( objectThis.constructorParams.callbackFunctionsObj.mainRowsLabel_callbackFunctions &&
				objectThis.constructorParams.callbackFunctionsObj.mainRowsLabel_callbackFunctions.precomputeValuesOnCreate ) {

			var precomputeValuesOnCreateParams = { callbackDataStorage: outputRow.callbackDataStorage, rowItem: outputRow.inputRowItem };

			objectThis.constructorParams.callbackFunctionsObj.mainRowsLabel_callbackFunctions.precomputeValuesOnCreate( precomputeValuesOnCreateParams );
		}


		if (  objectThis.constructorParams.callbackFunctionsObj.mainRowsLabel_callbackFunctions &&
				objectThis.constructorParams.callbackFunctionsObj.mainRowsLabel_callbackFunctions.getToolTipText ) {

			this.attachMouseOverMainRowLabel( labelTextSVG, outputRow );
		}

		if (  objectThis.constructorParams.callbackFunctionsObj.mainRowsLabel_callbackFunctions &&
				objectThis.constructorParams.callbackFunctionsObj.mainRowsLabel_callbackFunctions.processClick ) {

			this.attachClickHandlerMainRowLabel( labelTextSVG, outputRow );
		}


//			attachClickShowHideToggleHiddenBlocksRow( labelTextSVG );
//
//			this.attachToolTipToJqueryHtmlNode( $(labelTextSVG.node), function(tooltip, node) {
//
//					var $rowMainGroup = this.get$rowMainGroupFor$currentElement( $(node) );
//
//					var SVGrowMainGroupProgramaticDataStorage =  this.getProgramaticDataStorageFromJQueryItem( $rowMainGroup );
//
//					var tooltipText = "";
//
//					if ( SVGrowMainGroupProgramaticDataStorage.getHiddenBlocksVisible() ) {
//
//						tooltipText = this.configDisplayOptions.CLICK_TO_CONTRACT_TO_HIDE_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT;
//
//					} else {
//
//						tooltipText = this.configDisplayOptions.CLICK_TO_EXPAND_TO_SHOW_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT;
//					}
//
//					$(tooltip).html( tooltipText );
//
//					return tooltipText;
//				});
//		}


		return labelTextSVG;
	};



	////////////////////////////////////////////////////////

	/////    Main  blocks

	//   Create Tool Tip for blocks, retrieves HTML from callback, called by a tooltip


	///////////////

	//   Create Tool Tip for a block in a row where the blocks do not overlap

	MasonViewerPerInstanceRenderOnPage.prototype. attachMouseOverBlockNonOverlappingBlocksRow = function( blockBlockSVG, blockData, outputRow ) {

		var objectThis = this;
		
		
		if ( objectThis.constructorParams.callbackFunctionsObj === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.mainRowsBlocks_callbackFunctions === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.mainRowsBlocks_callbackFunctions.getNonOverlappingBlocksToolTipText === undefined 
				) {
			
			return;  //  EXIT early since no call back function to call
		}


		var $blockBlockSVG = this.getJQueryObjForRawSVGFromSVG_js_item( blockBlockSVG );

		var getSingleBlockToolTipTextParams = {

			startPos: blockData.blockStartPos,
			endPos: blockData.blockEndPos,

			blockDataItems: blockData.blockDataItems,
			rowItem: outputRow.inputRowItem,

			callbackDataStorage: blockData.callbackDataStorage
		};

		var getTooltipTextFcn = function( tooltip, node ) {

			var tooltipHTML = objectThis.constructorParams.callbackFunctionsObj.mainRowsBlocks_callbackFunctions.getNonOverlappingBlocksToolTipText( getSingleBlockToolTipTextParams  );
			$(tooltip).html( tooltipHTML );
			return tooltipHTML;
		};

		var callbackFunctions = {
			mouseenter: function( node ) {

				objectThis.callListenersForBlockMouseEnter( { node: node, blockInfo: getSingleBlockToolTipTextParams } );
			},
			mouseleave: function( node ) {

				objectThis.callListenersForBlockMouseLeave( { node: node, blockInfo: getSingleBlockToolTipTextParams } );
			}
		};

		this.attachToolTipToJqueryHtmlNode( $blockBlockSVG, getTooltipTextFcn, callbackFunctions );
	};


	///////////////

	//   Create Tool Tip for blocks for a block in a row row where the blocks do overlap

	MasonViewerPerInstanceRenderOnPage.prototype. attachMouseOverBlockOverlappingBlocksRow = function( blockBlockSVG, blockData, outputRow ) {

		var objectThis = this;
		
		
		if ( objectThis.constructorParams.callbackFunctionsObj === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.mainRowsBlocks_callbackFunctions === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.mainRowsBlocks_callbackFunctions.getOverlappingBlocksToolTipText === undefined 
				) {
			
			return;  //  EXIT early since no call back function to call
		}

		var $blockBlockSVG = this.getJQueryObjForRawSVGFromSVG_js_item( blockBlockSVG );

		var getSingleBlockToolTipTextParams = {

			startPos: blockData.blockStartPos,
			endPos: blockData.blockEndPos,

			blockDataItems: blockData.blockDataItems,
			rowItem: outputRow.inputRowItem,

			callbackDataStorage: blockData.callbackDataStorage
		};

		var getTooltipTextFcn =  function( tooltip, node ) {

			var tooltipHTML = objectThis.constructorParams.callbackFunctionsObj.mainRowsBlocks_callbackFunctions.getOverlappingBlocksToolTipText( getSingleBlockToolTipTextParams  );
			$(tooltip).html( tooltipHTML );
			return tooltipHTML;
		};


		var callbackFunctions = {
			mouseenter: function( node ) {

				objectThis.callListenersForBlockMouseEnter( { node: node, blockInfo: getSingleBlockToolTipTextParams } );
			},
			mouseleave: function( node ) {

				objectThis.callListenersForBlockMouseLeave( { node: node, blockInfo: getSingleBlockToolTipTextParams } );
			}
		};

		this.attachToolTipToJqueryHtmlNode( $blockBlockSVG, getTooltipTextFcn, callbackFunctions );

	};


	///////////////

	//   Handle Click for block in the row where the blocks do not overlap

	MasonViewerPerInstanceRenderOnPage.prototype. attachClickHandlerBlockNonOverlappingBlocks = function( blockBlockSVG, blockData, outputRow ) {

		var objectThis = this;
		
		
		if ( objectThis.constructorParams.callbackFunctionsObj === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.mainRowsBlocks_callbackFunctions === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.mainRowsBlocks_callbackFunctions.processClick === undefined 
				) {
			
			return;  //  No click handler so exit early
		}

		var $blockBlockSVG = this.getJQueryObjForRawSVGFromSVG_js_item( blockBlockSVG );

		var processClickParams = {

			startPos: blockData.blockStartPos,
			endPos: blockData.blockEndPos,

			blockDataItems: blockData.blockDataItems,
			rowItem: outputRow.inputRowItem,

			callbackDataStorage: blockData.callbackDataStorage
		};


		$blockBlockSVG.click( function( eventObject ) {

			objectThis.constructorParams.callbackFunctionsObj.mainRowsBlocks_callbackFunctions.processClick( processClickParams );
		});
	};


	////////////////////////////////////

	////////   Totals block in the row

	///////////////

	//   Create Tool Tip for Totals block in the row

	MasonViewerPerInstanceRenderOnPage.prototype. attachMouseOverRowTotalBlock = function( rowTotalBlockSVG, outputRow ) {

		var objectThis = this;


		if ( ( ! objectThis.constructorParams.callbackFunctionsObj.rowTotalBar_callbackFunctions ) ||
				( ! objectThis.constructorParams.callbackFunctionsObj.rowTotalBar_callbackFunctions.getTotalBarToolTipText ) ) {

			return;  // Exit if the call back functions do not exist

		}

		
		
		var $rowTotalBlockSVG = this.getJQueryObjForRawSVGFromSVG_js_item( rowTotalBlockSVG );

		var getTotalBarToolTipTextParams = {

			rowItem: outputRow.inputRowItem,
			callbackDataStorage: outputRow.callbackDataStorage
		};

		this.attachToolTipToJqueryHtmlNode( $rowTotalBlockSVG, function( tooltip, node ) {

//			var $blockBlockSVG = $(node);

			var tooltipHTML =
				objectThis.
					constructorParams.
					callbackFunctionsObj.
					rowTotalBar_callbackFunctions.
					getTotalBarToolTipText( getTotalBarToolTipTextParams  );

			$(tooltip).html( tooltipHTML );

			return tooltipHTML;

		} );
	};

	///////////////

	//   Handle Click for Totals block in the row

	MasonViewerPerInstanceRenderOnPage.prototype. attachClickHandlerRowTotalBlock = function( rowTotalBlockSVG, outputRow ) {

		var objectThis = this;
		
		
		if ( objectThis.constructorParams.callbackFunctionsObj === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.rowTotalBar_callbackFunctions === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.rowTotalBar_callbackFunctions.processClick === undefined 
				) {
			
			return;  //  No click handler so exit early
		}

		var $rowTotalBlockSVG = this.getJQueryObjForRawSVGFromSVG_js_item( rowTotalBlockSVG );

		var processClickParams = {

			rowItem: outputRow.inputRowItem,
			callbackDataStorage: outputRow.callbackDataStorage
		};

		$rowTotalBlockSVG.click( function( eventObject ) {

			objectThis.constructorParams.callbackFunctionsObj.rowTotalBar_callbackFunctions.processClick( processClickParams );
		});
	};


	////////////////////////////////////////


	//  Get the internal memory representation of the hidden blocks in arrays of arrays where blockStartPosPixel and blockEndPosPixel are set

	MasonViewerPerInstanceRenderOnPage.prototype. getHiddenBlocksForRow = function( outputRow  ) {

//		var objectThis = this;

//		var maxSequenceLength = this.constructorParams.requestParams.inputData.maxSequenceLength;

		var hiddenBlockRows = [];

		var prevEnds = [];
		var prevEndsScaled = [];

		var prevEndsLastEntry = -1;


		var blockItems = outputRow.blockItems;

		for ( var blockItemIdx = 0; blockItemIdx < blockItems.length; blockItemIdx++ ) {

			var blockItem = blockItems[ blockItemIdx ];

			var blockData = blockItem;

			var blockStartPos = blockData.blockStartPos;

			var blockEndPos = blockData.blockEndPos;

			var startPixel = this.positionLeftEdgeToPixel( blockStartPos );
			var endPixel   = this.positionRightEdgeToPixel( blockEndPos );


			for ( var index = 0; index <= prevEndsLastEntry; index++ ) {

				if ( blockItem.blockStartPos === ( prevEnds[ index ] + 1 ) ) {

					startPixel = prevEndsScaled[ index ] + 0.01;
				}
			}

			blockItem.blockStartPositionPixel = startPixel;
			blockItem.blockEndPositionPixel = endPixel;

			// find where to put this entry

			var addedToList = false;

			for ( var hiddenBlockRowsIdx = 0; hiddenBlockRowsIdx < hiddenBlockRows.length; hiddenBlockRowsIdx++ ) {

				var hiddenBlockRow = hiddenBlockRows[ hiddenBlockRowsIdx ];

				var blockItemInList = hiddenBlockRow[ hiddenBlockRow.length - 1 ];

				if ( startPixel > ( blockItemInList.blockEndPositionPixel /* add 1 to not allow them to butt together  + 1 */ ) ) {

					addedToList = true;

					hiddenBlockRow.push( blockItem );

					break;
				}
			}

			if ( ! addedToList ) {

				var hiddenBlockRow_NewRow = [];

				hiddenBlockRow_NewRow.push( blockItem );

				hiddenBlockRows.push( hiddenBlockRow_NewRow );
			}


			prevEndsLastEntry++;

			prevEnds[ prevEndsLastEntry ] = blockItem.blockEndPos;
			prevEndsScaled[ prevEndsLastEntry ] = endPixel;
		}

		return hiddenBlockRows;
	};


	////////////////////////////////////////




	MasonViewerPerInstanceRenderOnPage.prototype. processHiddenBlocksForRow = function( outputRow, currentSVGgroupOfRowXandBelow, currentSVGgroupOfRowXandBelowProgramaticDataStorage, rowOffset  ) {

		var objectThis = this;

		if ( ! objectThis.constructorParams.callbackFunctionsObj.mainRowsBlocks_callbackFunctions ||
				! objectThis.constructorParams.callbackFunctionsObj.mainRowsBlocks_callbackFunctions.precomputeValuesOnCreate ) {
			
			throw "callback function mainRowsBlocks_callbackFunctions.precomputeValuesOnCreate is missing";
		}
		


		var groupOfHiddenBlocksForRow = this.GLOBALS.masonViewerSVG.group();


		groupOfHiddenBlocksForRow.attr("label", "groupOfHiddenBlocksForRow");


		currentSVGgroupOfRowXandBelow.add( groupOfHiddenBlocksForRow );


		//  Only set setHiddenBlocksForRowSet( ) when the set actually has contents.  It is tested for undefined to mean empty
		currentSVGgroupOfRowXandBelowProgramaticDataStorage.setHiddenBlocksForRowSet( groupOfHiddenBlocksForRow );


		//  looping through the blockItems placing them into rows


		var hiddenBlockRows = this.getHiddenBlocksForRow( outputRow );

		var hiddenBlocksRowsHeight = ( hiddenBlockRows.length - 1 ) * this.configDisplayOptions.ROW_HEIGHT;


		currentSVGgroupOfRowXandBelowProgramaticDataStorage.setHiddenBlocksHeight( hiddenBlocksRowsHeight );

		var boxUnderHeight = hiddenBlocksRowsHeight + this.configDisplayOptions.ROW_HEIGHT; // add for row being replaced since this is the true height

		this.addHiddenBlocksBoxUnderEachRowForMouseOver( boxUnderHeight, groupOfHiddenBlocksForRow, currentSVGgroupOfRowXandBelowProgramaticDataStorage, rowOffset );


		// .attr( "vector-effect", "non-scaling-stroke"  )

		for ( var hiddenBlockRowIdx = 0; hiddenBlockRowIdx < hiddenBlockRows.length; hiddenBlockRowIdx++ ) {


			var hiddenBlockRow = hiddenBlockRows[ hiddenBlockRowIdx ];

			var hiddenBlocksRowItems = hiddenBlockRow;

			//  Looping through the hidden blocks for a given row

			for ( var hiddenBlockIdx = 0; hiddenBlockIdx < hiddenBlocksRowItems.length; hiddenBlockIdx++ ) {

				var blockData = hiddenBlocksRowItems[ hiddenBlockIdx ];


				//  Add callbackDataStorage to blockData

				blockData.callbackDataStorage = {};



				var precomputeValuesOnCreateParams =

				{ 	rowItem: outputRow.inputRowItem,
					blockDataItems: blockData.blockDataItems,

					startPos: blockData.blockStartPos,
					endPos: blockData.blockEndPos,

					callbackDataStorage: blockData.callbackDataStorage,
					splitAnyEntriesForRow: false, // always false for hidden blocks
					forHiddenBlocks: true  };

				objectThis.constructorParams.callbackFunctionsObj.mainRowsBlocks_callbackFunctions.precomputeValuesOnCreate( precomputeValuesOnCreateParams );




				var x = blockData.blockStartPositionPixel + this.configDisplayOptions.MAIN_BOX_STARTING_POSITION; //  ADD OFFSET to allow for label on left
				if ( x < this.configDisplayOptions.MAIN_BOX_STARTING_POSITION  ) {

					x = this.configDisplayOptions.MAIN_BOX_STARTING_POSITION ;
				}
				var y = ( ( hiddenBlockRowIdx ) * this.configDisplayOptions.ROW_HEIGHT ) + ( rowOffset * this.configDisplayOptions.ROW_HEIGHT );

				y = y + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;

				var rectWidth = blockData.blockEndPositionPixel - blockData.blockStartPositionPixel ;


				var getColorForBlockParams = { rowItem: outputRow.inputRowItem,  blockDataItems: blockData.blockDataItems, callbackDataStorage: blockData.callbackDataStorage, forHiddenBlocks: true  };

				var colorForBlock = objectThis.constructorParams.callbackFunctionsObj.mainRowsBlocks_callbackFunctions.getColorForBlock( getColorForBlockParams );

				//  returns  colorForBlock = { red: 10, green: 255, blue: 1 }
				//                or colorForBlock = "#RRGGBB" (6 positions hex color)
				
				var fillColor = this.convertBlockColorTo_SVGJS_FillColor( colorForBlock );

				var blockBlockSVG = this.GLOBALS.masonViewerSVG.rect( rectWidth, this.configDisplayOptions.BLOCK_HEIGHT ).attr( { fill: fillColor } );

				blockBlockSVG.move( x, y );

				this.addMouseOverToBlocks( blockBlockSVG );

				this.addProgramaticDataStorageToSVG_js_Item( blockBlockSVG );

				blockBlockSVG.data( "row-rowIdx", rowOffset );

				blockBlockSVG.data( "placement", "initially hidden row blocks" );

				blockBlockSVG.data( "block-id", blockData.id );

//				var programaticData = {  };

				this.attachMouseOverBlockNonOverlappingBlocksRow( blockBlockSVG, blockData, outputRow );

				this.attachClickHandlerBlockNonOverlappingBlocks( blockBlockSVG, blockData, outputRow );

				groupOfHiddenBlocksForRow.add( blockBlockSVG );


			}
		}




		//  Start processing Vertical Lines for this line


		//  Output the lines for the row


		var mainLineLines = outputRow.vertLinesItems;

		this.processHiddenLinesForRowVerticalLines( mainLineLines, hiddenBlockRows, groupOfHiddenBlocksForRow, rowOffset );


		this.showHideAllVerticalDataLinesPer_GLOBALS_showVerticalDataLines( );


		//  End processing Vertical Lines for this line




		var leftLine = this.GLOBALS.masonViewerSVG.line(
			this.GLOBALS.leftLineX ,
			( ( rowOffset ) * this.configDisplayOptions.ROW_HEIGHT ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE,
			this.GLOBALS.leftLineX ,
			( ( ( rowOffset + 1 ) * this.configDisplayOptions.ROW_HEIGHT ) + hiddenBlocksRowsHeight ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE  ).stroke( { color: this.configDisplayOptions.BORDER_COLOR, width: this.configDisplayOptions.BORDER_WIDTH } );

		var rightLine = this.GLOBALS.masonViewerSVG.line(  this.GLOBALS.rightLineX,
			( ( rowOffset ) * this.configDisplayOptions.ROW_HEIGHT ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE,
			this.GLOBALS.rightLineX,
			( ( ( rowOffset + 1 ) * this.configDisplayOptions.ROW_HEIGHT ) + hiddenBlocksRowsHeight ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE  ).stroke( { color: this.configDisplayOptions.BORDER_COLOR, width: this.configDisplayOptions.BORDER_WIDTH } );

		leftLine.data("placement", "lines with initially hidden row blocks");
		rightLine.data("placement", "lines with initially hidden row blocks");

		groupOfHiddenBlocksForRow.add( leftLine );
		groupOfHiddenBlocksForRow.add( rightLine );




		this.createHiddenBlocksContractionIcon( this.configDisplayOptions.CLICK_TO_CONTRACT_TO_HIDE_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT, groupOfHiddenBlocksForRow, rowOffset, currentSVGgroupOfRowXandBelowProgramaticDataStorage );


	};


	///////////////////////////////////

	MasonViewerPerInstanceRenderOnPage.prototype. processHiddenLinesForRowVerticalLines = function( mainLineLines, hiddenBlockRows, groupOfHiddenBlocksForRow, rowOffset ) {

		var objectThis = this;

		//  Start processing Vertical Lines for this line


		//  Output the lines for the row



		if ( mainLineLines && mainLineLines.length > 0 &&
				objectThis.constructorParams.callbackFunctionsObj.mainRowsVerticalLines_callbackFunctions &&
				objectThis.constructorParams.callbackFunctionsObj.mainRowsVerticalLines_callbackFunctions.getColorForLine ) {


			for ( var hiddenBlockRowIdx = 0; hiddenBlockRowIdx < hiddenBlockRows.length; hiddenBlockRowIdx++ ) {


//				var hiddenBlockRow = hiddenBlockRows[ hiddenBlockRowIdx ];

//				var hiddenBlocksRowItems = hiddenBlockRow;


				for ( var mainLineLinesIdx = 0; mainLineLinesIdx < mainLineLines.length; mainLineLinesIdx++ ) {



					var lineData = mainLineLines[ mainLineLinesIdx ];


					//  Add callbackDataStorage to lineData

					lineData.callbackDataStorage = {};


					if ( objectThis.constructorParams.callbackFunctionsObj.mainRowsVerticalLines_callbackFunctions &&
							objectThis.constructorParams.callbackFunctionsObj.mainRowsVerticalLines_callbackFunctions.precomputeValuesOnCreate )
					{

						var precomputeValuesOnCreateParams =

						{	vertLineData: lineData.vertLineData,

							linePos: lineData.linePos,
							
							forHiddenLines: true, 

							callbackDataStorage: lineData.callbackDataStorage
						};

						objectThis.constructorParams.callbackFunctionsObj.mainRowsVerticalLines_callbackFunctions.precomputeValuesOnCreate( precomputeValuesOnCreateParams );
					}



					var linePos = lineData.linePos;

					var linePixel = this.positionCharPositionToPixel( linePos );

					var x = linePixel +  this.configDisplayOptions.MAIN_BOX_STARTING_POSITION;//  ADD OFFSET to allow for label on left

//					var y = ( rowIdx * this.configDisplayOptions.ROW_HEIGHT ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;

					var y = ( ( hiddenBlockRowIdx ) * this.configDisplayOptions.ROW_HEIGHT ) + ( rowOffset * this.configDisplayOptions.ROW_HEIGHT );

					y = y + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;


					var getColorForLineParams = { vertLineData: lineData.vertLineData, callbackDataStorage: lineData.callbackDataStorage, forHiddenLines: true  };

					var colorForLine = objectThis.constructorParams.callbackFunctionsObj.mainRowsVerticalLines_callbackFunctions.getColorForLine( getColorForLineParams );

					//  returns  colorForLine = "#112233"

					//  throws exception if not valid
					this.isValidColor( colorForLine );

					var verticalLineSVG = this.GLOBALS.masonViewerSVG.line( x, y, x, y + this.configDisplayOptions.BLOCK_HEIGHT ).stroke( { color: colorForLine, width: this.configDisplayOptions.BORDER_WIDTH } );

					this.GLOBALS.setSVGVerticalDataLines.add( verticalLineSVG );

					this.addMouseOverToLinesInsideMainBox( verticalLineSVG );


					this.addProgramaticDataStorageToSVG_js_Item( verticalLineSVG );

					verticalLineSVG.data( "rowOffset_hiddenBlockRowIdx", rowOffset + "_" + hiddenBlockRowIdx );

					verticalLineSVG.data( "placement", "primary row lines" );

					verticalLineSVG.data( "block-id", lineData.id );
					
					var attachMouseOverVerticalLineParams = {
							
							verticalLineSVG: verticalLineSVG,
							lineData: lineData,
							callbackFunctions: objectThis.constructorParams.callbackFunctionsObj.mainRowsVerticalLines_callbackFunctions
							
					};
					
					this.attachMouseOverVerticalLine( attachMouseOverVerticalLineParams );


	//				currentSVGgroupOfRowXandBelow.add( verticalLineSVG );

	//				SVGRowXmainLinesSET.add( verticalLineSVG );

					//  TODO  Adding to this Set is probably incorrect
					groupOfHiddenBlocksForRow.add( verticalLineSVG );
				}
			}
		}
	};


	////////////////////////////////////////


//			  mainLineBlocks:
//				[
//				  {
//					blockStartPos: 10,
//					blockEndPos: 15,
//					blockData: [ {"id":85,"otherData":"TheOtherData"} ]  // This property is only pass through to the call back
//
//		  		  }


	MasonViewerPerInstanceRenderOnPage.prototype. processMainLineBlocksForRow = function( outputRow, currentSVGgroupOfRowXandBelow, SVGRowXmainBlocksGROUP, rowIdx  ) {

		var objectThis = this;


		if ( ! objectThis.constructorParams.callbackFunctionsObj.mainRowsBlocks_callbackFunctions ||
				! objectThis.constructorParams.callbackFunctionsObj.mainRowsBlocks_callbackFunctions.precomputeValuesOnCreate ) {
			
			throw "callback function mainRowsBlocks_callbackFunctions.precomputeValuesOnCreate is missing";
		}
		

		if ( ! objectThis.constructorParams.callbackFunctionsObj.mainRowsBlocks_callbackFunctions ||
				! objectThis.constructorParams.callbackFunctionsObj.mainRowsBlocks_callbackFunctions.getColorForBlock ) {
			
			throw "callback function mainRowsBlocks_callbackFunctions.getColorForBlock is missing";
		}

		var mainLineBlocks = outputRow.mainLineBlocks;

		if (  mainLineBlocks.length > 0 ) {


			var splitAnyEntriesForRow = outputRow.splitAnyEntries;


			for ( var mainLineBlocksIdx = 0; mainLineBlocksIdx < mainLineBlocks.length; mainLineBlocksIdx++ ) {

				var blockData = mainLineBlocks[ mainLineBlocksIdx ];


				//  Add callbackDataStorage to blockData

				blockData.callbackDataStorage = {};



				var precomputeValuesOnCreateParams =

				{ 	rowItem: outputRow.inputRowItem,
					blockDataItems: blockData.blockDataItems,

					startPos: blockData.blockStartPos,
					endPos: blockData.blockEndPos,

					callbackDataStorage: blockData.callbackDataStorage,
					splitAnyEntriesForRow: splitAnyEntriesForRow,
					forHiddenBlocks: false  };

				objectThis.constructorParams.callbackFunctionsObj.mainRowsBlocks_callbackFunctions.precomputeValuesOnCreate( precomputeValuesOnCreateParams );

				var blockStartPos = blockData.blockStartPos;

				var blockEndPos = blockData.blockEndPos;

				var startPixel = this.positionLeftEdgeToPixel( blockStartPos );
				var endPixel   = this.positionRightEdgeToPixel( blockEndPos );


				var rectWidth = endPixel - startPixel;


				var x = startPixel +  this.configDisplayOptions.MAIN_BOX_STARTING_POSITION;//  ADD OFFSET to allow for label on left
				var y = ( rowIdx * this.configDisplayOptions.ROW_HEIGHT ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;



				var getColorForBlockParams = { rowItem: outputRow.inputRowItem, blockDataItems: blockData.blockDataItems, callbackDataStorage: blockData.callbackDataStorage, forHiddenBlocks: false  };

				var colorForBlock = objectThis.constructorParams.callbackFunctionsObj.mainRowsBlocks_callbackFunctions.getColorForBlock( getColorForBlockParams );


				//  returns  colorForBlock = { red: 10, green: 255, blue: 1 }
				//                or colorForBlock = "#RRGGBB" (6 positions hex color)
				
				var fillColor = this.convertBlockColorTo_SVGJS_FillColor( colorForBlock );


				var blockBlockSVG = this.GLOBALS.masonViewerSVG.rect( rectWidth, this.configDisplayOptions.BLOCK_HEIGHT ).attr( { fill: fillColor } );

				blockBlockSVG.move( x, y );

				this.addMouseOverToBlocks( blockBlockSVG );


				this.addProgramaticDataStorageToSVG_js_Item( blockBlockSVG );

				blockBlockSVG.data( "row-rowIdx", rowIdx );

				blockBlockSVG.data( "placement", "primary row blocks" );

				blockBlockSVG.data( "block-id", blockData.id );

				if ( splitAnyEntriesForRow ) {

					this.attachMouseOverBlockOverlappingBlocksRow( blockBlockSVG, blockData, outputRow );

				} else {

					this.attachMouseOverBlockNonOverlappingBlocksRow( blockBlockSVG, blockData, outputRow );

					this.attachClickHandlerBlockNonOverlappingBlocks( blockBlockSVG, blockData, outputRow );
				}


//				currentSVGgroupOfRowXandBelow.add( blockBlockSVG );

				SVGRowXmainBlocksGROUP.add( blockBlockSVG );
			}
		}



		//  Start processing Vertical Lines for this line

		
//   Commented out to compare the speed.
		
//   Would need to move this code elsewhere if still wanted, 
//	 or have code that just draws single lines the height of the viewer like
//	 the way the alignment lines are drawn
		
		
		//  Output the lines for the row


		var mainLineLines = outputRow.vertLinesItems;

		this.processMainLineVerticalLines( mainLineLines, SVGRowXmainBlocksGROUP, rowIdx );


		//  End processing Vertical Lines for this row




		// .attr( "vector-effect", "non-scaling-stroke"  )

		var leftLine = this.GLOBALS.masonViewerSVG.line(  this.GLOBALS.leftLineX , ( rowIdx * this.configDisplayOptions.ROW_HEIGHT ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE, this.GLOBALS.leftLineX ,
			( ( rowIdx + 1 ) * this.configDisplayOptions.ROW_HEIGHT ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE  ).stroke( { color: this.configDisplayOptions.BORDER_COLOR, width: this.configDisplayOptions.BORDER_WIDTH } );

		var rightLine = this.GLOBALS.masonViewerSVG.line(  this.GLOBALS.rightLineX,
			( rowIdx * this.configDisplayOptions.ROW_HEIGHT ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE,
			this.GLOBALS.rightLineX,
			( ( rowIdx + 1 ) * this.configDisplayOptions.ROW_HEIGHT ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE  ).stroke( { color: this.configDisplayOptions.BORDER_COLOR, width: this.configDisplayOptions.BORDER_WIDTH } );


		leftLine.data("placement", "lines with primary row blocks");
		rightLine.data("placement", "lines with primary row blocks");

		currentSVGgroupOfRowXandBelow.add( leftLine );
		currentSVGgroupOfRowXandBelow.add( rightLine );

	};


	///////////////////////////////////

	MasonViewerPerInstanceRenderOnPage.prototype. processMainLineVerticalLines = function( mainLineLines, SVGRowXmainBlocksGROUP, rowIdx ) {

		var objectThis = this;


		if ( mainLineLines && mainLineLines.length > 0 &&
				objectThis.constructorParams.callbackFunctionsObj.mainRowsVerticalLines_callbackFunctions &&
				objectThis.constructorParams.callbackFunctionsObj.mainRowsVerticalLines_callbackFunctions.getColorForLine ) {

			for ( var mainLineLinesIdx = 0; mainLineLinesIdx < mainLineLines.length; mainLineLinesIdx++ ) {

				var lineData = mainLineLines[ mainLineLinesIdx ];


				//  Add callbackDataStorage to lineData

				lineData.callbackDataStorage = {};


				if ( objectThis.constructorParams.callbackFunctionsObj.mainRowsVerticalLines_callbackFunctions &&
						objectThis.constructorParams.callbackFunctionsObj.mainRowsVerticalLines_callbackFunctions.precomputeValuesOnCreate )
				{

					var precomputeValuesOnCreateParams =

					{
						vertLineData: lineData.vertLineData,
						linePos: lineData.linePos,
						forHiddenLines: false, 

						callbackDataStorage: lineData.callbackDataStorage
					};

					objectThis.constructorParams.callbackFunctionsObj.mainRowsVerticalLines_callbackFunctions.precomputeValuesOnCreate( precomputeValuesOnCreateParams );
				}



				var linePos = lineData.linePos;

				var linePixel = this.positionCharPositionToPixel( linePos );

				var x = linePixel +  this.configDisplayOptions.MAIN_BOX_STARTING_POSITION;//  ADD OFFSET to allow for label on left
				var y = ( rowIdx * this.configDisplayOptions.ROW_HEIGHT ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;



				var getColorForLineParams = { vertLineData: lineData.vertLineData, callbackDataStorage: lineData.callbackDataStorage, forHiddenLines: false  };

				var colorForLine = objectThis.constructorParams.callbackFunctionsObj.mainRowsVerticalLines_callbackFunctions.getColorForLine( getColorForLineParams );

				//  returns  colorForLine = "#112233"


				//  throws exception if not valid
				this.isValidColor( colorForLine );


				var verticalLineSVG = this.GLOBALS.masonViewerSVG.line( x, y, x, y + this.configDisplayOptions.BLOCK_HEIGHT ).stroke( { color: colorForLine, width: this.configDisplayOptions.BORDER_WIDTH } );

				this.GLOBALS.setSVGVerticalDataLines.add( verticalLineSVG );

				this.addMouseOverToLinesInsideMainBox( verticalLineSVG );


				this.addProgramaticDataStorageToSVG_js_Item( verticalLineSVG );

				verticalLineSVG.data( "row-rowIdx", rowIdx );

				verticalLineSVG.data( "placement", "primary row lines" );

				verticalLineSVG.data( "block-id", lineData.id );

				
				
				var attachMouseOverVerticalLineParams = {
						
						verticalLineSVG: verticalLineSVG,
						lineData: lineData,
						callbackFunctions: objectThis.constructorParams.callbackFunctionsObj.mainRowsVerticalLines_callbackFunctions
						
				};
				
				this.attachMouseOverVerticalLine( attachMouseOverVerticalLineParams );



//				currentSVGgroupOfRowXandBelow.add( verticalLineSVG );

//				SVGRowXmainLinesSET.add( verticalLineSVG );

				//  TODO  Adding to this Set is probably incorrect
				SVGRowXmainBlocksGROUP.add( verticalLineSVG );
			}
		}



	};

