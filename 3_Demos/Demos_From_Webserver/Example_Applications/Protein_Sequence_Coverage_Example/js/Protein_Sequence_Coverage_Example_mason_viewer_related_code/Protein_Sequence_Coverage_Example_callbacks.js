
//   Protein_Sequence_Coverage_Example_callbacks.js

//   This is the Protein_Sequence_Coverage_Example specific callbacks for the Mason Viewer


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

//Best scores (0.00) are rgb(255,0,0)
//Worst scores (0.01) are rgb(255,200,200)

	var FIXED_CHANNEL_COLOR = 255;
	
	var MIN_COLOR = 0;
	var MAX_COLOR = 200;


	//  Used for color scaling

	var MIN_Q_VALUE = 0;
	var MAX_Q_VALUE = 0.01;


		//  Tool tip text

	var CLICK_TO_GO_TO_SPECTRA_TAB_TEXT = "(click could be used to view spectra)<br>";
	var EXPAND_THE_ROW_TO_SEE_INDIVIDUAL_PEPTIDES_TO_CLICK_ON_A_PEPTIDE = "Expand the row to see individual peptides to click on a peptide.<br>";

	var EXPAND_THE_ROW_TO_SEE_INDIVIDUAL_PEPTIDES = "Expand the row to see individual peptides.<br>";

	var PEPTIDE_POSITION_LABEL_TEXT = "Position: ";

	var labelForLabel = ""; //  'Run: ' is now part of the label passed from the server

	var CLICK_TO_VIEW_RUN_TEXT = "click could be used to view this run";


	var SEQUENCE_COVERAGE_LABEL_TEXT = "Sequence Coverage: ";



//	var GLOBALS = {
//
////		viewRunURL_withoutContext : "/viewRun.do?runId="
//	};



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

//		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

//		var rowItem = precomputeParams.rowItem;

		var precomputeToolTipTextParams = {  };

		this.precomputeMainRowsLabelsToolTipText( precomputeParams, precomputeToolTipTextParams );

	};



	///////////////////////

	//   Precompute the tool tip for the Label in the main rows

	//  private function

	MainRowsLabel_callbackFunctions.prototype.precomputeMainRowsLabelsToolTipText = function( precomputeParams, precomputeToolTipTextParams ) {


		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var rowItem = precomputeParams.rowItem;   				//  The rowItem for this row

		var tooltipHTML = "";

		tooltipHTML += labelForLabel + rowItem.label + "<br><br>";

		tooltipHTML += CLICK_TO_VIEW_RUN_TEXT;

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


//		var rowItem = processClickParams.rowItem;   				//  The rowItem for this row

//		var callbackDataStorage = processClickParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

//		var rowData = rowItem.rowData;
//
//		var runId = rowData.runId;

//		window.location = this.config.viewRunURL + runId;
		
		alert("Click received, would have changed to show the page for this run");


		return false;  // return what should be returned to the final click handler
	};




	//////////////////////////////////////////

	// CLASS for  Main Rows  Blocks

	//   For Main rows blocks


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

