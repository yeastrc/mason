
//   mason_viewer_compute_representation.js

//     This is a part of MasonViewer


//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";

//  https://github.com/wout/svg.js#animating-elements

// Svg.js has a dedicated color module handling different types of colors. Accepted values are:
//  hex string; three based (e.g. #f06) or six based (e.g. #ff0066)
//  rgb string; e.g. rgb(255, 0, 102)
//  rgb object; e.g. { r: 255, g: 0, b: 102 }



//  !!!!!!!!!!!  All variables that have SVG in them but not "$" are some instance of a type from the svg.js library  !!!!!!!!

//  Input:

//	requestParams
//	  = {
//	   };


//
//	var dataReformattedToInternalFormat
//		= { "maxSequenceLength": 255,
//			"rowItems": [
//							{"label":"BBpilabel1",
//							"blockItems": [
//											{
//											"blockDataItems": [ {"level":42,"id":85,"otherData":"TheOtherData"} ],
//											"blockStartPos":25,
//											"blockEndPos":37
//											}
//										]
//							}
//						  ]
//			}


//  Output

//   computedData
//     = { outputRows:
//    	  [
//			{ label: "",
//			  splitAnyEntries: true or false,
//			  blockItems: [ as copied from input  ],
//			  mainLineBlocks:
//				[
//				  {
//					blockStartPos: 10,
//					blockEndPos: 15,
//					blockDataItems: [ {"id":85,"otherData":"TheOtherData"} ]
//		  		  }
//		  	    ]
//		    }
//   	  ]
//   	};


   //  An element of outputRows is one row in the output including the label, main line of blocks or overlapping blocks, and hidden blocks


	//   Take the input params and compute an output to be rendered on the page

MasonViewerPerInstance.prototype.computeRepresentation = function( $rootDiv, dataReformattedToInternalFormat, requestParams, configParams ) {


	var objectThis = this;  // copy for use in local functions

		var computedData = { outputRows: [] };



		var outputRows = computedData.outputRows;

		var inputData = dataReformattedToInternalFormat;

		var rowItems = inputData.rowItems;

		for ( var rowItemsIndex = 0; rowItemsIndex < rowItems.length; rowItemsIndex++ ) {

			var rowItem = rowItems[ rowItemsIndex ];

			var blockItems = rowItem.blockItems;

			var splitOutput = objectThis.combineOverlapsProteinPositionBased( blockItems );

			var mainLineBlocks = splitOutput.outputList;

			var outputRow = { label: rowItem.label  , mainLineBlocks: mainLineBlocks, blockItems: blockItems,
				splitAnyEntries: splitOutput.splitAnyEntries, inputRowItem: rowItem.inputRowItem, vertLinesItems: rowItem.vertLinesItems };



			outputRows.push( outputRow );

		}

		return computedData;

};


