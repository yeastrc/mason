
//  load_matching_protein_sequence.js

//   Load the matching sequence from "matching_protein_sequence.txt"




var MATCHING_PROTEIN_SEQUENCE_CONSTANTS = {

	matching_protein_sequence_filename : "matching_protein_sequence.txt"
};


////////////////////////

var loadMatchingProteinSequence = function ( param ) {
	
	var folderName = param.folderName;
	
	var context = { callbackFcn : param.callbackFcn };
	
	


	var serviceURL = folderName +
		MATCHING_PROTEIN_SEQUENCE_CONSTANTS.matching_protein_sequence_filename;


	$.ajax(
		{ url : serviceURL,

			success :  function( data ) {

				loadMatchingProteinSequenceProcessResponse( { data: data, context: context } );

//				var timeTrackingDiffViewersCreated = (new Date).getTime() - startTimeTracking;

//				alert( "timeTrackingDiffDataRetrieved: " + timeTrackingDiffDataRetrieved + ", timeTrackingDiffViewersCreated: " + timeTrackingDiffViewersCreated );


			},
			statusCode: {
				404: function() {
				
					alert("File not found: " + serviceURL );
					
					throw "data file not found: " + serviceURL;
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {

				alert("Error loading file: " + serviceURL );
				
			},
			dataType : "text"
		});

	
	
};


////////////////////////

var loadMatchingProteinSequenceProcessResponse = function( param ) {
	
	var data = param.data;
	
	var context = param.context;
	
	var callbackFcn = context.callbackFcn;

	
	var callbackFcnParam = { data: data };
	
	callbackFcn( callbackFcnParam );
	
};

