
//   multi_row__all_features_creator.js

//   This is the code that initiates

//   the creation of the Mason Viewer

//    instance on the page 


//   Depends on jquery, Modernizr SVG support detection




//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";



 //  constructor
var Create_MasonViewer_Multi_row_All_Features = function( params ) {


	this.BLOCK_TYPE_LABEL_PLURAL_PEPTIDES = "peptides";

	this.coverageMapCreated = false; //

	this.masonViewers = undefined;

	this.loadingSpinner = undefined;


	this.config = params.config;

	this.$masonViewerRootDiv = this.config.$masonViewerRootDiv;

};


/////////////

Create_MasonViewer_Multi_row_All_Features.prototype.isCoverageMapCreated = function(  ) {

	return this.coverageMapCreated;
};


/////////////

Create_MasonViewer_Multi_row_All_Features.prototype.setCoverageMapCreated = function( param ) {

	this.coverageMapCreated = param;
};





Create_MasonViewer_Multi_row_All_Features.prototype.createCoverageMapIfNotCreated = function(  ) {

	if ( ! this.isCoverageMapCreated() ) {

		this.createCoverageMap();
	}


};



//////////////////////////////

//

Create_MasonViewer_Multi_row_All_Features.prototype.createCoverageMap = function(  ) {

	var objectThis = this;

	var svgSupport = Modernizr.svg;

	if ( ! svgSupport ) {  //  is false if SVG not supported

		var $svgNotSupported = this.config.$svgNotSupportedDiv;

		$svgNotSupported.show();

		this.$root_block.hide();

		return null;
	}


	this.createCoverageMapMain(  );




	//  Checkbox for show/hide vertical lines for trypsin cut points.  Initial show/hide set below

	$("#multi_row_show-hide-vertical-data-lines-checkbox-jq").change(function( event, ui ) {

		var $this = $(this);

		if ( $this.attr('checked') ) {

			objectThis.masonViewers.masonViewerRuns.showVerticalDataLines();

		} else {

			objectThis.masonViewers.masonViewerRuns.hideVerticalDataLines();
		}
	});

};

//////////////////////////

Create_MasonViewer_Multi_row_All_Features.prototype.createCoverageMapMain = function(  ) {



	this.createLoadingSpinner( );



	var $rootDivPeptide_coverage_Runs = this.$masonViewerRootDiv;

	/////////////


	//  delete existing viewer

	if ( this.masonViewers && this.masonViewers.masonViewerRuns ) {

		this.masonViewers.masonViewerRuns.deleteViewer();
	}



	$rootDivPeptide_coverage_Runs.empty();


	var objectThis = this;
	

	var data = multiRowAllFeaturesMasonViewerData;  //  Pick up variable declared in file js/example_Multi_row_example_All_Features_sample_data.js

	try {


		var results = data.results;


		var createCombinedLineOnly = this.config.createCombinedLineOnly;
		var skipCreateCombinedLine = this.config.skipCreateCombinedLine;

		var combinedLineLabel = this.config.combinedLineLabel;
		var combinedLineTooltipHTML = this.config.combinedLineTooltipHTML;


		var callbacksConfigParams =
			{ 	config: this.config,
				viewerDataRoot: results,
				runsProteinPeptide: this.config.runsProteinPeptide,
			  	viewProtein_RunsPeptides_Tab: this.config.viewProtein_RunsPeptides_Tab };


		var callbackFunctionsObj = masonViewerMultipleRunsAllFeaturesCallbacksCreator( callbacksConfigParams );

		var requestParams = { inputData: results.protViewerCoreInputData };

		var configParams =
			{ createCombinedLineOnly: createCombinedLineOnly, skipCreateCombinedLine: skipCreateCombinedLine,
				blockTypeLabelPlural: this.BLOCK_TYPE_LABEL_PLURAL_PEPTIDES,
				combinedLineLabel: combinedLineLabel,
				combinedLineTooltipHTML: combinedLineTooltipHTML
//				,
//
//				LABEL_WIDTH : 400  //  Adjust the LABEL_WIDTH to accommodate the width of the longest label
			};

		var masonViewerRuns = MasonViewer.createMasonViewer( $rootDivPeptide_coverage_Runs, requestParams, configParams, callbackFunctionsObj );

		if ( this.config.masonViewerRegistry ) {

			//   itemKey has to be unique across all the viewers registered with a specific registry
			this.config.masonViewerRegistry.addMasonViewer( { itemKey: "masonViewerRuns", masonViewer: masonViewerRuns } );
		}

		this.masonViewers = { masonViewerRuns: masonViewerRuns };
		
		
		
		
		///////////////////////////////////////////////
		
		

		this.setCoverageMapCreated( true );

//		//  Show/hide the vertical lines based on initial setting of the checkbox
//
//		var $showHideVerticalLinesCheckbox = this.$root_block.find(".protein-coverage-show-hide-vertical-data-lines-checkbox-jq");
//
//		if ( $showHideVerticalLinesCheckbox.attr('checked') ) {
//
//			this.masonViewers.masonViewerRuns.showVerticalDataLines();
//
//		} else {
//
//			this.masonViewers.masonViewerRuns.hideVerticalDataLines();
//		}


		this.masonViewers.masonViewerRuns.hideVerticalDataLines();



		return this.masonViewers;

//	} catch ( error ) {
//
//		throw error;

	} finally {

		this.deleteLoadingSpinner(  );

//		var $optionsBlockDiv = this.$root_block.find(".coverage-map-options-block");
//
//		$optionsBlockDiv.show();
	}

};

///////////////////////////////////

Create_MasonViewer_Multi_row_All_Features.prototype.createLoadingSpinner = function() {

//	var $spinnerContainer = this.$root_block.find(".coverage-map-loading-spinner-block");
//
//	$spinnerContainer.show();
//
//	var $spinnerDiv = $spinnerContainer.find(".coverage-map-loading-spinner");
//
//
//	var spinnerDiv = $spinnerDiv.get( 0 );
//
//	this.loadingSpinner = new Spinner( SPINNER_OPTIONS ).spin( spinnerDiv );
//
//	return this.loadingSpinner;
};


Create_MasonViewer_Multi_row_All_Features.prototype.deleteLoadingSpinner = function(  ) {

//	this.loadingSpinner.stop();
//
//	var $spinnerContainer = this.$root_block.find(".coverage-map-loading-spinner-block");
//
//	$spinnerContainer.hide();

};