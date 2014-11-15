
//   philius_creator.js


//   This is the code that initiates

//   the creation of the Mason Viewer

//   for the Philius viewer on the page


//   Depends on jquery, Modernizr SVG support detection



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";



 //  constructor
var Create_MasonViewer_Philius_Pre_Built = function( params ) {


	this.coverageMapCreated = false; //

	this.masonViewers = undefined;

	this.config = params.config;

	this.$masonViewerRootDiv = this.config.$masonViewerRootDiv;

	this.serviceURLs = {
			base : "http://yeastrc.org/philius/services/",
			submitSequence : "submitSequence/",
			isJobDone : "isJobDone/", //  append job token to end
			getPhiliusResults : "getPhiliusResults/", //  append job token to end 

			suffixForTypeJSONorJSONP : "jsonp",

			addition_jsonpCallback : "?jsonpCallback=?"   // append to end of total URL for JSONP


	};


	
};

//  4 minutes max wait time for Philius job to complete

Create_MasonViewer_Philius_Pre_Built.prototype.TOTAL_ALLOWED_WAIT_FOR_PHILIUS_JOB_TO_COMPLETE_TIME = 4 * 60 * 1000;  



Create_MasonViewer_Philius_Pre_Built.prototype.VIEWER_ROW_LABEL = "TM and SP";  


Create_MasonViewer_Philius_Pre_Built.prototype.PHILIUS_TYPE_CONSTANTS = {
		
			 SP : 0,				// signal peptide segment
			 NON_CYTOPLASMIC : 1,	// non-cytoplastmic segment
			 CYTOPLASMIC : 2,		// cytoplasmic segment
			 TM_HELIX : 3			// transmembrane helix
	};
	
Create_MasonViewer_Philius_Pre_Built.prototype.PHILIUS_TYPE_STRINGS = [
		
		"Signal Peptide",
		"Non-Cytoplasmic",
		"Cytoplasmic",
		"Transmembrane Helix"
	];	
	


/////////////

Create_MasonViewer_Philius_Pre_Built.prototype.isCoverageMapCreated = function(  ) {

	return this.coverageMapCreated;
};


/////////////

Create_MasonViewer_Philius_Pre_Built.prototype.setCoverageMapCreated = function( param ) {

	this.coverageMapCreated = param;
};



Create_MasonViewer_Philius_Pre_Built.prototype.createCoverageMapIfNotCreated = function(  ) {

	if ( ! this.isCoverageMapCreated() ) {

		this.createCoverageMap();
	}


};



//////////////////////////////

//

