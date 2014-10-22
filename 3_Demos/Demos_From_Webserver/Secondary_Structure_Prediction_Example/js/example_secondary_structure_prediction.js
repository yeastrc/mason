
//  example_secondary_structure_prediction.js

//   This is the code that initiates

//   the creation of the Mason Viewer

//   for the Secondary Structure viewer on the page 


//   Depends on jquery, Modernizr SVG support detection



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


//jQuery method of running code when page is loaded

$(document).ready( function(){
	
	
	var $masonViewerRootDiv = $("#secondary-structure-prediction-mason-viewer");
	
	var $svg_not_supported = $("#svg-not-supported");


	var create_MasonViewer_SecondaryStructure_ConstructorParams =
			{ config: { $masonViewerRootDiv: $masonViewerRootDiv,
						$svgNotSupportedDiv: $svg_not_supported } };

	var create_MasonViewer_SecondaryStructure = new Create_MasonViewer_SecondaryStructure( create_MasonViewer_SecondaryStructure_ConstructorParams );

	create_MasonViewer_SecondaryStructure.createCoverageMapIfNotCreated();


	
});	
	