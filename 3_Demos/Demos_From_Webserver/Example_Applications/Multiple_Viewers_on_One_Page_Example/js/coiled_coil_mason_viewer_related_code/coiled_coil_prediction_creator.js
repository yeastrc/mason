
//   coiled_coil_prediction_creator.js

//   This is the code that initiates

//   the creation of the Mason Viewer

//   for the Coiled Coil Prediction viewer


//   Depends on jquery, Modernizr SVG support detection



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";



 //  constructor
var Create_MasonViewer_CoiledCoil = function( params ) {


	this.coverageMapCreated = false; //

	this.masonViewers = undefined;

	this.loadingSpinner = undefined;


	this.config = params.config;

	this.$masonViewerRootDiv = this.config.$masonViewerRootDiv;
	
//	var contextPath = params.config.context.contextPath;

	this.serviceURLs = {
		serviceURL_GetCoiledCoil_Prefix : "coiled_coil_files/"
	};
	

	
};




Create_MasonViewer_CoiledCoil.prototype.VIEWER_ROW_LABEL = "Coiled-coil";  

	
Create_MasonViewer_CoiledCoil.prototype.COILED_COIL_TYPE_CONSTANTS = {

		coiledCoil_filename_main : "coiled_coil_example",
		coiledCoil_Suffix : ".pc2",
		
		
//	WAS	pScoreCutoff_CONSTANT : 0.025		
		pScoreCutoff_CONSTANT : 0.1
	};
	

	


/////////////

Create_MasonViewer_CoiledCoil.prototype.isCoverageMapCreated = function(  ) {

	return this.coverageMapCreated;
};


/////////////

Create_MasonViewer_CoiledCoil.prototype.setCoverageMapCreated = function( param ) {

	this.coverageMapCreated = param;
};



Create_MasonViewer_CoiledCoil.prototype.createCoverageMapIfNotCreated = function(  ) {

	if ( ! this.isCoverageMapCreated() ) {

		this.createCoverageMap();
	}


};



//////////////////////////////

//

Create_MasonViewer_CoiledCoil.prototype.createCoverageMap = function(  ) {

	var objectThis = this;

	var svgSupport = Modernizr.svg;

	if ( ! svgSupport ) {  //  is false if SVG not supported


		var $svgNotSupported = this.config.$svgNotSupportedDiv;

		$svgNotSupported.show();
		
		this.$masonViewerRootDiv.hide();


		return null;
	}

	
	var loadMatchingProteinSequenceParams = {
			

			folderName: this.serviceURLs.serviceURL_GetCoiledCoil_Prefix,
			
			callbackFcn: function( callbackFcnParam ) {
				
				objectThis.createCoverageMapMain( callbackFcnParam );
			}
	};
	
	loadMatchingProteinSequence( loadMatchingProteinSequenceParams );
	
//	this.createCoverageMapMain(  );

	
//	//  Update button
//
//	this.$masonViewerRootDiv.find(".protein-coverage-update-coverage-viewer-button-jq").click(function( event, ui ) {
//
//		var param = {
//		 	data: objectThis.coiledCoilDataFromServer,
//		 	calledContext: undefined
//		};
//	
//		objectThis.createCoverageMapMainProcessResponse( param );
//		
////		objectThis.createCoverageMapMain( objectThis.config );
//	});
//
//	//  Reset button
//
//	this.$masonViewerRootDiv.find(".protein-coverage-reset-form-button-jq").click(function( event, ui ) {
//
//		
//		var $pscoreCutoffReset = objectThis.$masonViewerRootDiv.find(".protein-coverage-p-score-cutoff-reset-jq");
//
//		var $pscoreCutoff = objectThis.$masonViewerRootDiv.find(".protein-coverage-p-score-cutoff-jq");
//	
//		var pscoreCutoffReset = undefined;
//	
//	
//		if ( $pscoreCutoffReset.length > 0 ) {
//			
//			pscoreCutoffReset = $pscoreCutoffReset.val();
//			$pscoreCutoff.val( pscoreCutoffReset );
//		}
//		
//	});
	
};