//		var rowData = rowItem.rowData;

		var forHiddenBlocks = precomputeParams.forHiddenBlocks;
		var splitAnyEntriesForRow = precomputeParams.splitAnyEntriesForRow;

		callbackDataStorage.rowItem = rowItem;



		var totalPsmCount = 0;


		var bestQvalue = undefined;
		var bestQValueDisplay = undefined;

		var peptideRunQvalue = undefined;
		var peptideRunQValueDisplay = undefined;


		//  Sum up all the spectrum count and get best q value for all the provided peptides

		for ( var blockDataItemsIdx = 0; blockDataItemsIdx < blockDataItems.length; blockDataItemsIdx++ ) {

			var blockDataItem = blockDataItems[ blockDataItemsIdx ];
			totalPsmCount += blockDataItem.totalPsm;

			if ( bestQvalue === undefined ) {

				bestQvalue = blockDataItem.bestQValue;  //  always copy the first one
				bestQValueDisplay = blockDataItem.bestQValueDisplay;

			} else if ( blockDataItem.bestQValue < bestQvalue ) {

				bestQvalue = blockDataItem.bestQValue;
				bestQValueDisplay = blockDataItem.bestQValueDisplay;
			}


			if ( peptideRunQvalue === undefined ) {

				peptideRunQvalue = blockDataItem.peptideRunQValue;  //  always copy the first one
				peptideRunQValueDisplay = blockDataItem.peptideRunQValueDisplay;

			} else if ( blockDataItem.peptideRunQValue < peptideRunQvalue ) {

				peptideRunQvalue = blockDataItem.peptideRunQValue;
				peptideRunQValueDisplay = blockDataItem.peptideRunQValueDisplay;
			}


		}

		callbackDataStorage.totalPsmCount = totalPsmCount;

		callbackDataStorage.bestQvalue = bestQvalue;

		callbackDataStorage.peptideRunQvalue = peptideRunQvalue;


		var precomputeColorParams = { totalPsmCount: totalPsmCount, peptideRunQvalue: peptideRunQvalue, bestQvalue: bestQvalue, forHiddenBlocks: forHiddenBlocks };


		this.precomputeColorOnCreateMainRowsBlocks( precomputeParams, precomputeColorParams );



		/////  Create Tool Tip Text




		var precomputeToolTipTextParams = {
			totalPsmCount: totalPsmCount,
			bestQvalue: bestQvalue,
			bestQValueDisplay: bestQValueDisplay,
			peptideRunQvalue: peptideRunQvalue,
			peptideRunQValueDisplay: peptideRunQValueDisplay,
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

//		var totalPsmCount = precomputeColorParams.totalPsmCount;
		var peptideRunQvalue = precomputeColorParams.peptideRunQvalue;
//		var bestQvalue = precomputeColorParams.bestQvalue;
		var forHiddenBlocks = precomputeColorParams.forHiddenBlocks;


		var outputColor = MIN_COLOR;


		/////////   Create Color for block

		var qValueRatio = ( ( peptideRunQvalue - MIN_Q_VALUE ) / ( MAX_Q_VALUE - MIN_Q_VALUE ) );

		outputColor = ( ( MAX_COLOR - MIN_COLOR ) * qValueRatio ) + MIN_COLOR;

		//  Invert so smallest q value produces darkest color
//		outputColor = MAX_COLOR - outputColor;

		if ( outputColor < MIN_COLOR ) {

			outputColor = MIN_COLOR;

		} else if ( outputColor > MAX_COLOR ) {

			outputColor = MAX_COLOR;
		}

		//  WAS  var colorForBlock = { red: outputColor, green: 0, blue: 0 };

		var colorForBlock = { red: FIXED_CHANNEL_COLOR, green: outputColor, blue: outputColor };

		if ( forHiddenBlocks ) {

			//  WAS  colorForBlock = { red: outputColor, green: 0, blue: outputColor };

			colorForBlock = { red: FIXED_CHANNEL_COLOR, green: outputColor, blue: FIXED_CHANNEL_COLOR };
		}

		callbackDataStorage.colorForBlock = colorForBlock;


	};


	///////////////////////

	//   Precompute the tool tip for Non Overlapping Blocks in the main rows

	//  private function

	MainRowsBlocks_callbackFunctions.prototype.precomputeNonOverlappingBlocksToolTipText = function( precomputeParams, precomputeToolTipTextParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var blockDataItems = precomputeParams.blockDataItems;   //  The peptides combined to make this block
		var rowItem = precomputeParams.rowItem;   				//  The rowItem for this row

		var startPos = precomputeParams.startPos;
		var endPos = precomputeParams.endPos;

		var totalPsmCount = precomputeToolTipTextParams.totalPsmCount;
		var bestQValueDisplay = precomputeToolTipTextParams.bestQValueDisplay;
		var peptideRunQValueDisplay =  precomputeToolTipTextParams.peptideRunQValueDisplay;


		var tooltipHTML = "";

		tooltipHTML += labelForLabel + rowItem.label + "<br><br>";

		tooltipHTML += PEPTIDE_POSITION_LABEL_TEXT;

		tooltipHTML += startPos + "-" + endPos + "<br>";



		tooltipHTML += "Peptide Q value: " + peptideRunQValueDisplay + "<br>";

		tooltipHTML += "Best PSM Q value: " + bestQValueDisplay + "<br>";

		tooltipHTML += "Total spectrum count: " + totalPsmCount + "<br>";

		tooltipHTML += "Unique Peptide: " + blockDataItems[0].uniquePeptide + "<br>";


		tooltipHTML += CLICK_TO_GO_TO_SPECTRA_TAB_TEXT + "<br>";

		callbackDataStorage.nonOverlappingtooltipHTML = tooltipHTML;
	};


	///////////////////////

	//   Precompute the tool tip for Overlapping Blocks in the main rows

	//  private function

	MainRowsBlocks_callbackFunctions.prototype.precomputeOverlappingBlocksToolTipText = function( precomputeParams, precomputeToolTipTextParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var forHiddenBlocks = precomputeParams.forHiddenBlocks;

//		var blockDataItems = precomputeParams.blockDataItems;   //  The peptides combined to make this block
		var rowItem = precomputeParams.rowItem;   				//  The rowItem for this row

		var startPos = precomputeParams.startPos;
		var endPos = precomputeParams.endPos;

		var totalPsmCount = precomputeToolTipTextParams.totalPsmCount;
		var bestQValueDisplay = precomputeToolTipTextParams.bestQValueDisplay;
		var peptideRunQValueDisplay =  precomputeToolTipTextParams.peptideRunQValueDisplay;

		var tooltipHTML_Best_Peptide_Q_value = "";

		if ( ! forHiddenBlocks ) {

			tooltipHTML_Best_Peptide_Q_value = "Best ";
		}


		var tooltipHTML =

			labelForLabel + rowItem.label + "<br><br>" +

			PEPTIDE_POSITION_LABEL_TEXT +

			startPos + "-" + endPos + "<br>" +

			tooltipHTML_Best_Peptide_Q_value + "Peptide Q value: " +

			peptideRunQValueDisplay + "<br>" +

			"Best PSM Q value: " + bestQValueDisplay + "<br>" +


			"Total spectrum count: " + totalPsmCount + "<br>" +

			EXPAND_THE_ROW_TO_SEE_INDIVIDUAL_PEPTIDES_TO_CLICK_ON_A_PEPTIDE;

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


//		var blockDataItems = fcnParams.blockDataItems;   //  The peptides combined to make this block
//		var rowItem = fcnParams.rowItem;   				//  The rowItem for this row
//
//		var callbackDataStorage = fcnParams.callbackDataStorage;  //  Can store information here and it will be returned the next time
//
//		var rowData = rowItem.rowData;
//
//		var runId = rowData.runId;
//
//		var blockDataItems = fcnParams.blockDataItems;
//
//		var blockDataItem = blockDataItems[ 0 ];
//
//		var peptideId = blockDataItem.id;


//		this.config.runsProteinPeptide.showAndHighlightPeptide( { runId: runId, peptideId: peptideId } );

		alert("Click received, would have shown and highlighted the peptide clicked on for this run");


		return false;  // return what should be returned to the final click handler
	};




	///////////////////////////////////////////

	///////////////////////////////////////////


	//////  Totals Bar Callback functions

		//   For Main rows peptide blocks, totals block on right



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

		var sequenceCoverage = rowData.sequenceCoverage / 100;  // Convert percentage to 0 to 1 value

		//   WAS:
