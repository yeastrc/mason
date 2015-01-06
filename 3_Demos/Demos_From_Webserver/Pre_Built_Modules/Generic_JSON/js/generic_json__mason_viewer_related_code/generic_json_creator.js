
//   generic_json_creator.js

//   This is the code that initiates

//   the creation of the Mason Viewer

//   for the Generic JSON Prediction viewer


//   Depends on jquery, Modernizr SVG support detection



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";



 //  constructor
var Create_MasonViewer_Generic_JSON_Pre_Built = function( params ) {

	
//	Use params.config.mason_data_json_file_uri to pass in a URI to retrieve the Mason data from
//	    OR
//	Use this.config.mason_data to pass in the Mason data
	
//	 !!!  CANNOT pass in values to both   !!!
	
	

	this.coverageMapCreated = false; //

	this.masonViewers = undefined;

	this.config = params.config;

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

	if ( this.config.mason_data_json_file_uri === undefined && this.config.mason_data === undefined ) {
		
		throw "invalid config, config.mason_data_json_file_uri or config.mason_data must have a value";
	}


	if ( this.config.mason_data_json_file_uri !== undefined && this.config.mason_data !== undefined ) {
		
		throw "invalid config, config.mason_data_json_file_uri and config.mason_data cannot both have a value";
	}

};







/////////////

Create_MasonViewer_Generic_JSON_Pre_Built.prototype.isCoverageMapCreated = function(  ) {

	return this.coverageMapCreated;
};


/////////////

Create_MasonViewer_Generic_JSON_Pre_Built.prototype.setCoverageMapCreated = function( param ) {

	this.coverageMapCreated = param;
};



Create_MasonViewer_Generic_JSON_Pre_Built.prototype.createCoverageMapIfNotCreated = function(  ) {

	if ( ! this.isCoverageMapCreated() ) {

		this.createCoverageMap();
	}


};



//////////////////////////////

//

Create_MasonViewer_Generic_JSON_Pre_Built.prototype.createCoverageMap = function(  ) {

	var objectThis = this;

	var svgSupport = Modernizr.svg;

	if ( ! svgSupport ) {  //  is false if SVG not supported


		var $svgNotSupported = this.config.$svgNotSupportedDiv;

		$svgNotSupported.show();

		this.$masonViewerRootDiv.hide();


		return null;
	}

	if ( this.config.mason_data !== undefined ) {

		var createCoverageMapMainParam = { genericJSONData: this.config.mason_data };

		objectThis.createCoverageMapMain( createCoverageMapMainParam );

	} else {

		objectThis.getMasonDataFromServer();
	}
};



