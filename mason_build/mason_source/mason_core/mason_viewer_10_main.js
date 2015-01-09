
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


