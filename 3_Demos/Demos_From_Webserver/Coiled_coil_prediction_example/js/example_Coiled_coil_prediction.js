
//  example_Coiled_coil_prediction.js

//   This is the code that initiates

//   the creation of the Mason Viewer

//   for the Coiled Coil Prediction viewer on the page 


//   Depends on jquery, Modernizr SVG support detection



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


//jQuery method of running code when page is loaded

$(document).ready( function(){
	
	var $masonViewerRootDiv = $("#coiled-coil-mason-viewer");
	
	var $svg_not_supported = $("#svg-not-supported");


	var create_MasonViewer_CoiledCoil_ConstructorParams =
			{ config: { masonViewerRegistry: this.masonViewerRegistry,
				$masonViewerRootDiv: $masonViewerRootDiv,
				$svgNotSupportedDiv: $svg_not_supported } };

	var create_MasonViewer_CoiledCoil = new Create_MasonViewer_CoiledCoil( create_MasonViewer_CoiledCoil_ConstructorParams );

	create_MasonViewer_CoiledCoil.createCoverageMapIfNotCreated();


	
});	
	