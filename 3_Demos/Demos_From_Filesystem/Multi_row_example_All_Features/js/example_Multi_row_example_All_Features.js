
//  example_Multi_row_example_All_Features.js

//   This is the code that initiates

//   the creation of the Mason Viewer

//   for the Multiple Runs ALl Features viewer on the page 


//   Depends on jquery, Modernizr SVG support detection



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


//jQuery method of running code when page is loaded

$(document).ready( function(){
	
	
	var $masonViewerRootDiv = $("#multi_row_all_features_mason_viewer");
	
	var $svg_not_supported = $("#svg-not-supported");


	var Create_MasonViewer_Multi_row_All_Features_ConstructorParams =
			{ config: { $masonViewerRootDiv: $masonViewerRootDiv,
						$svgNotSupportedDiv: $svg_not_supported
//						,
//						createCombinedLineOnly: true
						} };

	var create_MasonViewer_Multi_row_All_Features = new Create_MasonViewer_Multi_row_All_Features( Create_MasonViewer_Multi_row_All_Features_ConstructorParams );

	create_MasonViewer_Multi_row_All_Features.createCoverageMapIfNotCreated();


	
});	
	