
//  Protein_Sequence_Coverage_Example.js

//   This is the code that initiates

//   the creation of the Mason Viewer

//   for the Multiple Runs ALl Features viewer on the page 


//   Depends on jquery, Modernizr SVG support detection



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


//jQuery method of running code when page is loaded

$(document).ready( function(){
	
	
	var $masonViewerRootDiv = $("#protein_sequence_coverage_example_mason_viewer");
	
	var $svg_not_supported = $("#svg-not-supported");


	var create_MasonViewer_Protein_Sequence_Coverage_Example_ConstructorParams =
			{ config: { $masonViewerRootDiv: $masonViewerRootDiv,
						$svgNotSupportedDiv: $svg_not_supported } };

	var masonViewer_Protein_Sequence_Coverage_Example = 
			new Create_MasonViewer_Protein_Sequence_Coverage_Example( create_MasonViewer_Protein_Sequence_Coverage_Example_ConstructorParams );

	masonViewer_Protein_Sequence_Coverage_Example.createCoverageMapIfNotCreated();


	
});	
	