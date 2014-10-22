
//   mason_viewer_55_render_on_page_totals_row.js

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



	//////////////////////////////////////////////

	////////     Blocks in the Totals Row

	///////////////

	//   Create Tool Tip for blocks for a block in the Totals row

	MasonViewerPerInstanceRenderOnPage.prototype. attachMouseOverBlockTotalsOverlappingBlocksRow = function( blockBlockSVG, blockData ) {

		var objectThis = this;
		
		
		if ( objectThis.constructorParams.callbackFunctionsObj === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions.getBlocksToolTipText === undefined 
				) {
			
			return;  //  EXIT early since no call back function to call
		}

		var $blockBlockSVG = this.getJQueryObjForRawSVGFromSVG_js_item( blockBlockSVG );

		var getSingleBlockToolTipTextParams = {

			startPos: blockData.blockStartPos,
			endPos: blockData.blockEndPos,

			blockDataItems: blockData.blockDataItems,

			callbackDataStorage: blockData.callbackDataStorage
		};

		var getTooltipTextFcn = function( tooltip, node ) {

			var tooltipHTML = objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions.getBlocksToolTipText( getSingleBlockToolTipTextParams  );
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

	//   Create Tool Tip for blocks for a block in the Totals row

	MasonViewerPerInstanceRenderOnPage.prototype. attachMouseOverBlockTotalsNonOverlappingBlocksRow = function( blockBlockSVG, blockData ) {

		var objectThis = this;

		if ( objectThis.constructorParams.callbackFunctionsObj === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions.getBlocksToolTipText === undefined 
				) {
			
			return;  //  EXIT early since no call back function to call
		}
		
		var $blockBlockSVG = this.getJQueryObjForRawSVGFromSVG_js_item( blockBlockSVG );

		var getSingleBlockToolTipTextParams = {

			startPos: blockData.blockStartPos,
			endPos: blockData.blockEndPos,

			blockDataItems: blockData.blockDataItems,

			callbackDataStorage: blockData.callbackDataStorage
		};

		var getTooltipTextFcn = function( tooltip, node ) {

			var tooltipHTML = objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions.getBlocksToolTipText( getSingleBlockToolTipTextParams  );
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

	//   Handle Click for blocks for a block in the Totals row

	MasonViewerPerInstanceRenderOnPage.prototype. attachClickHandlerBlockCombinedRow = function( blockBlockSVG, blockData ) {

		var objectThis = this;
		
		
		if ( objectThis.constructorParams.callbackFunctionsObj === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions.processClick === undefined 
				) {
			
			return;  //  No click handler so exit early
		}

		var $blockBlockSVG = this.getJQueryObjForRawSVGFromSVG_js_item( blockBlockSVG );

		var processClickParams = {

			startPos: blockData.blockStartPos,
			endPos: blockData.blockEndPos,

			blockDataItems: blockData.blockDataItems,

			callbackDataStorage: blockData.callbackDataStorage
		};


		$blockBlockSVG.click( function( eventObject ) {

			objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions.processClick( processClickParams );
		});
	};




	////////////////////////////////////

	////////   Totals block in the Totals row

	///////////////

	//   Create Tool Tip for Totals block in the Totals row

	MasonViewerPerInstanceRenderOnPage.prototype. attachMouseOverCombinedRowTotalBlock = function( rowTotalBlockSVG, callbackDataStorage ) {

		var objectThis = this;
		

		if ( objectThis.constructorParams.callbackFunctionsObj === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.combinedRowTotalBar_callbackFunctions === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.combinedRowTotalBar_callbackFunctions.getTotalBarToolTipText === undefined 
				) {
			
			return;  //  No mouse over handler so exit early
		}

		var $rowTotalBlockSVG = this.getJQueryObjForRawSVGFromSVG_js_item( rowTotalBlockSVG );

		var getCombinedRowBlockToolTipTextParams = {

			callbackDataStorage: callbackDataStorage
		};

		this.attachToolTipToJqueryHtmlNode( $rowTotalBlockSVG, function( tooltip, node ) {

//			var $blockBlockSVG = $(node);

			var tooltipHTML = objectThis.constructorParams.callbackFunctionsObj.combinedRowTotalBar_callbackFunctions.getTotalBarToolTipText( getCombinedRowBlockToolTipTextParams  );

			$(tooltip).html( tooltipHTML );

			return tooltipHTML;

		} );
	};

	///////////////

	//   Handle Click for Totals block in the Totals row

	MasonViewerPerInstanceRenderOnPage.prototype. attachClickHandlerCombinedRowTotalBlock = function( rowTotalBlockSVG, callbackDataStorage ) {

		var objectThis = this;
		
		if ( objectThis.constructorParams.callbackFunctionsObj === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.combinedRowTotalBar_callbackFunctions === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.combinedRowTotalBar_callbackFunctions.processClick === undefined 
				) {
			
			return;  //  No click handler so exit early
		}
		
		var $rowTotalBlockSVG = this.getJQueryObjForRawSVGFromSVG_js_item( rowTotalBlockSVG );

		var processClickParams = {

			callbackDataStorage: callbackDataStorage
		};

		$rowTotalBlockSVG.click( function( eventObject ) {

			objectThis.constructorParams.callbackFunctionsObj.combinedRowTotalBar_callbackFunctions.processClick( processClickParams );
		});
	};


	////////////////////////////////////////

	//////   Processing Totals Row at bottom




	MasonViewerPerInstanceRenderOnPage.prototype. processCombinedRow = function( outputRows, rowIdx, currentSVGgroupOfRowXandBelow, currentSVGgroupOfRowXandBelowProgramaticDataStorage  ) {

//		var objectThis = this;

		currentSVGgroupOfRowXandBelow.attr("class", "prot_cov_viewer_group_row_main" );

		currentSVGgroupOfRowXandBelow.attr("label", "Totals Row Group" );

//		var rowIdx = outputRows.length;

		var combinedBlockItems = this.combineTotalsBlocksWhereStartEndMatch( outputRows  );


		var splitOutput = this.constructorParams.objectThisMasonViewerPerInstance.combineOverlapsProteinPositionBased( combinedBlockItems );

		var splitAnyEntries = splitOutput.splitAnyEntries;

		var mainLineTotalBlocks = splitOutput.outputList;


		this.processTotalsLabel( rowIdx, splitAnyEntries, currentSVGgroupOfRowXandBelow, currentSVGgroupOfRowXandBelowProgramaticDataStorage  );


		this.addBoxUnderEachRowForMouseOver( currentSVGgroupOfRowXandBelow, currentSVGgroupOfRowXandBelowProgramaticDataStorage, rowIdx );



		var outputTotalRow = { mainLineTotalBlocks: mainLineTotalBlocks, combinedBlockItems: combinedBlockItems,
			splitAnyEntries: splitAnyEntries };


		var SVGRowXmainBlocksGROUP = this.GLOBALS.masonViewerSVG.group();

		currentSVGgroupOfRowXandBelow.add( SVGRowXmainBlocksGROUP );

		SVGRowXmainBlocksGROUP.attr("label", "SVGRowXmainBlocksGROUP_processCombinedRow");


		currentSVGgroupOfRowXandBelowProgramaticDataStorage.setSVGRowXmainBlocksGROUP( SVGRowXmainBlocksGROUP );


		this.processCombinedRowMainLineBlocks( outputTotalRow, currentSVGgroupOfRowXandBelow, SVGRowXmainBlocksGROUP, rowIdx  );

		if ( splitAnyEntries ) {


			this.createTotalsLineHiddenBlocksIfNotCreatedCallbackCreator( rowIdx, combinedBlockItems, splitOutput.splitAnyEntries,
				currentSVGgroupOfRowXandBelow, currentSVGgroupOfRowXandBelowProgramaticDataStorage
//				,
//				setOfTotalsHiddenBlocksForRow
				);

//			processCombinedRowHiddenBlocks( rowIdx, combinedBlockItems, splitOutput.splitAnyEntries,
//				currentSVGgroupOfRowXandBelow, currentSVGgroupOfRowXandBelowProgramaticDataStorage,
//				setOfTotalsHiddenBlocksForRow );
		}


		this.processRowTotalBlockForCombinedRow( rowIdx, currentSVGgroupOfRowXandBelow, currentSVGgroupOfRowXandBelowProgramaticDataStorage );
	};



	//////////////////////////////////

	//   Create a callback to create the hidden blocks if not created

	MasonViewerPerInstanceRenderOnPage.prototype. createTotalsLineHiddenBlocksIfNotCreatedCallbackCreator = function ( rowIdx, combinedBlockItems, splitAnyEntries,
				currentSVGgroupOfRowXandBelow, currentSVGgroupOfRowXandBelowProgramaticDataStorage
//				,
//				setOfTotalsHiddenBlocksForRow
				) {

		var objectThis = this;

		//  create callback function

		var createHiddenBlocksIfNotCreatedCallback = function() {

			var hiddenBlocksForRowSet = currentSVGgroupOfRowXandBelowProgramaticDataStorage.getHiddenBlocksForRowSet( );

			if (  splitAnyEntries && ( hiddenBlocksForRowSet === undefined || hiddenBlocksForRowSet === null  ) ) {

				objectThis.processCombinedRowHiddenBlocks( rowIdx, combinedBlockItems, splitAnyEntries,
					currentSVGgroupOfRowXandBelow, currentSVGgroupOfRowXandBelowProgramaticDataStorage
//					,
//					setOfTotalsHiddenBlocksForRow
					);
			}
		};

		//  assign callback function to storage

		currentSVGgroupOfRowXandBelowProgramaticDataStorage.setCreateHiddenBlocksIfNotCreatedCallback( createHiddenBlocksIfNotCreatedCallback );
	};



	//////////////////////

	//   Label for totals Row


	MasonViewerPerInstanceRenderOnPage.prototype. processTotalsLabel = function( rowIdx, splitAnyEntries, currentSVGgroupOfRowXandBelow, currentSVGgroupOfRowXandBelowProgramaticDataStorage  ) {

		var objectThis = this;

		var labelText = this.configDisplayOptions.combinedLineLabel;

		var labelTextSVG = this.GLOBALS.masonViewerSVG.text( labelText );

//		var labelTextSVGContent = labelTextSVG.content;

		this.addProgramaticDataStorageToSVG_js_Item( labelTextSVG );

		labelTextSVG.data( "Totals-Label", "" );

		currentSVGgroupOfRowXandBelow.add( labelTextSVG );

		//  A hack to clear the broken font-size.  Clear dy that was set to compensate
		objectThis.clearStyleAnd_dy_OnSVGtextItem( labelTextSVG );

		//  The "y" for a text item is the "baseline" of the font, the bottom of characters without decenders

		//   SVG.js would have attempted to compensate this to allow the "y" to be at the top of the letters but
		//   the method of specifying the font size was difficult to use and somewhat broken



		var textY = ( rowIdx * this.configDisplayOptions.ROW_HEIGHT ) + ( this.configDisplayOptions.ROW_HEIGHT / 2 );

		textY = textY + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;

		var labelAdditionalStyle = "";

//		if ( splitAnyEntries ) {
//
//			labelAdditionalStyle = "; cursor: pointer;"
//		}

		this.setSVGTextPosition( { textSVG: labelTextSVG, x: this.configDisplayOptions.LABEL_STARTING_POSITION, y: textY, otherAttrsToSet: undefined, additionalStyle: labelAdditionalStyle  } );

		var y = ( rowIdx * this.configDisplayOptions.ROW_HEIGHT );


		y = y + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;


//		var labelTextSVG_BBox = labelTextSVG.bbox(); //  The bbox() values are zero if the graph is hidden with the div having display: none;




		if ( this.configDisplayOptions.combinedLineTooltipHTML ) {


			var labelTooltipHTML = this.configDisplayOptions.combinedLineTooltipHTML;

			var $labelTextSVG = this.getJQueryObjForRawSVGFromSVG_js_item( labelTextSVG );

			this.attachToolTipToJqueryHtmlNode( $labelTextSVG, function( tooltip, node ) {

				var tooltipHTML = labelTooltipHTML;

				$(tooltip).html( tooltipHTML );

				return tooltipHTML;

			} );

		}


		if ( splitAnyEntries ) {


			this.createHiddenBlocksExpansionIcon( this.configDisplayOptions.CLICK_TO_EXPAND_TO_SHOW_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT, currentSVGgroupOfRowXandBelow, rowIdx, currentSVGgroupOfRowXandBelowProgramaticDataStorage );

		}

//		return labelTextSVG;  Not used so not returned
	};



	////////////////////////////////////////


	//  Get the internal memory representation of the totals blocks in arrays of arrays where blockStartPosPixel and blockEndPosPixel are set

	MasonViewerPerInstanceRenderOnPage.prototype. combineTotalsBlocksWhereStartEndMatch = function( outputRows  ) {

//		var objectThis = this;

		var combinedBlockItems = [];


		//  First roll all the blockItems into one array

		var allBlockItems = [];

		for ( var outputRowsIdx = 0; outputRowsIdx < outputRows.length; outputRowsIdx++ ) {

			var outputRow = outputRows[ outputRowsIdx ];

			var blockItems = outputRow.blockItems;

			for ( var blockItemIdx = 0; blockItemIdx < blockItems.length; blockItemIdx++ ) {

				var blockItem = blockItems[ blockItemIdx ];

				allBlockItems.push( blockItem );
			}
		}

		//	Now combine them

		for ( var blockItemIdx = 0; blockItemIdx < allBlockItems.length; blockItemIdx++ ) {


			var blockItem = allBlockItems[ blockItemIdx ];

			if ( blockItem !== null ) {

				for ( var blockItemOtherIdx = blockItemIdx + 1; blockItemOtherIdx < allBlockItems.length; blockItemOtherIdx++ ) {

					var blockItemOther = allBlockItems[ blockItemOtherIdx ];

					if ( blockItemOther !== null ) {

						if ( blockItem.blockStartPos === blockItemOther.blockStartPos && blockItem.blockEndPos === blockItemOther.blockEndPos ) {

							blockItem.blockDataItems = blockItem.blockDataItems.concat( blockItemOther.blockDataItems );

							allBlockItems[ blockItemOtherIdx ] = null;
						}
					}
				}

				combinedBlockItems.push( blockItem );
			}
		}


		combinedBlockItems.sort( this.constructorParams.objectThisMasonViewerPerInstance.combineOverlaps_Z_compareForSortBlocks );

		return combinedBlockItems;
	};

	////////////////////////////////////////


	//  Get the internal memory representation of the totals blocks in arrays of arrays where blockStartPosPixel and blockEndPosPixel are set

	MasonViewerPerInstanceRenderOnPage.prototype. placeTotalsBlocksIntoRows = function( blockItems  ) {

//		var objectThis = this;

		var totalBlockRows = [];

		var prevEnds = [];
		var prevEndsScaled = [];

		var prevEndsLastEntry = -1;


		for ( var blockItemIdx = 0; blockItemIdx < blockItems.length; blockItemIdx++ ) {

			var blockItem = blockItems[ blockItemIdx ];

			var blockData = blockItem;


			var blockStartPos = blockData.blockStartPos;
			var blockEndPos   = blockData.blockEndPos;

			var startPixel = this.positionLeftEdgeToPixel( blockStartPos );
			var endPixel   = this.positionRightEdgeToPixel( blockEndPos );


			for ( var index = 0; index <= prevEndsLastEntry; index++ ) {

				if ( blockItem.blockStartPos === ( prevEnds[ index ] + 1 ) ) {

					startPixel = prevEndsScaled[ index ] + .01;
				}
			}

			blockItem.totalBlockStartPositionPixel = startPixel;
			blockItem.totalBlockEndPositionPixel = endPixel;

			// find where to put this entry

			var addedToList = false;

			for ( var totalBlockRowsIdx = 0; totalBlockRowsIdx < totalBlockRows.length; totalBlockRowsIdx++ ) {

				var totalBlockRow = totalBlockRows[ totalBlockRowsIdx ];

				var blockItemInList = totalBlockRow[ totalBlockRow.length - 1 ];

				if ( startPixel > ( blockItemInList.totalBlockEndPositionPixel /* add 1 to not allow them to butt together  + 1 */ ) ) {

					addedToList = true;

					totalBlockRow.push( blockItem );

					break;
				}
			}

			if ( ! addedToList ) {

				var totalBlockRow_NewRow = [];

				totalBlockRow_NewRow.push( blockItem );

				totalBlockRows.push( totalBlockRow_NewRow );
			}


			prevEndsLastEntry++;

			prevEnds[ prevEndsLastEntry ] = blockItem.blockEndPos;
			prevEndsScaled[ prevEndsLastEntry ] = endPixel;
		}

		return totalBlockRows;
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


	MasonViewerPerInstanceRenderOnPage.prototype. processCombinedRowMainLineBlocks = function( outputRow, currentSVGgroupOfRowXandBelow, SVGRowXmainBlocksGROUP, rowIdx  ) {

		var objectThis = this;

		if ( ! objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions ||
				! objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions.precomputeValuesOnCreate ) {
			
			throw "callback function combinedRow_callbackFunctions.precomputeValuesOnCreate is missing";
		}
		
		if ( ! objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions ||
				! objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions.getColorForBlock ) {
			
			throw "callback function combinedRow_callbackFunctions.getColorForBlock is missing";
		}

		
		var mainLineBlocks = outputRow.mainLineTotalBlocks;

		if (  mainLineBlocks.length > 0 ) {


			var splitAnyEntriesForRow = outputRow.splitAnyEntries;


			for ( var mainLineBlocksIdx = 0; mainLineBlocksIdx < mainLineBlocks.length; mainLineBlocksIdx++ ) {

				var blockData = mainLineBlocks[ mainLineBlocksIdx ];


				//  Add callbackDataStorage to blockData

				blockData.callbackDataStorage = {};


				var precomputeValuesOnCreateParams =

				{
					blockDataItems: blockData.blockDataItems,

					startPos: blockData.blockStartPos,
					endPos: blockData.blockEndPos,

					splitAnyEntriesForRow: splitAnyEntriesForRow,

					callbackDataStorage: blockData.callbackDataStorage
				};

				objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions.precomputeValuesOnCreate( precomputeValuesOnCreateParams );

				var blockStartPos = blockData.blockStartPos;

				var blockEndPos = blockData.blockEndPos;

				var startPixel = this.positionLeftEdgeToPixel( blockStartPos );
				var endPixel   = this.positionRightEdgeToPixel( blockEndPos );


				var rectWidth = endPixel - startPixel;


				var x = startPixel +  this.configDisplayOptions.MAIN_BOX_STARTING_POSITION;//  ADD OFFSET to allow for label on left
				var y = ( rowIdx * this.configDisplayOptions.ROW_HEIGHT ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;


				var getColorForBlockParams = { blockDataItems: blockData.blockDataItems, callbackDataStorage: blockData.callbackDataStorage };

				var colorForBlock = objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions.getColorForBlock( getColorForBlockParams );


				//  returns  colorForBlock = { red: 1, green: 1, blue: 1 }

				colorForBlock = this.roundAndValidateColor( colorForBlock );


				var blockBlockSVG = this.GLOBALS.masonViewerSVG.rect( rectWidth, this.configDisplayOptions.BLOCK_HEIGHT ).attr( { fill: { r: colorForBlock.red, g: colorForBlock.green, b: colorForBlock.blue } } );

				blockBlockSVG.move( x, y );

				this.addMouseOverToBlocks( blockBlockSVG );


				this.addProgramaticDataStorageToSVG_js_Item( blockBlockSVG );

				blockBlockSVG.data( "row-rowIdx", rowIdx );

				blockBlockSVG.data( "placement", "primary row blocks" );

				blockBlockSVG.data( "block-id", blockData.id );

				if ( splitAnyEntriesForRow ) {

					this.attachMouseOverBlockTotalsOverlappingBlocksRow( blockBlockSVG, blockData, outputRow );

				} else {

					this.attachMouseOverBlockTotalsNonOverlappingBlocksRow( blockBlockSVG, blockData, outputRow );

					this.attachClickHandlerBlockCombinedRow( blockBlockSVG, blockData, outputRow );
				}


//				currentSVGgroupOfRowXandBelow.add( blockBlockSVG );

				SVGRowXmainBlocksGROUP.add( blockBlockSVG );
			}
		}




		//  Start processing Vertical Lines for this line


		//  Output the lines for the row

		var combinedRowLines = this.constructorParams.requestParams.inputData.vertLinesCombinedRow;

		this.processCombinedRowMainLineVerticalLines( combinedRowLines, SVGRowXmainBlocksGROUP, rowIdx );


		//  End processing Vertical Lines for this line



		// .attr( "vector-effect", "non-scaling-stroke"  )

		var leftLine = this.GLOBALS.masonViewerSVG.line(  this.GLOBALS.leftLineX , ( rowIdx * this.configDisplayOptions.ROW_HEIGHT ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE, this.GLOBALS.leftLineX ,
			( ( rowIdx + 1 ) * this.configDisplayOptions.ROW_HEIGHT ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE  ).stroke( { color: this.configDisplayOptions.BORDER_COLOR, width: this.configDisplayOptions.BORDER_WIDTH } );

		var rightLine = this.GLOBALS.masonViewerSVG.line(  this.GLOBALS.rightLineX,
			( rowIdx * this.configDisplayOptions.ROW_HEIGHT ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE,
			this.GLOBALS.rightLineX,
			( ( rowIdx + 1 ) * this.configDisplayOptions.ROW_HEIGHT ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE  ).stroke( { color: this.configDisplayOptions.BORDER_COLOR, width: this.configDisplayOptions.BORDER_WIDTH } );


		leftLine.data("placement", "left edge line for primary totals row blocks");
		rightLine.data("placement", "right edge line for primary totals row blocks");

		currentSVGgroupOfRowXandBelow.add( leftLine );
		currentSVGgroupOfRowXandBelow.add( rightLine );

	};


	///////////////////////////////////

	MasonViewerPerInstanceRenderOnPage.prototype. processCombinedRowMainLineVerticalLines = function( combinedRowLines, SVGRowXmainBlocksGROUP, rowIdx ) {

		var objectThis = this;

		if ( combinedRowLines && combinedRowLines.length > 0 &&
				objectThis.constructorParams.callbackFunctionsObj.combinedRowVerticalLines_callbackFunctions &&
				objectThis.constructorParams.callbackFunctionsObj.combinedRowVerticalLines_callbackFunctions.getColorForLine ) {


			for ( var combinedRowLinesIdx = 0; combinedRowLinesIdx < combinedRowLines.length; combinedRowLinesIdx++ ) {

				var lineData = combinedRowLines[ combinedRowLinesIdx ];


				//  Add callbackDataStorage to lineData

				lineData.callbackDataStorage = {};


				if ( objectThis.constructorParams.callbackFunctionsObj.combinedRowVerticalLines_callbackFunctions &&
						objectThis.constructorParams.callbackFunctionsObj.combinedRowVerticalLines_callbackFunctions.precomputeValuesOnCreate )
				{

					var precomputeValuesOnCreateParams =

					{ 	vertLineData: lineData.vertLineData,
						linePos: lineData.linePos,
						forHiddenLines: false, 

						callbackDataStorage: lineData.callbackDataStorage
					};

					objectThis.constructorParams.callbackFunctionsObj.combinedRowVerticalLines_callbackFunctions.precomputeValuesOnCreate( precomputeValuesOnCreateParams );
				}



				var linePos = lineData.linePos;


				var linePixel = this.positionCharPositionToPixel( linePos );




				var x = linePixel +  this.configDisplayOptions.MAIN_BOX_STARTING_POSITION;//  ADD OFFSET to allow for label on left
				var y = ( rowIdx * this.configDisplayOptions.ROW_HEIGHT ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;



				var getColorForLineParams = { vertLineData: lineData.vertLineData, callbackDataStorage: lineData.callbackDataStorage, forHiddenLines: false  };

				var colorForLine = objectThis.constructorParams.callbackFunctionsObj.combinedRowVerticalLines_callbackFunctions.getColorForLine( getColorForLineParams );

				//  returns  colorForLine = "#112233"

				//  WAS   returns  colorForLine = { red: 1, green: 1, blue: 1 }

//				colorForLine = roundAndValidateColor( colorForLine );

//				({ color: '#f06', width: 1 });
//				ss ss

				var verticalLineSVG = this.GLOBALS.masonViewerSVG.line( x, y, x, y + this.configDisplayOptions.BLOCK_HEIGHT ).stroke( { color: colorForLine, width: this.configDisplayOptions.BORDER_WIDTH } );

				this.GLOBALS.setSVGVerticalDataLines.add( verticalLineSVG );

				this.addProgramaticDataStorageToSVG_js_Item( verticalLineSVG );

				verticalLineSVG.data( "row-rowIdx", rowIdx );

				verticalLineSVG.data( "placement", "primary totals row lines" );

				verticalLineSVG.data( "block-id", lineData.id );

				
				var attachMouseOverVerticalLineParams = {
						
						verticalLineSVG: verticalLineSVG,
						lineData: lineData,
						callbackFunctions: objectThis.constructorParams.callbackFunctionsObj.combinedRowVerticalLines_callbackFunctions
				};
				
				this.attachMouseOverVerticalLine( attachMouseOverVerticalLineParams );



//				currentSVGgroupOfRowXandBelow.add( verticalLineSVG );

//				SVGRowXmainLinesSET.add( verticalLineSVG );

				//  TODO  Adding to this Set is probably incorrect
				SVGRowXmainBlocksGROUP.add( verticalLineSVG );
			}
		}

		//  End processing Vertical Lines for this line

	};




	////////////////////////////////////////


	//  Output hidden blocks for totals row

	MasonViewerPerInstanceRenderOnPage.prototype. processCombinedRowHiddenBlocks

	= function( rowIdx, combinedBlockItems, splitAnyEntriesForRow,
		currentSVGgroupOfRowXandBelow,
		currentSVGgroupOfRowXandBelowProgramaticDataStorage
//		,
//		setOfTotalBlocksForRow

		) {

		var objectThis = this;


		if ( ! objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions ||
				! objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions.precomputeValuesOnCreate ) {
			
			throw "callback function combinedRow_callbackFunctions.precomputeValuesOnCreate is missing";
		}
		
		if ( ! objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions ||
				! objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions.getColorForBlock ) {
			
			throw "callback function combinedRow_callbackFunctions.getColorForBlock is missing";
		}
		
		
//		var setOfTotalsHiddenBlocksForRow = this.GLOBALS.masonViewerSVG.set(); //  set of all the hidden blocks in this row

		var groupOfTotalsHiddenBlocksForRow = this.GLOBALS.masonViewerSVG.group(); //  set of all the hidden blocks in this row

		currentSVGgroupOfRowXandBelow.add( groupOfTotalsHiddenBlocksForRow );

		groupOfTotalsHiddenBlocksForRow.attr("label", "groupOfTotalsHiddenBlocksForRow_processCombinedRow");


		currentSVGgroupOfRowXandBelowProgramaticDataStorage.setHiddenBlocksForRowSet( groupOfTotalsHiddenBlocksForRow );

		var firstRowY = rowIdx * this.configDisplayOptions.ROW_HEIGHT;


		var totalBlockRows = this.placeTotalsBlocksIntoRows( combinedBlockItems );

		var totalBlocksRowsHeight = totalBlockRows.length * this.configDisplayOptions.ROW_HEIGHT;

		var totalBlocksRowsHeightForHiddenBlockHeight = ( totalBlockRows.length - 1 ) * this.configDisplayOptions.ROW_HEIGHT;



		currentSVGgroupOfRowXandBelowProgramaticDataStorage.setHiddenBlocksHeight( totalBlocksRowsHeightForHiddenBlockHeight );


		this.addTotalsBlocksBoxUnderEachRowForMouseOver( totalBlocksRowsHeight, groupOfTotalsHiddenBlocksForRow, currentSVGgroupOfRowXandBelowProgramaticDataStorage, rowIdx );



		//  First loop through calling the "precompute"

		for ( var totalBlockRowIdx = 0; totalBlockRowIdx < totalBlockRows.length; totalBlockRowIdx++ ) {


			var totalBlockRow = totalBlockRows[ totalBlockRowIdx ];

			var totalBlocksRowItems = totalBlockRow;

			//  Looping through the total blocks for a given row

			for ( var totalBlockIdx = 0; totalBlockIdx < totalBlocksRowItems.length; totalBlockIdx++ ) {

				var blockData = totalBlocksRowItems[ totalBlockIdx ];


				blockData.callbackDataStorage = {};

				var precomputeValuesOnCreateParams =

				{
					blockDataItems: blockData.blockDataItems,

					startPos: blockData.blockStartPos,
					endPos: blockData.blockEndPos,

					splitAnyEntriesForRow: false, // always false for hidden blocks
					forHiddenBlocks: true,

					callbackDataStorage: blockData.callbackDataStorage
				};

				objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions.precomputeValuesOnCreate( precomputeValuesOnCreateParams );

			}
		}

		for ( var totalBlockRowIdx = 0; totalBlockRowIdx < totalBlockRows.length; totalBlockRowIdx++ ) {


			var totalBlockRow = totalBlockRows[ totalBlockRowIdx ];

			var totalBlocksRowItems = totalBlockRow;

			//  Looping through the total blocks for a given row

			for ( var totalBlockIdx = 0; totalBlockIdx < totalBlocksRowItems.length; totalBlockIdx++ ) {

				var blockData = totalBlocksRowItems[ totalBlockIdx ];

				var x = blockData.totalBlockStartPositionPixel + this.configDisplayOptions.MAIN_BOX_STARTING_POSITION; //  ADD OFFSET to allow for label on left
				if ( x < this.configDisplayOptions.MAIN_BOX_STARTING_POSITION  ) {

					x = this.configDisplayOptions.MAIN_BOX_STARTING_POSITION ;
				}
				var y = ( ( totalBlockRowIdx ) * this.configDisplayOptions.ROW_HEIGHT ) + ( firstRowY );

				y = y + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;

				var rectWidth = blockData.totalBlockEndPositionPixel - blockData.totalBlockStartPositionPixel;


				var getColorForBlockParams = { blockDataItems: blockData.blockDataItems, callbackDataStorage: blockData.callbackDataStorage };

				var colorForBlock = objectThis.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions.getColorForBlock( getColorForBlockParams );

				//  returns  colorForBlock = { red: 1, green: 1, blue: 1 }

				colorForBlock = this.roundAndValidateColor( colorForBlock );


				var blockBlockSVG = this.GLOBALS.masonViewerSVG.rect( rectWidth, this.configDisplayOptions.BLOCK_HEIGHT ).attr( { fill: { r: colorForBlock.red, g: colorForBlock.green, b: colorForBlock.blue } } );

				blockBlockSVG.move( x, y );

				this.addMouseOverToBlocks( blockBlockSVG );

				this.addProgramaticDataStorageToSVG_js_Item( blockBlockSVG );

				blockBlockSVG.data( "row-rowIdx", rowIdx );

				blockBlockSVG.data( "placement", "initially hidden total row blocks" );

				blockBlockSVG.data( "block-id", blockData.id );

				this.attachMouseOverBlockTotalsNonOverlappingBlocksRow( blockBlockSVG, blockData );

				this.attachClickHandlerBlockCombinedRow( blockBlockSVG, blockData );

				currentSVGgroupOfRowXandBelow.add( blockBlockSVG );

				groupOfTotalsHiddenBlocksForRow.add( blockBlockSVG );

//				blockBlockSVG.hide();

			}
		}


		//  Start processing Vertical Lines for this line


		//  Output the lines for the row

		var combinedRowLines = this.constructorParams.requestParams.inputData.vertLinesCombinedRow;

		this.processCombinedRowHiddenLinesVerticalLines( combinedRowLines, totalBlockRows, groupOfTotalsHiddenBlocksForRow, rowIdx );


		this.showHideAllVerticalDataLinesPer_GLOBALS_showVerticalDataLines( );




		// .attr( "vector-effect", "non-scaling-stroke"  )

		var leftLine = this.GLOBALS.masonViewerSVG.line(  this.GLOBALS.leftLineX , ( firstRowY ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE,
			this.GLOBALS.leftLineX ,
			( ( firstRowY ) + totalBlocksRowsHeight ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE  ).stroke( { color: this.configDisplayOptions.BORDER_COLOR, width: this.configDisplayOptions.BORDER_WIDTH } );

		var rightLine = this.GLOBALS.masonViewerSVG.line(  this.GLOBALS.rightLineX,
			( firstRowY ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE,
			this.GLOBALS.rightLineX,
			( ( firstRowY ) + totalBlocksRowsHeight ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE  ).stroke( { color: this.configDisplayOptions.BORDER_COLOR, width: this.configDisplayOptions.BORDER_WIDTH } );

//		currentSVGgroupOfRowXandBelow.add( leftLine );
//		currentSVGgroupOfRowXandBelow.add( rightLine );

		groupOfTotalsHiddenBlocksForRow.add( leftLine );
		groupOfTotalsHiddenBlocksForRow.add( rightLine );

//		leftLine.hide();
//		rightLine.hide();

//		createHiddenBlocksContractionIcon( this.configDisplayOptions.CLICK_TO_CONTRACT_TO_HIDE_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT, currentSVGgroupOfRowXandBelow, rowIdx, currentSVGgroupOfRowXandBelowProgramaticDataStorage );

		this.createHiddenBlocksContractionIcon( this.configDisplayOptions.CLICK_TO_CONTRACT_TO_HIDE_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT, groupOfTotalsHiddenBlocksForRow, rowIdx, currentSVGgroupOfRowXandBelowProgramaticDataStorage );

		groupOfTotalsHiddenBlocksForRow.hide();

	};




	///////////////////////////////////

	MasonViewerPerInstanceRenderOnPage.prototype. processCombinedRowHiddenLinesVerticalLines = function( combinedRowLines, totalBlockRows, groupOfTotalsHiddenBlocksForRow, rowIdx ) {

		var objectThis = this;


		//  Start processing Vertical Lines for this line



		//  Output the lines for the row


		if ( combinedRowLines && combinedRowLines.length > 0 &&
				objectThis.constructorParams.callbackFunctionsObj.combinedRowVerticalLines_callbackFunctions &&
				objectThis.constructorParams.callbackFunctionsObj.combinedRowVerticalLines_callbackFunctions.getColorForLine ) {

			for ( var totalBlockRowIdx = 0; totalBlockRowIdx < totalBlockRows.length; totalBlockRowIdx++ ) {


//				var totalBlockRow = totalBlockRows[ totalBlockRowIdx ];

//				var totalBlocksRowItems = totalBlockRow;



				for ( var combinedRowLinesIdx = 0; combinedRowLinesIdx < combinedRowLines.length; combinedRowLinesIdx++ ) {



					var lineData = combinedRowLines[ combinedRowLinesIdx ];


					//  Add callbackDataStorage to lineData

					lineData.callbackDataStorage = {};


					if ( objectThis.constructorParams.callbackFunctionsObj.combinedRowVerticalLines_callbackFunctions &&
							objectThis.constructorParams.callbackFunctionsObj.combinedRowVerticalLines_callbackFunctions.precomputeValuesOnCreate )
					{

						var precomputeValuesOnCreateParams =

						{
							vertLineData: lineData.vertLineData,
							linePos: lineData.linePos,
							forHiddenLines: true, 

							callbackDataStorage: lineData.callbackDataStorage
						};

						objectThis.constructorParams.callbackFunctionsObj.combinedRowVerticalLines_callbackFunctions.precomputeValuesOnCreate( precomputeValuesOnCreateParams );
					}



					var linePos = lineData.linePos;

					var linePixel = this.positionCharPositionToPixel( linePos );

					var x = linePixel +  this.configDisplayOptions.MAIN_BOX_STARTING_POSITION;//  ADD OFFSET to allow for label on left

//					var y = ( rowIdx * this.configDisplayOptions.ROW_HEIGHT ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;

					var y = ( ( totalBlockRowIdx ) * this.configDisplayOptions.ROW_HEIGHT ) + ( rowIdx * this.configDisplayOptions.ROW_HEIGHT );

					y = y + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;


					var getColorForLineParams = {
						vertLineData: lineData.vertLineData,

						callbackDataStorage: lineData.callbackDataStorage, forHiddenLines: false  };

					var colorForLine = objectThis.constructorParams.callbackFunctionsObj.combinedRowVerticalLines_callbackFunctions.getColorForLine( getColorForLineParams );

					//  returns  colorForLine = "#112233"

					//  WAS   returns  colorForLine = { red: 1, green: 1, blue: 1 }

	//				colorForLine = this.roundAndValidateColor( colorForLine ); //  Skip since doesn't work for color as string

					var verticalLineSVG = this.GLOBALS.masonViewerSVG.line( x, y, x, y + this.configDisplayOptions.BLOCK_HEIGHT ).stroke( { color: colorForLine, width: this.configDisplayOptions.BORDER_WIDTH } );

					this.GLOBALS.setSVGVerticalDataLines.add( verticalLineSVG );


					this.addMouseOverToLinesInsideMainBox( verticalLineSVG );


					this.addProgramaticDataStorageToSVG_js_Item( verticalLineSVG );

					verticalLineSVG.data( "rowIdx_combinedRowLinesIdx", rowIdx + "_" + combinedRowLinesIdx );

					verticalLineSVG.data( "placement", "initally hidden totals row lines" );

					verticalLineSVG.data( "block-id", lineData.id );


					
					var attachMouseOverVerticalLineParams = {
							
							verticalLineSVG: verticalLineSVG,
							lineData: lineData,
							callbackFunctions: objectThis.constructorParams.callbackFunctionsObj.combinedRowVerticalLines_callbackFunctions
					};
					
					this.attachMouseOverVerticalLine( attachMouseOverVerticalLineParams );



	//				currentSVGgroupOfRowXandBelow.add( verticalLineSVG );

	//				SVGRowXmainLinesSET.add( verticalLineSVG );

					//  TODO  Adding to this Set is probably incorrect
					groupOfTotalsHiddenBlocksForRow.add( verticalLineSVG );
				}
			}
		}


	};


	//////////////////////////////////////////////

	//  Process the Totals Row Total Block, currently added to the right of the main grid

	MasonViewerPerInstanceRenderOnPage.prototype. processRowTotalBlockForCombinedRow = function( rowIdx, currentSVGgroupOfRowXandBelow, currentSVGgroupOfRowXandBelowProgramaticDataStorage ) {

		var objectThis = this;

		if ( objectThis.constructorParams.callbackFunctionsObj.combinedRowTotalBar_callbackFunctions === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.combinedRowTotalBar_callbackFunctions === null ) {

			return;  //  Exit if call back functions not defined
		}
		
		if ( objectThis.constructorParams.callbackFunctionsObj.combinedRowTotalBar_callbackFunctions.precomputeValuesOnCreate === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.combinedRowTotalBar_callbackFunctions.precomputeValuesOnCreate === null ) {

			return;  //  Exit if call back functions not defined
		}

		
		if ( objectThis.constructorParams.callbackFunctionsObj.combinedRowTotalBar_callbackFunctions.getColorAndSize === undefined ||
				objectThis.constructorParams.callbackFunctionsObj.combinedRowTotalBar_callbackFunctions.getColorAndSize === null ) {

			return;  //  Exit if call back functions not defined
		}
		
		
		var callbackDataStorage = {};



		//  precomputeValuesOnCreate for Row Totals Bar on Right

		var precomputeValuesOnCreateParams = { callbackDataStorage: callbackDataStorage };

		objectThis.constructorParams.callbackFunctionsObj.combinedRowTotalBar_callbackFunctions.precomputeValuesOnCreate( precomputeValuesOnCreateParams );



		var getColorAndSizeParams = { callbackDataStorage: callbackDataStorage };

		var colorAndSize = objectThis.constructorParams.callbackFunctionsObj.combinedRowTotalBar_callbackFunctions.getColorAndSize( getColorAndSizeParams );

		var y = ( rowIdx * this.configDisplayOptions.ROW_HEIGHT );

		y = y + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;


		var sizeZeroToOne = colorAndSize.blockSize;

		if ( sizeZeroToOne > 0 ) {


			var colorForBlock = colorAndSize.colorForBlock;

			//  returns  colorForBlock = { red: 10, green: 255, blue: 1 }

			colorForBlock = this.roundAndValidateColor( colorForBlock );

			var rectWidth = sizeZeroToOne * this.configDisplayOptions.ROW_TOTALS_BAR_RIGHT_MAX_WIDTH;;


			if ( rectWidth < this.configDisplayOptions.ROW_TOTAL_BLOCK_MINIMUM_SIZE ) {

				rectWidth = this.configDisplayOptions.ROW_TOTAL_BLOCK_MINIMUM_SIZE;
			}

			var rowTotalBlockSVG = this.GLOBALS.masonViewerSVG.rect( rectWidth, this.configDisplayOptions.BLOCK_HEIGHT ).attr( { fill: { r: colorForBlock.red, g: colorForBlock.green, b: colorForBlock.blue } } );

			rowTotalBlockSVG.move( this.GLOBALS.rowTotalsBarRightStartingPoint, y );

			this.addProgramaticDataStorageToSVG_js_Item( rowTotalBlockSVG );

			rowTotalBlockSVG.data( "row-rowIdx", rowIdx );

			rowTotalBlockSVG.data( "placement", "totals row: row total blocks" );

			currentSVGgroupOfRowXandBelow.add( rowTotalBlockSVG );
		}

		//  add a cover block of the full width

		var rowTotalBlockCoverBlockFullWidthSVG =
			this.GLOBALS.masonViewerSVG.rect( this.configDisplayOptions.ROW_TOTALS_BAR_RIGHT_MAX_WIDTH, this.configDisplayOptions.BLOCK_HEIGHT )
				.attr(  { fill: { r: 255, g: 255, b: 255 },
						stroke: { r: 0, g: 0, b: 0 },
						"stroke-width": 0.3,
						"fill-opacity": 0 } );

		rowTotalBlockCoverBlockFullWidthSVG.move( this.GLOBALS.rowTotalsBarRightStartingPoint, y );

		this.addProgramaticDataStorageToSVG_js_Item( rowTotalBlockCoverBlockFullWidthSVG );

		this.attachMouseOverCombinedRowTotalBlock( rowTotalBlockCoverBlockFullWidthSVG, callbackDataStorage );

		this.attachClickHandlerCombinedRowTotalBlock( rowTotalBlockCoverBlockFullWidthSVG, callbackDataStorage );

		rowTotalBlockCoverBlockFullWidthSVG.data( "row-rowIdx", rowIdx );

		rowTotalBlockCoverBlockFullWidthSVG.data( "placement", "totals row: row total blocks clear overlay" );

		currentSVGgroupOfRowXandBelow.add( rowTotalBlockCoverBlockFullWidthSVG );

	};
