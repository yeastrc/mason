
//   disordered_regions_prediction_creator.js


//   This is the code that initiates

//   the creation of the Mason Viewer

//   for the Disordered regions Prediction viewer


//   Depends on jquery, Modernizr SVG support detection



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";



 //  constructor
var Create_MasonViewer_DisorderedRegions_Pre_Built = function( params ) {


	this.coverageMapCreated = false; //

	this.masonViewers = undefined;

	this.config = params.config;

	this.$masonViewerRootDiv = this.config.$masonViewerRootDiv;


	this.$masonViewerRootDiv = this.config.$masonViewerRootDiv;
	
	if ( this.config.$masonViewerRootDiv === undefined || this.config.$masonViewerRootDiv === null ) {
		
		throw "invalid config, config.$masonViewerRootDiv === undefined or null";
	}
	
	if ( this.config.$masonViewerRootDiv.length === 0 ) {
		
		throw "invalid config, config.$masonViewerRootDiv.length === 0, no HTML elements found";
	}
	
	if ( this.config.$masonViewerRootDiv.length > 1 ) {
		
		throw "invalid config, config.$masonViewerRootDiv.length > 1, more than one HTML element found";
	}
	
};



Create_MasonViewer_DisorderedRegions_Pre_Built.prototype.VIEWER_ROW_LABEL = "Disordered";


Create_MasonViewer_DisorderedRegions_Pre_Built.prototype.DISORDERED_REGIONS_TYPE_CONSTANTS = {

			 DISORDERED : "*",
};



/////////////

Create_MasonViewer_DisorderedRegions_Pre_Built.prototype.isCoverageMapCreated = function(  ) {

	return this.coverageMapCreated;
};


/////////////

Create_MasonViewer_DisorderedRegions_Pre_Built.prototype.setCoverageMapCreated = function( param ) {

	this.coverageMapCreated = param;
};



Create_MasonViewer_DisorderedRegions_Pre_Built.prototype.createCoverageMapIfNotCreated = function(  ) {

	if ( ! this.isCoverageMapCreated() ) {

		this.createCoverageMap();
	}


};



//////////////////////////////

//

Create_MasonViewer_DisorderedRegions_Pre_Built.prototype.createCoverageMap = function(  ) {

	var objectThis = this;

	var svgSupport = Modernizr.svg;

	if ( ! svgSupport ) {  //  is false if SVG not supported


		var $svgNotSupported = this.config.$svgNotSupportedDiv;

		$svgNotSupported.show();

//		this.$masonViewerRootDiv.hide();


		return null;
	}

	if ( this.config.sequence !== undefined ) {
		
		var callbackFcnParam = { data: this.config.sequence };
		
		objectThis.createCoverageMapMain( callbackFcnParam );
		
	} else {
	
		var loadMatchingProteinSequenceParams = {


				sequence_file_uri: this.config.sequence_file_uri,

				callbackFcn: function( callbackFcnParam ) {

					objectThis.createCoverageMapMain( callbackFcnParam );
				}
		};

		objectThis.loadMatchingProteinSequence( loadMatchingProteinSequenceParams );
	
	}

};



