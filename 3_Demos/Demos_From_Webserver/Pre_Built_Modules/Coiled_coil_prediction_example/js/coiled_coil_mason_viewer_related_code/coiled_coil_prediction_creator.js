
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

	this.config = params.config;


	if ( this.config.pScoreCutoff_CONSTANT === undefined || this.config.pScoreCutoff_CONSTANT === null ) {

		throw "invalid config, config.pScoreCutoff_CONSTANT === undefined or null";
	}


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




Create_MasonViewer_CoiledCoil.prototype.VIEWER_ROW_LABEL = "Coiled-coil";






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



Create_MasonViewer_CoiledCoil.prototype.createCoverageMapMain = function( param ) {


	var objectThis = this;


	//  Create context for the AJAX call back
	var context = { proteinSequenceData: param.data  };

	var serviceURL = this.config.paircoil2_file_uri;

	$.ajax(
		{ url : serviceURL,

			success :  function( data ) {

				objectThis.createCoverageMapMainProcessResponse( { data: data, context: context } );

			},
			statusCode: {
				404: function() {

//					alert("Coiled coil file not found: " + serviceURL );

					objectThis.config.$mason_viewer_failed_to_create.show();

					throw "data file not found: " + serviceURL;
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {

//				alert("AJAX error file Coiled coil file: " + serviceURL );

				objectThis.config.$mason_viewer_failed_to_create.show();

				throw "error retrieving data file: " + serviceURL + ", jqXHR: " + jqXHR;

			},
			dataType : "text"
		});

};



////////////////////////////////

Create_MasonViewer_CoiledCoil.prototype.createCoverageMapMainProcessResponse = function( param ) {



//	var objectThis = this;

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

	} catch ( error ) {

		this.config.$mason_viewer_failed_to_create.show();

		throw error;

	} finally {


	}

};


////////////////////////////////////

//        Take the CoiledCoil data from the CoiledCoil web app and reformat as needed for the Mason coverage viewer

//            Always have one row, even if empty

Create_MasonViewer_CoiledCoil.prototype.createMasonViewerInputData = function( param ) {

	var coiledCoilDataFromServer = param.coiledCoilDataFromServer;

	var proteinSequenceLength = param.proteinSequenceData.length;



	var minPScore = null;

	var pScoreCutoff = this.config.pScoreCutoff_CONSTANT;


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

//	var prevPositionIncluded = false;

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

//			prevPositionIncluded = true;

		} else {

//			prevPositionIncluded = false;
		}

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

Create_MasonViewer_CoiledCoil.prototype.loadMatchingProteinSequence = function ( param ) {

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

Create_MasonViewer_CoiledCoil.prototype.loadMatchingProteinSequenceProcessResponse = function( param ) {

	var data = param.data;

	var context = param.context;

	var callbackFcn = context.callbackFcn;


	var callbackFcnParam = { data: data };

	callbackFcn( callbackFcnParam );

};
