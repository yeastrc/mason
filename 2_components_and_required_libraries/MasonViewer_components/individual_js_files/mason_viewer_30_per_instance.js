
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


