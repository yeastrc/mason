
//   masonviewer_sample_js_callbacks.js

//     This is a Javascript file for this demo



//   Depends on jquery




//////////////  !!!!!!!!!!!!!   Order of calling "precompute" call backs.

///////    For the Main blocks and the Hidden blocks, the precompute is called for each block right before the call to get the color

///////    For the Totals Per Row blocks on the right, the precompute is called for all the rows before the get color and size is called for each block

//////     For the Totals Row, the precompute is called for all the rows before the get color is called for each block





//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";

;;


(function( window, undefined ) {

//	Put all in hidden space so worker classes are not in global scope

	
	
	


	//  Define some values to use in the functions

		//  Tool tip text

	var EXPAND_THE_ROW_TO_SEE_INDIVIDUAL_BLOCKS_TO_CLICK_ON_A_BLOCK = "Expand the row to see individual blocks to click on a block.<br>";

	var EXPAND_THE_ROW_TO_SEE_INDIVIDUAL_BLOCKS = "Expand the row to see individual blocks.<br>";

	var BLOCK_POSITION_LABEL_TEXT = "Position: ";

	var LABEL_PREFIX_FOR_LABEL_TOOL_TIP = ""; //  'Run: ' is now part of the label passed from the server



	//  define classes for all groups of callbacks to support

	//  	For the set of callbacks see the classes instantiated at the bottom of this file


	//////////////////////////////////////////

	// CLASS for  Main Rows  Labels


	//  Constructor

	var MainRowsLabel_callbackFunctions = function( param ){

		this.config = param.config;

	};



	///////////////////////

	MainRowsLabel_callbackFunctions.prototype.precomputeValuesOnCreate = function( precomputeParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var rowItem = precomputeParams.rowItem;

		var precomputeToolTipTextParams = {  }

		this.precomputeMainRowsLabelsToolTipText( precomputeParams, precomputeToolTipTextParams );

	};



	///////////////////////

	//   Precompute the tool tip for the Label in the main rows

	//  private function

	MainRowsLabel_callbackFunctions.prototype.precomputeMainRowsLabelsToolTipText = function( precomputeParams, precomputeToolTipTextParams ) {


		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var rowItem = precomputeParams.rowItem;   				//  The rowItem for this row

		var tooltipHTML = "";

		tooltipHTML += LABEL_PREFIX_FOR_LABEL_TOOL_TIP + rowItem.label + "<br><br>";

		callbackDataStorage.labelTooltipHTML = tooltipHTML;
	};



	///////////////////////

	//   Callback to provide the tool tip for the Label in the main rows

	MainRowsLabel_callbackFunctions.prototype.getToolTipText = function( getToolTipTextParams ) {

		var callbackDataStorage = getToolTipTextParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		return callbackDataStorage.labelTooltipHTML;
	};


	//////////////////////////

	//   Callback to process the click for the Label in the main rows

	MainRowsLabel_callbackFunctions.prototype.processClick = function( processClickParams ) {


		var rowItem = processClickParams.rowItem;   				//  The rowItem for this row

		var callbackDataStorage = processClickParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var rowData = rowItem.rowData;
		
		alert("row label clicked");


		return false;  // return what should be returned to the final click handler
	}




	//////////////////////////////////////////

	// CLASS for  Main Rows  Blocks

	//   For Main rows main blocks 


	//  Constructor

	var MainRowsBlocks_callbackFunctions = function( param ){

		this.config = param.config;

	};



	////////////////////////////////////

	//  When the viewer is created, this is called first

	MainRowsBlocks_callbackFunctions.prototype.precomputeValuesOnCreate = function( precomputeParams ) {


		var blockDataItems = precomputeParams.blockDataItems;   //  The blocks combined to make this block
		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var rowItem = precomputeParams.rowItem;

		if ( rowItem === undefined ) {

			throw "rowItem  === undefined for precomputeParams.rowItem";
		}

		var rowData = rowItem.rowData;

		var forHiddenBlocks = precomputeParams.forHiddenBlocks;
		var splitAnyEntriesForRow = precomputeParams.splitAnyEntriesForRow;

		callbackDataStorage.rowItem = rowItem;


		var countSum = 0;


		//  Sum up all the count values for all the provided blocks

		for ( var blockDataItemsIdx = 0; blockDataItemsIdx < blockDataItems.length; blockDataItemsIdx++ ) {

			var blockItem = blockDataItems[ blockDataItemsIdx ];

			countSum += blockItem.count;
		}


		var precomputeColorParams = { countSum: countSum };


		this.precomputeColorOnCreateMainRowsBlocks( precomputeParams, precomputeColorParams );



		/////  Create Tool Tip Text




		var precomputeToolTipTextParams = {
				countSum: countSum,
				forHiddenBlocks: forHiddenBlocks };


		if ( splitAnyEntriesForRow ) {

			this.precomputeOverlappingBlocksToolTipText( precomputeParams, precomputeToolTipTextParams );
		} else {

			this.precomputeNonOverlappingBlocksToolTipText( precomputeParams, precomputeToolTipTextParams );
		}

	};



	///////////////////////

	//   Precompute the Color for the Blocks in the main rows

	//  private function

	MainRowsBlocks_callbackFunctions.prototype.precomputeColorOnCreateMainRowsBlocks = function( precomputeParams, precomputeColorParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var forHiddenBlocks = precomputeParams.forHiddenBlocks;



		//  colorForBlock is normally computed from data in the blockDataItems array

		var colorForBlock = { red: 150, green: 0, blue: 0 };  //  Each color is 0 - 255, red, green, blue

		//  Optional different color for hidden blocks
		if ( forHiddenBlocks ) {

			colorForBlock = { red: 0, green: 0, blue: 150 };
		}

		callbackDataStorage.colorForBlock = colorForBlock;



	};


	///////////////////////

	//   Precompute the tool tip for Non Overlapping Blocks in the main rows

	//  private function

	MainRowsBlocks_callbackFunctions.prototype.precomputeNonOverlappingBlocksToolTipText = function( precomputeParams, precomputeToolTipTextParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var blockDataItems = precomputeParams.blockDataItems;   //  The blocks combined to make this block
		var rowItem = precomputeParams.rowItem;   				//  The rowItem for this row

		var startPos = precomputeParams.startPos;
		var endPos = precomputeParams.endPos;
		
		var countSum = precomputeParams.countSum;

		var tooltipHTML = "";

		tooltipHTML += LABEL_PREFIX_FOR_LABEL_TOOL_TIP + rowItem.label + "<br><br>";

		tooltipHTML += BLOCK_POSITION_LABEL_TEXT;

		tooltipHTML += startPos + "-" + endPos + "<br>";



		tooltipHTML += "countSum: " + countSum + "<br>";

		callbackDataStorage.nonOverlappingtooltipHTML = tooltipHTML;
	};


	///////////////////////

	//   Precompute the tool tip for Overlapping Blocks in the main rows

	//  private function

	MainRowsBlocks_callbackFunctions.prototype.precomputeOverlappingBlocksToolTipText = function( precomputeParams, precomputeToolTipTextParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var forHiddenBlocks = precomputeParams.forHiddenBlocks;

		var blockDataItems = precomputeParams.blockDataItems;   //  The blocks combined to make this block
		var rowItem = precomputeParams.rowItem;   				//  The rowItem for this row

		var startPos = precomputeParams.startPos;
		var endPos = precomputeParams.endPos;

		var countSum = precomputeParams.countSum;


		var tooltipHTML =

			LABEL_PREFIX_FOR_LABEL_TOOL_TIP + rowItem.label + "<br><br>" +

			BLOCK_POSITION_LABEL_TEXT +

			startPos + "-" + endPos + "<br>";



		tooltipHTML += "countSum: " + countSum + "<br>";


		callbackDataStorage.overlappingtooltipHTML = tooltipHTML;
	};







	///////////////////////

	//   getColorForBlockParams = {  blockDataItems, callbackDataStorage }

	//   Callback to provide the color of the block,  returns colorForBlock = { red: 1, green: 1, blue: 1 }, decimal 0 - 255

	MainRowsBlocks_callbackFunctions.prototype.getColorForBlock = function( getColorForBlockParams ) {

		var callbackDataStorage = getColorForBlockParams.callbackDataStorage;

		return callbackDataStorage.colorForBlock;
	};

	///////////////////////

	//   Callback to provide the tool tip for Non Overlapping Blocks in the main rows

	MainRowsBlocks_callbackFunctions.prototype.getNonOverlappingBlocksToolTipText = function( getToolTipTextParams ) {

		var callbackDataStorage = getToolTipTextParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		return callbackDataStorage.nonOverlappingtooltipHTML;
	};


	///////////////////////

	//   Callback to provide the tool tip for Non Overlapping Blocks in the main rows

	MainRowsBlocks_callbackFunctions.prototype.getOverlappingBlocksToolTipText = function( getToolTipTextParams ) {

		var callbackDataStorage = getToolTipTextParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		return callbackDataStorage.overlappingtooltipHTML;
	};


	//////////////////////////

	//   Callback to process the click for Blocks in the main rows

	MainRowsBlocks_callbackFunctions.prototype.processClick = function( fcnParams ) {


		var blockDataItems = fcnParams.blockDataItems;   //  The blocks combined to make this block
		var rowItem = fcnParams.rowItem;   				//  The rowItem for this row

		var callbackDataStorage = fcnParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var rowData = rowItem.rowData;


		var blockDataItems = fcnParams.blockDataItems;

		var blockDataItem = blockDataItems[ 0 ];

		alert("Click detected");


		return false;  // return what should be returned to the final click handler
	}




	///////////////////////////////////////////

	///////////////////////////////////////////


	//////  Totals Bar Callback functions

		//   For Main rows blocks, totals block on right



	//  Constructor

	var RowTotalBar_callbackFunctions = function( param ){

		this.config = param.config;

	};



	////////////////////////////////////

	//  When the viewer is created, this is called first

	RowTotalBar_callbackFunctions.prototype.precomputeValuesOnCreate = function( precomputeParams ) {

		this.precomputeColorAndSizeOnCreate_rowTotalBar_Blocks( precomputeParams );

		this.precompute_rowTotalBar_getToolTipText( precomputeParams );

	};

	///////////////////////

	//   Precompute the Color and Size for the totals block on right in the main rows

	//  private function

	RowTotalBar_callbackFunctions.prototype.precomputeColorAndSizeOnCreate_rowTotalBar_Blocks = function( precomputeParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var rowItem = precomputeParams.rowItem;

		callbackDataStorage.rowItem = rowItem;

		var rowData = rowItem.rowData;



		//  colorForBlock is normally computed from data in the blockDataItems array

		var colorForBlock = { red: 150, green: 0, blue: 0 };  //  Each color is 0 - 255, red, green, blue


		var blockSize = 0.5;  // Normally a computed value

		var colorAndSizeForBlock = { colorForBlock: colorForBlock , blockSize: blockSize };
		
		

		callbackDataStorage.colorAndSizeForBlock = colorAndSizeForBlock;

	};

	///////////////////////

	//   Precompute the tool tip for the totals block on right in the main rows

	//  private function

	RowTotalBar_callbackFunctions.prototype.precompute_rowTotalBar_getToolTipText = function( precomputeParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var blockDataItems = precomputeParams.blockDataItems;   //  The blocks combined to make this block
		var rowItem = precomputeParams.rowItem;   				//  The rowItem for this row

		var rowData = rowItem.rowData;

		var tooltipHTML = "";

		tooltipHTML += LABEL_PREFIX_FOR_LABEL_TOOL_TIP + rowItem.label + "<br><br>";

//		tooltipHTML += SEQUENCE_COVERAGE_LABEL_TEXT + sequenceCoverage + "%<br><br>";

		callbackDataStorage.tooltipHTML = tooltipHTML;
	};

	///////////////////////////

	//   return { colorForBlock:  , blockSize:  }  where blockSize between zero and one

	RowTotalBar_callbackFunctions.prototype.getColorAndSize = function( params ) {

		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time

//		var nscForRow = callbackDataStorage.nscForRow;
//		var colorForBlock = callbackDataStorage.colorForBlock;
//
//		var blockSize = nscForRow /  GLOBALS.maxNSC_Row_Total_Blocks_Across_Rows;
//
//		var colorAndSizeForBlock = { colorForBlock: colorForBlock , blockSize: blockSize };
//
//		callbackDataStorage.colorAndSizeForBlock = colorAndSizeForBlock;
//
//		return colorAndSizeForBlock;

		return callbackDataStorage.colorAndSizeForBlock;
	};

	//////////////////////////

	//   Callback to provide the tool tip

	RowTotalBar_callbackFunctions.prototype.getTotalBarToolTipText = function( getToolTipTextParams ) {

		var callbackDataStorage = getToolTipTextParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		return callbackDataStorage.tooltipHTML;
	}


	//////////////////////////

	//   Callback to process the click

	RowTotalBar_callbackFunctions.prototype.processClick = function( processClick_TotalBarParams ) {

		var callbackDataStorage = processClick_TotalBarParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var rowItem = processClick_TotalBarParams.rowItem;   				//  The rowItem for this row
		var rowData = rowItem.rowData;
		
		

		alert("Main Row Totals bar click");


		return false;  // return what should be returned to the final click handler
	}


	///////////////////////////////////////

	///////////////////////////////////////

	//////  CLASS for  Totals Row Callback functions

	//   For Main rows blocks, main blocks 

	//  Constructor

	var CombinedRow_callbackFunctions = function( param ){

		this.config = param.config;

	};


	////////////////////////////////////

	//  When the viewer is created, this is called first

	CombinedRow_callbackFunctions.prototype.precomputeValuesOnCreate = function( precomputeParams ) {


		var blockDataItems = precomputeParams.blockDataItems;   //  The blocks combined to make this block
		var splitAnyEntriesForRow = precomputeParams.splitAnyEntriesForRow;


		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time


		var countSum = 0;


		//  Sum up all the count values for all the provided blocks

		for ( var blockDataItemsIdx = 0; blockDataItemsIdx < blockDataItems.length; blockDataItemsIdx++ ) {

			var blockItem = blockDataItems[ blockDataItemsIdx ];

			countSum += blockItem.count;
		}

		callbackDataStorage.countSum = countSum;
		
		
		var precomputeColorParams = {  };

		this.precompute_combinedRow_getColorForBlock( precomputeParams, precomputeColorParams );



		var precomputeToolTipTextParams = {  };

		if ( splitAnyEntriesForRow ) {

			this.precompute_combinedRow_getOverlappingBlocksToolTipText( precomputeParams, precomputeToolTipTextParams );

		} else {

			this.precompute_combinedRow_getNonOverlappingBlocksToolTipText( precomputeParams, precomputeToolTipTextParams );

		}
	};


	////////


	//  private function

	CombinedRow_callbackFunctions.prototype. precompute_combinedRow_getColorForBlock = function( precomputeParams, precomputeColorParams ) {

		var spectrumCountTotalAllBlocks = precomputeColorParams.spectrumCountTotalAllBlocks;

		var blockDataItems = precomputeParams.blockDataItems;   //  The blocks combined to make this block

		var forHiddenBlocks = precomputeParams.forHiddenBlocks;

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time


		//  colorForBlock is normally computed from data in the blockDataItems array

		var colorForBlock = { red: 150, green: 0, blue: 0 };  //  Each color is 0 - 255, red, green, blue

		//  Optional different color for hidden blocks
		if ( forHiddenBlocks ) {

			colorForBlock = { red: 0, green: 0, blue: 150 };
		}


		callbackDataStorage.colorForBlock = colorForBlock;
	};


	///////////////////////

	//   Precompute the tool tip for the totals rows overlapping blocks

	//  private function

	CombinedRow_callbackFunctions.prototype. precompute_combinedRow_getOverlappingBlocksToolTipText = function( precomputeParams, precomputeToolTipTextParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var commonToolTipText = this.precompute_combinedRow_getCommonToolTipText( precomputeParams, precomputeToolTipTextParams );

		var tooltipHTML = commonToolTipText + EXPAND_THE_ROW_TO_SEE_INDIVIDUAL_BLOCKS_TO_CLICK_ON_A_BLOCK + "<br>";

//		var tooltipHTML = commonToolTipText + EXPAND_THE_ROW_TO_SEE_INDIVIDUAL_BLOCKS + "<br>";



		callbackDataStorage.tooltipHTML = tooltipHTML;
	};


	///////////////////////

	//  private function

	//   Precompute the tool tip for the totals rows non-overlapping blocks

	CombinedRow_callbackFunctions.prototype. precompute_combinedRow_getNonOverlappingBlocksToolTipText = function( precomputeParams, precomputeToolTipTextParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var commonToolTipText = this.precompute_combinedRow_getCommonToolTipText( precomputeParams, precomputeToolTipTextParams );

		var tooltipHTML = commonToolTipText + "<br>";

		callbackDataStorage.tooltipHTML = tooltipHTML;
	};

	///////////////////////

	//   Precompute the tool tip for the totals rows

	//  private function

	CombinedRow_callbackFunctions.prototype. precompute_combinedRow_getCommonToolTipText = function( precomputeParams, precomputeToolTipTextParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var blockDataItems = precomputeParams.blockDataItems;   //  The blocks combined to make this block
		var rowItem = precomputeParams.rowItem;   				//  The rowItem for this row

		var startPos = precomputeParams.startPos;
		var endPos = precomputeParams.endPos;

		var tooltipHTML = "";

		if ( rowItem !== undefined ) {

			tooltipHTML += LABEL_PREFIX_FOR_LABEL_TOOL_TIP + rowItem.label + "<br><br>";
		}

		tooltipHTML += BLOCK_POSITION_LABEL_TEXT;

		tooltipHTML += startPos + "-" + endPos + "<br>";


		return tooltipHTML;
	};



	//   getColorForBlockParams = {  blockDataItems, callbackDataStorage }

	//   Callback to provide the color of the block,  returns colorForBlock = { red: 1, green: 1, blue: 1 }, decimal 0 - 255

	CombinedRow_callbackFunctions.prototype. getColorForBlock = function( getColorForBlockParams ) {


		var blockDataItems = getColorForBlockParams.blockDataItems;   //  The blocks combined to make this block
		var callbackDataStorage = getColorForBlockParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		return callbackDataStorage.colorForBlock;
	};


	///////////////////////////////////////////

	//   Callback to provide the tool tip for the Totals Row

	CombinedRow_callbackFunctions.prototype. getBlocksToolTipText = function( getToolTipTextParams ) {

		var callbackDataStorage = getToolTipTextParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		return callbackDataStorage.tooltipHTML;
	}



	//////////////////////////

	//   Callback to process the click for Blocks in the totals row

	CombinedRow_callbackFunctions.prototype. processClick = function( processClickBlocksBlocks ) {


		var callbackDataStorage = processClickBlocksBlocks.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var blockDataItems = processClickBlocksBlocks.blockDataItems;   //  The blocks combined to make this block

		//  No rowItem for combined row
//		var rowItem = processClickBlocksBlocks.rowItem;   				//  The rowItem for this row

		var callbackDataStorage = processClickBlocksBlocks.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var blockDataItem = blockDataItems[ 0 ];
		
		alert("Totals Row click");



		return false;  // return what should be returned to the final click handler
	}



	///////////////////////////////////////

	///////////////////////////////////////

	//////  CLASS for  Totals Row Callback functions

	//   For For Totals row blocks, totals block on right

	//  Constructor

	var CombinedRowTotalBar_callbackFunctions = function( param ){

		this.config = param.config;

		this.viewerDataRoot = param.viewerDataRoot;

	};



	//////  Totals Row Totals Bar Callback functions

		//   For Totals row blocks, totals block on right

	//  When the viewer is created, this is called first

	CombinedRowTotalBar_callbackFunctions.prototype. precomputeValuesOnCreate = function( precomputeParams ) {

		this.precomputeColorAndSizeOnCreate_combinedRowTotalBar_Blocks( precomputeParams );

		this.precompute_combinedRowTotalBar_getToolTipText( precomputeParams );

	};

	///////////////////////

	//   Precompute the Color and Size for the totals block on right in the main rows

	CombinedRowTotalBar_callbackFunctions.prototype. precomputeColorAndSizeOnCreate_combinedRowTotalBar_Blocks = function( precomputeParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		
		 // Normally computed
		var colorForBlock = { red: 40, green: 90, blue: 200 };

		
		var blockSize = 0.8;  // Normally computed

		var colorAndSizeForBlock = { colorForBlock: colorForBlock , blockSize: blockSize };

		callbackDataStorage.colorAndSizeForBlock = colorAndSizeForBlock;

	};

	///////////////////////

	//   Precompute the tool tip for the totals block on right in the main rows

	CombinedRowTotalBar_callbackFunctions.prototype. precompute_combinedRowTotalBar_getToolTipText = function( precomputeParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var blockDataItems = precomputeParams.blockDataItems;   //  The blocks combined to make this block
		var rowItem = precomputeParams.rowItem;   				//  The rowItem for this row


		var tooltipHTML = "";

		tooltipHTML += "Totals Row Totals Bar tool tip" + "<br><br>";

		callbackDataStorage.tooltipHTML = tooltipHTML;
	};

	///////////////////////////

	//   return { colorForBlock:  , blockSize:  }  where blockSize between zero and one

	CombinedRowTotalBar_callbackFunctions.prototype. getColorAndSize = function( params ) {

		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time

		return callbackDataStorage.colorAndSizeForBlock;
	};

	//////////////////////////

	//   Callback to provide the tool tip

	CombinedRowTotalBar_callbackFunctions.prototype. getTotalBarToolTipText = function( getToolTipTextParams ) {

		var callbackDataStorage = getToolTipTextParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		return callbackDataStorage.tooltipHTML;
	}


	//////////////////////////

	//   Callback to process the click

	CombinedRowTotalBar_callbackFunctions.prototype. processClick = function( processClick_TotalBarParams ) {

		var callbackDataStorage = processClick_TotalBarParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		//  rowItem is not passed in for Totals Row Totals Bar
//		var rowItem = processClick_TotalBarParams.rowItem;   				//  The rowItem for this row
//		var rowData = rowItem.rowData;

		

		alert("Totals Row Totals bar click");
		
		
		return false;  // return what should be returned to the final click handler
	};



	///////////////////////////////////////////////////////

	///////////////////////////////////////////////////////

	////////////     Main Rows   Vertical Lines Callbacks



	//  Constructor

	var MainRowsVerticalLines_callbackFunctions = function( param ){

		this.config = param.config;

	};


	////////////////////////////////////

	//  When the viewer is created, this is called first

	MainRowsVerticalLines_callbackFunctions.prototype.precomputeValuesOnCreate = function( params ) {

		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var vertLineData = params.vertLineData;   				//  The vertLineData for this line

		this.mainRowsVerticalLines_callbackFunctions__precompute_colorForLine( params );

		this.mainRowsVerticalLines_callbackFunctions__precompute_toolTipText( params );
	};


	///////////////////////

	//   Precompute the tool tip for the totals block on right in the main rows

	//  private function

	MainRowsVerticalLines_callbackFunctions.prototype.mainRowsVerticalLines_callbackFunctions__precompute_colorForLine = function( params ) {


		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var vertLineData = params.vertLineData;   				//  The vertLineData for this line


		var colorForLine = null;

		if ( vertLineData.type === "CP" ) {

			//  cut points
			colorForLine = "#00FF00"; // { red: 0, green: 255, blue: 0 };

		}

		callbackDataStorage.colorForLine = colorForLine;




	};



	///////////////////////

	//   Precompute the tool tip for the totals block on right in the main rows

	//  private function

	MainRowsVerticalLines_callbackFunctions.prototype.mainRowsVerticalLines_callbackFunctions__precompute_toolTipText = function( params ) {

		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var vertLineData = params.vertLineData;   				//  The vertLineData for this line

		var tooltipHTML = "";

		if ( vertLineData.type === "CP" ) {

			//  cut points
			tooltipHTML += "Trypsin cut point between positions " + Math.floor( params.linePos ) + " and " + Math.ceil( params.linePos ) + "<br><br>";

		}

		callbackDataStorage.tooltipHTML = tooltipHTML;
	};


	/////////////////////////

	MainRowsVerticalLines_callbackFunctions.prototype.getColorForLine = function( params ) {

		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var vertLineData = params.vertLineData;   				//  The vertLineData for this line


		return callbackDataStorage.colorForLine;
	};


	//////////////////////////

	//   Callback to provide the tool tip

	MainRowsVerticalLines_callbackFunctions.prototype.getLinesToolTipText = function( params ) {

		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time

		return callbackDataStorage.tooltipHTML;
	}



	/////////////////////////////////////////
	/////////////////////////////////////////


	///////////////////////

	//  Function to create the top level classes, put them in an object, and return them

	var masonViewerExampleCallbacksCreator = function( param ){


//
//		var contextPath = param.config.context.contextPath;
//
//
//
//		var viewRunURL = contextPath + GLOBALS.viewRunURL_withoutContext;
//
//
//		if ( param.config ) {
//
//			param.config.viewRunURL = viewRunURL;
//
//		} else {
//
//			param.config = { viewRunURL: viewRunURL };
//		}

		var mainRowsLabel_callbackFunctions = new MainRowsLabel_callbackFunctions( param );

		var mainRowsBlocks_callbackFunctions = new MainRowsBlocks_callbackFunctions( param );

		var rowTotalBar_callbackFunctions = new RowTotalBar_callbackFunctions( param );

		var combinedRow_callbackFunctions = new CombinedRow_callbackFunctions( param );

		var combinedRowTotalBar_callbackFunctions = new CombinedRowTotalBar_callbackFunctions( param );

		var mainRowsVerticalLines_callbackFunctions = new MainRowsVerticalLines_callbackFunctions( param );

		var callbacks = { 	mainRowsLabel_callbackFunctions: mainRowsLabel_callbackFunctions,
							mainRowsBlocks_callbackFunctions: mainRowsBlocks_callbackFunctions,
							rowTotalBar_callbackFunctions: rowTotalBar_callbackFunctions,
							combinedRow_callbackFunctions: combinedRow_callbackFunctions,
							combinedRowTotalBar_callbackFunctions: combinedRowTotalBar_callbackFunctions,
							mainRowsVerticalLines_callbackFunctions: mainRowsVerticalLines_callbackFunctions
						};

		return callbacks;
	};


	window.masonViewerExampleCallbacksCreator = masonViewerExampleCallbacksCreator;


})( window );
