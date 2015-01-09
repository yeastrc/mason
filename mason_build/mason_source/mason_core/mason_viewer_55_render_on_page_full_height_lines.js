
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