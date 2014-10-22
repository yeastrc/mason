
//   secondary_structure_prediction_creator.js

//   This is the code that initiates

//   the creation of the Mason Viewer

//   for the Secondary Structure Prediction viewer on the page 


//   Depends on jquery, Modernizr SVG support detection



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";



 //  constructor
var Create_MasonViewer_SecondaryStructure = function( params ) {


	this.coverageMapCreated = false; //

	this.proteinCoverageViewers = undefined;

	this.loadingSpinner = undefined;


	this.config = params.config;

	this.$masonViewerRootDiv = this.config.$masonViewerRootDiv;


	//   Prefix is required to end in "/"
	
	this.serviceURLs = {
		serviceURL_GetSecondaryStructure_Prefix : "Secondary_Structure_Prediction_Files/"
	};


	
};




Create_MasonViewer_SecondaryStructure.prototype.VIEWER_ROW_LABEL = "Secondary Struct.";  

	
Create_MasonViewer_SecondaryStructure.prototype.SECONDARY_STRUCTURE_TYPE_CONSTANTS = {
		
			 BETA_SHEET : "E",
			 ALPHA_HELIX : "H",
				 
					filename_main : "secondary_structure_prediction_example",
					filename_Suffix : ".ss2",
	};
	

	


/////////////

Create_MasonViewer_SecondaryStructure.prototype.isCoverageMapCreated = function(  ) {

	return this.coverageMapCreated;
};


/////////////

Create_MasonViewer_SecondaryStructure.prototype.setCoverageMapCreated = function( param ) {

	this.coverageMapCreated = param;
};



Create_MasonViewer_SecondaryStructure.prototype.createCoverageMapIfNotCreated = function(  ) {

	if ( ! this.isCoverageMapCreated() ) {

		this.createCoverageMap();
	}


};



//////////////////////////////

//

Create_MasonViewer_SecondaryStructure.prototype.createCoverageMap = function(  ) {

	var objectThis = this;

	var svgSupport = Modernizr.svg;

	if ( ! svgSupport ) {  //  is false if SVG not supported


		var $svgNotSupported = this.config.$svgNotSupportedDiv;

		$svgNotSupported.show();
		
//		this.$root_block.hide();


		return null;
	}


	var loadMatchingProteinSequenceParams = {
			

			folderName: this.serviceURLs.serviceURL_GetSecondaryStructure_Prefix,
			
			callbackFcn: function( callbackFcnParam ) {
				
				objectThis.createCoverageMapMain( callbackFcnParam );
			}
	};
	
	loadMatchingProteinSequence( loadMatchingProteinSequenceParams );
	
//	this.createCoverageMapMain(  );

};



Create_MasonViewer_SecondaryStructure.prototype.createCoverageMapMain = function( param ) {


	var objectThis = this;


	this.createLoadingSpinner( );


//	var $noDataFoundDiv = this.$root_block.find(".peptide-coverage-viewer-none-found-jq");
//	
//	$noDataFoundDiv.hide();



	//  Create context for the AJAX call back
	var context = { proteinSequenceData: param.data  };


	var startTimeTracking = (new Date).getTime();


	
	var serviceURL = this.serviceURLs.serviceURL_GetSecondaryStructure_Prefix +
		this.SECONDARY_STRUCTURE_TYPE_CONSTANTS.filename_main + 
		this.SECONDARY_STRUCTURE_TYPE_CONSTANTS.filename_Suffix;
	

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

//					$noDataFoundDiv.show();
					
					throw "data file not found: " + serviceURL;
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {

				objectThis.deleteLoadingSpinner(  );
				
				if ( errorThrown !== "Not Found" ) {  //  Not " File not found: " since   File not found handled by "404:" code above 
					
					handleGeneralServerError( { exception: errorThrown, jqXHR: jqXHR, textStatus: textStatus } );
				}

			},
//			data: ajaxData,  //  The data sent as params on the URL
			dataType : "text"
		});

};


////////////////////////////////

