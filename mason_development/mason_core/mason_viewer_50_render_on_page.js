
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

		if ( ( outputRows.length > 1 || this.configDisplayOptions.createCombinedLineOnly ) &&
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



