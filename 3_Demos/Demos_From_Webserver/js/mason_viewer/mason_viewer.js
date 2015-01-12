/*!
   mason_viewer.js

      github.com/yeastrc/mason

  The Mason Viewer is created by calling MasonViewer.createMasonViewer = function ( $rootDiv, requestParams, configParams, callbackFunctionsObj ) {
          where MasonViewer is an object at window.MasonViewer.

   configParams is merged with the following parameters

	MasonViewerPerInstanceRenderOnPage.prototype.configDisplayOptionDefaults = {

		TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE : 2,

		LABEL_FONT_SIZE : 12,
		
		ROW_HEIGHT : 15, //  Adjust the ROW_HEIGHT to accommodate the height of the label

		BLOCK_HEIGHT : 14,  //  Adjust the BLOCK_HEIGHT to accommodate the height of the label


		LABEL_WIDTH : 100,  //  Adjust the LABEL_WIDTH to accommodate the width of the longest label

		ICON_EXPAND_ROW_STARTING_POSITION : 1,
		ICON_EXPAND_ROW_WIDTH : 15,

		ICON_EXPAND_ROW_SPACE_AFTER : 2,

		ROW_TOTALS_BAR_RIGHT_MAX_WIDTH : 30,

		ROW_TOTAL_BLOCK_MINIMUM_SIZE : 1,

		ROW_TOTALS_BAR_RIGHT_SPACE_FROM_MAIN_GRID : 10,

		ROW_TOTALS_BAR_RIGHT_SPACE_FROM_RIGHT_EDGE : 4,


		BORDER_COLOR : "black",

		BORDER_WIDTH : 1,

		FOOTER_HEIGHT : 2,



		//  Tool tip text


		CLICK_TO_CONTRACT_TO_HIDE_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT_PREFIX : "Click to hide individual ",

		CLICK_TO_EXPAND_TO_SHOW_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT_PREFIX : "Click to show individual ",


		blockTypeLabelPlural : "blocks",

		BLOCK_HIGHLIGHT_BORDER_COLOR : "pink",
		BLOCK_HIGHLIGHT_BORDER_WIDTH : 2,


		createCombinedLineOnly : undefined,  //  set to true to only create combined line

		skipCreateCombinedLine : undefined,  //  set to true to skip create combined line

		combinedLineLabel : "Combined",  //  label on left for combined line

		combinedLineTooltipHTML : undefined,  //  tool tip for label on left for combined line

		ALIGNMENT_LINE_COLOR : "black",
		ALIGNMENT_LINE_WIDTH : 2

	};


*/
//  mason_viewer_05_start_outer_enclosing_function.js

//   !!!!!!!!   IMPORTANT, only include this file when building the combined file   !!!!!!!!!!!!!!!!!!!!!!!!!

//    This file is expected to get a compile error.  
//    The matching closing "}" is in the file mason_viewer_95_end_outer_enclosing_function.js

//   All the files: mason_viewer_01 thru mason_viewer_95 are to be included in the order they are numbered

//   If including directly into the page for testing, skip mason_viewer_01 and mason_viewer_95

