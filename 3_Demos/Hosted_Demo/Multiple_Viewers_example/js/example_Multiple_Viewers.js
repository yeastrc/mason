
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
	
	var $multiRowMasonViewerRootDiv = $("#multi_row_all_features_mason_viewer");
	
	var $peptideAtlasMasonViewerRootDiv = $("#peptide_atlas_mason_viewer");
	
	
	
	var $philiusMasonViewerRootDiv = $("#philius-mason-viewer");

	var $secondaryStructurePredictionMasonViewerRootDiv = $("#secondary-structure-prediction-mason-viewer");
	
	
	var $coiledCoilMasonViewerRootDiv = $("#coiled-coil-mason-viewer");

	var $disorderedRegionsMasonViewerRootDiv = $("#disordered-regions-prediction-mason-viewer");
	
	
	var $svg_not_supported = $("#svg-not-supported");
	

	//  Registry that allows the viewers in the coverage map tab to communicate with each other
	var masonViewerRegistry = MasonViewerRegistryFactory.createMasonViewerRegistry();



	var Create_MasonViewer_Multi_row_All_Features_ConstructorParams =
			{ config: { masonViewerRegistry: masonViewerRegistry,
						$masonViewerRootDiv: $multiRowMasonViewerRootDiv,
						$svgNotSupportedDiv: $svg_not_supported } };

	var create_MasonViewer_Multi_row_All_Features = new Create_MasonViewer_Multi_row_All_Features( Create_MasonViewer_Multi_row_All_Features_ConstructorParams );

	create_MasonViewer_Multi_row_All_Features.createCoverageMapIfNotCreated();

	


	var Create_MasonViewer_PeptideAtlas_ConstructorParams =
			{ config: { masonViewerRegistry: masonViewerRegistry,
						$masonViewerRootDiv: $peptideAtlasMasonViewerRootDiv,
						$svgNotSupportedDiv: $svg_not_supported } };

	var create_MasonViewer_PeptideAtlas = new Create_MasonViewer_PeptideAtlas( Create_MasonViewer_PeptideAtlas_ConstructorParams );

	create_MasonViewer_PeptideAtlas.createCoverageMapIfNotCreated();

	
	

	var create_MasonViewer_Philius_ConstructorParams =
			{ config: { masonViewerRegistry: masonViewerRegistry,
						$masonViewerRootDiv: $philiusMasonViewerRootDiv,
						$svgNotSupportedDiv: $svg_not_supported } };

	var create_MasonViewer_Philius = new Create_MasonViewer_Philius( create_MasonViewer_Philius_ConstructorParams );

	create_MasonViewer_Philius.createCoverageMapIfNotCreated();

	
	var create_MasonViewer_SecondaryStructure_ConstructorParams =
			{ config: { masonViewerRegistry: masonViewerRegistry,
						$masonViewerRootDiv: $secondaryStructurePredictionMasonViewerRootDiv,
						$svgNotSupportedDiv: $svg_not_supported } };

	var create_MasonViewer_SecondaryStructure = new Create_MasonViewer_SecondaryStructure( create_MasonViewer_SecondaryStructure_ConstructorParams );

	create_MasonViewer_SecondaryStructure.createCoverageMapIfNotCreated();

	
	
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
	