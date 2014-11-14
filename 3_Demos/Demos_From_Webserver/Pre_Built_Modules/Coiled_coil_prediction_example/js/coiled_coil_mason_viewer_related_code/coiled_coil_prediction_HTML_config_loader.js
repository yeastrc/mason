
//   coiled_coil_prediction_HTML_config_loader.js

//   This is the code that finds the

//   Coiled Coil Mason Viewer Divs and gets the

//   data for creating for the Coiled Coil Prediction viewer


//   Depends on jquery, Modernizr SVG support detection



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


//jQuery method of running code when page is loaded

$(document).ready( function(){



	//  Run on a separate event so an error
	//  doesn't stop anything else from running on document ready.

	setTimeout(function(){


		var $mason_viewer_coiled_coil = $(".mason-viewer-coiled-coil");

		if ( $mason_viewer_coiled_coil.length === 0 ) {

			throw "No HTML elements with class of 'mason-viewer-coiled-coil' to process";
		}


		$mason_viewer_coiled_coil.each( function( index, Element ) {

			var rootElement = this;

			//  Run creating each viewer on a separate event so an error in one
			//  doesn't stop anything else from running on document ready.

			setTimeout(function(){


				//  "#coiled-coil-mason-viewer" specifies id of div on page that the Mason viewer will be inserted in.

				var $masonViewerRootDiv = $(rootElement);

				//  "#svg-not-supported" specifies id of div on page that will be shown if SVG is not supported.
				//  $svg_not_supported.show();  is called.

				var $svg_not_supported = $(".mason-viewer-svg-not-supported");

				var $mason_viewer_failed_to_create = $(".mason-viewer-coiled-coil-failed-to-create");

				var $mason_enclosing_div = $masonViewerRootDiv.closest(".mason-enclosing-div");

				if ( $mason_enclosing_div.length !== 0 ) {

					$svg_not_supported = $mason_enclosing_div.find(".mason-viewer-svg-not-supported");

					$mason_viewer_failed_to_create = $mason_enclosing_div.find(".mason-viewer-coiled-coil-failed-to-create");
				}


				var paircoil2_file_uri = $masonViewerRootDiv.attr("paircoil2_file_uri");

				var sequence_file_uri = $masonViewerRootDiv.attr("sequence_file_uri");

				var sequence = $masonViewerRootDiv.attr("sequence");

				if ( paircoil2_file_uri === undefined || paircoil2_file_uri === null ||
						paircoil2_file_uri === "" ) {


					$mason_viewer_failed_to_create.show();

					throw "paircoil2_file_uri must have a value";
				}


				if ( ( sequence_file_uri === undefined || sequence_file_uri === null ||
						sequence_file_uri === "" ) &&
						( sequence === undefined || sequence === null ||
								sequence === "" ) ) {


					$mason_viewer_failed_to_create.show();

					throw "sequence or sequence_file_uri must have a value";
				}

				if ( sequence === undefined || sequence === null ||
						sequence === "" ) {

					sequence = undefined; // standardize value for further processing
				}


				var create_MasonViewer_CoiledCoil_ConstructorParams =
				{ config:
				{

					pScoreCutoff_CONSTANT : 0.1,

					//  filenames for coiled coil file and sequence file
					paircoil2_file_uri: paircoil2_file_uri,
					sequence_file_uri: sequence_file_uri,
					sequence: sequence,


					$masonViewerRootDiv: $masonViewerRootDiv,
					$svgNotSupportedDiv: $svg_not_supported,
					$mason_viewer_failed_to_create: $mason_viewer_failed_to_create } };

				var create_MasonViewer_CoiledCoil = new Create_MasonViewer_CoiledCoil( create_MasonViewer_CoiledCoil_ConstructorParams );

				create_MasonViewer_CoiledCoil.createCoverageMapIfNotCreated();


			}, 10);


		});


	}, 10);



});