Create_MasonViewer_Philius_Pre_Built.prototype.createCoverageMap = function(  ) {

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



Create_MasonViewer_Philius_Pre_Built.prototype.createCoverageMapMain = function( param ) {


	var objectThis = this;



	
	var proteinSequenceData = param.data;


	//  Create context for the AJAX call back
	var context = { proteinSequenceData: proteinSequenceData  };

	var ajaxData = { sequence: proteinSequenceData };
	
	

	var ajaxURL = this.serviceURLs.base + this.serviceURLs.submitSequence + this.serviceURLs.suffixForTypeJSONorJSONP +
				this.serviceURLs.addition_jsonpCallback;

	$.ajax(
		{ url : ajaxURL,
			type : "POST",

			success :  function( data ) {



				objectThis.createCoverageMapMainProcessSubmitResponse( { data: data, context: context } );


			},

			error: function(jqXHR, textStatus, errorThrown) {


//				alert("AJAX error communicating with Philius Server: " + serviceURL );			

				objectThis.config.$mason_viewer_failed_to_create.show();
					
				throw "error communicating with Philius Server: " + serviceURL + ", jqXHR: " + jqXHR;
			},
			data: ajaxData,  //  The data sent 
			dataType : "jsonp"
		});

};

////////////////////////////////

Create_MasonViewer_Philius_Pre_Built.prototype.createCoverageMapMainProcessSubmitResponse = function( param ) {

	
	var objectThis = this;


	try {

		var data = param.data;

		var calledContext = param.context;
		
		
		var philiusResult = data.philiusResult;
			
		
		if ( philiusResult !== undefined && philiusResult !== null ) {
			
			//  The philius result is returned so display it
			objectThis.createCoverageMapMainProcessGetPhiliusResultsResponse( { philiusResult: philiusResult, context: calledContext } );
			
		} else {
			
			//  The server has to process the sequence with Philius so have to wait for it

			var token = data.token;

			//  compute a time past not check for Philius job done
			
			var now = new Date().getTime();
	        var maxFinishTime  = now + this.TOTAL_ALLOWED_WAIT_FOR_PHILIUS_JOB_TO_COMPLETE_TIME;
	
			var callingContext = { token: token, maxFinishTime: maxFinishTime };
			
			this.createCoverageMapMainCheckIfPhiliusJobDone( { context: callingContext } );
			
		}

	} finally {

		
	}	
};
		
		

////////////////////////////////

Create_MasonViewer_Philius_Pre_Built.prototype.createCoverageMapMainCheckIfPhiliusJobDone = function( param ) {

	
	var objectThis = this;

	var calledContext = param.context;
	
	var token = calledContext.token;
	

	
	var ajaxURL = this.serviceURLs.base + this.serviceURLs.isJobDone + 
			this.serviceURLs.suffixForTypeJSONorJSONP + "/"  + token + 
			this.serviceURLs.addition_jsonpCallback;
	
	var ajaxData = { };

	$.ajax(
		{ url : ajaxURL,
			
			cache: false,

			success :  function( data ) {

				objectThis.createCoverageMapMainProcessIfPhiliusJobDoneResponse( { data: data, context: calledContext } );

			},

			error: function(jqXHR, textStatus, errorThrown) {

//				alert("AJAX error communicating with Philius Server: " + serviceURL );			

				objectThis.config.$mason_viewer_failed_to_create.show();
					
				throw "error communicating with Philius Server: " + ajaxURL + ", jqXHR: " + jqXHR;
			},
			data: ajaxData,  //  The data sent as params on the URL
			dataType : "jsonp"
		});
};
		
		

////////////////////////////////

Create_MasonViewer_Philius_Pre_Built.prototype.createCoverageMapMainProcessIfPhiliusJobDoneResponse = function( param ) {

	
	var objectThis = this;


	try {

		var data = param.data;

		var calledContext = param.context;	

//		var token = calledContext.token;

		
		if ( data["return"] !== true ) {
			
			var nowTime = new Date().getTime();
			
			if ( nowTime > calledContext.maxFinishTime ) {
				
				//  Have waited too long so do something to display message.
				


//				alert("AJAX error communicating with Philius Server: " + serviceURL );			

				objectThis.config.$mason_viewer_failed_to_create.show();
					
				throw "Took too long getting data from Philius server";
				
			} else {
			
				setTimeout( function() {  //  Check again on a 5 second delay
					
					objectThis.createCoverageMapMainCheckIfPhiliusJobDone( { context: calledContext } );
					
				},5000 /*  delay */ /*,param1,param2 */);  
			}
				
				
		} else {
			this.createCoverageMapMainProcessGetPhiliusResults( { context: calledContext } );
		}	

	} catch ( error ) {


		throw error;
	}	
};
		
		
		

////////////////////////////////

Create_MasonViewer_Philius_Pre_Built.prototype.createCoverageMapMainProcessGetPhiliusResults = function( param ) {

	

	var objectThis = this;

	var calledContext = param.context;
	
	var token = calledContext.token;
	
	var ajaxURL = this.serviceURLs.base + this.serviceURLs.getPhiliusResults +  
			this.serviceURLs.suffixForTypeJSONorJSONP + "/" + token +
			this.serviceURLs.addition_jsonpCallback;
	
	var ajaxData = { };


	try {
		
	
		$.ajax(
			{ url : ajaxURL,
				
				cache: false,

				success :  function( data ) {
	
					objectThis.createCoverageMapMainProcessGetPhiliusResultsResponse( { philiusResult: data["return"], context: calledContext } );
	
				},
				error: function(jqXHR, textStatus, errorThrown) {
	

//					alert("AJAX error communicating with Philius Server: " + serviceURL );			

					objectThis.config.$mason_viewer_failed_to_create.show();
						
					throw "error communicating with Philius Server: " + ajaxURL + ", jqXHR: " + jqXHR;
					
				},
				data: ajaxData,  //  The data sent as params on the URL
				dataType : "json"
			});
		
		

	} catch ( error ) {

		throw error;
	}	
};


////////////////////////////////

Create_MasonViewer_Philius_Pre_Built.prototype.createCoverageMapMainProcessGetPhiliusResultsResponse = function( param ) {



//	var objectThis = this;

//	var calledContext = param.context;

	var philiusResult = param.philiusResult;


	try {
		var $rootDivPeptide_coverage = this.$masonViewerRootDiv;


		var masonViewerInputData = this.createMasonViewerInputData( philiusResult );

		
		var requestParams = { inputData: masonViewerInputData };
		
		var configParams = {};

		
		var callbackFunctionsObj = masonViewer_PhiliusCallbacksCreator_Pre_Built( { config: null } );



		var masonViewer = MasonViewer.createMasonViewer( $rootDivPeptide_coverage, requestParams, configParams, callbackFunctionsObj );

		if ( this.config.masonViewerRegistry ) {
			
			//   itemKey has to be unique across all the viewers registered with a specific registry
			this.config.masonViewerRegistry.addMasonViewer( { itemKey: "philius", masonViewer: masonViewer } );
		}
		
		this.masonViewers = { masonViewer: masonViewer };

		
		this.setCoverageMapCreated( true );

		return this.masonViewers;

//	} catch ( error ) {
//
//		throw error;

	} finally {



	}

};


////////////////////////////////////

//        Take the Philius data from the Philius web app and reformat as needed for the Mason coverage viewer

//            Always have one row, even if empty

Create_MasonViewer_Philius_Pre_Built.prototype.createMasonViewerInputData = function( philiusResult ) {
	
	var sequenceLength = philiusResult.sequence.length;
	
	var segments = philiusResult.segments;
	
	
	
	var blockItems = new Array();
	
	var masonViewerPeptipediaDriverParams 
		= { maxSequenceLength: sequenceLength , 
			rowItems: [ { label: this.VIEWER_ROW_LABEL, blockItems: blockItems } ]
			
		  };
	
	
	for ( var segmentIndex = 0; segmentIndex < segments.length; segmentIndex++ ) {
		
		var segment = segments[ segmentIndex ];
		
		var type = segment.type;
		
		if ( type === this.PHILIUS_TYPE_CONSTANTS.TM_HELIX || type == this.PHILIUS_TYPE_CONSTANTS.SP) {

			var blockData = { segment: segment };

			var blockItem = { startPos: segment.start , endPos: segment.end , blockData: blockData };

			blockItems.push( blockItem );
		}
		
		
		
	}
	
	
//	Create_MasonViewer_Philius_Pre_Built.prototype.PHILIUS_TYPE_CONSTANTS = {
//		
//			 SP : 0,				// signal peptide segment
//			 NON_CYTOPLASMIC : 1,	// non-cytoplastmic segment
//			 CYTOPLASMIC : 2,		// cytoplasmic segment
//			 TM_HELIX : 3			// transmembrane helix
//	};
	
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

	
	return masonViewerPeptipediaDriverParams;
};






///////////////////////////////////

Create_MasonViewer_Philius_Pre_Built.prototype.loadMatchingProteinSequence = function ( param ) {

	var objectThis = this;
	
	var sequence_file_uri = param.sequence_file_uri;

	var context = { callbackFcn : param.callbackFcn };




	var serviceURL = sequence_file_uri;

	$.ajax(
			{ url : serviceURL,

				success :  function( data ) {

					objectThis.loadMatchingProteinSequenceProcessResponse( { data: data, context: context } );


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

Create_MasonViewer_Philius_Pre_Built.prototype.loadMatchingProteinSequenceProcessResponse = function( param ) {

	var data = param.data;

	var context = param.context;

	var callbackFcn = context.callbackFcn;


	var callbackFcnParam = { data: data };

	callbackFcn( callbackFcnParam );

};