Create_MasonViewer_DisorderedRegions_Pre_Built.prototype.createCoverageMapMain = function( param ) {


	var objectThis = this;


	//  Create context for the AJAX call back
	var context = { proteinSequenceData: param.data  };




	var serviceURL = this.config.disordered_regions_file_uri; 
	

	$.ajax(
		{ url : serviceURL,

			success :  function( data ) {

				objectThis.createCoverageMapMainProcessResponse( { data: data, context: context } );



			},
			statusCode: {
				404: function() {
					
					objectThis.config.$mason_viewer_failed_to_create.show();
					
					throw "data file not found: " + serviceURL;
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {

//				alert("AJAX error file Disordered Regions file: " + serviceURL );			

				objectThis.config.$mason_viewer_failed_to_create.show();
					
				throw "error retrieving data file: " + serviceURL + ", jqXHR: " + jqXHR;
			},
			dataType : "text"
		});

};


////////////////////////////////

Create_MasonViewer_DisorderedRegions_Pre_Built.prototype.createCoverageMapMainProcessResponse = function( param ) {



	var objectThis = this;

	var calledContext = param.context;
	
	var proteinSequenceData = calledContext.proteinSequenceData;

	var dataFileFromServer = param.data;


	try {
		var $rootDivPeptide_coverage = this.$masonViewerRootDiv;

//		var $rootDivPeptide_coverage = this.$root_block.find(".peptide-coverage-viewer");

		var createMasonViewerInputDataParams = { disorderedRegionsPredictionDataFromServer: dataFileFromServer, 
				proteinSequenceData: proteinSequenceData };

		var masonViewerInputData = this.createMasonViewerInputData( createMasonViewerInputDataParams );


		var requestParams = { inputData: masonViewerInputData };

		var configParams = 
			{ 
				ALIGNMENT_LINE_COLOR: "orange" // "#FFFF00", //  yellow
			};
		


		var callbackFunctionsObj = masonViewer_DisorderedRegions_Pre_Built_CallbacksCreator( { config: null } );



		var masonViewer = MasonViewer.createMasonViewer( $rootDivPeptide_coverage, requestParams, configParams, callbackFunctionsObj );

		if ( this.config.masonViewerRegistry ) {

			//   itemKey has to be unique across all the viewers registered with a specific registry
			this.config.masonViewerRegistry.addMasonViewer( { itemKey: "disorderedRegions", masonViewer: masonViewer } );
		}

		this.masonViewers = { masonViewer: masonViewer };

		this.setCoverageMapCreated( true );

		return this.masonViewers;
		
	} catch ( error ) {

		this.config.$mason_viewer_failed_to_create.show();
		
		throw error;

	} finally {


	}

};


////////////////////////////////////

//        Take the DisorderedRegions data from the DisorderedRegions web app and reformat as needed for the Mason coverage viewer

//            Always have one row, even if empty

Create_MasonViewer_DisorderedRegions_Pre_Built.prototype.createMasonViewerInputData = function( param ) {



	var disorderedRegionsPredictionDataFromServer = param.disorderedRegionsPredictionDataFromServer;
	
	var proteinSequenceLength = param.proteinSequenceData.length;
	
	
	var blockItems = new Array();

	var masonViewerInputData
		= { maxSequenceLength: proteinSequenceLength ,
			rowItems: [ { label: this.VIEWER_ROW_LABEL, blockItems: blockItems } ]

		  };



	//		Javascript to convert all line endings to \n

	disorderedRegionsPredictionDataFromServer = disorderedRegionsPredictionDataFromServer.replace(/(\r\n|\r|\n)/g, '\n');

	//    Split into an array of lines

	var dataLines = disorderedRegionsPredictionDataFromServer.split(/\n/g);


	var prevType = "";

	var startPositionInitializationValue = -1;

	var startPosition = startPositionInitializationValue;
	var endPosition = startPositionInitializationValue;

	//  lineIndex = 5  so start at 6th line where the data actually starts

	for ( var lineIndex = 5; lineIndex < dataLines.length; lineIndex++ ) {

		var dataLine = dataLines[ lineIndex ];

		if ( dataLine.length === 0 || dataLine.charAt( 0 ) === "#"  ) {

			continue;
		}

		//  dataline:  "   1 M C   1.000  0.000  0.000",  after split, index zero === "", index 1 === "1", index 2 === "M", ...

		var dataLineSplit = dataLine.split(/\s+/g);


		var type = dataLineSplit[ 3 ];

		if ( type === this.DISORDERED_REGIONS_TYPE_CONSTANTS.DISORDERED ) {


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

Create_MasonViewer_DisorderedRegions_Pre_Built.prototype.addGroupToArray = function( param ) {

	var blockData = { type: param.type };

	var blockItem = { startPos: param.startPosition , endPos: param.endPosition , blockData: blockData };

	param.blockItems.push( blockItem );

};





///////////////////////////////////

Create_MasonViewer_DisorderedRegions_Pre_Built.prototype.loadMatchingProteinSequence = function ( param ) {

	var objectThis = this;
	
	var sequence_file_uri = param.sequence_file_uri;

	var context = { callbackFcn : param.callbackFcn };




	var serviceURL = sequence_file_uri;

	$.ajax(
			{ url : serviceURL,

				success :  function( data ) {

					objectThis.loadMatchingProteinSequenceProcessResponse( { data: data, context: context } );

//					var timeTrackingDiffViewersCreated = (new Date).getTime() - startTimeTracking;

//					alert( "timeTrackingDiffDataRetrieved: " + timeTrackingDiffDataRetrieved + ", timeTrackingDiffViewersCreated: " + timeTrackingDiffViewersCreated );


				},
				statusCode: {
					404: function() {

//						alert("File not found: " + serviceURL );
						
						objectThis.config.$mason_viewer_failed_to_create.show();
						
						throw "data file not found: " + serviceURL;
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {

//					alert("Error loading file: " + serviceURL );
					
					objectThis.config.$mason_viewer_failed_to_create.show();
					
					throw "Error loading file: " + serviceURL;


				},
				dataType : "text"
			});



};



///////////////////////////////////

Create_MasonViewer_DisorderedRegions_Pre_Built.prototype.loadMatchingProteinSequenceProcessResponse = function( param ) {

	var data = param.data;

	var context = param.context;

	var callbackFcn = context.callbackFcn;


	var callbackFcnParam = { data: data };

	callbackFcn( callbackFcnParam );

};


