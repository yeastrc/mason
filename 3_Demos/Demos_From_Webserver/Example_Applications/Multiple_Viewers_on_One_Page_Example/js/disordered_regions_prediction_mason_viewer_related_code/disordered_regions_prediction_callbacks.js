
//   disordered_regions_prediction_callbacks.js

//   This is the Peptipedia Disordered regions Prediction specific set of callbacks for the Mason Viewer (prot_cov_viewer)





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



	
	
		//  Row Label text is controlled in the viewer input data

	
	
		//  Tool tip text

	var POSITION_LABEL_TEXT = "Position: ";


	var TOOL_TIP_FOR_LABEL = 
		
		"Disordered regions predicted using DISOPRED version 2.4 with a false discovery rate cutoff of 0.05. <BR>" +
		"Ward, JJ, Sodhi, JS, McGuffin, LJ, Buxton, BF and Jones, DT (2004) <BR>" +
		"Prediction and functional analysis of native disorder in proteins from the three kingdoms of life. <BR>" +
		"J. Mol. Biol., 337, 635–645.";
		

	
	
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

		tooltipHTML += TOOL_TIP_FOR_LABEL + "<br><br>";

		callbackDataStorage.labelTooltipHTML = tooltipHTML;
	};



	///////////////////////

	//   Callback to provide the tool tip for the Label in the main rows

	MainRowsLabel_callbackFunctions.prototype.getToolTipText = function( getToolTipTextParams ) {

		var callbackDataStorage = getToolTipTextParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		return callbackDataStorage.labelTooltipHTML;
	};


	//////////////////////////

	//   Callback to process the click for Blocks in the main rows

	//  If this function is defined, the label will be assigned in css to cursor:pointer;
	
	//  Only uncomment this if it will do something on the click.  
	

//	MainRowsLabel_callbackFunctions.prototype.processClick = function( processClickParams ) {
//
//
//		var blockDataItems = processClickParams.blockDataItems;   //  The peptides combined to make this block
//		var rowItem = processClickParams.rowItem;   				//  The rowItem for this row
//
//		var callbackDataStorage = processClickParams.callbackDataStorage;  //  Can store information here and it will be returned the next time
//
//		return false;  // return what should be returned to the final click handler
//	}
	
	
	////////////////////////////////////

	//  CLASS for For Main rows peptide blocks, main blocks blocks

	
	//  Constructor
	
	var MainRowsBlocks_callbackFunctions = function( param ){

//		this.config = param.config;
		
	};	
	

	////////////////////////////////////

	//   For Main rows peptide blocks, main blocks blocks

	//  When the viewer is created, this is called first

	MainRowsBlocks_callbackFunctions.prototype.precomputeValuesOnCreate = function( precomputeParams ) {


		var blockDataItems = precomputeParams.blockDataItems;   //  The peptides combined to make this block
		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var rowItem = precomputeParams.rowItem;

		if ( rowItem === undefined ) {

			throw "rowItem  === undefined for precomputeParams.rowItem";
		}

		var forHiddenBlocks = precomputeParams.forHiddenBlocks;
		var splitAnyEntriesForRow = precomputeParams.splitAnyEntriesForRow;

		callbackDataStorage.rowItem = rowItem;



		var precomputeColorParams = { forHiddenBlocks: forHiddenBlocks };


		this.precomputeColorOnCreateMainRowsBlocks( precomputeParams, precomputeColorParams );



		/////  Create Tool Tip Text




		var precomputeToolTipTextParams = {   };


		if ( splitAnyEntriesForRow ) {

			this.precomputeOverlappingBlocksToolTipText( precomputeParams, precomputeToolTipTextParams );
		} else {

			this.precomputeNonOverlappingBlocksToolTipText( precomputeParams, precomputeToolTipTextParams );
		}

	};



	///////////////////////

	//   Precompute the Color for the Blocks in the main rows
	
	//  Private function

	MainRowsBlocks_callbackFunctions.prototype.precomputeColorOnCreateMainRowsBlocks = function( precomputeParams, precomputeColorParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var blockDataItems = precomputeParams.blockDataItems;   //  The peptides combined to make this block

		var rowItem = precomputeParams.rowItem;
		var forHiddenBlocks = precomputeColorParams.forHiddenBlocks;


		var blockDataItem = blockDataItems[0];
		
		var type = blockDataItem.type;
		
		var colorForBlock = undefined;

	
		colorForBlock = { red: 0, green: 0, blue: 0 };  //  black
		
		callbackDataStorage.colorForBlock = colorForBlock;


	};


	///////////////////////

	//   Precompute the tool tip for Non Overlapping Blocks in the main rows
	
	//  Private function

	MainRowsBlocks_callbackFunctions.prototype.precomputeNonOverlappingBlocksToolTipText = function( precomputeParams, precomputeToolTipTextParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var blockDataItems = precomputeParams.blockDataItems;   //  The peptides combined to make this block
		var rowItem = precomputeParams.rowItem;   				//  The rowItem for this row

		var startPos = precomputeParams.startPos;
		var endPos = precomputeParams.endPos;


		var blockDataItem = blockDataItems[0];
		
		var type = blockDataItem.type;
		
		var tooltipHTML = "";

		tooltipHTML += POSITION_LABEL_TEXT;

		tooltipHTML += startPos + "-" + endPos + "<br>";

		callbackDataStorage.nonOverlappingtooltipHTML = tooltipHTML;
	};


	///////////////////////

	//   Precompute the tool tip for Non Overlapping Blocks in the main rows
	
	//  Private function

	MainRowsBlocks_callbackFunctions.prototype.precomputeOverlappingBlocksToolTipText = function( precomputeParams, precomputeToolTipTextParams ) {

		var callbackDataStorage = precomputeParams.callbackDataStorage;  //  Can store information here and it will be returned the next time

		var blockDataItems = precomputeParams.blockDataItems;   //  The peptides combined to make this block
		var rowItem = precomputeParams.rowItem;   				//  The rowItem for this row

		var startPos = precomputeParams.startPos;
		var endPos = precomputeParams.endPos;

		var tooltipHTML = "";

		tooltipHTML += POSITION_LABEL_TEXT;

		tooltipHTML += startPos + "-" + endPos + "<br>";

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


//		var blockDataItems = fcnParams.blockDataItems;
//
//		var blockDataItem = blockDataItems[ 0 ];

		return false;  // return what should be returned to the final click handler
	}


	
	
	///////////////////////
	
	//  Function to create the top level classes, put them in an object, and return them 
	
	var masonViewerPeptipediaDisorderedRegionsCallbacksCreator = function( param ){

		var mainRowsLabel_callbackFunctions = new MainRowsLabel_callbackFunctions( param );

		var mainRowsBlocks_callbackFunctions = new MainRowsBlocks_callbackFunctions( param );
		
		var callbacks = { 	mainRowsLabel_callbackFunctions: mainRowsLabel_callbackFunctions,
							mainRowsBlocks_callbackFunctions: mainRowsBlocks_callbackFunctions
						};
		
		return callbacks;
	};

	
	window.masonViewerPeptipediaDisorderedRegionsCallbacksCreator = masonViewerPeptipediaDisorderedRegionsCallbacksCreator;


})( window );