Create_MasonViewer_CoiledCoil.prototype.createCoverageMapMain = function( param ) {


	var objectThis = this;


//	this.createLoadingSpinner( );
//
//
//	var $noDataFoundDiv = this.$masonViewerRootDiv.find(".peptide-coverage-viewer-none-found-jq");
//	
//	$noDataFoundDiv.hide();
//	
//	var $optionsBlockDiv = this.$masonViewerRootDiv.find(".coverage-map-options-block");
//	
//	$optionsBlockDiv.hide();



	//  Create context for the AJAX call back
	var context = { proteinSequenceData: param.data  };


	
	
//	var $rootDivPeptide_coverage = this.$masonViewerRootDiv.find(".peptide-coverage-viewer");
//
//	$rootDivPeptide_coverage.empty();

			
	

	var startTimeTracking = (new Date).getTime();
	

	var serviceURL = this.serviceURLs.serviceURL_GetCoiledCoil_Prefix +
		this.COILED_COIL_TYPE_CONSTANTS.coiledCoil_filename_main + 
		this.COILED_COIL_TYPE_CONSTANTS.coiledCoil_Suffix;


	$.ajax(
		{ url : serviceURL,

			success :  function( data ) {

				var timeTrackingDiffDataRetrieved = (new Date).getTime() - startTimeTracking;

				objectThis.createCoverageMapMainProcessResponse( { data: data, context: context } );

//				var timeTrackingDiffViewersCreated = (new Date).getTime() - startTimeTracking;

//				alert( "timeTrackingDiffDataRetrieved: " + timeTrackingDiffDataRetrieved + ", timeTrackingDiffViewersCreated: " + timeTrackingDiffViewersCreated );


			},
			statusCode: {
				404: function() {
				
					objectThis.deleteLoadingSpinner(  );

					$noDataFoundDiv.show();
					
					throw "data file not found: " + serviceURL;
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {

				objectThis.deleteLoadingSpinner(  );

				if ( errorThrown !== "Not Found" ) {  //  Not " File not found: " since   File not found handled by "404:" code above 
					
						handleGeneralServerError( { exception: errorThrown, jqXHR: jqXHR, textStatus: textStatus } );
				}

			},
			dataType : "text"
		});

};



////////////////////////////////

Create_MasonViewer_CoiledCoil.prototype.createCoverageMapMainProcessResponse = function( param ) {



	var objectThis = this;

	var calledContext = param.context;
	
	var proteinSequenceData = calledContext.proteinSequenceData;

	var coiledCoilDataFromServer = param.data;
	
	this.coiledCoilDataFromServer = coiledCoilDataFromServer;
	
	


	try {
		var $rootDivPeptide_coverage = this.$masonViewerRootDiv;

//		var $rootDivPeptide_coverage = this.$masonViewerRootDiv.find("#coiled-coil-mason-viewer");

		$rootDivPeptide_coverage.empty();
		
		var createMasonViewerInputDataParams = { coiledCoilDataFromServer: coiledCoilDataFromServer, 
				proteinSequenceData: proteinSequenceData };

		var masonViewerInputData = this.createMasonViewerInputData( createMasonViewerInputDataParams );

		
		var requestParams = { inputData: masonViewerInputData };
		
		var configParams = {};

		
		var callbackFunctionsObj = masonViewerPeptipediaCoiledCoilCallbacksCreator( { config: null } );



		var masonViewer = MasonViewer.createMasonViewer( $rootDivPeptide_coverage, requestParams, configParams, callbackFunctionsObj );

		if ( this.config.masonViewerRegistry ) {
		
			//   itemKey has to be unique across all the viewers registered with a specific registry
			this.config.masonViewerRegistry.addMasonViewer( { itemKey: "coiledcoil", masonViewer: masonViewer } );
		}

		this.masonViewers = { masonViewer: masonViewer };
		
		this.setCoverageMapCreated( true );

		return this.masonViewers;

//	} catch ( error ) {
//
//		throw error;

	} finally {

		this.deleteLoadingSpinner(  );

		var $optionsBlockDiv = this.$masonViewerRootDiv.find(".coverage-map-options-block");
		
		$optionsBlockDiv.show();


	}

};


////////////////////////////////////

//        Take the CoiledCoil data from the CoiledCoil web app and reformat as needed for the Mason coverage viewer

//            Always have one row, even if empty

Create_MasonViewer_CoiledCoil.prototype.createMasonViewerInputData = function( param ) {

	
//	//  get protein sequence length from page
//	
//	var $proteinSequenceLength = this.$masonViewerRootDiv.find(".protein-coverage-protein-sequence-length-jq");
//
//	var proteinSequenceLengthString = $proteinSequenceLength.val();
//	
//	var proteinSequenceLength = parseInt( proteinSequenceLengthString, 10 );
//	
//	if ( isNaN( proteinSequenceLength ) ) {
//		
//		throw "Failed to parse protein sequence length, string: |" + proteinSequenceLengthString + "|";
//	} 
	
	var coiledCoilDataFromServer = param.coiledCoilDataFromServer;
	
	var proteinSequenceLength = param.proteinSequenceData.length;
	
//	var $pScoreCutoff = this.$masonViewerRootDiv.find(".protein-coverage-p-score-cutoff-jq");
//
//	var pScoreCutoffString = $pScoreCutoff.val();
//	
//	var pScoreCutoff = parseFloat( pScoreCutoffString );
//	
//	if ( isNaN( pScoreCutoff ) ) {
//		
//		throw "Failed to parse protein sequence length, string: |" + pScoreCutoffString + "|";
//	} 
//	

	
	var minPScore = null;
	
	var pScoreCutoff = this.COILED_COIL_TYPE_CONSTANTS.pScoreCutoff_CONSTANT;

	
	var blockItems = new Array();
	
	var masonViewerInputData 
		= { maxSequenceLength: proteinSequenceLength , 
			rowItems: [ { label: this.VIEWER_ROW_LABEL, blockItems: blockItems } ]
			
		  };
	
	

	//		Javascript to convert all line endings to \n

	coiledCoilDataFromServer = coiledCoilDataFromServer.replace(/(\r\n|\r|\n)/g, '\n');

	//    Split into an array of lines
	
	var dataLines = coiledCoilDataFromServer.split(/\n/g);

	
	var smallestPscore = -1;

	var prevPositionIncluded = false;
	
	var startPositionInitializationValue = -1;
	
	var startPosition = startPositionInitializationValue;
	var endPosition = startPositionInitializationValue;


	for ( var lineIndex = 0; lineIndex < dataLines.length; lineIndex++ ) {
		
		var dataLine = dataLines[ lineIndex ];
		
		if ( dataLine.length === 0 || dataLine.charAt( 0 ) === "#"  ) {
			
			continue;
		}
		
		
		//  dataline:  "   1 M C   1.000  0.000  0.000",  after split, index zero === "", index 1 === "1", index 2 === "M", ...
		
		var dataLineSplit = dataLine.split(/\s+/g);

		var pScoreString = dataLineSplit[ 4 ];
		
		var pScore = parseFloat( pScoreString );
		
		if ( isNaN( pScore ) ) {

			throw "pScore parse failed for pScore string: |" + pScoreString + "|, dataLine: " + dataLine;
		}

		
		if ( minPScore === null ) {
			
			minPScore = pScore;
		} else {
			
			if ( pScore < minPScore ) {
				
				minPScore = pScore;
			}
		}
		
		
		if ( pScore <= pScoreCutoff ) {
		
			var positionString = dataLineSplit[ 1 ];
			
			var position = parseInt( positionString, 10 );
			
			if ( isNaN( position ) ) {
				
				throw "Position parse failed for position string: |" + positionString + "|, dataLine: " + dataLine;
			}
			
			if ( position > ( endPosition + 1 )  ) {
				
				if ( startPosition !== startPositionInitializationValue ) {
					
					//  not first group so save this group
					
					this.addGroupToArray( { blockItems: blockItems, startPosition: startPosition, endPosition: endPosition  } );
				}
									
				startPosition = position;
			}
			endPosition = position;

			prevPositionIncluded = true;

		} else {
			
			prevPositionIncluded = false;
		}
		
		var z = 0;
		
		if ( smallestPscore == -1 || pScore < smallestPscore ) {
			
			smallestPscore = pScore;
		}
		
	}
	
					
	if ( startPosition !== startPositionInitializationValue ) {

		//  add last group
		
		this.addGroupToArray( { blockItems: blockItems, startPosition: startPosition, endPosition: endPosition  } );
	}
	
	

//   Input format to viewer core
//
//	var inputData
//		= {"maxSequenceLength": 255,
//			"rowItems": [
//							{"label":"BBpilabel1",
//							"blockItems": [
//											{
//											"blockData":{"level":42,"id":85,"otherData":"TheOtherData"},
//											"startPos":25,
//											"endPos":37
//											}
//										]
//							}
//						  ]
//			}

	
	return masonViewerInputData;
};



///////////////////////////////////

Create_MasonViewer_CoiledCoil.prototype.addGroupToArray = function( param ) {
	
	var blockData = {  };

	var blockItem = { startPos: param.startPosition , endPos: param.endPosition , blockData: blockData };

	param.blockItems.push( blockItem );
	
};






///////////////////////////////////

Create_MasonViewer_CoiledCoil.prototype.createLoadingSpinner = function() {

//	var $spinnerContainer = this.$masonViewerRootDiv.find(".coverage-map-loading-spinner-block");
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


Create_MasonViewer_CoiledCoil.prototype.deleteLoadingSpinner = function(  ) {
	
//	this.loadingSpinner.stop();
//
//	var $spinnerContainer = this.$masonViewerRootDiv.find(".coverage-map-loading-spinner-block");
//
//	$spinnerContainer.hide();

};