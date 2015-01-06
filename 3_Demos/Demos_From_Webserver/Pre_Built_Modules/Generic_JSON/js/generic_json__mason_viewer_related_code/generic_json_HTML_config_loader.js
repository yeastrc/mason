
//   generic_json_HTML_config_loader.js

//   This is the code that finds the 

//   Generic JSON Mason Viewer Divs and gets the 

//   data for creating for the Generic JSON viewer


//   Depends on jquery, Modernizr SVG support detection



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


//jQuery method of running code when page is loaded

$(document).ready( function(){
	
	//  Run on a separate event so an error 
	//  doesn't stop anything else from running on document ready.

	setTimeout(function(){
	
	
		var $generic_json_mason_viewer = $(".generic-json-mason-viewer");

		if ( $generic_json_mason_viewer.length === 0 ) {

			throw "No HTML elements with class of 'generic-json-mason-viewer' to process";
		}


		$generic_json_mason_viewer.each( function( index, Element ) {

			var rootElement = this;

			//  Run creating each viewer on a separate event so an error in one
			//  doesn't stop anything else from running on document ready.

			setTimeout(function(){

				var $masonViewerRootDiv = $(rootElement);

				//  "#svg-not-supported" specifies id of div on page that will be shown if SVG is not supported.
				//  $svg_not_supported.show();  is called.

				var $svg_not_supported = $(".mason-viewer-svg-not-supported");

				var $mason_viewer_failed_to_create = $(".mason-viewer-generic-json-failed-to-create");

				var $mason_enclosing_div = $masonViewerRootDiv.closest(".mason-enclosing-div");

				if ( $mason_enclosing_div.length !== 0 ) {

					$svg_not_supported = $mason_enclosing_div.find(".mason-viewer-svg-not-supported");

					$mason_viewer_failed_to_create = $mason_enclosing_div.find(".mason-viewer-generic-json-failed-to-create");
				}
				


				var mason_data_json_file_uri = $masonViewerRootDiv.attr("mason_data_json_file_uri");

				if ( mason_data_json_file_uri === undefined || mason_data_json_file_uri === null ||
						mason_data_json_file_uri === "" ) {


					$mason_viewer_failed_to_create.show();

					throw "mason_data_json_file_uri must have a value";
				}


				var create_MasonViewer_Generic_JSON_Pre_Built_ConstructorParams =
				{ config: 
				{ 
					mason_data_json_file_uri: mason_data_json_file_uri,

					$masonViewerRootDiv: $masonViewerRootDiv,
					$svgNotSupportedDiv: $svg_not_supported,
					$mason_viewer_failed_to_create: $mason_viewer_failed_to_create } };

				var create_MasonViewer_Generic_JSON_Pre_Built = new Create_MasonViewer_Generic_JSON_Pre_Built( create_MasonViewer_Generic_JSON_Pre_Built_ConstructorParams );

				create_MasonViewer_Generic_JSON_Pre_Built.createCoverageMapIfNotCreated();
				
			}, 10);


		});

	}, 10);

	
});