Create_MasonViewer_SecondaryStructure.prototype.createCoverageMapMainProcessResponse = function( param ) {



	var objectThis = this;

	var calledContext = param.context;


	var calledContext = param.context;
	
	var proteinSequenceData = calledContext.proteinSequenceData;

	var secondaryStructureDataFileFromServer = param.data;


	try {
		var $rootDivPeptide_coverage = this.$masonViewerRootDiv;

//		var $rootDivPeptide_coverage = this.$root_block.find(".peptide-coverage-viewer");


		var createMasonViewerInputDataParams = { secondaryStructureDataFileFromServer: secondaryStructureDataFileFromServer, 
				proteinSequenceData: proteinSequenceData };
		
		var masonViewerInputData = this.createMasonViewerInputData( createMasonViewerInputDataParams );

		
		var requestParams = { inputData: masonViewerInputData };
		
		var configParams = {};

		
		var callbackFunctionsObj = masonViewerPeptipediaSecondaryStructureCallbacksCreator( { config: null } );



		var masonViewer = MasonViewer.createMasonViewer( $rootDivPeptide_coverage, requestParams, configParams, callbackFunctionsObj );

		if ( this.config.masonViewerRegistry ) {
			
			//   itemKey has to be unique across all the viewers registered with a specific registry
			this.config.masonViewerRegistry.addMasonViewer( { itemKey: "secondaryStructure", masonViewer: masonViewer } );
		}

		this.proteinCoverageViewers = { masonViewer: masonViewer };
		
		this.setCoverageMapCreated( true );

		return this.proteinCoverageViewers;

//	} catch ( error ) {
//
//		throw error;

	} finally {

		this.deleteLoadingSpinner(  );

	}

};


////////////////////////////////////

//        Take the SecondaryStructure data from the SecondaryStructure web app and reformat as needed for the Mason coverage viewer

//            Always have one row, even if empty

Create_MasonViewer_SecondaryStructure.prototype.createMasonViewerInputData = function( param  ) {


	var secondaryStructureDataFileFromServer = param.secondaryStructureDataFileFromServer;
	
	var proteinSequenceLength = param.proteinSequenceData.length;
	

	
	var blockItems = new Array();
	
	var masonViewerInputData 
		= { maxSequenceLength: proteinSequenceLength , 
			rowItems: [ { label: this.VIEWER_ROW_LABEL, blockItems: blockItems } ]
			
		  };
	
	

	//		Javascript to convert all line endings to \n

	secondaryStructureDataFileFromServer = secondaryStructureDataFileFromServer.replace(/(\r\n|\r|\n)/g, '\n');

	//    Split into an array of lines
	
	var dataLines = secondaryStructureDataFileFromServer.split(/\n/g);


	var prevType = "";
	
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

		
		var type = dataLineSplit[ 3 ];
		
		if ( type === this.SECONDARY_STRUCTURE_TYPE_CONSTANTS.BETA_SHEET || type === this.SECONDARY_STRUCTURE_TYPE_CONSTANTS.ALPHA_HELIX ) {

		
			var positionString = dataLineSplit[ 1 ];
			
			var position = parseInt( positionString, 10 );
			
			if ( isNaN( position ) ) {
				
				throw "Position parse failed for position string: |" + positionString + "|, dataLine: " + dataLine;
			}
			
			if ( type !== prevType || position > ( endPosition + 1 )  ) {
				
				if ( startPosition !== startPositionInitializationValue ) {
					
					//  not first group so save this group
					
					this.addGroupToArray( { blockItems: blockItems, startPosition: startPosition, endPosition: endPosition, type: prevType  } );
				}
									
				startPosition = position;
			}
			endPosition = position;

			prevType = type;

		}
		
		var z = 0;
		
		
	}
	
					
	if ( startPosition !== startPositionInitializationValue ) {

		//  add last group
		
		this.addGroupToArray( { blockItems: blockItems, startPosition: startPosition, endPosition: endPosition, type: prevType  } );
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

Create_MasonViewer_SecondaryStructure.prototype.addGroupToArray = function( param ) {
	
	var blockData = { type: param.type };

	var blockItem = { startPos: param.startPosition , endPos: param.endPosition , blockData: blockData };

	param.blockItems.push( blockItem );
	
};






///////////////////////////////////

Create_MasonViewer_SecondaryStructure.prototype.createLoadingSpinner = function() {

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


Create_MasonViewer_SecondaryStructure.prototype.deleteLoadingSpinner = function(  ) {
	
//	this.loadingSpinner.stop();
//
//	var $spinnerContainer = this.$root_block.find(".coverage-map-loading-spinner-block");
//
//	$spinnerContainer.hide();

};