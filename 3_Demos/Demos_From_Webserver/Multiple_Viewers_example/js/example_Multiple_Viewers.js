
//  example_Multiple_Viewers.js

//   This is the code that initiates

//   the creation of the Mason Viewer

//   for the Multiple viewers on the page 


//   Depends on jquery, Modernizr SVG support detection



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


//jQuery method of running code when page is loaded

$(document).ready( function(){
	
	
	var $coiledCoilMasonViewerRootDiv = $("#coiled-coil-mason-viewer");
	

	var $disorderedRegionsMasonViewerRootDiv = $("#disordered-regions-prediction-mason-viewer");
	
	
	var $svg_not_supported = $("#svg-not-supported");
	

	//  Registry that allows the viewers in the coverage map tab to communicate with each other
	var masonViewerRegistry = MasonViewerRegistryFactory.createMasonViewerRegistry();


	var create_MasonViewer_CoiledCoil_ConstructorParams =
			{ config: { masonViewerRegistry: masonViewerRegistry,
				$masonViewerRootDiv: $coiledCoilMasonViewerRootDiv,
				$svgNotSupportedDiv: $svg_not_supported } };

	var create_MasonViewer_CoiledCoil = new Create_MasonViewer_CoiledCoil( create_MasonViewer_CoiledCoil_ConstructorParams );

	create_MasonViewer_CoiledCoil.createCoverageMapIfNotCreated();


	var create_MasonViewer_DisorderedRegions_ConstructorParams =
			{ config: { masonViewerRegistry: masonViewerRegistry,
						$masonViewerRootDiv: $disorderedRegionsMasonViewerRootDiv,
						$svgNotSupportedDiv: $svg_not_supported } };

	var create_MasonViewer_DisorderedRegions = new Create_MasonViewer_DisorderedRegions( create_MasonViewer_DisorderedRegions_ConstructorParams );

	create_MasonViewer_DisorderedRegions.createCoverageMapIfNotCreated();

	
});	
	