
//   peptide_atlas_callbacks.js

//   This is the Peptipedia Peptide Atlas specific callbacks for the Mason Viewer (prot_cov_viewer)


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
	
	


//	var MIN_COLOR = 0;
//	var MAX_COLOR = 255;


	//  Used for color scaling

//	var MIN_Q_VALUE = 0;
//	var MAX_Q_VALUE = 0.01;

	
		//  Row Label text is controlled in the server side code

	
	
		//  Tool tip text
	
	var TOOL_TIP_Q_VALUE_LABEL = "Peptipedia Q value: ";

	var EXPAND_THE_ROW_TO_SEE_INDIVIDUAL_PEPTIDES_TO_CLICK_ON_A_PEPTIDE = "Expand the row to see individual peptides to click on a peptide.<br>";

	var EXPAND_THE_ROW_TO_SEE_INDIVIDUAL_PEPTIDES = "Expand the row to see individual peptides.<br>";

	var PEPTIDE_POSITION_LABEL_TEXT = "Position: ";

	var SEQUENCE_COVERAGE_LABEL_TEXT = "Sequence Coverage: ";

	
	var TOOL_TIP_CLICK_PEPTIDE_TO_VIEW_IN_PEPTIDE_ATLAS = "Click the peptide to view in PeptideAtlas.<br>"
	
	////////  Click handler stuff
	
	var PEPTIDE_ATLAS_PEPTIDE_LINK_PREFIX = "https://db.systemsbiology.net/sbeams/cgi/PeptideAtlas/GetPeptide?atlas_build_id=377&searchWithinThis=Peptide+Name&action=QUERY&searchForThis=";

	
	
	var GLOBALS = {

	}

	//////////////////////////////////////////

	// CLASS for  Main Rows  Blocks

	//   For Main rows peptide blocks, main blocks blocks

	
	//  Constructor
	
	var MainRowsBlocks_callbackFunctions = function( param ){

		this.config = param.config;
		
	};	
	


	////////////////////////////////////

	//  When the viewer is created, this is called first


	MainRowsBlocks_callbackFunctions.prototype.precomputeValuesOnCreate = function( precomputeParams ) {


		var blockDataItems = precomputeParams.blockDataItems;   //  The peptides combined to make this block
		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var rowItem = precomputeParams.rowItem;

		if ( rowItem === undefined ) {

			throw "rowItem  === undefined for precomputeParams.rowItem";
		}

		var rowData = rowItem.rowData;

//		var totalPSMCountPerStageOrFraction = rowData.totalPSMCountPerStageOrFraction;

		var forHiddenBlocks = precomputeParams.forHiddenBlocks;
		var splitAnyEntriesForRow = precomputeParams.splitAnyEntriesForRow;

		callbackDataStorage.rowItem = rowItem;



		var totalPsmCount = 0;


		var bestQvalue = undefined;
		var bestQValueDisplay = undefined;



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
		}

		callbackDataStorage.totalPsmCount = totalPsmCount;

		callbackDataStorage.bestQvalue = bestQvalue;
		callbackDataStorage.bestQValueDisplay = bestQValueDisplay;


		var precomputeColorParams = { totalPsmCount: totalPsmCount, bestQvalue: bestQvalue, forHiddenBlocks: forHiddenBlocks };


		this.precomputeColorOnCreateMainRowsBlocks( precomputeParams, precomputeColorParams );



		/////  Create Tool Tip Text




		var precomputeToolTipTextParams = { totalPsmCount: totalPsmCount, bestQvalue: bestQvalue, bestQValueDisplay: bestQValueDisplay  };


		if ( splitAnyEntriesForRow ) {

			this.precomputeOverlappingBlocksToolTipText( precomputeParams, precomputeToolTipTextParams );
		} else {

			this.precomputeNonOverlappingBlocksToolTipText( precomputeParams, precomputeToolTipTextParams );
		}

	};



	///////////////////////

	//   Precompute the Color for the Blocks in the main rows

	MainRowsBlocks_callbackFunctions.prototype.precomputeColorOnCreateMainRowsBlocks = function( precomputeParams, precomputeColorParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var totalPsmCount = precomputeColorParams.totalPsmCount;
		var bestQvalue = precomputeColorParams.bestQvalue;
		var forHiddenBlocks = precomputeColorParams.forHiddenBlocks;

		//  hard code to purple
		var colorForBlock = { red: 160, green: 92, blue: 240 };
		
		callbackDataStorage.colorForBlock = colorForBlock;


	};


	///////////////////////

	//   Precompute the tool tip for Non Overlapping Blocks in the main rows

	MainRowsBlocks_callbackFunctions.prototype.precomputeNonOverlappingBlocksToolTipText = function( precomputeParams, precomputeToolTipTextParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var blockDataItems = precomputeParams.blockDataItems;   //  The peptides combined to make this block
		var rowItem = precomputeParams.rowItem;   				//  The rowItem for this row

		var startPos = precomputeParams.startPos;
		var endPos = precomputeParams.endPos;

		var totalPsmCount = precomputeToolTipTextParams.totalPsmCount;
		var bestQValueDisplay = precomputeToolTipTextParams.bestQValueDisplay;


		var tooltipHTML = "";

		tooltipHTML += PEPTIDE_POSITION_LABEL_TEXT;

		tooltipHTML += startPos + "-" + endPos + "<br>";

		tooltipHTML += TOOL_TIP_CLICK_PEPTIDE_TO_VIEW_IN_PEPTIDE_ATLAS;

//		tooltipHTML += TOOL_TIP_Q_VALUE_LABEL + bestQValueDisplay + "<br>";

//		tooltipHTML += "Total spectrum count: " + totalPsmCount + "<br>";


		callbackDataStorage.nonOverlappingtooltipHTML = tooltipHTML;
	};


	///////////////////////

	//   Precompute the tool tip for Non Overlapping Blocks in the main rows

	MainRowsBlocks_callbackFunctions.prototype.precomputeOverlappingBlocksToolTipText = function( precomputeParams, precomputeToolTipTextParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var blockDataItems = precomputeParams.blockDataItems;   //  The peptides combined to make this block
		var rowItem = precomputeParams.rowItem;   				//  The rowItem for this row

		var startPos = precomputeParams.startPos;
		var endPos = precomputeParams.endPos;

		var totalPsmCount = precomputeToolTipTextParams.totalPsmCount;
		var bestQValueDisplay = precomputeToolTipTextParams.bestQValueDisplay;

		var tooltipHTML = "";

		tooltipHTML += PEPTIDE_POSITION_LABEL_TEXT;

		tooltipHTML += startPos + "-" + endPos + "<br>";

		tooltipHTML += EXPAND_THE_ROW_TO_SEE_INDIVIDUAL_PEPTIDES;

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

	//   Callback to process the click for Non Overlapping Blocks in the main rows

	MainRowsBlocks_callbackFunctions.prototype.processClick = function( fcnParams ) {


		var blockDataItems = fcnParams.blockDataItems;   //  The peptides combined to make this block
		var rowItem = fcnParams.rowItem;   				//  The rowItem for this row

		var callbackDataStorage = fcnParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var rowData = rowItem.rowData;


		var blockDataItems = fcnParams.blockDataItems;

		var blockDataItem = blockDataItems[ 0 ];

		var peptideId = blockDataItem.id;
		
		var url = PEPTIDE_ATLAS_PEPTIDE_LINK_PREFIX + blockDataItem.accession;
		
		window.open( url, '_blank' );

		return false;  // return what should be returned to the final click handler
	}





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

//		var outputColor = MIN_COLOR;
//
//		outputColor = Math.round( sequenceCoverage * ( MAX_COLOR - MIN_COLOR ) );
//
//		var colorForBlock = { red: 0, green: 0, blue: outputColor };

		//  hard code to purple
		var colorForBlock = { red: 160, green: 92, blue: 240 };
		

		var blockSize = sequenceCoverage;

		var colorAndSizeForBlock = { colorForBlock: colorForBlock , blockSize: blockSize };

		callbackDataStorage.colorAndSizeForBlock = colorAndSizeForBlock;

	};

	///////////////////////

	//   Precompute the tool tip for the totals block on right in the main rows
	
	//  private function

	RowTotalBar_callbackFunctions.prototype.precompute_rowTotalBar_getToolTipText = function( precomputeParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var blockDataItems = precomputeParams.blockDataItems;   //  The peptides combined to make this block
		var rowItem = precomputeParams.rowItem;   				//  The rowItem for this row

		var rowData = rowItem.rowData;


		var sequenceCoverage = rowData.sequenceCoverage;

		var tooltipHTML = "";

		tooltipHTML += SEQUENCE_COVERAGE_LABEL_TEXT + sequenceCoverage + "%<br><br>";



		callbackDataStorage.tooltipHTML = tooltipHTML;
	};

	///////////////////////////

	//   return { colorForBlock:  , blockSize:  }  where blockSize between zero and one

	RowTotalBar_callbackFunctions.prototype.getColorAndSize = function( params ) {

		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time


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

		return false;  // return what should be returned to the final click handler
	}


	///////////////////////////////////////////////////////
	
	///////////////////////////////////////////////////////

	////////////     Main Rows   Vertical Lines Callbacks

		
	
	//  Constructor
	
	var AllRowsVerticalLines_callbackFunctions = function( param ){

		this.config = param.config;
		
	};	
	
	
	////////////////////////////////////	

	//  When the viewer is created, this is called first

	AllRowsVerticalLines_callbackFunctions.prototype.precomputeValuesOnCreate = function( params ) {

		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var vertLineData = params.vertLineData;   				//  The vertLineData for this line

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

	//   Precompute the tool tip for the vertical lines

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

		var vertLineData = params.vertLineData;   				//  The vertLineData for this line


		return callbackDataStorage.colorForLine;
	};


	//////////////////////////

	//   Callback to provide the tool tip

	AllRowsVerticalLines_callbackFunctions.prototype.getLinesToolTipText = function( params ) {

		var callbackDataStorage = params.callbackDataStorage;  //  Can store information here and it will be returned the next time

		return callbackDataStorage.tooltipHTML;
	}




	/////////////////////////////////////////
	/////////////////////////////////////////
	
	
	///////////////////////
	
	//  Function to create the top level classes, put them in an object, and return them 
	
	var masonViewerPeptipediaPeptideAtlasCallbacksCreator = function( param ){


		var mainRowsBlocks_callbackFunctions = new MainRowsBlocks_callbackFunctions( param );
	
		var rowTotalBar_callbackFunctions = new RowTotalBar_callbackFunctions( param );

		var allRowsVerticalLines_callbackFunctions = new AllRowsVerticalLines_callbackFunctions( param );
		
		var callbacks = { 	mainRowsBlocks_callbackFunctions: mainRowsBlocks_callbackFunctions,
							rowTotalBar_callbackFunctions: rowTotalBar_callbackFunctions,
							allRowsVerticalLines_callbackFunctions: allRowsVerticalLines_callbackFunctions
						};
		
		return callbacks;
	};
	
	
	window.masonViewerPeptipediaPeptideAtlasCallbacksCreator = masonViewerPeptipediaPeptideAtlasCallbacksCreator;


})( window );
