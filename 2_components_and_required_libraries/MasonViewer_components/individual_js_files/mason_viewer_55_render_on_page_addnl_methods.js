
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




