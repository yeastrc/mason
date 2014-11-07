
//   peptide_atlas_creator.js

//   This is the Peptipedia specific code that initiates

//   the creation of the Mason Viewer (prot_cov_viewer)

//   for the Peptide Atlas viewer on the View Protein page on the Coverage Map tab


//   Depends on jquery, Modernizr SVG support detection



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";



 //  constructor
var Create_MasonViewer_PeptideAtlas = function( params ) {


	this.BLOCK_TYPE_LABEL_PLURAL_PEPTIDES = "peptides";


	this.coverageMapCreated = false; //

	this.MasonViewers = undefined;

	this.loadingSpinner = undefined;


	this.config = params.config;


	this.$masonViewerRootDiv = this.config.$masonViewerRootDiv;


};


/////////////

Create_MasonViewer_PeptideAtlas.prototype.isCoverageMapCreated = function(  ) {

	return this.coverageMapCreated;
};


/////////////

Create_MasonViewer_PeptideAtlas.prototype.setCoverageMapCreated = function( param ) {

	this.coverageMapCreated = param;
};



Create_MasonViewer_PeptideAtlas.prototype.createCoverageMapIfNotCreated = function(  ) {

	if ( ! this.isCoverageMapCreated() ) {

		this.createCoverageMap();
	}


};



//////////////////////////////

//

Create_MasonViewer_PeptideAtlas.prototype.createCoverageMap = function(  ) {

	var objectThis = this;

	var svgSupport = Modernizr.svg;

	if ( ! svgSupport ) {  //  is false if SVG not supported


		var $svgNotSupported = this.config.$svgNotSupportedDiv;

		$svgNotSupported.show();

		this.$root_block.hide();


		return null;
	}


	this.createCoverageMapMain( this.config );




	//  Checkbox for show/hide vertical lines for trypsin cut points.  Initial show/hide set below

	$("#peptide-atlas-show-hide-vertical-data-lines-checkbox-jq").change(function( event, ui ) {

		var $this = $(this);

		if ( $this.attr('checked') ) {

			objectThis.MasonViewers.masonViewer.showVerticalDataLines();

		} else {

			objectThis.MasonViewers.masonViewer.hideVerticalDataLines();
		}
	});

};



Create_MasonViewer_PeptideAtlas.prototype.createCoverageMapMain = function( config ) {


	var objectThis = this;



	try {




		var $rootDivPeptide_coverage = this.$masonViewerRootDiv;




		var callbacksConfigParams = {  };


		var callbackFunctionsObj = masonViewerPeptipediaPeptideAtlasCallbacksCreator( { config: callbacksConfigParams } );



		var requestParams = { inputData: peptideAtlasMasonViewerData.results.protViewerCoreInputData };

		var configParams = {
							blockTypeLabelPlural: this.BLOCK_TYPE_LABEL_PLURAL_PEPTIDES
		};

		var masonViewer = MasonViewer.createMasonViewer( $rootDivPeptide_coverage, requestParams, configParams, callbackFunctionsObj );

		if ( this.config.masonViewerRegistry ) {
			//   itemKey has to be unique across all the viewers registered with a specific registry
			this.config.masonViewerRegistry.addMasonViewer( { itemKey: "masonViewerPeptideAtlas", masonViewer: masonViewer } );
		}

		this.MasonViewers = { masonViewer: masonViewer };
		
		
		
		masonViewer.hideVerticalDataLines();



		this.setCoverageMapCreated( true );

		return this.MasonViewers;

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

Create_MasonViewer_PeptideAtlas.prototype.createLoadingSpinner = function() {

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


Create_MasonViewer_PeptideAtlas.prototype.deleteLoadingSpinner = function(  ) {

//	this.loadingSpinner.stop();
//
//	var $spinnerContainer = this.$root_block.find(".coverage-map-loading-spinner-block");
//
//	$spinnerContainer.hide();

};