(function( window ) {

//   masonViewerMain.js

//     This is the main class to call to create a MasonViewer

//   Depends on jquery, wtootip.js, Modernizr SVG support detection 

//       and particularly svg.js

//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";

//  https://github.com/wout/svg.js#animating-elements



//   SVG.js remember method doesn't just save a reference to an object so not using it

//  !!!!!!!!!!!  All variables that have SVG in them but not "$" are some instance of a type from the svg.js library  !!!!!!!!





////////////////////////////////////////////


//  Constructor

var MasonViewer = function () {




};


MasonViewer.prototype.instanceCounter = 0;


//   create a new Mason Viewer object

MasonViewer.prototype.createMasonViewer = function ( $rootDiv, requestParams, configParams, callbackFunctionsObj ) {
	
	
	if ( $rootDiv === undefined || $rootDiv === null ) {
		
		throw "$rootDiv is missing or null";
	}
	
	
	if ( requestParams === undefined || requestParams === null ) {
		
		throw "requestParams is missing or null";
	}
	

	
	if ( configParams === undefined || configParams === null ) {
		
		throw "configParams is missing or null";
	}

	
	if ( callbackFunctionsObj === undefined || callbackFunctionsObj === null ) {
		
		throw "callbackFunctionsObj is missing or null";
	}
	

	var rootDivLength = $rootDiv.length;

	if ( rootDivLength != 1 ) {

		throw "Error calling 'MasonViewer.createMasonViewer': $rootDiv must contain exactly one element";
	}


	var svgSupport = Modernizr.svg;

	if ( ! svgSupport ) {  //  is false if SVG not supported


		throw "SVG not supported";
	}


	this.instanceCounter++;

	var internalParams = { masonViewerMain: this, instanceCounter: this.instanceCounter };

	var masonViewerInstance = new MasonViewerPerInstance ( $rootDiv, requestParams, configParams, callbackFunctionsObj, internalParams );

	return masonViewerInstance;

};


//  Get the "label" used to store the MasonViewer object in the DOM object

MasonViewer.prototype.getDataElement = function() {
	return "MasonViewer";
};


//  Get the "class" used to store the MasonViewer object in the DOM object of the root div

MasonViewer.prototype.getProtCovObjectStorageClassName = function() {
	return "ProtCovObjectStorageClass";
};


var MasonViewer = new MasonViewer();  // Declare MasonViewer namespace


//  assign to window in preparation for when surround with overall function to hide everything else
window.MasonViewer = MasonViewer;



//   mason_viewer_constants.js

//     This is a part of MasonViewer


//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


//
//MasonViewerPerInstance.prototype.CONSTANTS.COLOR_MIN() = function() {
//
//	return 0;
//};
//
//MasonViewerPerInstance.prototype.CONSTANTS.COLOR_MAX() = function() {
//
//	return 255;
//};


//   mason_viewer_per_instance.js

//     This is a part of MasonViewer


//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";

//  https://github.com/wout/svg.js#animating-elements

// Svg.js has a dedicated color module handling different types of colors. Accepted values are:
//  hex string; three based (e.g. #f06) or six based (e.g. #ff0066)
//  rgb string; e.g. rgb(255, 0, 102)
//  rgb object; e.g. { r: 255, g: 0, b: 102 }


//   SVG.js remember method doesn't just save a reference to an object so not using it

//  !!!!!!!!!!!  All variables that have SVG in them but not "$" are some instance of a type from the svg.js library  !!!!!!!!





////////////////////////////////////////////



//  Constructor


//  internal "class" constructor to create actual stored instance object

var MasonViewerPerInstance = function ( $rootDiv, requestParams, configParams, callbackFunctionsObj, internalParams ) {

	var objectThis = this;  // copy for use in local functions

	var rootDivLength = $rootDiv.length;

	if ( rootDivLength != 1 ) {

		throw "Error calling 'MasonViewer.createMasonViewer': $rootDiv must contain exactly one element";
	}


	var masonViewerMain = internalParams.masonViewerMain;



	////////////////////////////////////////


	//  The following code is not in a function.  It runs immediately when the constructor is run.


	//  Add a sub div to the DOM to attach this instance to.
	//      By attaching this instance to a sub div, calling jquery.empty() on the $rootDiv will release this instance for garbage collection

	var protCovObjectStorageNodeHTML = '	<div class="' + masonViewerMain.getProtCovObjectStorageClassName() + '" >';


	//  Still call the .appendTo for the change to $rootDiv, just not save the result
//	var $protCovObjectStorageNodeHTML = 
	$( protCovObjectStorageNodeHTML ).appendTo( $rootDiv );


	//  Look up the node this way to ensure it is findable since use the same technique for other operations

	var protCovObjectStorageNodeSelector = "." + masonViewerMain.getProtCovObjectStorageClassName();

	var $protCovObjectStorageNode = $rootDiv.children( protCovObjectStorageNodeSelector );

	if ( $protCovObjectStorageNode.size() === 0 ) {

		throw "Unable to find protCovObjectStorageNode under $rootDiv, protCovObjectStorageNodeSelector = " + protCovObjectStorageNodeSelector;
	}


	//  attach the newly created object to the DOM object that is a child of the id provided

	$protCovObjectStorageNode.data( masonViewerMain.getDataElement(), this );



	//   create the viewer and render it on the page

	//   create MasonViewer Instance

//		var startTimeTracking = (new Date).getTime();

	var dataReformattedToInternalFormat = objectThis.reformatDataToInternalFormat( requestParams );

//		var timeTrackingDiffReformatToInternalFormat = (new Date).getTime() - startTimeTracking;

	var computedRepresentation = objectThis.computeRepresentation( $rootDiv, dataReformattedToInternalFormat, requestParams, configParams );

//		var timeTrackingDiffComputedRepresentation = (new Date).getTime() - startTimeTracking;

	objectThis.renderViewerOnThePage(  $rootDiv, computedRepresentation, requestParams, configParams, callbackFunctionsObj, internalParams );

//		var timeTrackingDiffRenderViewerOnThePage = (new Date).getTime() - startTimeTracking;

//			alert( "timeTrackingDiffReformatToInternalFormat: " + timeTrackingDiffReformatToInternalFormat +
//				", timeTrackingDiffComputedRepresentation: " + timeTrackingDiffComputedRepresentation +
//				", timeTrackingDiffRenderViewerOnThePage: " + timeTrackingDiffRenderViewerOnThePage );


};


MasonViewerPerInstance.prototype.renderViewerOnThePage =

	function( $rootDiv, data, requestParams, configParams,
		 callbackFunctionsObj, internalParams ) {



	var objectThisMasonViewerPerInstanceCopy = this;  // copy for use in local functions


	this.masonViewerPerInstanceRenderOnPage = new MasonViewerPerInstanceRenderOnPage( $rootDiv, data, requestParams, configParams,
	 callbackFunctionsObj, internalParams, objectThisMasonViewerPerInstanceCopy );

	this.masonViewerPerInstanceRenderOnPage.renderViewerOnThePageMain();

};








//////////////////////////////////

MasonViewerPerInstance.prototype.MESSAGE_TYPE_RENDER_ON_PAGE = "RENDER_ON_PAGE";




MasonViewerPerInstance.prototype.hideVerticalDataLines = function( ) {

	this.masonViewerPerInstanceRenderOnPage.hideVerticalDataLines();
};


MasonViewerPerInstance.prototype.showVerticalDataLines = function( ) {

	this.masonViewerPerInstanceRenderOnPage.showVerticalDataLines();
};


MasonViewerPerInstance.prototype.deleteViewer = function( ) {

	this.masonViewerPerInstanceRenderOnPage.deleteViewer();
};


//  Accept a message from MasonViewerRegistry

MasonViewerPerInstance.prototype.acceptMessage = function( message ) {

	if ( message.type === MasonViewerPerInstance.prototype.MESSAGE_TYPE_RENDER_ON_PAGE ) {

		this.masonViewerPerInstanceRenderOnPage.acceptMessage( message.data );

	} else {

		throw "unknown type in message at 'MasonViewerPerInstance.prototype.acceptMessage'.  type: " + message.type;
	}
};


//  TODO  maybe rename this method

MasonViewerPerInstance.prototype.registerBlockHoverListener = function( params ) {

	this.masonViewerPerInstanceRenderOnPage.registerBlockHoverListener( params );
};



//   mason_viewer_compute_representation.js

//     This is a part of MasonViewer


//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";

//  https://github.com/wout/svg.js#animating-elements

// Svg.js has a dedicated color module handling different types of colors. Accepted values are:
//  hex string; three based (e.g. #f06) or six based (e.g. #ff0066)
//  rgb string; e.g. rgb(255, 0, 102)
//  rgb object; e.g. { r: 255, g: 0, b: 102 }



//  !!!!!!!!!!!  All variables that have SVG in them but not "$" are some instance of a type from the svg.js library  !!!!!!!!

//  Input:

//	requestParams
//	  = {
//	   };


//
//	var dataReformattedToInternalFormat
//		= { "maxSequenceLength": 255,
//			"rowItems": [
//							{"label":"BBpilabel1",
//							"blockItems": [
//											{
//											"blockDataItems": [ {"level":42,"id":85,"otherData":"TheOtherData"} ],
//											"blockStartPos":25,
//											"blockEndPos":37
//											}
//										]
//							}
//						  ]
//			}


//  Output

//   computedData
//     = { outputRows:
//    	  [
//			{ label: "",
//			  splitAnyEntries: true or false,
//			  blockItems: [ as copied from input  ],
//			  mainLineBlocks:
//				[
//				  {
//					blockStartPos: 10,
//					blockEndPos: 15,
//					blockDataItems: [ {"id":85,"otherData":"TheOtherData"} ]
//		  		  }
//		  	    ]
//		    }
//   	  ]
//   	};


   //  An element of outputRows is one row in the output including the label, main line of blocks or overlapping blocks, and hidden blocks


	//   Take the input params and compute an output to be rendered on the page

MasonViewerPerInstance.prototype.computeRepresentation = function( $rootDiv, dataReformattedToInternalFormat, requestParams, configParams ) {


	var objectThis = this;  // copy for use in local functions

		var computedData = { outputRows: [] };



		var outputRows = computedData.outputRows;

		var inputData = dataReformattedToInternalFormat;

		var rowItems = inputData.rowItems;

		for ( var rowItemsIndex = 0; rowItemsIndex < rowItems.length; rowItemsIndex++ ) {

			var rowItem = rowItems[ rowItemsIndex ];

			var blockItems = rowItem.blockItems;

			var splitOutput = objectThis.combineOverlapsProteinPositionBased( blockItems );

			var mainLineBlocks = splitOutput.outputList;

			var outputRow = { label: rowItem.label  , mainLineBlocks: mainLineBlocks, blockItems: blockItems,
				splitAnyEntries: splitOutput.splitAnyEntries, inputRowItem: rowItem.inputRowItem, vertLinesItems: rowItem.vertLinesItems };



			outputRows.push( outputRow );

		}

		return computedData;

};



//   mason_viewer_35_process_overlapping_blocks.js

//     This is a part of MasonViewer


//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";

/*
 * Sort by start position ascending then end position descending
 */
MasonViewerPerInstance.prototype.combineOverlaps_Z_compareForSortBlocks = function( a, b ) {

	if ( a.blockStartPos === b.blockStartPos ) {

		return b.blockEndPos - a.blockEndPos;
	}

	return a.blockStartPos - b.blockStartPos;
};


/*
 * Shallow Copy Array
 */
MasonViewerPerInstance.prototype.copyArray = function( inputArray ) {

	var outputArray = inputArray.concat();

	return outputArray;
};

/*
 * Shallow Concat Two Arrays
 */
MasonViewerPerInstance.prototype.concatArrays = function( inputArray1, inputArray2 ) {

	var outputArray = inputArray1.concat( inputArray2 );

	return outputArray;
};


/////////////////////////////////////////////////////////////////



MasonViewerPerInstance.prototype.combineOverlapsProteinPositionBased = function( blockItemsInputParam ) {

	var splitAnyEntries = false;



	var splitAnEntryThisIterationOfLoop = true;

	var numTimesSplitAnEntryLoop = 0;

	var blockItemListInput = null;

	//  combine entries first to simplify later processing

	var blockItemListOutput = this.combineEntriesProteinPositionBased( numTimesSplitAnEntryLoop, blockItemsInputParam );

	while ( splitAnEntryThisIterationOfLoop ) {

		numTimesSplitAnEntryLoop++;

		if ( numTimesSplitAnEntryLoop > 200 ) {

			var errorMsg = "combineOverlapsProteinPositionBased(...):  numTimesSplitAnEntryLoop > 200 so throwing exception.  ";

			throw errorMsg;
		}

		//   While entries have been split

		splitAnEntryThisIterationOfLoop = false;


		blockItemListInput = blockItemListOutput;

		blockItemListOutput = [];


		//  Split entries

		blockItemListInput.sort( this.combineOverlaps_Z_compareForSortBlocks );

		var index = -1;

		while ( ( ++index ) < blockItemListInput.length ) {

			var blockItem = blockItemListInput[ index ];

			if ( index === ( blockItemListInput.length - 1 ) ) {

				//  if is last entry( and not processed yet below ), put in output list.

				blockItemListOutput.push( blockItem );

			} else {

				var blockItemNext = blockItemListInput[ index + 1 ];

				if ( blockItem.blockEndPos < blockItemNext.blockStartPos ) {

					//  if not overlap next entry, put in output list.

					blockItemListOutput.push( blockItem );

				} else {

					splitAnEntryThisIterationOfLoop = true;

					splitAnyEntries = true;

					if ( blockItem.blockStartPos === blockItemNext.blockStartPos ) {

						//  If same start point, the current entry is longer so split to end of next and what is left

						//  Split current entry to before next next entry and starts at next entry


						var blockItemSplitBefore
						= {
							blockDataItems: this.copyArray( blockItem.blockDataItems ),
							blockStartPos: blockItem.blockStartPos,
							blockEndPos: blockItemNext.blockEndPos
						};

						var blockItemSplitAfter
						= {
							blockDataItems: this.copyArray( blockItem.blockDataItems ),
							blockStartPos: blockItemNext.blockEndPos + 1,
							blockEndPos: blockItem.blockEndPos
						};

						blockItemListOutput.push( blockItemSplitBefore );
						blockItemListOutput.push( blockItemSplitAfter );

					} else {

						//  Split current entry to before next entry and starts at next entry

						var blockItemSplitBefore
						= {
							blockDataItems: this.copyArray( blockItem.blockDataItems ),
							blockStartPos: blockItem.blockStartPos,
							blockEndPos: ( blockItemNext.blockStartPos - 1 )
						};

						var blockItemSplitAfter
						= {
							blockDataItems: this.copyArray( blockItem.blockDataItems ),
							blockStartPos: blockItemNext.blockStartPos,
							blockEndPos: blockItem.blockEndPos
						};


						blockItemListOutput.push( blockItemSplitBefore );
						blockItemListOutput.push( blockItemSplitAfter );

					}
				}
			}
		}


		blockItemListOutput = this.combineEntriesProteinPositionBased( numTimesSplitAnEntryLoop, blockItemListOutput);

	}


	var finalOutput = { splitAnyEntries: splitAnyEntries, outputList: blockItemListOutput };

	return finalOutput;
};


///////////////////////////////////////////////////



MasonViewerPerInstance.prototype.combineEntriesProteinPositionBased = function( numTimesSplitAnEntryLoop, blockItemListInput ) {



		var blockItemListOutput = [];
		var index;

		blockItemListInput.sort( this.combineOverlaps_Z_compareForSortBlocks );


		index = -1;
		while ( ( ++index ) < blockItemListInput.length ) {

			var blockItem = blockItemListInput[ index ];

			if ( index === ( blockItemListInput.length - 1 ) ) {

				//  if is last entry( and not processed yet below ), put in output list.

				blockItemListOutput.push( blockItem );

			} else {

				var indexNext = index;

				while ( ( ++indexNext ) < blockItemListInput.length ) {

					var blockItemNext = blockItemListInput[ indexNext ];

					if ( blockItem.blockStartPos === blockItemNext.blockStartPos
							&& blockItem.blockEndPos === blockItemNext.blockEndPos ) {

						index = indexNext;

						blockItem.blockDataItems = this.concatArrays( blockItem.blockDataItems, blockItemNext.blockDataItems );


					} else {

						break;
					}

				}

				blockItemListOutput.push( blockItem );
			}
		}


		return blockItemListOutput;
};

//   mason_viewer_reformat_data_to_internal_format.js

//     This is a part of MasonViewer


//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";

//   Input format
//
//	var inputData
//		= {"maxSequenceLength": 255,
//			"rowItems": [
//							{"label":"BBpilabel1",
//							"blockItems": [
//											{
//											"blockData":{"level":42,"id":85"},
//											"startPos":25,
//											"endPos":37
//											}
//										]
//							}
//						  ]
//			}


//   Output format - move "blockData" to be an element of "blockDataItems"  copy positions to new names
//
//	var inputData
//		= { "maxSequenceLength": 255,
//			"rowItems": [
//							{"label":"BBpilabel1",
//							"blockItems": [
//											{
//											"blockDataItems": [ {"level":42,"id":85} ],
//											"blockStartPos":25,
//											"blockEndPos":37
//											}
//										]
//							}
//						  ]
//			}
	/*
	 * reformat the provided data to the internal format
	 */
MasonViewerPerInstance.prototype.reformatDataToInternalFormat = function( requestParams ) {

	var inputData = requestParams.inputData;

	
	if ( ! inputData ) {
		
		throw "requestParams.inputData is missing or null";
	}



	if ( inputData.maxSequenceLength === undefined || inputData.maxSequenceLength === null || typeof inputData.maxSequenceLength !== 'number' ) {
		
		throw "requestParams.inputData.maxSequenceLength is missing or null or is not a number";
	}
	
	
	var outputRowItems = [];
	
	

	var inputDataReformatted = { maxSequenceLength: inputData.maxSequenceLength, rowItems: outputRowItems, vertLinesAllRowsItems: inputData.vertLinesAllRowsItems };

	var rowItems = inputData.rowItems;
	
	
	
	if ( ! inputData.rowItems ) {
		
		throw "requestParams.inputData.rowItems is missing or null";
	}
	
	if ( inputData.rowItems.length === 0 ) {
		
		throw "requestParams.inputData.rowItems is empty";
	}



	for ( var rowItemsIdx = 0; rowItemsIdx < rowItems.length; rowItemsIdx++ ) {

		var rowItem = rowItems[ rowItemsIdx ];
		

		if ( rowItem.label === undefined || rowItem.label === null || rowItem.label === "" ) {
			
			throw "requestParams.inputData.rowItems.rowItem[ index ].label is missing or null or is empty for index = " + rowItemsIdx;
		}


		var outputBlockItems = [];

		var blockItems = rowItem.blockItems;
		
		
		if ( ! blockItems ) {
			
			throw "requestParams.inputData.rowItems.rowItem[ index ].blockItems is missing or null for index = " + rowItemsIdx;
		}

		for ( var blockItemsIdx = 0; blockItemsIdx < blockItems.length; blockItemsIdx++ ) {
				
			var blockItem = blockItems[ blockItemsIdx ];
			
			
			if ( blockItem.startPos === undefined ) {
				
				throw "requestParams.inputData.rowItems.rowItem[ rowItemsIdx ].blockItem[ blockItemsIdx ] is missing property 'startPos' rowItemsIdx = " 
					+ rowItemsIdx + ", and blockItemsIdx = " + blockItemsIdx;
			}
			
			if ( blockItem.endPos === undefined ) {
				
				throw "requestParams.inputData.rowItems.rowItem[ rowItemsIdx ].blockItem[ blockItemsIdx ] is missing property 'endPos' rowItemsIdx = " 
					+ rowItemsIdx + ", and blockItemsIdx = " + blockItemsIdx;
			}
			
			
			if ( blockItem.blockData === undefined ) {
				
				throw "requestParams.inputData.rowItems.rowItem[ rowItemsIdx ].blockItem[ blockItemsIdx ] is missing property 'blockData' rowItemsIdx = " 
					+ rowItemsIdx + ", and blockItemsIdx = " + blockItemsIdx;
			}
			
			var outputBlockItem = { blockStartPos: blockItem.startPos, blockEndPos: blockItem.endPos, blockDataItems: [ blockItem.blockData ] };

			outputBlockItems.push( outputBlockItem );
		}


		var outputRowItem = { label: rowItem.label, blockItems: outputBlockItems, inputRowItem: rowItem, vertLinesItems: rowItem.vertLinesItems };

		outputRowItems.push( outputRowItem );
	}


	return inputDataReformatted;
};
//   mason_viewer_ProgramaticDataStorage.js

//     This is a part of MasonViewer


//   Used in the class MasonViewerPerInstanceRenderOnPage


//   This file contains the classes  ProgramaticDataStorage and ProgramaticDataStorageGroupOfRows

//  ProgramaticDataStorage is a class containing data for a given row in the viewer

//  ProgramaticDataStorageGroupOfRows is a class containing data for a group of rows



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


	//////////////////////////////////////

	//   Constructor for ProgramaticDataStorageGroupOfRows

	//   This class contains data for a group of rows in the viewer

	var ProgramaticDataStorageGroupOfRows = function () {

		this.SVGGroup = undefined;  //  The SVG JS Group associated with this object
		
		this.firstOutputRowSVGGroup = undefined;  //  Top level SVG JS object for the top level output row within this group

		this.nextProgramaticDataStorageGroupOfRows = undefined;  //  The ProgramaticDataStorageGroupOfRows object that holds the next group of rows
	};

	

	////////

	//   "getter" and "setter" methods for this class


	ProgramaticDataStorageGroupOfRows.prototype.getSVGGroup = function() {

		return this.SVGGroup;
	};
	ProgramaticDataStorageGroupOfRows.prototype.setSVGGroup = function( SVGGroup_ ) {

		this.SVGGroup = SVGGroup_;
	};
	
	ProgramaticDataStorageGroupOfRows.prototype.getFirstOutputRowSVGGroup = function() {

		return this.firstOutputRowSVGGroup;
	};
	ProgramaticDataStorageGroupOfRows.prototype.setFirstOutputRowSVGGroup = function( firstOutputRowSVGGroup_ ) {

		this.firstOutputRowSVGGroup = firstOutputRowSVGGroup_;
	};
	
	ProgramaticDataStorageGroupOfRows.prototype.getNextProgramaticDataStorageGroupOfRows = function() {

		return this.nextProgramaticDataStorageGroupOfRows;
	};
	ProgramaticDataStorageGroupOfRows.prototype.setNextProgramaticDataStorageGroupOfRows = function( nextProgramaticDataStorageGroupOfRows_ ) {

		this.nextProgramaticDataStorageGroupOfRows = nextProgramaticDataStorageGroupOfRows_;
	};
	
	
	//////////////////////////////////////

	//   Constructor for ProgramaticDataStorage

	//   This class contains data for a given row of the viewer 

	var ProgramaticDataStorage = function () {

		this.outputRow = undefined;

		this.rowIdx = undefined;

		this.rowOffset = undefined;

		this.createHiddenBlocksIfNotCreatedCallback = undefined;  // calback function

		this.SVGRowXmainBlocksGROUP = undefined;

		this.groupToMoveForExpansion = undefined;

		this.hiddenBlocksVisible = false;
		this.hiddenBlocksForRowSet = undefined;
		this.hiddenBlocksHeight = 0;

		this.SVGGroupExpansionIcon = undefined;

		this.mainBlocksBoxUnderEachRow = undefined;

		this.hiddenBlocksBoxUnderEachRow = undefined;

		this.toolTipHTML = undefined;

	};

	////////

	//   "getter" and "setter" methods for this class


	ProgramaticDataStorage.prototype.getCreateHiddenBlocksIfNotCreatedCallback = function() {

		return this.createHiddenBlocksIfNotCreatedCallback;
	};

	ProgramaticDataStorage.prototype.setCreateHiddenBlocksIfNotCreatedCallback = function( createHiddenBlocksIfNotCreatedCallback_ ) {

		this.createHiddenBlocksIfNotCreatedCallback = createHiddenBlocksIfNotCreatedCallback_;
	};


	ProgramaticDataStorage.prototype.getOutputRow = function() {

		return this.outputRow;
	};

	ProgramaticDataStorage.prototype.setOutputRow = function( outputRow_ ) {

		this.outputRow = outputRow_;
	};

	ProgramaticDataStorage.prototype.getRowOffset = function() {

		return this.rowOffset;
	};

	ProgramaticDataStorage.prototype.setRowOffset = function( rowOffset_ ) {

		this.rowOffset = rowOffset_;
	};

	ProgramaticDataStorage.prototype.getRowIdx = function() {

		return this.rowIdx;
	};

	ProgramaticDataStorage.prototype.setRowIdx = function( rowIdx_ ) {

		this.rowIdx = rowIdx_;
	};


	ProgramaticDataStorage.prototype.getSVGRowXmainBlocksGROUP = function() {

		return this.SVGRowXmainBlocksGROUP;
	};

	ProgramaticDataStorage.prototype.setSVGRowXmainBlocksGROUP = function( SVGRowXmainBlocksGROUP_ ) {

		this.SVGRowXmainBlocksGROUP = SVGRowXmainBlocksGROUP_;
	};

	ProgramaticDataStorage.prototype.getGroupToMoveForExpansion = function() {

		return this.groupToMoveForExpansion;
	};

	ProgramaticDataStorage.prototype.setGroupToMoveForExpansion = function( groupToMoveForExpansion_ ) {

		this.groupToMoveForExpansion = groupToMoveForExpansion_;
	};

	ProgramaticDataStorage.prototype.getHiddenBlocksVisible = function() {

		return this.hiddenBlocksVisible;
	};



	ProgramaticDataStorage.prototype.setHiddenBlocksVisible = function( hiddenBlocksVisible_ ) {

		this.hiddenBlocksVisible = hiddenBlocksVisible_;
	};

	ProgramaticDataStorage.prototype.getHiddenBlocksForRowSet = function () {

		return this.hiddenBlocksForRowSet;
	};

	ProgramaticDataStorage.prototype.setHiddenBlocksForRowSet = function ( hiddenBlocksForRowSet_ ) {

		this.hiddenBlocksForRowSet = hiddenBlocksForRowSet_;
	};

	ProgramaticDataStorage.prototype.getHiddenBlocksHeight = function () {

		return this.hiddenBlocksHeight;
	};

	ProgramaticDataStorage.prototype.setHiddenBlocksHeight = function ( hiddenBlocksHeight_ ) {

		this.hiddenBlocksHeight = hiddenBlocksHeight_;
	};




	ProgramaticDataStorage.prototype.getSVGGroupExpansionIcon = function () {

		return this.SVGGroupExpansionIcon;
	};

	ProgramaticDataStorage.prototype.setSVGGroupExpansionIcon = function ( SVGGroupExpansionIcon_ ) {

		this.SVGGroupExpansionIcon = SVGGroupExpansionIcon_;
	};



	ProgramaticDataStorage.prototype.getMainBlocksBoxUnderEachRow = function ( ) {

		return this.mainBlocksBoxUnderEachRow;
	};

	ProgramaticDataStorage.prototype.setMainBlocksBoxUnderEachRow = function ( mainBlocksBoxUnderEachRow_ ) {

		this.mainBlocksBoxUnderEachRow = mainBlocksBoxUnderEachRow_;
	};

	ProgramaticDataStorage.prototype.getHiddenBlocksBoxUnderEachRow = function ( ) {

		return this.hiddenBlocksBoxUnderEachRow;
	};

	ProgramaticDataStorage.prototype.setHiddenBlocksBoxUnderEachRow = function ( hiddenBlocksBoxUnderEachRow ) {

		this.hiddenBlocksBoxUnderEachRow = hiddenBlocksBoxUnderEachRow;
	};



	ProgramaticDataStorage.prototype.getToolTipHTML = function ( ) {

		return this.toolTipHTML;
	};

	ProgramaticDataStorage.prototype.setToolTipHTML = function ( toolTipHTML ) {

		this.toolTipHTML = toolTipHTML;
	};




//   mason_viewer_render_on_page.js

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



//   computedData
//     = { outputRows:
//    	  [
//			{ label: "",
//			  splitAnyEntries: true or false,
//			  blockItems: [ as copied from input  ],
//			  mainLineBlocks:
//				[
//				  {
//					blockStartPos: 10,
//					blockEndPos: 15,
//					blockDataItems: [ {"id":85,"otherData":"TheOtherData"} ]
//		  		  }
//		  	    ]
//		    }
//   	  ]
//   	};


//   Add to that datastructure in this code:


//     outputRows[ x ].callbackDataStorage

//     mainLineBlocks[ x ].callbackDataStorage



	//   Take the computed data and put it on the page






//  Create new class for Render on Page


	//  Constructor
	var MasonViewerPerInstanceRenderOnPage =

		function( $rootDiv, data, requestParams, configParams,
			 callbackFunctionsObj, internalParams, objectThisMasonViewerPerInstance ) {


	//	this.constructorParams = {
	//		this.constructorParams.$rootDiv: $rootDiv,
	//		this.constructorParams.data: data,
	//		this.constructorParams.requestParams: requestParams,
	//		this.constructorParams.configParams: configParams,
	//		this.constructorParams.callbackFunctionsObj: callbackFunctionsObj,
	//		this.constructorParams.internalParams: internalParams,
	//		this.constructorParams.objectThisMasonViewerPerInstance: objectThisMasonViewerPerInstance
	//	};

		this.constructorParams = {
			$rootDiv: $rootDiv,
			data: data,
			requestParams: requestParams,
			configParams: configParams,
			callbackFunctionsObj: callbackFunctionsObj,
			internalParams: internalParams,
			objectThisMasonViewerPerInstance: objectThisMasonViewerPerInstance
		};



		this.configDisplayOptions = {};

		$.extend( this.configDisplayOptions, MasonViewerPerInstanceRenderOnPage.prototype.configDisplayOptionDefaults, configParams );


		//  Set additional info on this.configDisplayOptions, derived from other values


		this.configDisplayOptions.LABEL_STARTING_POSITION = this.configDisplayOptions.ICON_EXPAND_ROW_STARTING_POSITION + this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH + this.configDisplayOptions.ICON_EXPAND_ROW_SPACE_AFTER;
		this.configDisplayOptions.MAIN_BOX_STARTING_POSITION = this.configDisplayOptions.LABEL_STARTING_POSITION + this.configDisplayOptions.LABEL_WIDTH;


		this.configDisplayOptions.CLICK_TO_CONTRACT_TO_HIDE_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT = this.configDisplayOptions.CLICK_TO_CONTRACT_TO_HIDE_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT_PREFIX + this.configDisplayOptions.blockTypeLabelPlural;

		this.configDisplayOptions.CLICK_TO_EXPAND_TO_SHOW_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT = this.configDisplayOptions.CLICK_TO_EXPAND_TO_SHOW_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT_PREFIX + this.configDisplayOptions.blockTypeLabelPlural;











		this.GLOBALS = {


			masonViewerSVG: undefined,

			overallWidth: undefined,

			sequenceWidth:  undefined,

			sequenceMultiplier:  undefined,
			
			rowsPerGroup: undefined,

			viewerHeightInsideTheBox:  undefined,

			arrayOfcurrentSVGgroupOfRowXandBelow: [],

			setSVGVerticalDataLines: undefined,
			
			setSVGVerticalDataFullHeightLines: undefined,

			showVerticalDataLines: true
		};


		this.GLOBALS.MAIN_BOX_STARTING_POSITION = this.configDisplayOptions.MAIN_BOX_STARTING_POSITION;

	};




	////////////////////////////////////////


	//   Main Entry Point Function for this class, called to render the viewer data onto the page

	MasonViewerPerInstanceRenderOnPage.prototype. renderViewerOnThePageMain = function(   ) {

//		var objectThis = this;

		this.createSVG_Lib_Instance();

		this.putDataOnThePageMain();

		this.resizeOverallImageLength();
	};






	/////////////////////////////

	///   Create the SVG object and the <svg > root in the DOM

	MasonViewerPerInstanceRenderOnPage.prototype. createSVG_Lib_Instance = function(  ) {

//		var objectThis = this;

		var overallWidth = this.constructorParams.$rootDiv.width();

		// get the HTML element from jQuery
		var masonViewerRootHTML_Element = this.constructorParams.$rootDiv[0];

		try {

			//  Create the SVG main object ( from svg.js file ) which will create the <svg > root object on the DOM
			this.GLOBALS.masonViewerSVG = SVG( masonViewerRootHTML_Element ).size( overallWidth, 5 ); //  TODO  Hard coded starting height

		} catch ( e ) {

			var stracktrace = e.stack;

			throw "Exception creating SVG.  " + stracktrace;
		}

		this.GLOBALS.setSVGVerticalDataLines = this.GLOBALS.masonViewerSVG.set();

		this.GLOBALS.overallWidth = overallWidth;

		this.GLOBALS.rowTotalsBarRightStartingPoint = overallWidth - ( this.configDisplayOptions.ROW_TOTALS_BAR_RIGHT_MAX_WIDTH + this.configDisplayOptions.ROW_TOTALS_BAR_RIGHT_SPACE_FROM_RIGHT_EDGE );

		this.GLOBALS.sequenceWidth = overallWidth - ( this.configDisplayOptions.LABEL_STARTING_POSITION + this.configDisplayOptions.LABEL_WIDTH )  -
										( this.configDisplayOptions.ROW_TOTALS_BAR_RIGHT_MAX_WIDTH + this.configDisplayOptions.ROW_TOTALS_BAR_RIGHT_SPACE_FROM_MAIN_GRID + this.configDisplayOptions.ROW_TOTALS_BAR_RIGHT_SPACE_FROM_RIGHT_EDGE );


//		this.GLOBALS.sequenceMultiplier = this.GLOBALS.sequenceWidth / ( this.constructorParams.requestParams.inputData.maxSequenceLength - 1),

		this.GLOBALS.sequenceMultiplier = this.GLOBALS.sequenceWidth / ( this.constructorParams.requestParams.inputData.maxSequenceLength ),

		this.GLOBALS.leftLineX = this.configDisplayOptions.MAIN_BOX_STARTING_POSITION - 0.5;
		this.GLOBALS.rightLineX = this.configDisplayOptions.MAIN_BOX_STARTING_POSITION + this.GLOBALS.sequenceWidth + 0.5;

		
		var outputRowsLength = this.constructorParams.data.outputRows.length;
		
		this.GLOBALS.rowsPerGroup = Math.floor( Math.sqrt( outputRowsLength ) );
		
		if ( this.GLOBALS.rowsPerGroup < MasonViewerPerInstanceRenderOnPage.prototype.CONSTANTS.MIN_MAX_VALUES.MINIMUM_ROWS_PER_GROUP ) {
			
			this.GLOBALS.rowsPerGroup = MasonViewerPerInstanceRenderOnPage.prototype.CONSTANTS.MIN_MAX_VALUES.MINIMUM_ROWS_PER_GROUP;
		}
		
		if ( MasonViewerPerInstanceRenderOnPage.prototype.CONSTANTS.MIN_MAX_VALUES.MAXIMUM_ROWS_PER_GROUP ) {
			
			if ( this.GLOBALS.rowsPerGroup > MasonViewerPerInstanceRenderOnPage.prototype.CONSTANTS.MIN_MAX_VALUES.MAXIMUM_ROWS_PER_GROUP ) {
				
				this.GLOBALS.rowsPerGroup = MasonViewerPerInstanceRenderOnPage.prototype.CONSTANTS.MIN_MAX_VALUES.MAXIMUM_ROWS_PER_GROUP;
			}
		}
		
	};





	/////////////////////////////

	///   Process the data, putting it in the <svg > in the DOM

	MasonViewerPerInstanceRenderOnPage.prototype. putDataOnThePageMain = function(  ) {

//		var objectThis = this;

		var outputRows = this.constructorParams.data.outputRows;


		this.add_callbackDataStorage_ToElementsIn_outputRows( outputRows );



		var SVGrootGroupInsideBoundingBox = this.GLOBALS.masonViewerSVG.group();

		SVGrootGroupInsideBoundingBox.attr("label", "SVGrootGroupInsideBoundingBox");

		
		//  Create a group for a group of rows.
		
		var currentGroupOfRowsSVGgroup = this.GLOBALS.masonViewerSVG.group(); 

		this.setupGroupOfRows( currentGroupOfRowsSVGgroup );
		
		var currentGroupOfRowsSVGgroupProgramaticStorage = this.getProgramaticDataStorageFromSVG_js_Item( currentGroupOfRowsSVGgroup );


		
		SVGrootGroupInsideBoundingBox.add( currentGroupOfRowsSVGgroup );
		
		


		//  Create a group for the row and all rows below it will be enclosed in it
		
		var currentSVGgroupOfRowXandBelow = this.GLOBALS.masonViewerSVG.group(); 

		

		this.setupRootGroupForEachRow( currentSVGgroupOfRowXandBelow  );




		var currentSVGgroupOfRowXandBelowProgramaticDataStorage = this.getProgramaticDataStorageFromSVG_js_Item( currentSVGgroupOfRowXandBelow );

		currentSVGgroupOfRowXandBelowProgramaticDataStorage._type = "currentSVGgroupOfRowXandBelow";

		currentSVGgroupOfRowXandBelowProgramaticDataStorage._attachedTo = currentSVGgroupOfRowXandBelow;

		
		//   Only need to add the top level currentSVGgroupOfRowXandBelow for each currentGroupOfRowsSVGgroup
		
		currentGroupOfRowsSVGgroup.add( currentSVGgroupOfRowXandBelow );
		
		currentGroupOfRowsSVGgroupProgramaticStorage.setFirstOutputRowSVGGroup( currentSVGgroupOfRowXandBelow );

		
		
		var rowOffsetMainArea = 0;



		//  create totals row at top area
		
		//    create only if:
		//		this.constructorParams.callbackFunctionsObjcallbackFunctionsObj.combinedRow_callbackFunctions is defined
		//		more than 1 output row or configDisplayOptions.createCombinedLineOnly is true
		//		configDisplayOptions.skipCreateCombinedLine is false

		if ( this.constructorParams.callbackFunctionsObj.combinedRow_callbackFunctions &&
				( outputRows.length > 1 || this.configDisplayOptions.createCombinedLineOnly ) &&
				! this.configDisplayOptions.skipCreateCombinedLine ) {

			this.processCombinedRow( outputRows, 0 /* rowCount */, currentSVGgroupOfRowXandBelow, currentSVGgroupOfRowXandBelowProgramaticDataStorage );


			//  Create group for bottom line and scale

			nextSVGgroupOfRowXandBelow = this.GLOBALS.masonViewerSVG.group(); //  Create a group for the row and all rows below it will be enclosed in it

			nextSVGgroupOfRowXandBelow.attr("label", "nextSVGgroupOfRowXandBelow");

			currentSVGgroupOfRowXandBelow.add( nextSVGgroupOfRowXandBelow );

			currentSVGgroupOfRowXandBelowProgramaticDataStorage.setGroupToMoveForExpansion( nextSVGgroupOfRowXandBelow );


			currentSVGgroupOfRowXandBelow = nextSVGgroupOfRowXandBelow;

			this.setupRootGroupForEachRow( currentSVGgroupOfRowXandBelow  );

			currentSVGgroupOfRowXandBelowProgramaticDataStorage = this.getProgramaticDataStorageFromSVG_js_Item( currentSVGgroupOfRowXandBelow );

			currentSVGgroupOfRowXandBelowProgramaticDataStorage._type = "currentSVGgroupOfRowXandBelow";

			currentSVGgroupOfRowXandBelowProgramaticDataStorage._attachedTo = currentSVGgroupOfRowXandBelow;

			rowOffsetMainArea = 1;
		}



		this.precomputeValuesOnCreateForMainRows( outputRows );  //  ONLY for main totals blocks on the right

		var rowCount = 0;

		if ( this.configDisplayOptions.createCombinedLineOnly !== true  ) {

			rowCount = outputRows.length;

			for ( var rowIdx = 0; rowIdx < outputRows.length; rowIdx++ ) {



				var rowOffset = rowIdx + rowOffsetMainArea;



				var outputRow = outputRows[ rowIdx ];

				currentSVGgroupOfRowXandBelow.data( "row-rowIdx", rowIdx );

				var currentSVGgroupOfRowXandBelowProgramaticDataStorage = this.getProgramaticDataStorageFromSVG_js_Item( currentSVGgroupOfRowXandBelow );

				currentSVGgroupOfRowXandBelowProgramaticDataStorage._type = "currentSVGgroupOfRowXandBelow";

				currentSVGgroupOfRowXandBelowProgramaticDataStorage._attachedTo = currentSVGgroupOfRowXandBelow;

				currentSVGgroupOfRowXandBelowProgramaticDataStorage.setOutputRow( outputRow );

				currentSVGgroupOfRowXandBelowProgramaticDataStorage.setRowIdx( rowIdx );

				currentSVGgroupOfRowXandBelowProgramaticDataStorage.setRowOffset( rowOffset );

				var SVGRowXmainBlocksGROUP = this.GLOBALS.masonViewerSVG.group();

				currentSVGgroupOfRowXandBelow.add( SVGRowXmainBlocksGROUP );

				SVGRowXmainBlocksGROUP.attr("label", "SVGRowXmainBlocksGROUP");


				currentSVGgroupOfRowXandBelowProgramaticDataStorage.setSVGRowXmainBlocksGROUP( SVGRowXmainBlocksGROUP );


				this.addBoxUnderEachRowForMouseOver( SVGRowXmainBlocksGROUP, currentSVGgroupOfRowXandBelowProgramaticDataStorage, rowOffset );


//				var labelTextSVG = 
					//  Still call this.processLabelForRow, just not save the returned value
				this.processLabelForRow( outputRow, currentSVGgroupOfRowXandBelow, rowOffset );

				var splitAnyEntries = outputRow.splitAnyEntries;

				if (  splitAnyEntries ) {

					//  commented out since moved to called by createMainLineHiddenBlocksIfNotCreatedCallbackCreator(...)

//					processHiddenBlocksForRow( outputRow, currentSVGgroupOfRowXandBelow, currentSVGgroupOfRowXandBelowProgramaticDataStorage, rowOffset );


					this.createMainLineHiddenBlocksIfNotCreatedCallbackCreator( outputRow, currentSVGgroupOfRowXandBelow, currentSVGgroupOfRowXandBelowProgramaticDataStorage, rowOffset );

					this.createHiddenBlocksExpansionIcon( this.configDisplayOptions.CLICK_TO_EXPAND_TO_SHOW_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT, SVGRowXmainBlocksGROUP, rowOffset, currentSVGgroupOfRowXandBelowProgramaticDataStorage );

				}

				this.processMainLineBlocksForRow( outputRow, currentSVGgroupOfRowXandBelow, SVGRowXmainBlocksGROUP, rowOffset );



				this.processRowTotalBlockForRow( outputRow, currentSVGgroupOfRowXandBelow, rowOffset );


				
				var nextSVGgroupOfRowXandBelow = this.GLOBALS.masonViewerSVG.group(); //  Create a group for the next row and all rows below it will be enclosed in it

				nextSVGgroupOfRowXandBelow.attr("label", "nextSVGgroupOfRowXandBelow");

				this.setupRootGroupForEachRow( nextSVGgroupOfRowXandBelow  );



				//   Only put so many nested groups under this "group of rows" 
				//   so if that is exceeded, create a new "group of rows" and start putting the row groups under that 
				
				if ( rowIdx > 0 && 
						( rowIdx % this.GLOBALS.rowsPerGroup 
										=== 0 ) 
					)	
				{
					
					var nextGroupOfRowsSVGgroup = this.GLOBALS.masonViewerSVG.group(); 

					this.setupGroupOfRows( nextGroupOfRowsSVGgroup );

					var nextGroupOfRowsSVGgroupProgramaticStorage = this.getProgramaticDataStorageFromSVG_js_Item( nextGroupOfRowsSVGgroup );

					currentGroupOfRowsSVGgroup.add( nextGroupOfRowsSVGgroup );
					currentGroupOfRowsSVGgroupProgramaticStorage.setNextProgramaticDataStorageGroupOfRows( nextGroupOfRowsSVGgroupProgramaticStorage );
					
					
					currentGroupOfRowsSVGgroup = nextGroupOfRowsSVGgroup; 

					currentGroupOfRowsSVGgroupProgramaticStorage = nextGroupOfRowsSVGgroupProgramaticStorage;
					
					
					
					currentGroupOfRowsSVGgroup.add( nextSVGgroupOfRowXandBelow );

					currentGroupOfRowsSVGgroupProgramaticStorage.setFirstOutputRowSVGGroup( nextSVGgroupOfRowXandBelow );

				} else {
				
					currentSVGgroupOfRowXandBelow.add( nextSVGgroupOfRowXandBelow );

					currentSVGgroupOfRowXandBelowProgramaticDataStorage.setGroupToMoveForExpansion( nextSVGgroupOfRowXandBelow );
				}

				currentSVGgroupOfRowXandBelow = nextSVGgroupOfRowXandBelow;


			}

		}

		//  Done processing the rows, add everything else

		
		//  Add the vertical lines on a per viewer basis
		
		this.addFullHeightLines();
		
		

//		currentSVGgroupOfRowXandBelowProgramaticDataStorage = this.getProgramaticDataStorageFromSVG_js_Item( currentSVGgroupOfRowXandBelow );
//
//		currentSVGgroupOfRowXandBelowProgramaticDataStorage._type = "currentSVGgroupOfRowXandBelow";
//
//		currentSVGgroupOfRowXandBelowProgramaticDataStorage._attachedTo = currentSVGgroupOfRowXandBelow;



//		//  create totals row at bottom area
//
//		if ( outputRows.length > 1 || this.configDisplayOptions.createCombinedLineOnly ) {
//
//			processCombinedRow( outputRows, rowCount, currentSVGgroupOfRowXandBelow, currentSVGgroupOfRowXandBelowProgramaticDataStorage );
//		}



//
//		//  Create group for bottom line and scale
//
//		nextSVGgroupOfRowXandBelow = this.GLOBALS.masonViewerSVG.group(); //  Create a group for the row and all rows below it will be enclosed in it
//
//
//		currentSVGgroupOfRowXandBelow.add( nextSVGgroupOfRowXandBelow );
//
//		currentSVGgroupOfRowXandBelowProgramaticDataStorage.setGroupToMoveForExpansion( nextSVGgroupOfRowXandBelow );
//
//
//		currentSVGgroupOfRowXandBelow = nextSVGgroupOfRowXandBelow;
//
//		this.setupRootGroupForEachRow( currentSVGgroupOfRowXandBelow  );
//
//		currentSVGgroupOfRowXandBelowProgramaticDataStorage = this.getProgramaticDataStorageFromSVG_js_Item( currentSVGgroupOfRowXandBelow );
//
//		currentSVGgroupOfRowXandBelowProgramaticDataStorage._type = "currentSVGgroupOfRowXandBelow";
//
//		currentSVGgroupOfRowXandBelowProgramaticDataStorage._attachedTo = currentSVGgroupOfRowXandBelow;



		//  output bottom line and scale

		this.addBottomLineAndBottomScale( currentSVGgroupOfRowXandBelow, rowCount );

		//  add top line

		this.addTopLine( SVGrootGroupInsideBoundingBox );




	};



	////////////////////////////////////////////

	MasonViewerPerInstanceRenderOnPage.prototype. addTopLine = function( currentSVGgroupOfRowXandBelow  ) {

//		var objectThis = this;

				// .attr( "vector-effect", "non-scaling-stroke"  )

		var topLine = this.GLOBALS.masonViewerSVG.line(  this.GLOBALS.leftLineX - 0.5 ,
			this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE,
			this.GLOBALS.rightLineX + 0.5,
			this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE ).stroke( { color: this.configDisplayOptions.BORDER_COLOR, width: this.configDisplayOptions.BORDER_WIDTH } );

		currentSVGgroupOfRowXandBelow.add( topLine );
	};

	////////////////////////////////////////////

	MasonViewerPerInstanceRenderOnPage.prototype. addBottomLineAndBottomScale = function( currentSVGgroupOfRowXandBelow, rowCount  ) {

//		var objectThis = this;

		var bottomOfGrid = ( rowCount + 1 ) * this.configDisplayOptions.ROW_HEIGHT;


		if ( rowCount <= 1 || this.configDisplayOptions.skipCreateCombinedLine ) {

			bottomOfGrid = ( rowCount ) * this.configDisplayOptions.ROW_HEIGHT;
		}


		if ( this.configDisplayOptions.createCombinedLineOnly ) {

			bottomOfGrid = ( rowCount + 1 ) * this.configDisplayOptions.ROW_HEIGHT;
		}


		var leftScaleTextSVG = this.GLOBALS.masonViewerSVG.text( "1" );

		var textY = ( bottomOfGrid ) + ( this.configDisplayOptions.ROW_HEIGHT / 2 );

		textY = textY + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;

		this.setSVGTextPosition( { textSVG: leftScaleTextSVG, x: this.GLOBALS.leftLineX, y: textY } );

		var rightScaleValue = this.constructorParams.requestParams.inputData.maxSequenceLength + "";

		var rightScaleTextSVG = this.GLOBALS.masonViewerSVG.text( rightScaleValue );

		//  A hack to clear the broken font-size.  Clear dy that was set to compensate
		this.clearStyleAnd_dy_OnSVGtextItem( rightScaleTextSVG );

		var textY = ( bottomOfGrid ) + ( this.configDisplayOptions.ROW_HEIGHT / 2 );

		textY = textY + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;

		this.setSVGTextPosition( { textSVG: rightScaleTextSVG, x: this.GLOBALS.rightLineX, y: textY, otherAttrsToSet: [ { attrName: "text-anchor", attrValue: "end" }  ] } );


				// .attr( "vector-effect", "non-scaling-stroke"  )

		var bottomLine = this.GLOBALS.masonViewerSVG.line(
			this.GLOBALS.leftLineX - 0.5,
			( bottomOfGrid ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE,
			this.GLOBALS.rightLineX + 0.5,
			( bottomOfGrid ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE  ).stroke( { color: this.configDisplayOptions.BORDER_COLOR, width: this.configDisplayOptions.BORDER_WIDTH } );


		currentSVGgroupOfRowXandBelow.add( leftScaleTextSVG );
		currentSVGgroupOfRowXandBelow.add( rightScaleTextSVG );
		currentSVGgroupOfRowXandBelow.add( bottomLine );




	};




	////////////////////////////////////////

	//  Resize overall image length initially or after any event that lengthens or shortens the image

	MasonViewerPerInstanceRenderOnPage.prototype. resizeOverallImageLength = function(   ) {

//		var objectThis = this;

		var visibleBlocksRowCount = this.constructorParams.data.outputRows.length;

		if ( visibleBlocksRowCount > 1 && ( ! this.configDisplayOptions.skipCreateCombinedLine )  ) {

			visibleBlocksRowCount += 1;  //  Add 1 for combined row if there is more than one row
		}


		if ( this.configDisplayOptions.createCombinedLineOnly ) {

			visibleBlocksRowCount = 1;  //  Set to 1 since only displaying the "combined" line
		}


		var visibleRowsHeight = this.configDisplayOptions.ROW_HEIGHT * visibleBlocksRowCount; // this.GLOBALS.arrayOfcurrentSVGgroupOfRowXandBelow.length ;

		var hiddenBlocksThatAreVisibleHeight = 0;

		for ( var index = 0; index < this.GLOBALS.arrayOfcurrentSVGgroupOfRowXandBelow.length; index++ ) {

			var SVGgroup = this.GLOBALS.arrayOfcurrentSVGgroupOfRowXandBelow[ index ];

			var SVGgroupProgramaticDataStorage = this.getProgramaticDataStorageFromSVG_js_Item( SVGgroup );

			if ( SVGgroupProgramaticDataStorage.getHiddenBlocksVisible() ) {

				hiddenBlocksThatAreVisibleHeight += SVGgroupProgramaticDataStorage.getHiddenBlocksHeight();
			}
//			var z = 0;
		}

		var viewerHeightInsideTheBox = visibleRowsHeight + hiddenBlocksThatAreVisibleHeight;

		this.GLOBALS.viewerHeightInsideTheBox = viewerHeightInsideTheBox;


		var overallImageHeight =
			this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE +
			viewerHeightInsideTheBox +
			this.configDisplayOptions.ROW_HEIGHT +  //  Add for sequence length text below the chart
			this.configDisplayOptions.FOOTER_HEIGHT;

		this.GLOBALS.masonViewerSVG.size( this.GLOBALS.overallWidth, overallImageHeight );
		
		
		
		this.updateFullHeightLines();
	};


	////////////////////////////////////////



	MasonViewerPerInstanceRenderOnPage.prototype. showHideAllVerticalDataLinesPer_GLOBALS_showVerticalDataLines = function(  ) {

//		var objectThis = this;

		if ( this.GLOBALS.showVerticalDataLines ) {

			this.constructorParams.objectThisMasonViewerPerInstance.showVerticalDataLines();

		} else {

			this.constructorParams.objectThisMasonViewerPerInstance.hideVerticalDataLines();
		}


	};




//   mason_viewer_55_configDisplayOptionDefaults.js

//   Mason Viewer

//   defaults for Display options used in rendering the viewer on the page.


//   These values are merged using $.extend with the values passed in to the function call
//        MasonViewer.createMasonViewer( ... ) in the parameter 'configParams' which is the 3rd parameter.


//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";

	/////////////////////////////////////////////////

	///    Configuration Defaults

	MasonViewerPerInstanceRenderOnPage.prototype.configDisplayOptionDefaults = {

		TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE : 2,

		LABEL_FONT_SIZE : 12,
		
		ROW_HEIGHT : 15, //  Adjust the ROW_HEIGHT to accommodate the height of the label

		BLOCK_HEIGHT : 14,  //  Adjust the BLOCK_HEIGHT to accommodate the height of the label


		LABEL_WIDTH : 100,  //  Adjust the LABEL_WIDTH to accommodate the width of the longest label

		ICON_EXPAND_ROW_STARTING_POSITION : 1,
		ICON_EXPAND_ROW_WIDTH : 15,

		ICON_EXPAND_ROW_SPACE_AFTER : 2,

		ROW_TOTALS_BAR_RIGHT_MAX_WIDTH : 30,

		ROW_TOTAL_BLOCK_MINIMUM_SIZE : 1,

		ROW_TOTALS_BAR_RIGHT_SPACE_FROM_MAIN_GRID : 10,

		ROW_TOTALS_BAR_RIGHT_SPACE_FROM_RIGHT_EDGE : 4,


		BORDER_COLOR : "black",

		BORDER_WIDTH : 1,

		FOOTER_HEIGHT : 2,



		//  Tool tip text


		CLICK_TO_CONTRACT_TO_HIDE_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT_PREFIX : "Click to hide individual ",

		CLICK_TO_EXPAND_TO_SHOW_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT_PREFIX : "Click to show individual ",


		blockTypeLabelPlural : "blocks",

		BLOCK_HIGHLIGHT_BORDER_COLOR : "pink",
		BLOCK_HIGHLIGHT_BORDER_WIDTH : 2,


		createCombinedLineOnly : undefined,  //  set to true to only create combined line

		skipCreateCombinedLine : undefined,  //  set to true to skip create combined line

		combinedLineLabel : "Combined",  //  label on left for combined line

		combinedLineTooltipHTML : undefined,  //  tool tip for label on left for combined line

		ALIGNMENT_LINE_COLOR : "black",
		ALIGNMENT_LINE_WIDTH : 2

	};

//    mason_viewer_render_on_page_addnl_methods.js


//     This is a part of MasonViewer


//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";



MasonViewerPerInstanceRenderOnPage.prototype.deleteViewer = function(  ) {

//	this.constructorParams = {
//		$rootDiv: $rootDiv,
//		data: data,
//		requestParams: requestParams,
//		configParams: configParams,
//		callbackFunctionsObj: callbackFunctionsObj,
//		internalParams: internalParams,
//		objectThisMasonViewerPerInstance: objectThisMasonViewerPerInstance

//	var $rootDivChildren = this.constructorParams.$rootDiv.children();

//	var $svgRoot = this.constructorParams.$rootDiv.children("svg");

//	var $allSVGElements = $svgRoot.find("*");

	//  Javascript Stack Overflow Error on really large viewers so commented out
//	var $allSVGElements = this.constructorParams.$rootDiv.find("*");
//
//	$allSVGElements.off();

//	$allSVGElements.data( null );

	var $SVGroot = this.constructorParams.$rootDiv.find("svg");

	$SVGroot.remove();

//	this.constructorParams.$rootDiv.empty();
};


MasonViewerPerInstanceRenderOnPage.prototype.hideVerticalDataLines = function(  ) {


	this.GLOBALS.setSVGVerticalDataLines.hide();

	this.GLOBALS.showVerticalDataLines = false;

//	this.processVerticalDataLines();
};


MasonViewerPerInstanceRenderOnPage.prototype.showVerticalDataLines = function(  ) {


	this.GLOBALS.setSVGVerticalDataLines.show();

	this.GLOBALS.showVerticalDataLines = true;

//	this.processVerticalDataLines();
};


//MasonViewerPerInstanceRenderOnPage.prototype.processVerticalDataLines = function(  ) {
//
//  A mechanism to loop through the elements of a SVGJS set
//
//	this.GLOBALS.setSVGVerticalDataLines.each( function( index ) {
//
//		var SVGJSObjectInSet = this;
//
////		this.attr('id', 'shiny_new_id_' + i)
//
//	})
//};


MasonViewerPerInstanceRenderOnPage.prototype.MESSAGE_TYPE_REMOVE_ALIGNMENTS = "REMOVE_ALIGNMENTS";

MasonViewerPerInstanceRenderOnPage.prototype.MESSAGE_TYPE_ADD_ALIGNMENTS = "ADD_ALIGNMENTS";


//  Accept a message from MasonViewerPerInstance

MasonViewerPerInstanceRenderOnPage.prototype.acceptMessage = function( message ) {

	if ( message.type === MasonViewerPerInstanceRenderOnPage.prototype.MESSAGE_TYPE_REMOVE_ALIGNMENTS ) {

		this.removeAlignmentLines( message.data );

	} else if ( message.type === MasonViewerPerInstanceRenderOnPage.prototype.MESSAGE_TYPE_ADD_ALIGNMENTS ) {

		this.addAlignmentLines( message.data );

	} else {

		throw "unknown type in message at 'MasonViewerPerInstanceRenderOnPage.prototype.acceptMessage'.  type: " + message.type;
	}
};


MasonViewerPerInstanceRenderOnPage.prototype.removeAlignmentLines = function( params ) {

	if ( this.GLOBALS.setSVGAlignmentLines ) {

		this.GLOBALS.setSVGAlignmentLines.each(function(i) {
			this.remove();
		});

		this.GLOBALS.setSVGAlignmentLines.clear();
	}
};

////////////////////////////////////

MasonViewerPerInstanceRenderOnPage.prototype.addAlignmentLines = function( params ) {

//	var extraLineHeight = this.configDisplayOptions.ROW_HEIGHT / 2;


	var viewerHeightInsideTheBox = this.GLOBALS.viewerHeightInsideTheBox;

	this.GLOBALS.setSVGAlignmentLines = this.GLOBALS.masonViewerSVG.set();

	var linePosArray = params.linePosArray;

	for ( var linePosArrayIndex = 0; linePosArrayIndex < linePosArray.length; linePosArrayIndex++ ) {

		var linePos = linePosArray[ linePosArrayIndex ];

		var linePixel = this.positionCharPositionToPixel( linePos );

		var centerOfAlignmentLine = linePixel +  this.GLOBALS.MAIN_BOX_STARTING_POSITION;//  ADD OFFSET to allow for label on left
		
		var halfOfAlignmentLineWidth = this.configDisplayOptions.ALIGNMENT_LINE_WIDTH / 2;
		
		var x = centerOfAlignmentLine - halfOfAlignmentLineWidth;  //  center the alignment line 

		var y1 = this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;
		var y2 =
			this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE +
			viewerHeightInsideTheBox;
//		+
//			extraLineHeight;  //  Add so it extends down into the sequence length text below the chart;

		var verticalLineSVG =
			this.GLOBALS.masonViewerSVG.line( x, y1, x, y2 )
					.stroke( { color: this.configDisplayOptions.ALIGNMENT_LINE_COLOR, width: this.configDisplayOptions.ALIGNMENT_LINE_WIDTH } );

		this.GLOBALS.setSVGAlignmentLines.add( verticalLineSVG );
	}
};



MasonViewerPerInstanceRenderOnPage.prototype.registerBlockHoverListener = function( params ) {

	var hoverListener = params.hoverListener;

	if ( ! this.blockHoverCallList ) {

		this.blockHoverCallList = [];
	}

	this.blockHoverCallList.push( hoverListener );
};


//  TODO  maybe rename this method

MasonViewerPerInstanceRenderOnPage.prototype.callListenersForBlockMouseEnter = function( params ) {

	if ( this.blockHoverCallList ) {

		var blockInfo = params.blockInfo;

		var startPos = blockInfo.startPos;
		var endPos = blockInfo.endPos;

		var line1 = this.limitCharPositionMaxSeqLength( startPos - 0.5 );


//		if ( line1 < 1 ) {
//			line1 = 1;
//		}

//		var line2 = endPos + 0.5;
//		if ( line2 > this.constructorParams.requestParams.inputData.maxSequenceLength ) {
//			line2 = this.constructorParams.requestParams.inputData.maxSequenceLength;
//		}

		var line2 = this.limitCharPositionMaxSeqLength( endPos + 0.5 );


		var callParams = { linePosArray: [ line1, line2 ] };

		var message = this.createAddAlignmentsMessage( callParams );

		for ( var blockHoverCallListIndex = 0; blockHoverCallListIndex < this.blockHoverCallList.length; blockHoverCallListIndex++ ) {

			var blockHoverCallListItem = this.blockHoverCallList[ blockHoverCallListIndex ];

			blockHoverCallListItem.passMessage( message );
		}

	}

};

MasonViewerPerInstanceRenderOnPage.prototype.callListenersForBlockMouseLeave = function( params ) {

	if ( this.blockHoverCallList ) {

		var message = this.createRemoveAlignmentsMessage( {} );

		for ( var blockHoverCallListIndex = 0; blockHoverCallListIndex < this.blockHoverCallList.length; blockHoverCallListIndex++ ) {

			var blockHoverCallListItem = this.blockHoverCallList[ blockHoverCallListIndex ];

			blockHoverCallListItem.passMessage( message );
		}
	}

};


MasonViewerPerInstanceRenderOnPage.prototype.createAddAlignmentsMessage = function( data ) {

	var localMessage = {
		type: MasonViewerPerInstanceRenderOnPage.prototype.MESSAGE_TYPE_ADD_ALIGNMENTS,
		data: data
	};

	var topLevelMessage = this.createMessage( localMessage );

	return topLevelMessage;
};


MasonViewerPerInstanceRenderOnPage.prototype.createRemoveAlignmentsMessage = function( data ) {

	var localMessage = {
		type: MasonViewerPerInstanceRenderOnPage.prototype.MESSAGE_TYPE_REMOVE_ALIGNMENTS,
		data: data
	};

	var topLevelMessage = this.createMessage( localMessage );

	return topLevelMessage;
};


MasonViewerPerInstanceRenderOnPage.prototype.createMessage = function( data ) {

	var message = {
		type: MasonViewerPerInstance.prototype.MESSAGE_TYPE_RENDER_ON_PAGE,
		data: data
	};

	return message;
};





//    mason_viewer_render_on_page_animate.js


//     This is a part of MasonViewer


//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


MasonViewerPerInstanceRenderOnPage.prototype.animateTransformY = function( params ) {

//		var objectThis_MasonViewerPerInstanceRenderOnPage = this;

		var SVGoGroupToMove = params.SVGoGroupToMove;

		var yToTransformTo = params.yToTransformTo;
		var functionToRunAfterAnimate = params.functionToRunAfterAnimate;

		SVGoGroupToMove.animate({ duration: 150, ease: '-', delay: 0 }).transform( { y: yToTransformTo } ).after( functionToRunAfterAnimate );


//		var SVGoGroupToMoveNativeSVGelement = SVGoGroupToMove.node;
//
//		var $SVGoGroupToMoveNativeSVGelement = $( SVGoGroupToMoveNativeSVGelement );
//
//		var SVGoGroupToMove_nativeSVGelement_wrappedInSVGJSGroupObject  = $SVGoGroupToMoveNativeSVGelement.data( "SVGoGroupToMove_nativeSVGelement_wrappedInSVGJSGroupObject" );
//
//		if ( SVGoGroupToMove_nativeSVGelement_wrappedInSVGJSGroupObject === undefined || SVGoGroupToMove_nativeSVGelement_wrappedInSVGJSGroupObject === null ) {
//
//			SVGoGroupToMove_nativeSVGelement_wrappedInSVGJSGroupObject  = SVGwrapNativeSVG_group_InSVGJSGroupObject( SVGoGroupToMoveNativeSVGelement );
//
//			$SVGoGroupToMoveNativeSVGelement.data( "SVGoGroupToMove_nativeSVGelement_wrappedInSVGJSGroupObject", SVGoGroupToMove_nativeSVGelement_wrappedInSVGJSGroupObject );
//		}
//
//		SVGoGroupToMove_nativeSVGelement_wrappedInSVGJSGroupObject.animate({ duration: 150, ease: '-', delay: 0 }).transform( { y: yToTransformTo } ).after( functionToRunAfterAnimate );





//		if ( yToTransformTo !== 0 ) {
//			SVGoGroupToMove.animate({ duration: 150, ease: '-', delay: 0 }).transform( { y: yToTransformTo } ).after( functionToRunAfterAnimate );
//		}
//
//		var SVGoGroupToMoveNativeSVGelement = SVGoGroupToMove.node;
//
//		var $SVGoGroupToMoveNativeSVGelement = $( SVGoGroupToMoveNativeSVGelement );
//
//		var currentTransform = $SVGoGroupToMoveNativeSVGelement.attr("transform");
//
//		//  example:   translate(0,90)
//
//		var regexPattern = /translate(.)"/;  //  new RegExp (pattern,modifiers);
//
//		var currentTranslate =  regexPattern.exec( currentTransform );
//
//		var z = 0;

//		        /* delay animation */
//        this.animateTransformY_Timeout = setTimeout(function() {
//          var interval  = 1000 / 60
//            , start     = new Date().getTime()
//            , finish    = start + d
//
//          /* start animation */
//          fx.interval = setInterval(function(){
//            // This code was borrowed from the emile.js micro framework by Thomas Fuchs, aka MadRobby.
//            var time = new Date().getTime()
//              , pos = time > finish ? 1 : (time - start) / d
//
//            /* process values */
//            fx.to(pos)
//
//            /* finish off animation */
//            if (time > finish) {
//              clearInterval(fx.interval)
//              fx._after ? fx._after.apply(element, [fx]) : fx.stop()
//            }
//
//          }, d > interval ? interval : d)
//
//        }, delay || 0)




};


//   mason_viewer_render_on_page_constants.js

//     This is a part of MasonViewer




//////////////  !!!!!!!!!!!!!   Order of calling "precompute" call backs.

///////    For the Main blocks and the Hidden blocks, the precompute is called for each block right before the call to get the color

///////    For the Totals Per Row blocks on the right, the precompute is called for all the rows before the get color and size is called for each block

//////     For the Totals Row, the precompute is called for all the rows before the get color is called for each block



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


	//    A set of constants

	MasonViewerPerInstanceRenderOnPage.prototype. CONSTANTS = {
		
		MIN_MAX_VALUES: {
			MINIMUM_ROWS_PER_GROUP: 20 //  100,  //  Min number of rows per "Group of rows

			//  TODO  For testing 
//			MINIMUM_ROWS_PER_GROUP: 2, //  Min number of rows per "Group of rows
//			MAXIMUM_ROWS_PER_GROUP: 2  //  Max number of rows per "Group of rows
		},
		
		CLASSES: {
			PROT_COV_VIEWER_GROUP_OR_ROWS: "prot_cov_viewer_group_of_rows",

			PROT_COV_VIEWER_GROUP_ROW_MAIN: "prot_cov_viewer_group_row_main",

			PROT_COV_VIEWER_GROUP_ROW_VISIBLE: "prot_cov_viewer_group_row_visible"
		},

		JQUERY_DATA_LABELS: {

			//  Stored by jQuery code data()

			JQUERY_DATA_LABEL_PROGRAMATIC : "programatic"  //  Data needed for the program to run
		}

	};


//    mason_viewer_render_on_page_full_height_lines.js


//     This is a part of MasonViewer


//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


//////////////////////////////////

//    This method adds vertical lines the full height of the viewer
//
//           based on the contents of  requestParams.inputData.vertLinesAllRowsItems


MasonViewerPerInstanceRenderOnPage.prototype.addFullHeightLines = function(  ) {

	var objectThis = this;
	
	var rowIdx = 0;
	
	var vertLinesAllRowsItems = this.constructorParams.requestParams.inputData.vertLinesAllRowsItems;


	if ( vertLinesAllRowsItems && vertLinesAllRowsItems.length > 0 &&
			objectThis.constructorParams.callbackFunctionsObj.allRowsVerticalLines_callbackFunctions &&
			objectThis.constructorParams.callbackFunctionsObj.allRowsVerticalLines_callbackFunctions.getColorForLine ) {

		
		this.GLOBALS.setSVGVerticalDataFullHeightLines = this.GLOBALS.masonViewerSVG.set();
		
		
		for ( var vertLinesAllRowsItemsIdx = 0; vertLinesAllRowsItemsIdx < vertLinesAllRowsItems.length; vertLinesAllRowsItemsIdx++ ) {

			var lineData = vertLinesAllRowsItems[ vertLinesAllRowsItemsIdx ];
			

			var linePos = lineData.linePos;
			
			var vertLineData = lineData.vertLineData;



			if ( vertLineData === undefined ||  vertLineData === null ) {
				
				throw " inputData.vertLinesAllRowsItems[ vertLinesAllRowsItemsIdx ].vertLineData is empty or null for vertLinesAllRowsItemsIdx = " + vertLinesAllRowsItemsIdx;
			}
			
			if ( linePos === undefined ||  linePos === null ) {
				
				throw " inputData.vertLinesAllRowsItems[ vertLinesAllRowsItemsIdx ].linePos is empty or null for vertLinesAllRowsItemsIdx = " + vertLinesAllRowsItemsIdx;
			}
			

			//  Add callbackDataStorage to lineData

			lineData.callbackDataStorage = {};


			if ( objectThis.constructorParams.callbackFunctionsObj.allRowsVerticalLines_callbackFunctions &&
					objectThis.constructorParams.callbackFunctionsObj.allRowsVerticalLines_callbackFunctions.precomputeValuesOnCreate )
			{

				var precomputeValuesOnCreateParams =

				{
					vertLineData: vertLineData,

					linePos: linePos,

					callbackDataStorage: lineData.callbackDataStorage
				};

				objectThis.constructorParams.callbackFunctionsObj.allRowsVerticalLines_callbackFunctions.precomputeValuesOnCreate( precomputeValuesOnCreateParams );
			}



			var linePixel = this.positionCharPositionToPixel( linePos );

			var x = linePixel +  this.configDisplayOptions.MAIN_BOX_STARTING_POSITION;//  ADD OFFSET to allow for label on left
			
			var y1 = this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;
			
//			var y2 =
//				this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE +
//				this.GLOBALS.viewerHeightInsideTheBox;   //  Cannot use since not set yet 

			//  y2 is a temporary value for now until update in callback below
			var y2 = 
				this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE +
				this.configDisplayOptions.ROW_HEIGHT; 


			var getColorForLineParams = { vertLineData: vertLineData, callbackDataStorage: lineData.callbackDataStorage, forHiddenLines: false  };

			var colorForLine = objectThis.constructorParams.callbackFunctionsObj.allRowsVerticalLines_callbackFunctions.getColorForLine( getColorForLineParams );

			//  returns  colorForLine = "#112233"

			//  throws exception if not valid
			this.isValidColor( colorForLine );
			
			var verticalLineSVG = this.GLOBALS.masonViewerSVG.line( x, y1, x, y2 ).stroke( { color: colorForLine, width: this.configDisplayOptions.BORDER_WIDTH } );

			this.GLOBALS.setSVGVerticalDataLines.add( verticalLineSVG );
			
			this.GLOBALS.setSVGVerticalDataFullHeightLines.add( verticalLineSVG );

			
			//  Comment out since these lines are not part of a row
//			this.addMouseOverToLinesInsideMainBox( verticalLineSVG );


			this.addProgramaticDataStorageToSVG_js_Item( verticalLineSVG );

			verticalLineSVG.data( "row-rowIdx", rowIdx );

			verticalLineSVG.data( "placement", "primary row lines" );

			verticalLineSVG.data( "block-id", lineData.id );

			var attachMouseOverVerticalLineParams = {
					
					verticalLineSVG: verticalLineSVG,
					lineData: lineData,
					callbackFunctions: objectThis.constructorParams.callbackFunctionsObj.allRowsVerticalLines_callbackFunctions
					
			};
			

			this.attachMouseOverVerticalLine( attachMouseOverVerticalLineParams );


			//				currentSVGgroupOfRowXandBelow.add( verticalLineSVG );

			//				SVGRowXmainLinesSET.add( verticalLineSVG );

			//  TODO  Adding to this Set is probably incorrect
//			SVGRowXmainBlocksGROUP.add( verticalLineSVG );
		}
	}



};




MasonViewerPerInstanceRenderOnPage.prototype.updateFullHeightLines = function( params ) {

	if ( this.GLOBALS.setSVGVerticalDataFullHeightLines ) {
		
		var y2 =
			this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE +
			this.GLOBALS.viewerHeightInsideTheBox; 

		this.GLOBALS.setSVGVerticalDataFullHeightLines.each( function(index) {

			this.attr("y2", y2);

		});
	}
};


//   mason_viewer_render_on_page_general_utils.js

//     This is a part of MasonViewer

//   General Utilities


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



	//////////////////////////////////////
	
	MasonViewerPerInstanceRenderOnPage.prototype. convertBlockColorTo_SVGJS_FillColor = function( colorForBlock ) {
	
		//  SVGjs requires the fill color object to be { r: , g: , b: } or to be a string as listed above.

		//  The block callbacks are returning either a hex string six based (e.g. #ff0066)
		//                   or an object with { red: , green: , blue: }
		
		//  If a string is passed in, it will be validated and returned
		
		//  If anything else is passed in, it will be assumed to be the object 
		//  and will be validated and rounded and converted to  { r: , g: , b: }
		

		if ( colorForBlock === undefined || colorForBlock === null ) {

			throw "ERROR: colorForBlock === undefined || colorForBlock === null";
		}

		if (typeof colorForBlock == 'string' || colorForBlock instanceof String) {

			//  Throws Exception if error
			this.isValidColor( colorForBlock );
				
			return colorForBlock;
			

		} else {

			var colorForBlockRoundedAndValidated = this.roundAndValidateColor( colorForBlock );

			var fillColor = { r: colorForBlockRoundedAndValidated.red, g: colorForBlockRoundedAndValidated.green, b: colorForBlockRoundedAndValidated.blue };
			
			return fillColor;
		}
		
		
		throw "Code error in 'convertBlockColorTo_SVGJS_FillColor', should have returned by this point: value passed is: " + colorForBlock;
	};
	


	//////////////////////////////////////
	
	MasonViewerPerInstanceRenderOnPage.prototype. isValidColor = function( colorParam ) {
	

		if (typeof colorParam == 'string' || colorParam instanceof String) {

			
		} else {
			
			throw "'isValidColor' only valid for string input.  colorParam: " + colorParam;
		}
		
//	    if ( colorParam.match(/^#[a-f0-9]{6}$/i) !== null ) {
		
		if ( /^#[a-f0-9]{6}$/i.test( colorParam ) ) {
			
	    	// The pattern is in the string.  
	    	// Since the pattern covers from the start to the end of the string, the whole string is checked.
			
			return; 
	    }
	    
		throw "color is a string but is not a valid hex color with 6 positions  (e.g. #ff0066): value passed is: " + colorParam;

	};

	//	^ match beginning
	//	# a hash
	//	[a-f0-9] any letter from a-f and 0-9
	//	{6} the previous group appears exactly 6 times
	//	$ match end
	//	i ignore case

	//////////////////////////////////////

	MasonViewerPerInstanceRenderOnPage.prototype. roundAndValidateColor = function( colorForBlock ) {

//		var objectThis = this;

		if ( colorForBlock === undefined || colorForBlock === null ) {

			throw "ERROR: colorForBlock === undefined || colorForBlock === null";
		}
		

		if ( colorForBlock.red === undefined || colorForBlock.red === null ) {

			throw "ERROR: colorForBlock.red === undefined || colorForBlock.red === null";
		}

		if ( colorForBlock.green === undefined || colorForBlock.green === null ) {

			throw "ERROR: colorForBlock.green === undefined || colorForBlock.green === null";
		}

		if ( colorForBlock.blue === undefined || colorForBlock.blue === null ) {

			throw "ERROR: colorForBlock.blue === undefined || colorForBlock.blue === null";
		}

		var colorForBlockOut = { red: Math.round( colorForBlock.red  ), green: Math.round( colorForBlock.green  ), blue: Math.round( colorForBlock.blue  ) };

		if ( colorForBlockOut.red < 0 || colorForBlockOut.red > 255 ) {

			throw "colorForBlock.red calculated < 0 or > 255, is = " + colorForBlockOut.red ;
		}


		if ( colorForBlockOut.green < 0 || colorForBlockOut.green > 255 ) {

			throw "colorForBlock.green calculated < 0 or > 255, is = " + colorForBlockOut.green ;
		}



		if ( colorForBlockOut.blue < 0 || colorForBlockOut.blue > 255 ) {

			throw "colorForBlock.blue calculated < 0 or > 255, is = " + colorForBlockOut.blue ;
		}

		return colorForBlockOut;
	};








	//////////////////////////////////////

	//   Get raw SVG element Id for SVG.js item

	MasonViewerPerInstanceRenderOnPage.prototype. getIdForSVG_js_item = function( SVG_js_item ) {

		var id = SVG_js_item.attr('id');

		return id;
	};

	//////////////////////////////////////

	//   Get jQuery Object for SVG.js item

	MasonViewerPerInstanceRenderOnPage.prototype. getJQueryObjForRawSVGFromSVG_js_item = function( SVG_js_item ) {

		if ( SVG_js_item === undefined || SVG_js_item === null ) {

			throw "ERROR: SVG_js_item === undefined || SVG_js_item === null";
		}


		var $jQueryObj = $( SVG_js_item.node );

//		var id = getIdForSVG_js_item( SVG_js_item );
//
//		var $jQueryObj = $( "#" + id );

		return $jQueryObj;
	};


		//////////////////////////////////////

	//   Get SVG.js object for jQuery Object

	MasonViewerPerInstanceRenderOnPage.prototype. getSVG_js_itemForJQueryObj = function( $jQueryObj ) {

		if ( $jQueryObj === undefined || $jQueryObj === null ) {

			throw "ERROR: $jQueryObj === undefined || $jQueryObj === null";
		}

		if ( $jQueryObj.length === 0 ) {

			throw "ERROR: $jQueryObj.length === 0";
		}


		var SVG_js_item = $jQueryObj[0].instance;

		return SVG_js_item;
	};


	
	//////////////////////////////////////////////////////////////
	
	//////   ProgramaticDataStorageGroupOfRows


	//////////////////////////////////////

	//   Add ProgramaticDataStorageGroupOfRows to an jQuery item

	MasonViewerPerInstanceRenderOnPage.prototype. addProgramaticDataStorageGroupOfRowsToJQueryItem = function( $item ) {

		var programaticDataStorageGroupOfRows = new ProgramaticDataStorageGroupOfRows();

		$item.data( MasonViewerPerInstanceRenderOnPage.prototype. CONSTANTS.JQUERY_DATA_LABELS.JQUERY_DATA_LABEL_PROGRAMATIC, programaticDataStorageGroupOfRows );


		programaticDataStorageGroupOfRows.$item = $item; //  For debugging


		return programaticDataStorageGroupOfRows;
	};


	//////////////////////////////////////

	//   Get ProgramaticDataStorageGroupOfRows in an jQuery item

	MasonViewerPerInstanceRenderOnPage.prototype. getProgramaticDataStorageGroupOfRowsFromJQueryItem = function( $item ) {

		var programaticDataStorageGroupOfRows = $item.data( MasonViewerPerInstanceRenderOnPage.prototype. CONSTANTS.JQUERY_DATA_LABELS.JQUERY_DATA_LABEL_PROGRAMATIC );

		if ( programaticDataStorageGroupOfRows === undefined ) {

//			var z = 0;
		}

		return programaticDataStorageGroupOfRows;
	};


	//////////////////////////////////////

	//   Add ProgramaticDataStorageGroupOfRows to an SVG.js item,  added to underlying SVG element via jQuery

	MasonViewerPerInstanceRenderOnPage.prototype. addProgramaticDataStorageGroupOfRowsToSVG_js_Item = function( SVGitem ) {

		var $jQueryItem = this.getJQueryObjForRawSVGFromSVG_js_item( SVGitem );

		return this.addProgramaticDataStorageGroupOfRowsToJQueryItem( $jQueryItem );
	};


	//////////////////////////////////////

	//   Get ProgramaticDataStorageGroupOfRows in an SVG.js item,  retreived from underlying SVG element via jQuery

	MasonViewerPerInstanceRenderOnPage.prototype. getProgramaticDataStorageGroupOfRowsFromSVG_js_Item = function( SVGitem ) {

		var $jQueryItem = this.getJQueryObjForRawSVGFromSVG_js_item( SVGitem );

		var programaticDataStorageGroupOfRows = this.getProgramaticDataStorageGroupOfRowsFromJQueryItem( $jQueryItem );

		return programaticDataStorageGroupOfRows;
	};
	
	
	/////////////////////////////////////////////////////////////
	
	//////////  ProgramaticDataStorage


	//////////////////////////////////////

	//   Add ProgramaticDataStorage to an jQuery item

	MasonViewerPerInstanceRenderOnPage.prototype. addProgramaticDataStorageToJQueryItem = function( $item ) {

		var programaticDataStorage = new ProgramaticDataStorage();

		$item.data( MasonViewerPerInstanceRenderOnPage.prototype. CONSTANTS.JQUERY_DATA_LABELS.JQUERY_DATA_LABEL_PROGRAMATIC, programaticDataStorage );


		programaticDataStorage.$item = $item; //  For debugging


		return programaticDataStorage;
	};


	//////////////////////////////////////

	//   Get ProgramaticDataStorage in an jQuery item

	MasonViewerPerInstanceRenderOnPage.prototype. getProgramaticDataStorageFromJQueryItem = function( $item ) {

		var programaticDataStorage = $item.data( MasonViewerPerInstanceRenderOnPage.prototype. CONSTANTS.JQUERY_DATA_LABELS.JQUERY_DATA_LABEL_PROGRAMATIC );

		if ( programaticDataStorage === undefined ) {

//			var z = 0;
		}

//		if ( programaticDataStorage !== undefined ) {
//
//			programaticDataStorage.$item = $item; //  For debugging
//		}

		return programaticDataStorage;
	};


	//////////////////////////////////////

	//   Add ProgramaticDataStorage to an SVG.js item,  added to underlying SVG element via jQuery

	MasonViewerPerInstanceRenderOnPage.prototype. addProgramaticDataStorageToSVG_js_Item = function( SVGitem ) {

		var $jQueryItem = this.getJQueryObjForRawSVGFromSVG_js_item( SVGitem );

		return this.addProgramaticDataStorageToJQueryItem( $jQueryItem );
	};


	//////////////////////////////////////

	//   Get ProgramaticDataStorage in an SVG.js item,  retreived from underlying SVG element via jQuery

	MasonViewerPerInstanceRenderOnPage.prototype. getProgramaticDataStorageFromSVG_js_Item = function( SVGitem ) {

		var $jQueryItem = this.getJQueryObjForRawSVGFromSVG_js_item( SVGitem );

		var programaticDataStorage = this.getProgramaticDataStorageFromJQueryItem( $jQueryItem );

		return programaticDataStorage;
	};

	//////////////////////////////////


	MasonViewerPerInstanceRenderOnPage.prototype. set_class_directly_OnSVGItem_using_jQuery = function( SVGItem, classValue ) {


		var $SVGItem = this.getJQueryObjForRawSVGFromSVG_js_item( SVGItem );

		$SVGItem.attr( "class", classValue );
	};


	//////////////////////////////////


	MasonViewerPerInstanceRenderOnPage.prototype. set_attr_directly_OnSVGtextItem_using_jQuery = function( SVGtextItem, attrName, attrValue ) {


		var $SVGtextItem = this.getJQueryObjForRawSVGFromSVG_js_item( SVGtextItem );

		$SVGtextItem.attr( attrName, attrValue );

		var $tspanChild = $SVGtextItem.children( "tspan" );

		$tspanChild.attr( attrName, attrValue );
	};

	//////////////////////////////////

	//  Clear the "style" attr on an SVG text item

	//  This hack is being used to clear out the invalid font-size entry

	MasonViewerPerInstanceRenderOnPage.prototype. clearStyleAnd_dy_OnSVGtextItem = function( SVGtextItem ) {

		//  Does not work
//		SVGitem.attr( "style", "" );

		//  Does work

		var $SVGtextItem = this.getJQueryObjForRawSVGFromSVG_js_item( SVGtextItem );

		$SVGtextItem.attr( "style", "" );

		$SVGtextItem.attr( "dy", "" );

		var $tspanChild = $SVGtextItem.children( "tspan" );

		$tspanChild.attr( "style", "" );

		$tspanChild.attr( "dy", "" );

//		var z = 0;
	};


	////////////////////////////////////////////////////////

	//   attach Tool Tip to the provided jquery object using the provided function to get the tool tip text


	MasonViewerPerInstanceRenderOnPage.prototype. attachToolTipToJqueryHtmlNode = function( $htmlNode, getTooltipTextFcn, callbackFunctions ) {

//		var objectThis = this;

		$htmlNode.mouseenter( function(eventObject) {

			var text = getTooltipTextFcn();

			Tip( text, DELAY, 0 );

			if ( callbackFunctions && callbackFunctions.mouseenter ) {

				callbackFunctions.mouseenter( this );
			}
		} );

		$htmlNode.mouseleave( function(eventObject) {

			UnTip();

			if ( callbackFunctions && callbackFunctions.mouseleave ) {

				callbackFunctions.mouseleave( this );
			}

		} );

	};


	//  Not used since switched tool tip library
	
//		$htmlNode.wTooltip({
//				content: true,
//				offsetY: 18,
//				offsetX: 15,
//				callBefore: getTooltipTextFcn,
//
//				clickAction: function(tooltip, node){
//					$(tooltip).hide();
//				},
//				style: {
//					border: "1px solid black",
//					background: "#E8EAFF",
//					fontSize: "8pt",
//					color: "black"
//				}
//			});


	////////////////////////////////////////

	//////    Vertical Lines Representing provided data processing

	///////////////

	//   Create Tool Tip for Vertical Lines Representing provided data processing

	MasonViewerPerInstanceRenderOnPage.prototype. attachMouseOverVerticalLine = function( params  ) {

//		var objectThis = this;
		
		var verticalLineSVG = params.verticalLineSVG;
		var lineData = params.lineData;
		var callbackFunctions = params.callbackFunctions;

		var $verticalLineSVG = this.getJQueryObjForRawSVGFromSVG_js_item( verticalLineSVG );

		var getToolTextParams = {

			vertLineData: lineData.vertLineData,
			linePos: lineData.linePos,

			callbackDataStorage: lineData.callbackDataStorage
		};

		this.attachToolTipToJqueryHtmlNode( $verticalLineSVG, function( tooltip, node ) {

			var tooltipHTML = callbackFunctions.getLinesToolTipText( getToolTextParams  );

			$(tooltip).html( tooltipHTML );

			return tooltipHTML;

		} );
	};




	////////////////////////

	

	/////////////////////////////////

	//   Given a jQuery element in a SVG, return it's closest Group of Rows Group

	MasonViewerPerInstanceRenderOnPage.prototype. get$groupOfRowsFor$currentElement = function( $currentElement ) {

//		var objectThis = this;

		var groupOfRowsSelector = "g." + MasonViewerPerInstanceRenderOnPage.prototype. CONSTANTS.CLASSES.PROT_COV_VIEWER_GROUP_OR_ROWS;

				// Get group of rows
		var $groupOfRows = $currentElement.parent().closest( groupOfRowsSelector );

		if ( $groupOfRows.length === 0 ) {

			throw "Unable to find group of rows element using selector '" + groupOfRowsSelector + "'.";
		}

		return $groupOfRows;

	};

	
	
	/////////////////////////////////

	//   Given a jQuery element in a SVG, return it's closest parent group, closest Row Root group

	MasonViewerPerInstanceRenderOnPage.prototype. get$rowMainGroupFor$currentElement = function( $currentElement ) {

//		var objectThis = this;

		var rowMainGroupSelector = "g." + MasonViewerPerInstanceRenderOnPage.prototype. CONSTANTS.CLASSES.PROT_COV_VIEWER_GROUP_ROW_MAIN;

				// Get Row Main Group since that is where the SVG.js set of elements to make visible is attached
		var $rowMainGroup = $currentElement.parent().closest( rowMainGroupSelector );

		if ( $rowMainGroup.length === 0 ) {

			throw "Unable to find main group element using selector '" + rowMainGroupSelector + "'.";
		}

		return $rowMainGroup;

	};



	/////////////////////////////

	MasonViewerPerInstanceRenderOnPage.prototype. attachClickShowHideToggleHiddenBlocksRow = function( SVGObject ) {

		var objectThis = this;

		var $SVGObject = this.getJQueryObjForRawSVGFromSVG_js_item( SVGObject );

		$SVGObject.click( function( event, ui ) {

			objectThis.clickShowHideToggleHiddenBlocksRow( event, ui, this /* "this" for the clicked on element */ );
		} );

	};



	/////////////////////////////

	MasonViewerPerInstanceRenderOnPage.prototype. setSVGTextPosition = function( setSVGTextPositionParams ) {

//		var objectThis = this;

		var textSVG = setSVGTextPositionParams.textSVG;
		var x = setSVGTextPositionParams.x;
		var y = setSVGTextPositionParams.y;
		var otherAttrsToSet = setSVGTextPositionParams.otherAttrsToSet;
		var additionalStyle = setSVGTextPositionParams.additionalStyle;





		if ( additionalStyle === undefined || additionalStyle === null ) {

			additionalStyle = "";
		}


		textSVG.move( x, y );


		//  Do not use since results in a call to textSVG.rebuild() which resets the "dy"
//		textSVG.size( this.configDisplayOptions.LABEL_FONT_SIZE );   //  TODO  hard coded size


		//		textSVG.attr("dy", height);

		this.set_attr_directly_OnSVGtextItem_using_jQuery( textSVG, "dy", ".35em" );  // Must be after setting the size

		//  TODO  hard coded font size
		this.set_attr_directly_OnSVGtextItem_using_jQuery( textSVG, "style", "font-size:" + this.configDisplayOptions.LABEL_FONT_SIZE + "px;font-family:Helvetica, Arial, sans-serif" + additionalStyle );

		if ( otherAttrsToSet !== undefined && otherAttrsToSet !== null && otherAttrsToSet instanceof Array && otherAttrsToSet.length > 0 ) {

			for ( var otherAttrsIdx = 0; otherAttrsIdx < otherAttrsToSet.length; otherAttrsIdx++ ) {

				var otherAttr = otherAttrsToSet[ otherAttrsIdx ];

				this.set_attr_directly_OnSVGtextItem_using_jQuery( textSVG, otherAttr.attrName, otherAttr.attrValue );  // Must be after setting the size
			}
		}



//		var labelTextSVG_BBox = textSVG.bbox(); //  The bbox() values are zero if the graph is hidden with the div having display: none;
//
//		var height = labelTextSVG_BBox.height;
//		var width = labelTextSVG_BBox.width;


//		var z = 0;
	};




	/////////////////////////////

	///  create "callbackDataStorage" on outputRow and on mainBlock

	MasonViewerPerInstanceRenderOnPage.prototype. add_callbackDataStorage_ToElementsIn_outputRows  = function( outputRows ) {

//		var objectThis = this;



		//  First create "callbackDataStorage" on outputRow and on mainBlock

		for ( var addDataStgRowIdx = 0; addDataStgRowIdx < outputRows.length; addDataStgRowIdx++ ) {

			var addDataStgRow = outputRows[ addDataStgRowIdx ];

			addDataStgRow.callbackDataStorage = {};
		}


	};


	/////////////////////////////


	MasonViewerPerInstanceRenderOnPage.prototype. setupGroupOfRows = function( currentGroupOfRowsSVGgroup ) {

//		var objectThis = this;

		this.set_class_directly_OnSVGItem_using_jQuery( currentGroupOfRowsSVGgroup, MasonViewerPerInstanceRenderOnPage.prototype. CONSTANTS.CLASSES.PROT_COV_VIEWER_GROUP_OR_ROWS );

		var programaticDataStorageGroupOfRows = this.addProgramaticDataStorageGroupOfRowsToSVG_js_Item( currentGroupOfRowsSVGgroup );
		
		programaticDataStorageGroupOfRows.setSVGGroup( currentGroupOfRowsSVGgroup );
		
		return programaticDataStorageGroupOfRows;
	};



	/////////////////////////////


	MasonViewerPerInstanceRenderOnPage.prototype. setupRootGroupForEachRow = function( currentSVGgroupOfRowXandBelow ) {

//		var objectThis = this;

		this.GLOBALS.arrayOfcurrentSVGgroupOfRowXandBelow.push( currentSVGgroupOfRowXandBelow );

		this.set_class_directly_OnSVGItem_using_jQuery( currentSVGgroupOfRowXandBelow, MasonViewerPerInstanceRenderOnPage.prototype. CONSTANTS.CLASSES.PROT_COV_VIEWER_GROUP_ROW_MAIN );

		return this.addProgramaticDataStorageToSVG_js_Item( currentSVGgroupOfRowXandBelow );
	};




	//////////////////////////////////////////////

	//  Highlight box under each main row

	MasonViewerPerInstanceRenderOnPage.prototype. highlightBoxUnderEachRow = function( SVGItem ) {

		var objectThis = this;

		var $SVGItem = $( SVGItem.node );

		var $rowMainGroup = this.get$rowMainGroupFor$currentElement( $SVGItem );

		var SVGrowMainGroupProgramaticDataStorage =  objectThis.getProgramaticDataStorageFromJQueryItem( $rowMainGroup );

		var boxUnderEachRow = SVGrowMainGroupProgramaticDataStorage.getMainBlocksBoxUnderEachRow();

		if ( SVGrowMainGroupProgramaticDataStorage.getHiddenBlocksVisible() ) {

			boxUnderEachRow = SVGrowMainGroupProgramaticDataStorage.getHiddenBlocksBoxUnderEachRow();
		}

		if ( boxUnderEachRow === undefined ) {

			return;
		}


		var $boxUnderEachRow = $( boxUnderEachRow.node );

		$boxUnderEachRow.css( { stroke: "lightgreen", "stroke-width": 5 } );
	};
		//		stroke:pink;stroke-width:5

	//////////////////////////////////////////////

	//  UN Highlight box under each main row

	MasonViewerPerInstanceRenderOnPage.prototype. unhighlightBoxUnderEachRow = function( SVGItem ) {

//		var objectThis = this;

		if ( SVGItem === undefined ) {

			return;
		}

		var $SVGItem = $( SVGItem.node );

		var $rowMainGroup = this.get$rowMainGroupFor$currentElement( $SVGItem );

		var SVGrowMainGroupProgramaticDataStorage =  this.getProgramaticDataStorageFromJQueryItem( $rowMainGroup );

		if ( SVGrowMainGroupProgramaticDataStorage === undefined ) {

			return;
		}

		var boxUnderEachRow = SVGrowMainGroupProgramaticDataStorage.getMainBlocksBoxUnderEachRow();

		if ( SVGrowMainGroupProgramaticDataStorage.getHiddenBlocksVisible() ) {

			boxUnderEachRow = SVGrowMainGroupProgramaticDataStorage.getHiddenBlocksBoxUnderEachRow();
		}


		if ( boxUnderEachRow === undefined ) {

			return;
		}

		var $boxUnderEachRow = $( boxUnderEachRow.node );

		$boxUnderEachRow.css( { stroke: "black", "stroke-width": 0 } );
	};



	//////////////////////////////////////////////

	//  Add a box under each main row

	MasonViewerPerInstanceRenderOnPage.prototype. addBoxUnderEachRowForMouseOver = function( currentSVGgroupOfRowXandBelow, SVGrowMainGroupProgramaticDataStorage, rowIdx ) {

		var objectThis = this;

		var y = ( rowIdx * this.configDisplayOptions.ROW_HEIGHT );

		y = y + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;

		var blockSVG = this.GLOBALS.masonViewerSVG.rect( this.GLOBALS.sequenceWidth, this.configDisplayOptions.BLOCK_HEIGHT );

		currentSVGgroupOfRowXandBelow.add( blockSVG );

		SVGrowMainGroupProgramaticDataStorage.setMainBlocksBoxUnderEachRow( blockSVG );

		blockSVG.attr(  { fill: { r: 255, g: 255, b: 255 },
			stroke: { r: 0, g: 0, b: 0 },
			"stroke-width": 0,
			"fill-opacity": 0 } );

		blockSVG.attr( "data-placement", "mainBlocksBoxUnderEachMainRow" );

		blockSVG.attr( "rowIdx", rowIdx );

		blockSVG.move( this.configDisplayOptions.MAIN_BOX_STARTING_POSITION, y );

		this.addProgramaticDataStorageToSVG_js_Item( blockSVG );

		var $blockSVG = this.getJQueryObjForRawSVGFromSVG_js_item( blockSVG );

		$blockSVG.hover( /* handlerIn */ function(eventObject) {

//			var $this = $(this);

			objectThis.highlightBoxUnderEachRow( this.instance );

		}, /* handlerOut */ function(eventObject) {

//			var $this = $(this);

			objectThis.unhighlightBoxUnderEachRow( this.instance );
		} );


	};

	///////////////////////////////////


	//  Add a box under each row hidden blocks

	MasonViewerPerInstanceRenderOnPage.prototype. addHiddenOrTotalsBlocksBoxUnderEachRowForMouseOver = function( placementLabel, hiddenBlocksRowsHeight, currentSVGgroupOfRowXandBelow, SVGrowMainGroupProgramaticDataStorage, rowIdx ) {

		var objectThis = this;

		var y = ( rowIdx * this.configDisplayOptions.ROW_HEIGHT );

		y = y + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;

		var blockSVG = this.GLOBALS.masonViewerSVG.rect( this.GLOBALS.sequenceWidth, hiddenBlocksRowsHeight );

		currentSVGgroupOfRowXandBelow.add( blockSVG );

		SVGrowMainGroupProgramaticDataStorage.setHiddenBlocksBoxUnderEachRow( blockSVG );



		blockSVG.attr(  { fill: { r: 255, g: 255, b: 255 },
			stroke: { r: 0, g: 0, b: 0 },
			"stroke-width": 0,
			"fill-opacity": 0 } );

		blockSVG.attr( "data-placement", placementLabel );

		blockSVG.attr( "rowIdx", rowIdx );

		blockSVG.move( this.configDisplayOptions.MAIN_BOX_STARTING_POSITION, y );

		this.addProgramaticDataStorageToSVG_js_Item( blockSVG );

		var $blockSVG = this.getJQueryObjForRawSVGFromSVG_js_item( blockSVG );

		$blockSVG.hover( /* handlerIn */ function(eventObject) {

//			var $this = $(this);

			objectThis.highlightBoxUnderEachRow( this.instance );

		}, /* handlerOut */ function(eventObject) {

//			var $this = $(this);

			objectThis.unhighlightBoxUnderEachRow( this.instance );
		} );

		blockSVG.hide();
	};


	///////////////////////////////////


	//  Add a box under each row hidden blocks

	MasonViewerPerInstanceRenderOnPage.prototype. addHiddenBlocksBoxUnderEachRowForMouseOver = function( hiddenBlocksRowsHeight, currentSVGgroupOfRowXandBelow, SVGrowMainGroupProgramaticDataStorage, rowIdx ) {

//		var objectThis = this;

		this.addHiddenOrTotalsBlocksBoxUnderEachRowForMouseOver( "hiddenBlocksBoxUnderEachMainRow", hiddenBlocksRowsHeight, currentSVGgroupOfRowXandBelow, SVGrowMainGroupProgramaticDataStorage, rowIdx );
	};


	///////////////////////////////////


	//  Add a box under each row totals blocks

	MasonViewerPerInstanceRenderOnPage.prototype. addTotalsBlocksBoxUnderEachRowForMouseOver = function( hiddenBlocksRowsHeight, currentSVGgroupOfRowXandBelow, SVGrowMainGroupProgramaticDataStorage, rowIdx ) {

//		var objectThis = this;

		this.addHiddenOrTotalsBlocksBoxUnderEachRowForMouseOver( "TotalsBlocksBoxUnderCombinedRow", hiddenBlocksRowsHeight, currentSVGgroupOfRowXandBelow, SVGrowMainGroupProgramaticDataStorage, rowIdx );
	};



	////////////////////////////////////////////

	MasonViewerPerInstanceRenderOnPage.prototype. createHiddenBlocksContractionIcon = function( tooltipText, currentSVGgroupOfRowXandBelow, rowIdx, currentSVGgroupOfRowXandBelowProgramaticDataStorage ) {

//		var objectThis = this;

		var SVGGroupContractionIcon = this.GLOBALS.masonViewerSVG.group();

		currentSVGgroupOfRowXandBelow.add( SVGGroupContractionIcon );

		SVGGroupContractionIcon.attr("label", "SVGGroupContractionIcon");


		this.attachClickShowHideToggleHiddenBlocksRow( SVGGroupContractionIcon );

		SVGGroupContractionIcon.attr("CreatedBy", "createHiddenBlocksContractionIcon");




		var y = ( rowIdx * this.configDisplayOptions.ROW_HEIGHT ) + ( this.configDisplayOptions.ROW_HEIGHT / 4 ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;



		var rectSVG = this.GLOBALS.masonViewerSVG.rect( this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 2, this.configDisplayOptions.ROW_HEIGHT / 2 );

		rectSVG.attr( { fill: { r: 255, g: 255, b: 255 },
			stroke: { r: 255, g: 0, b: 0 },
			"fill-opacity": 0 } );

		rectSVG.move( this.configDisplayOptions.ICON_EXPAND_ROW_STARTING_POSITION + this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 4, y );


		this.attachToolTipToJqueryHtmlNode( $(rectSVG.node), function(tooltip, node) {
			$(tooltip).html( tooltipText );

			return tooltipText;

		} );


		var horizLineSVG = this.GLOBALS.masonViewerSVG.line(  this.configDisplayOptions.ICON_EXPAND_ROW_STARTING_POSITION  + ( this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 4 ) + 2,
			y + this.configDisplayOptions.ROW_HEIGHT / 4,
			this.configDisplayOptions.ICON_EXPAND_ROW_STARTING_POSITION + this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH - ( this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 2 ) + ( this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 4 ) - 2,
			y + this.configDisplayOptions.ROW_HEIGHT / 4 )
			.stroke({ color: '#f06', width: 1 });

		this.attachToolTipToJqueryHtmlNode( $(horizLineSVG.node), function(tooltip, node) {

			$(tooltip).html( tooltipText );

			return tooltipText;
		});

		rectSVG.attr( "cursor", "pointer");
		horizLineSVG.attr( "cursor", "pointer");

		SVGGroupContractionIcon.add( rectSVG );
		SVGGroupContractionIcon.add( horizLineSVG );


//		var hiddenBlocksForRowSet = currentSVGgroupOfRowXandBelowProgramaticDataStorage.getHiddenBlocksForRowSet();
//
//
//		hiddenBlocksForRowSet.add( rectSVG );
//		hiddenBlocksForRowSet.add( horizLineSVG );


//		rectSVG.hide();
//		horizLineSVG.hide();
	};


	////////////////////////////////////////////

	MasonViewerPerInstanceRenderOnPage.prototype. createHiddenBlocksExpansionIcon = function( tooltipText, currentSVGgroupOfRowXandBelow, rowIdx, currentSVGgroupOfRowXandBelowProgramaticDataStorage ) {

//		var objectThis = this;

		var SVGGroupExpansionIcon = this.GLOBALS.masonViewerSVG.group();



		SVGGroupExpansionIcon.attr("label", "SVGGroupExpansionIcon");

		var SVGSetExpansionIcon = this.GLOBALS.masonViewerSVG.set();

		currentSVGgroupOfRowXandBelow.add( SVGGroupExpansionIcon );

		this.attachClickShowHideToggleHiddenBlocksRow( SVGGroupExpansionIcon );

		currentSVGgroupOfRowXandBelowProgramaticDataStorage.setSVGGroupExpansionIcon( SVGSetExpansionIcon );



		var y = ( rowIdx * this.configDisplayOptions.ROW_HEIGHT ) + ( this.configDisplayOptions.ROW_HEIGHT / 4 ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;



		var rectSVG = this.GLOBALS.masonViewerSVG.rect( this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 2, this.configDisplayOptions.ROW_HEIGHT / 2 );

		rectSVG.attr( { fill: { r: 255, g: 255, b: 255 },
			stroke: { r: 255, g: 0, b: 0 },
			"fill-opacity": 0 } );

		rectSVG.move( this.configDisplayOptions.ICON_EXPAND_ROW_STARTING_POSITION + this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 4, y );

		var vertLineSVG = this.GLOBALS.masonViewerSVG.line(  this.configDisplayOptions.ICON_EXPAND_ROW_STARTING_POSITION + this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 2 ,
			y + 2,
			this.configDisplayOptions.ICON_EXPAND_ROW_STARTING_POSITION + this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 2,
			y + this.configDisplayOptions.ROW_HEIGHT / 2 - 2 )
			.stroke({ color: '#f06', width: 1 });

		var horizLineSVG = this.GLOBALS.masonViewerSVG.line(  this.configDisplayOptions.ICON_EXPAND_ROW_STARTING_POSITION  + ( this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 4 ) + 2,
			y + this.configDisplayOptions.ROW_HEIGHT / 4,
			this.configDisplayOptions.ICON_EXPAND_ROW_STARTING_POSITION + this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH - ( this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 2 ) + ( this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 4 ) - 2,
			y + this.configDisplayOptions.ROW_HEIGHT / 4 )
			.stroke({ color: '#f06', width: 1 });

		rectSVG.attr( "cursor", "pointer");
		vertLineSVG.attr( "cursor", "pointer");
		horizLineSVG.attr( "cursor", "pointer");


		SVGGroupExpansionIcon.add( rectSVG );
		SVGGroupExpansionIcon.add( vertLineSVG );
		SVGGroupExpansionIcon.add( horizLineSVG );

		SVGSetExpansionIcon.add( rectSVG );
		SVGSetExpansionIcon.add( vertLineSVG );
		SVGSetExpansionIcon.add( horizLineSVG );


		this.attachToolTipToJqueryHtmlNode( $(rectSVG.node), function(tooltip, node) {

			$(tooltip).html( tooltipText );

			return tooltipText;
		});

		this.attachToolTipToJqueryHtmlNode( $(vertLineSVG.node), function(tooltip, node) {

			$(tooltip).html( tooltipText );

			return tooltipText;
		});

		this.attachToolTipToJqueryHtmlNode( $(horizLineSVG.node), function(tooltip, node) {

			$(tooltip).html( tooltipText );

			return tooltipText;
		});
	};



	////////////////////////////////////////

	MasonViewerPerInstanceRenderOnPage.prototype. addMouseOverToBlocks = function( blockSVG ) {

		var objectThis = this;

		var $blockSVG = this.getJQueryObjForRawSVGFromSVG_js_item( blockSVG );

		$blockSVG.hover( /* handlerIn */ function(eventObject) {

			var $this = $(this);

			$this.css(
				{ 	stroke: objectThis.configDisplayOptions.BLOCK_HIGHLIGHT_BORDER_COLOR,
					"stroke-width": objectThis.configDisplayOptions.BLOCK_HIGHLIGHT_BORDER_WIDTH } );

			objectThis.highlightBoxUnderEachRow( this.instance );


		}, /* handlerOut */ function(eventObject) {

			var $this = $(this);

			$this.css( { stroke: "black", "stroke-width": 0 } );

			objectThis.unhighlightBoxUnderEachRow( this.instance );
		} );

	};

	////////////////////////////////////////

	MasonViewerPerInstanceRenderOnPage.prototype. addMouseOverToLinesInsideMainBox = function( lineSVG ) {

		var objectThis = this;

		var $lineSVG = this.getJQueryObjForRawSVGFromSVG_js_item( lineSVG );

		$lineSVG.hover( /* handlerIn */ function(eventObject) {

//			var $this = $(this);

//			$this.css( { stroke: "pink", "stroke-width": 5 } );

			objectThis.highlightBoxUnderEachRow( this.instance );


		}, /* handlerOut */ function(eventObject) {

//			var $this = $(this);

//			$this.css( { stroke: "black", "stroke-width": 0 } );

			objectThis.unhighlightBoxUnderEachRow( this.instance );
		} );

	};



//   mason_viewer_render_on_page_hidden_row_show_hide.js

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


	/////////////////////////////////

	//   Handling clicking to show or hide the hidden blocks for a row for a label.

	//     The click bubbles up to the group.  Using jQuery since SVG.js click handling allowed the click to continue bubbling up

	MasonViewerPerInstanceRenderOnPage.prototype. clickShowHideToggleHiddenBlocksRow = function( event, ui, clickThis /* "this" for the clicked on element */ ) {

		var objectThis = this;

		var $clickThis = $(clickThis);

		var $rowMainGroup = this.get$rowMainGroupFor$currentElement( $clickThis );

		var SVGrowMainGroupProgramaticDataStorage =  this.getProgramaticDataStorageFromJQueryItem( $rowMainGroup );


		//  retrieve and run the callback that will create the hidden blocks if they are not already created

		var createHiddenBlocksIfNotCreatedCallback = SVGrowMainGroupProgramaticDataStorage.getCreateHiddenBlocksIfNotCreatedCallback();

		createHiddenBlocksIfNotCreatedCallback();


		var hiddenBlocksForRowSet = SVGrowMainGroupProgramaticDataStorage.getHiddenBlocksForRowSet( );

		//  Only perform this transform and show if there is a set of blocks to uncover and show
		if ( hiddenBlocksForRowSet !== undefined && hiddenBlocksForRowSet !== null ) {


			var SVGRowXmainBlocksGROUP = SVGrowMainGroupProgramaticDataStorage.getSVGRowXmainBlocksGROUP();

			var hiddenBlocksHeight = SVGrowMainGroupProgramaticDataStorage.getHiddenBlocksHeight();

			var SVGGroupExpansionIcon = SVGrowMainGroupProgramaticDataStorage.getSVGGroupExpansionIcon();

			var mainBlocksBoxUnderEachRow = SVGrowMainGroupProgramaticDataStorage.getMainBlocksBoxUnderEachRow();

			var hiddenBlocksBoxUnderEachRow = SVGrowMainGroupProgramaticDataStorage.getHiddenBlocksBoxUnderEachRow();


			var SVGoGroupToMove = SVGrowMainGroupProgramaticDataStorage.getGroupToMoveForExpansion();

			//		var rowIdx = SVGofThis.data( "row-rowIdx" );
					
			var animateAdjustChildGroupOfRowsVerticalOffset = true;

			if ( SVGoGroupToMove ) {

				animateAdjustChildGroupOfRowsVerticalOffset = false;

			}
					
			if ( SVGrowMainGroupProgramaticDataStorage.getHiddenBlocksVisible() ) {

				hiddenBlocksForRowSet.hide();

				if ( hiddenBlocksBoxUnderEachRow !== undefined ) {
					hiddenBlocksBoxUnderEachRow.hide();
				}

				if ( mainBlocksBoxUnderEachRow !== undefined ) {
					mainBlocksBoxUnderEachRow.show();
				}

				if ( SVGRowXmainBlocksGROUP !== undefined ) {
					SVGRowXmainBlocksGROUP.show();
				}

				SVGGroupExpansionIcon.show();

				var yToTransformTo = 0;

				var functionToRunAfterAnimate = function(){

					SVGrowMainGroupProgramaticDataStorage.setHiddenBlocksVisible( false );

					var adjustChildParams = {
						
						animateAdjustChildGroupOfRowsVerticalOffset: animateAdjustChildGroupOfRowsVerticalOffset,
						$rowMainGroup: $rowMainGroup
					};

					objectThis.adjustChildGroupOfRowsVerticalOffset( adjustChildParams );
					
					objectThis.resizeOverallImageLength();
				};

				var animateTransformYParams = {
					SVGoGroupToMove: SVGoGroupToMove,
					yToTransformTo: yToTransformTo,
					functionToRunAfterAnimate: functionToRunAfterAnimate
				};


				if ( SVGoGroupToMove ) { 

					this.animateTransformY( animateTransformYParams );

				} else {

					//  no group to move so just run the next part
					functionToRunAfterAnimate();
				}


			} else {

				if ( SVGRowXmainBlocksGROUP !== undefined ) {
					SVGRowXmainBlocksGROUP.hide();
				}

				if ( mainBlocksBoxUnderEachRow !== undefined ) {
					mainBlocksBoxUnderEachRow.hide();
				}

				var yToTransformTo = hiddenBlocksHeight;

				var functionToRunAfterAnimate = function(){

					hiddenBlocksForRowSet.show();

					if ( hiddenBlocksBoxUnderEachRow !== undefined ) {
						hiddenBlocksBoxUnderEachRow.show();
					}

					SVGGroupExpansionIcon.hide();

					SVGrowMainGroupProgramaticDataStorage.setHiddenBlocksVisible( true );

					var adjustChildParams = {
						
						animateAdjustChildGroupOfRowsVerticalOffset: animateAdjustChildGroupOfRowsVerticalOffset,
						$rowMainGroup: $rowMainGroup
					};

					objectThis.adjustChildGroupOfRowsVerticalOffset( adjustChildParams );

					objectThis.resizeOverallImageLength();
				};

				var animateTransformYParams = {
					SVGoGroupToMove: SVGoGroupToMove,
					yToTransformTo: yToTransformTo,
					functionToRunAfterAnimate: functionToRunAfterAnimate
				};
				
				
				if ( SVGoGroupToMove ) { 

					this.animateTransformY( animateTransformYParams );

				} else {

					//  no group to move so just run the next part
					functionToRunAfterAnimate();
				}
				
			}

		}

		return false; // to stop bubbling up the click
	};

	/////////////////////////////

	/////////////////////////////////

	//   Ajust the vertical offset of the Child group of rows to account for the new height in the current group of rows  

	MasonViewerPerInstanceRenderOnPage.prototype. adjustChildGroupOfRowsVerticalOffset = function( params ) {

//		var objectThis = this;
		
		var $rowMainGroup = params.$rowMainGroup;
		var animateAdjustChildGroupOfRowsVerticalOffset = params.animateAdjustChildGroupOfRowsVerticalOffset;
		
		var $groupOfRows = this.get$groupOfRowsFor$currentElement($rowMainGroup );
		
		var SVGgroupOfRows = this.getSVG_js_itemForJQueryObj( $groupOfRows );
		
		var groupOfRowsSVGgroupProgramaticStorage = this.getProgramaticDataStorageFromSVG_js_Item( SVGgroupOfRows );
		
		var childGroupOfRowsProgramaticDataStorageGroupOfRows = groupOfRowsSVGgroupProgramaticStorage.getNextProgramaticDataStorageGroupOfRows();
		
		if ( childGroupOfRowsProgramaticDataStorageGroupOfRows ) {

			var SVGgroupOfRowXandBelow = groupOfRowsSVGgroupProgramaticStorage.getFirstOutputRowSVGGroup();

			var totalHiddenRowsVerticalOffset = 0; 

			while ( SVGgroupOfRowXandBelow ) {

				var rowProgramaticStorage = this.getProgramaticDataStorageFromSVG_js_Item( SVGgroupOfRowXandBelow );

				if ( rowProgramaticStorage.getHiddenBlocksVisible() ) {

					totalHiddenRowsVerticalOffset += rowProgramaticStorage.getHiddenBlocksHeight();
				}

				SVGgroupOfRowXandBelow = rowProgramaticStorage.getGroupToMoveForExpansion();
			}

			var childGroupOfRows = childGroupOfRowsProgramaticDataStorageGroupOfRows.getSVGGroup();
			
			if ( animateAdjustChildGroupOfRowsVerticalOffset ) {
			
				var animateTransformYParams = {
					SVGoGroupToMove: childGroupOfRows,
					yToTransformTo: totalHiddenRowsVerticalOffset,
					functionToRunAfterAnimate: function(){}
				};
	
				this.animateTransformY( animateTransformYParams );
				
			} else {
				
				childGroupOfRows.transform( { y: totalHiddenRowsVerticalOffset } );
			}
		}
	};

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






//   mason_viewer_render_on_page_pixel_positioning.js

//     This is a part of MasonViewer

//   Pixel positioning code


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


/////////    All of these function expect "1" based positions


//////////////////////////////////////

MasonViewerPerInstanceRenderOnPage.prototype. positionLeftEdgeToPixel = function( leftEdgeCharPosition ) {

	leftEdgeCharPosition -= 0.5;  //  subract 0.5 to extend towards previous block

	var positionPixel = this.positionPrivateCharPosToPixel( leftEdgeCharPosition );

	return positionPixel;
};

//////////////////////////////////////

MasonViewerPerInstanceRenderOnPage.prototype. positionRightEdgeToPixel = function( rightEdgeCharPosition ) {

	rightEdgeCharPosition += 0.5;  //  add 0.5 to extend towards next block

	var positionPixel = this.positionPrivateCharPosToPixel( rightEdgeCharPosition );

	return positionPixel;
};

//////////////////////////////////////

//   This is designed for lines

MasonViewerPerInstanceRenderOnPage.prototype. positionCharPositionToPixel = function( positionCharPosition ) {

	var positionPixel = this.positionPrivateCharPosToPixel( positionCharPosition );

	return positionPixel;
};


//////////////////////////////////////

MasonViewerPerInstanceRenderOnPage.prototype. positionPrivateCharPosToPixel = function( positionCharPosition ) {

	positionCharPosition = this.limitCharPositionMaxSeqLength( positionCharPosition );

	positionCharPosition -= 0.5;    //  subtract  to be zero based

	var positionPixel = ( positionCharPosition * this.GLOBALS.sequenceMultiplier );

	return positionPixel;
};


//////////////////////////////////////

//   restrict charPosition to the limits of the viewer

MasonViewerPerInstanceRenderOnPage.prototype. limitCharPositionMaxSeqLength = function( positionCharPosition ) {


	var minPosition = 0.5;
	var maxPosition = this.constructorParams.requestParams.inputData.maxSequenceLength + 0.5;

	if ( positionCharPosition <minPosition ) {

		positionCharPosition = minPosition;

	} else if ( positionCharPosition > maxPosition ) {

		positionCharPosition = maxPosition;
	}

	return positionCharPosition;
};






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

				//  throws exception if not valid
				this.isValidColor( colorForLine );


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

				//  returns  colorForBlock = { red: 10, green: 255, blue: 1 }
				//                or colorForBlock = "#RRGGBB" (6 positions hex color)
				
				var fillColor = this.convertBlockColorTo_SVGJS_FillColor( colorForBlock );

				var blockBlockSVG = this.GLOBALS.masonViewerSVG.rect( rectWidth, this.configDisplayOptions.BLOCK_HEIGHT ).attr( { fill: fillColor } );

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

					//  throws exception if not valid
					this.isValidColor( colorForLine );

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

//   mason_viewer_95_end_outer_enclosing_function.js

//   !!!!!!!!   IMPORTANT, only include this file when building the combined file   !!!!!!!!!!!!!!!!!!!!!!!!!


//    This file is expected to get a compile error.  
//    The matching closing "{" is in the file mason_viewer_05_start_outer_enclosing_function.js



//   All the files: mason_viewer_01 thru mason_viewer_95 are to be included in the order they are numbered

//   If including directly into the page for testing, skip mason_viewer_01 and mason_viewer_95



})( window );