//		var outputColor = Math.round( sequenceCoverage * ( MAX_COLOR - MIN_COLOR ) );
//
//		var colorForBlock = { red: outputColor, green: 0, blue: 0 };

		var outputColor = MAX_COLOR - Math.round( sequenceCoverage * ( MAX_COLOR - MIN_COLOR ) );

		var colorForBlock = { red: FIXED_CHANNEL_COLOR, green: outputColor, blue: outputColor };

		

		var blockSize = sequenceCoverage;

		var colorAndSizeForBlock = { colorForBlock: colorForBlock , blockSize: blockSize };
		
		

		callbackDataStorage.colorAndSizeForBlock = colorAndSizeForBlock;

	};

	///////////////////////

	//   Precompute the tool tip for the totals block on right in the main rows

	//  private function

	RowTotalBar_callbackFunctions.prototype.precompute_rowTotalBar_getToolTipText = function( precomputeParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

//		var blockDataItems = precomputeParams.blockDataItems;   //  The peptides combined to make this block
		var rowItem = precomputeParams.rowItem;   				//  The rowItem for this row

		var rowData = rowItem.rowData;

		var sequenceCoverage = rowData.sequenceCoverage;

		var tooltipHTML = "";

		tooltipHTML += labelForLabel + rowItem.label + "<br><br>";

		tooltipHTML += SEQUENCE_COVERAGE_LABEL_TEXT + sequenceCoverage + "%<br><br>";

//		tooltipHTML += CLICK_TO_GO_TO_SPECTRA_TAB_TEXT + "<br>";

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
	};


	//////////////////////////

	//   Callback to process the click

	RowTotalBar_callbackFunctions.prototype.processClick = function( processClick_TotalBarParams ) {

//		var callbackDataStorage = processClick_TotalBarParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

//		var rowItem = processClick_TotalBarParams.rowItem;   				//  The rowItem for this row
//		var rowData = rowItem.rowData;
		
		alert("Row total bar clicked");

		return false;  // return what should be returned to the final click handler
	};


	///////////////////////////////////////

	///////////////////////////////////////

	//////  CLASS for  Totals Row Callback functions

	//   For Main rows peptide blocks, main blocks blocks

	//  Constructor

	var CombinedRow_callbackFunctions = function( param ){

		this.config = param.config;

	};


	////////////////////////////////////

	//  When the viewer is created, this is called first

	CombinedRow_callbackFunctions.prototype.precomputeValuesOnCreate = function( precomputeParams ) {


		var blockDataItems = precomputeParams.blockDataItems;   //  The peptides combined to make this block
		var splitAnyEntriesForRow = precomputeParams.splitAnyEntriesForRow;


		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time



		var totalPsmCount = 0;

		var bestQvalue = undefined;
		var bestQValueDisplay = undefined;

		var peptideRunQvalue = undefined;
		var peptideRunQValueDisplay = undefined;


		//  Sum up all the spectrum count and get best q value for all the provided peptides

		for ( var blockDataItemsIdx = 0; blockDataItemsIdx < blockDataItems.length; blockDataItemsIdx++ ) {

			var blockDataItem = blockDataItems[ blockDataItemsIdx ];
			totalPsmCount += blockDataItem.totalPsm;

			if ( bestQvalue === undefined ) {

				bestQvalue = blockDataItem.bestQValue;  //  always copy the first one
				bestQValueDisplay = blockDataItem.bestQValueDisplay;

			} else if ( blockDataItem.bestQValue < bestQvalue ) {

				bestQvalue = blockDataItem.bestQValue;
				bestQValueDisplay = blockDataItem.bestQValueDisplay;
			}

			if ( peptideRunQvalue === undefined ) {

				peptideRunQvalue = blockDataItem.peptideRunQValue;  //  always copy the first one
				peptideRunQValueDisplay = blockDataItem.peptideRunQValueDisplay;

			} else if ( blockDataItem.peptideRunQValue < peptideRunQvalue ) {

				peptideRunQvalue = blockDataItem.peptideRunQValue;
				peptideRunQValueDisplay = blockDataItem.peptideRunQValueDisplay;
			}
		}


		callbackDataStorage.totalPsmCount = totalPsmCount;

		callbackDataStorage.bestQvalue = bestQvalue;
		callbackDataStorage.peptideRunQvalue = peptideRunQvalue;


		var precomputeColorParams = { totalPsmCount: totalPsmCount, peptideRunQvalue: peptideRunQvalue, bestQvalue: bestQvalue };

		this.precompute_combinedRow_getColorForBlock( precomputeParams, precomputeColorParams );



		var precomputeToolTipTextParams = { totalPsmCount: totalPsmCount, peptideRunQvalue: peptideRunQvalue, peptideRunQValueDisplay: peptideRunQValueDisplay, bestQvalue: bestQvalue, bestQValueDisplay: bestQValueDisplay };

		if ( splitAnyEntriesForRow ) {

			this.precompute_combinedRow_getOverlappingBlocksToolTipText( precomputeParams, precomputeToolTipTextParams );

		} else {

			this.precompute_combinedRow_getNonOverlappingBlocksToolTipText( precomputeParams, precomputeToolTipTextParams );

		}
	};


	////////


	//  private function

	CombinedRow_callbackFunctions.prototype.precompute_combinedRow_getColorForBlock = function( precomputeParams, precomputeColorParams ) {

//		var spectrumCountTotalAllBlocks = precomputeColorParams.spectrumCountTotalAllBlocks;

//		var blockDataItems = precomputeParams.blockDataItems;   //  The peptides combined to make this block

		var forHiddenBlocks = precomputeParams.forHiddenBlocks;

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time





//		var totalPsmCount = precomputeColorParams.totalPsmCount;
		var peptideRunQvalue = precomputeColorParams.peptideRunQvalue;
//		var bestQvalue = precomputeColorParams.bestQvalue;



		var outputColor = MIN_COLOR;


		/////////   Create Color for block

		var qValueRatio = ( ( peptideRunQvalue - MIN_Q_VALUE ) / ( MAX_Q_VALUE - MIN_Q_VALUE ) );

		outputColor = ( ( MAX_COLOR - MIN_COLOR ) * qValueRatio ) + MIN_COLOR;

		//  Invert so smallest q value produces darkest color
//		outputColor = MAX_COLOR - outputColor;

		if ( outputColor < MIN_COLOR ) {

			outputColor = MIN_COLOR;

		} else if ( outputColor > MAX_COLOR ) {

			outputColor = MAX_COLOR;
		}


		//  WAS  var colorForBlock = { red: outputColor, green: 0, blue: 0 };

		var colorForBlock = { red: FIXED_CHANNEL_COLOR, green: outputColor, blue: outputColor };

		if ( forHiddenBlocks ) {

			//  WAS  colorForBlock = { red: outputColor, green: 0, blue: outputColor };

			colorForBlock = { red: FIXED_CHANNEL_COLOR, green: outputColor, blue: FIXED_CHANNEL_COLOR };
		}

		callbackDataStorage.colorForBlock = colorForBlock;
	};


	///////////////////////

	//   Precompute the tool tip for the totals rows overlapping peptides

	//  private function

	CombinedRow_callbackFunctions.prototype.precompute_combinedRow_getOverlappingBlocksToolTipText = function( precomputeParams, precomputeToolTipTextParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var commonToolTipText = this.precompute_combinedRow_getCommonToolTipText( precomputeParams, precomputeToolTipTextParams );

//		var tooltipHTML = commonToolTipText + EXPAND_THE_ROW_TO_SEE_INDIVIDUAL_PEPTIDES_TO_CLICK_ON_A_PEPTIDE + "<br>";

		var tooltipHTML = commonToolTipText + EXPAND_THE_ROW_TO_SEE_INDIVIDUAL_PEPTIDES + "<br>";



		callbackDataStorage.tooltipHTML = tooltipHTML;
	};


	///////////////////////

	//  private function

	//   Precompute the tool tip for the totals rows non-overlapping peptides

	CombinedRow_callbackFunctions.prototype.precompute_combinedRow_getNonOverlappingBlocksToolTipText = function( precomputeParams, precomputeToolTipTextParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var commonToolTipText = this.precompute_combinedRow_getCommonToolTipText( precomputeParams, precomputeToolTipTextParams );

//		var tooltipHTML = commonToolTipText + CLICK_TO_GO_TO_SPECTRA_TAB_TEXT + "<br>";

		var tooltipHTML = commonToolTipText + "<br>";

		tooltipHTML += CLICK_TO_GO_TO_SPECTRA_TAB_TEXT + "<br>";

		callbackDataStorage.tooltipHTML = tooltipHTML;
	};

	///////////////////////

	//   Precompute the tool tip for the totals rows

	//  private function

	CombinedRow_callbackFunctions.prototype.precompute_combinedRow_getCommonToolTipText = function( precomputeParams, precomputeToolTipTextParams ) {

//		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

//		var blockDataItems = precomputeParams.blockDataItems;   //  The peptides combined to make this block
		var rowItem = precomputeParams.rowItem;   				//  The rowItem for this row

		var startPos = precomputeParams.startPos;
		var endPos = precomputeParams.endPos;

		var totalPsmCount = precomputeToolTipTextParams.totalPsmCount;
		var peptideRunQValueDisplay = precomputeToolTipTextParams.peptideRunQValueDisplay;
		var bestQValueDisplay = precomputeToolTipTextParams.bestQValueDisplay;

		var tooltipHTML = "";

		if ( rowItem !== undefined ) {

			tooltipHTML += labelForLabel + rowItem.label + "<br><br>";
		}

		tooltipHTML += PEPTIDE_POSITION_LABEL_TEXT;

		tooltipHTML += startPos + "-" + endPos + "<br>";


		tooltipHTML += "Peptide Q value: " + peptideRunQValueDisplay + "<br>";

		tooltipHTML += "Best PSM Q value: " + bestQValueDisplay + "<br>";


		tooltipHTML += "Total spectrum count: " + totalPsmCount + "<br>";


		return tooltipHTML;
	};



	//   getColorForBlockParams = {  blockDataItems, callbackDataStorage }

	//   Callback to provide the color of the block,  returns colorForBlock = { red: 1, green: 1, blue: 1 }, decimal 0 - 255

	CombinedRow_callbackFunctions.prototype.getColorForBlock = function( getColorForBlockParams ) {


//		var blockDataItems = getColorForBlockParams.blockDataItems;   //  The peptides combined to make this block
		var callbackDataStorage = getColorForBlockParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		return callbackDataStorage.colorForBlock;
	};


	///////////////////////////////////////////

	//   Callback to provide the tool tip for the Totals Row

	CombinedRow_callbackFunctions.prototype.getBlocksToolTipText = function( getToolTipTextParams ) {

		var callbackDataStorage = getToolTipTextParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		return callbackDataStorage.tooltipHTML;
	};



	//////////////////////////

	//   Callback to process the click for Blocks in the totals row

	CombinedRow_callbackFunctions.prototype.processClick = function( processClickBlocksBlocks ) {


//		var callbackDataStorage = processClickBlocksBlocks.callbackDataStorage;  //  Can store information here and it will be returned the next time

//		var blockDataItems = processClickBlocksBlocks.blockDataItems;   //  The peptides combined to make this block

		//  No rowItem for combined row
//		var rowItem = processClickBlocksBlocks.rowItem;   				//  The rowItem for this row

//		var callbackDataStorage = processClickBlocksBlocks.callbackDataStorage;  //  Can store information here and it will be returned the next time

//		var blockDataItem = blockDataItems[ 0 ];

//		var peptideId = blockDataItem.id;


//		this.config.viewProtein_RunsPeptides_Tab.showAndHighlightPeptide( { peptideId: peptideId } );


		alert("Click received, would have shown and highlighted the peptide clicked on");


		return false;  // return what should be returned to the final click handler
	};



	///////////////////////////////////////

	///////////////////////////////////////

	//////  CLASS for  Totals Row Callback functions

	//   For For Totals row peptide blocks, totals block on right

	//  Constructor

	var CombinedRowTotalBar_callbackFunctions = function( param ){

		this.config = param.config;

		this.viewerDataRoot = param.viewerDataRoot;

	};



	//////  Totals Row Totals Bar Callback functions

		//   For Totals row peptide blocks, totals block on right

	//  When the viewer is created, this is called first

	CombinedRowTotalBar_callbackFunctions.prototype.precomputeValuesOnCreate = function( precomputeParams ) {

		this.precomputeColorAndSizeOnCreate_combinedRowTotalBar_Blocks( precomputeParams );

		this.precompute_combinedRowTotalBar_getToolTipText( precomputeParams );

	};

	///////////////////////

	//   Precompute the Color and Size for the totals block on right in the main rows

	CombinedRowTotalBar_callbackFunctions.prototype.precomputeColorAndSizeOnCreate_combinedRowTotalBar_Blocks = function( precomputeParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var sequenceCoverage = this.viewerDataRoot.peptideCoverageAcrossAllRuns / 100;  // Convert percentage to 0 to 1 value

		//  WAS:
//		var outputColor = Math.round( sequenceCoverage * ( MAX_COLOR - MIN_COLOR ) );
//
//		var colorForBlock = { red: outputColor, green: 0, blue: 0 };

		var outputColor = MAX_COLOR - Math.round( sequenceCoverage * ( MAX_COLOR - MIN_COLOR ) );

		var colorForBlock = { red: FIXED_CHANNEL_COLOR, green: outputColor, blue: outputColor };

		
		var blockSize = sequenceCoverage;

		var colorAndSizeForBlock = { colorForBlock: colorForBlock , blockSize: blockSize };

		callbackDataStorage.colorAndSizeForBlock = colorAndSizeForBlock;

	};

	///////////////////////

	//   Precompute the tool tip for the totals block on right in the main rows

	CombinedRowTotalBar_callbackFunctions.prototype.precompute_combinedRowTotalBar_getToolTipText = function( precomputeParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

//		var blockDataItems = precomputeParams.blockDataItems;   //  The peptides combined to make this block
//		var rowItem = precomputeParams.rowItem;   				//  The rowItem for this row

		var sequenceCoverage = this.viewerDataRoot.peptideCoverageAcrossAllRuns;

		var tooltipHTML = "";

		tooltipHTML += "Combined Coverage" + "<br><br>";

		tooltipHTML += SEQUENCE_COVERAGE_LABEL_TEXT + sequenceCoverage + "%<br><br>";

//		tooltipHTML += CLICK_TO_GO_TO_SPECTRA_TAB_TEXT + "<br>";

		callbackDataStorage.tooltipHTML = tooltipHTML;
	};

	///////////////////////////

	//   return { colorForBlock:  , blockSize:  }  where blockSize between zero and one

	CombinedRowTotalBar_callbackFunctions.prototype.getColorAndSize = function( params ) {

		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time

		return callbackDataStorage.colorAndSizeForBlock;
	};

	//////////////////////////

	//   Callback to provide the tool tip

	CombinedRowTotalBar_callbackFunctions.prototype.getTotalBarToolTipText = function( getToolTipTextParams ) {

		var callbackDataStorage = getToolTipTextParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		return callbackDataStorage.tooltipHTML;
	};


	//////////////////////////

	//   Callback to process the click

	CombinedRowTotalBar_callbackFunctions.prototype.processClick = function( processClick_TotalBarParams ) {

//		var callbackDataStorage = processClick_TotalBarParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		//  rowItem is not passed in for Totals Row Totals Bar
//		var rowItem = processClick_TotalBarParams.rowItem;   				//  The rowItem for this row
//		var rowData = rowItem.rowData;
		
		alert("Totals Row Totals Bar clicked");

		return false;  // return what should be returned to the final click handler
	};



	///////////////////////////////////////////////////////

	///////////////////////////////////////////////////////

	////////////     All Rows   Vertical Lines Callbacks



	//  Constructor

	var AllRowsVerticalLines_callbackFunctions = function( param ){

		this.config = param.config;

	};


	////////////////////////////////////

	//  When the viewer is created, this is called first

	AllRowsVerticalLines_callbackFunctions.prototype.precomputeValuesOnCreate = function( params ) {

//		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time
//
//		var vertLineData = params.vertLineData;   				//  The vertLineData for this line

		this.allRowsVerticalLines_callbackFunctions__precompute_colorForLine( params );

		this.allRowsVerticalLines_callbackFunctions__precompute_toolTipText( params );
	};


	///////////////////////

	//   Precompute the tool tip for the totals block on right in the main rows

	//  private function

	AllRowsVerticalLines_callbackFunctions.prototype.allRowsVerticalLines_callbackFunctions__precompute_colorForLine = function( params ) {


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

	AllRowsVerticalLines_callbackFunctions.prototype.allRowsVerticalLines_callbackFunctions__precompute_toolTipText = function( params ) {

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

	AllRowsVerticalLines_callbackFunctions.prototype.getColorForLine = function( params ) {

		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time

//		var vertLineData = params.vertLineData;   				//  The vertLineData for this line


		return callbackDataStorage.colorForLine;
	};


	//////////////////////////

	//   Callback to provide the tool tip

	AllRowsVerticalLines_callbackFunctions.prototype.getLinesToolTipText = function( params ) {

		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time

		return callbackDataStorage.tooltipHTML;
	};


	
	

	///////////////////////////////////////////////////////

	///////////////////////////////////////////////////////

	////////////     Main Rows   Vertical Lines Callbacks   --  Don't need this if using AllRowsVerticalLines_callbackFunctions



	//  Constructor

	var MainRowsVerticalLines_callbackFunctions = function( param ){

		this.config = param.config;

	};


	////////////////////////////////////

	//  When the viewer is created, this is called first

	MainRowsVerticalLines_callbackFunctions.prototype.precomputeValuesOnCreate = function( params ) {

//		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time
//
//		var vertLineData = params.vertLineData;   				//  The vertLineData for this line

		this.mainRowsVerticalLines_callbackFunctions__precompute_colorForLine( params );

		this.mainRowsVerticalLines_callbackFunctions__precompute_toolTipText( params );
	};


	///////////////////////

	//   Precompute the tool tip for the totals block on right in the main rows

	//  private function

	MainRowsVerticalLines_callbackFunctions.prototype.mainRowsVerticalLines_callbackFunctions__precompute_colorForLine = function( params ) {


		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var vertLineData = params.vertLineData;   				//  The vertLineData for this line

		var forHiddenLines = params.forHiddenLines;

		var colorForLine = null;

		if ( vertLineData.type === "CP" ) {

			if ( forHiddenLines ) {

				//  cut points
				colorForLine = "#0000FF"; // { red: 0, green: 0, blue: 255 };
				
				
			} else {
				//  cut points
				colorForLine = "#00FF00"; // { red: 0, green: 255, blue: 0 };
			}
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

//		var vertLineData = params.vertLineData;   				//  The vertLineData for this line


		return callbackDataStorage.colorForLine;
	};


	//////////////////////////

	//   Callback to provide the tool tip

	MainRowsVerticalLines_callbackFunctions.prototype.getLinesToolTipText = function( params ) {

		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time

		return callbackDataStorage.tooltipHTML;
	};

	

	///////////////////////////////////////////////////////

	///////////////////////////////////////////////////////

	////////////     Combined Row   Vertical Lines Callbacks   --  Don't need this if using AllRowsVerticalLines_callbackFunctions



	//  Constructor

	var CombinedRowVerticalLines_callbackFunctions = function( param ){

		this.config = param.config;

	};


	////////////////////////////////////

	//  When the viewer is created, this is called first

	CombinedRowVerticalLines_callbackFunctions.prototype.precomputeValuesOnCreate = function( params ) {

//		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time
//
//		var vertLineData = params.vertLineData;   				//  The vertLineData for this line

		this.precompute_colorForLine( params );

		this.precompute_toolTipText( params );
	};


	///////////////////////

	//   Precompute the tool tip for the totals block on right in the main rows

	//  private function

	CombinedRowVerticalLines_callbackFunctions.prototype.precompute_colorForLine = function( params ) {


		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var vertLineData = params.vertLineData;   				//  The vertLineData for this line

		var forHiddenLines = params.forHiddenLines;

		var colorForLine = null;

		if ( vertLineData.type === "CP" ) {

			if ( forHiddenLines ) {

				//  cut points
				colorForLine = "#000000"; // { red: 0, green: 0, blue: 255 };
				
				
			} else {
				//  cut points
				colorForLine = "#999999"; // { red: 0, green: 255, blue: 0 };
			}
		}

		callbackDataStorage.colorForLine = colorForLine;




	};



	///////////////////////

	//   Precompute the tool tip for the totals block on right in the main rows

	//  private function

	CombinedRowVerticalLines_callbackFunctions.prototype.precompute_toolTipText = function( params ) {

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

	CombinedRowVerticalLines_callbackFunctions.prototype.getColorForLine = function( params ) {

		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time

//		var vertLineData = params.vertLineData;   				//  The vertLineData for this line


		return callbackDataStorage.colorForLine;
	};


	//////////////////////////

	//   Callback to provide the tool tip

	CombinedRowVerticalLines_callbackFunctions.prototype.getLinesToolTipText = function( params ) {

		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time

		return callbackDataStorage.tooltipHTML;
	};




	/////////////////////////////////////////
	/////////////////////////////////////////


	///////////////////////

	//  Function to create the top level classes, put them in an object, and return them

	var masonViewer_Protein_Sequence_Coverage_Example_CallbacksCreator = function( param ){



//		var contextPath = param.config.context.contextPath;
//
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

		var combinedRowVerticalLines_callbackFunctions = new CombinedRowVerticalLines_callbackFunctions( param );

		var allRowsVerticalLines_callbackFunctions = new AllRowsVerticalLines_callbackFunctions( param );

		var callbacks = { 	mainRowsLabel_callbackFunctions: mainRowsLabel_callbackFunctions,
							mainRowsBlocks_callbackFunctions: mainRowsBlocks_callbackFunctions,
							rowTotalBar_callbackFunctions: rowTotalBar_callbackFunctions,
							combinedRow_callbackFunctions: combinedRow_callbackFunctions,
							combinedRowTotalBar_callbackFunctions: combinedRowTotalBar_callbackFunctions,
//							combinedRowVerticalLines_callbackFunctions: combinedRowVerticalLines_callbackFunctions,
//							mainRowsVerticalLines_callbackFunctions: mainRowsVerticalLines_callbackFunctions
////							,
							allRowsVerticalLines_callbackFunctions: allRowsVerticalLines_callbackFunctions
						};
		

		return callbacks;
	};


	window.masonViewer_Protein_Sequence_Coverage_Example_CallbacksCreator = masonViewer_Protein_Sequence_Coverage_Example_CallbacksCreator;


})( window );
