
//  example_philius.js

//   This is the code that initiates

//   the creation of the Mason Viewer

//   for the Philius Mason viewer on the page 


//   Depends on jquery, Modernizr SVG support detection



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


//jQuery method of running code when page is loaded

$(document).ready( function(){
	
	
	var $masonViewerRootDiv = $("#philius-mason-viewer");
	
	var $svg_not_supported = $("#svg-not-supported");


	var create_MasonViewer_Philius_ConstructorParams =
			{ config: { $masonViewerRootDiv: $masonViewerRootDiv,
						$svgNotSupportedDiv: $svg_not_supported } };

	var create_MasonViewer_Philius = new Create_MasonViewer_Philius( create_MasonViewer_Philius_ConstructorParams );

	create_MasonViewer_Philius.createCoverageMapIfNotCreated();


	
});	
	