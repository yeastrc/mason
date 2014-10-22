
//   mason_viewer_sample.js

//     This is the Javascript file for this demo

//   Depends on jquery

//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";

//  jQuery method of running code when page is loaded

$(document).ready( function(){

	/////////////////////////////////////////
	/////////////////////////////////////////

	//   Code not in any function so runs when outer function is called


	var $masonViewerRootDiv = $("#mason-viewer");


	if ( ! SVG.supported ) {  //  returns false if SVG not supported

		var $svgNotSupported = $("#svg-not-supported");

		$svgNotSupported.show();

		return null;
	}



	var requestParams = { inputData: multi_row_masonViewerData };
	var configParams = {};

	var callbackFunctionsObj = masonViewerExampleCallbacksCreator( { config: null } );




	//   Actually create the Mason Viewer on the page

	var masonViewer = MasonViewer.createMasonViewer( $masonViewerRootDiv, requestParams, configParams, callbackFunctionsObj );





});