Create_MasonViewer_Generic_JSON_Pre_Built.prototype.getMasonDataFromServer = function( param ) {


	var objectThis = this;


	//  Create context for the AJAX call back
	var context = {  };

	var serviceURL = this.config.mason_data_json_file_uri;

	$.ajax(
		{ url : serviceURL,

			success :  function( data ) {

				objectThis.getMasonDataFromServerProcessResponse( { data: data, context: context } );

			},
			statusCode: {
				404: function() {

//					alert("JSON file not found: " + serviceURL );

					objectThis.config.$mason_viewer_failed_to_create.show();

					throw "data file not found: " + serviceURL;
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {

//				alert("AJAX error file JSON file: " + serviceURL );

				objectThis.config.$mason_viewer_failed_to_create.show();

				throw "error retrieving data file: " + serviceURL + ", jqXHR: " + jqXHR;

			},
			dataType : "json",
			cache: false
		});

};



////////////////////////////////

Create_MasonViewer_Generic_JSON_Pre_Built.prototype.getMasonDataFromServerProcessResponse = function( param ) {

//	var objectThis = this;

	var genericJSONDataFromServer = param.data;

	this.createCoverageMapMain( { genericJSONData:  genericJSONDataFromServer }  );

};


////////////////////////////////

Create_MasonViewer_Generic_JSON_Pre_Built.prototype.createCoverageMapMain = function( param ) {

	
	var genericJSONData = param.genericJSONData;

	try {
		var $rootDivPeptide_coverage = this.$masonViewerRootDiv;

		$rootDivPeptide_coverage.empty();

		var createMasonViewerInputDataParams = { genericJSONData: genericJSONData };

		var masonViewerInputData = this.createMasonViewerInputData( createMasonViewerInputDataParams );


		var requestParams = { inputData: masonViewerInputData };

		var configParams = { skipCreateCombinedLine : true  };  //  set to true to skip create combined line

		var callbackFunctionsObj = masonViewer_Generic_JSON_Pre_Built_CallbacksCreator( { config: null } );

		var masonViewer = MasonViewer.createMasonViewer( $rootDivPeptide_coverage, requestParams, configParams, callbackFunctionsObj );

//		if ( this.config.masonViewerRegistry ) {
//
//			//   itemKey has to be unique across all the viewers registered with a specific registry
//			this.config.masonViewerRegistry.addMasonViewer( { itemKey: "genericJSON", masonViewer: masonViewer } );
//		}

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

//        Take the Generic JSON data from the Generic_JSON web app and reformat as needed for the Mason coverage viewer


Create_MasonViewer_Generic_JSON_Pre_Built.prototype.createMasonViewerInputData = function( param ) {

	var genericJSONData = param.genericJSONData;

	var maxSequenceLength = genericJSONData.maxSequenceLength;

	
	if ( maxSequenceLength === undefined || maxSequenceLength === null ) {
		
		throw 'No "maxSequenceLength" attribute on the JSON';
	}

	
	var genericJSON_Rows = genericJSONData.rows;
	
	if ( genericJSON_Rows === undefined || genericJSON_Rows === null ) {
		
		throw 'No "rows" attribute on the JSON';
	}


	var rowItems = new Array();
	
	var masonViewerInputData
		= { maxSequenceLength: maxSequenceLength ,
			rowItems:rowItems
		  };

	for ( var rowIndex = 0; rowIndex < genericJSON_Rows.length; rowIndex++ ) {

		var genericJSON_SingleRow = genericJSON_Rows[ rowIndex ];

		var rowLabel = genericJSON_SingleRow.label;
		if ( rowLabel === undefined || rowLabel === null ) {
			throw 'No "label" attribute on the row element';
		}

		var rowColor = genericJSON_SingleRow.color;
		if ( rowColor === undefined || rowColor === null ) {
			throw 'No "color" attribute on the row element';
		}
		
		var rowXColor = genericJSON_SingleRow.xcolor;
		if ( rowXColor === undefined || rowXColor === null ) {
			throw 'No "xcolor" attribute on the row element';
		}
		
		var blockItems = new Array();
		var rowData = { rowColor: rowColor, rowXColor: rowXColor };
		
		var rowItem = { label: rowLabel, rowData: rowData, blockItems: blockItems };
		rowItems.push( rowItem );

		var genericJSON_Blocks = genericJSON_SingleRow.blocks;

		for ( var blockIndex = 0; blockIndex < genericJSON_Blocks.length; blockIndex++ ) {
			
			var genericJSON_SingleBlock = genericJSON_Blocks[ blockIndex ];
			
			var startPos = genericJSON_SingleBlock.startPos;
			if ( startPos === undefined || startPos === null ) {
				throw 'No "startPos" attribute on the block element';
			}
			
			var endPos = genericJSON_SingleBlock.endPos;
			if ( endPos === undefined || endPos === null ) {
				throw 'No "endPos" attribute on the block element';
			}
			
			var blockData = { tooltip: genericJSON_SingleBlock.tooltip,
							link: genericJSON_SingleBlock.link };
					
			var blockItem = { startPos: startPos, endPos: endPos,  blockData : blockData };
			
			blockItems.push( blockItem );
		}
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


