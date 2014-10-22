
//   mason_viewer_reformat_data_to_internal_format.js

//     This is a part of MasonViewer


//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";

//   Input format
//
//	var inputData
//		= {"maxSequenceLength": 255,
//			"rowItems": [
//							{"label":"BBpilabel1",
//							"blockItems": [
//											{
//											"blockData":{"level":42,"id":85"},
//											"startPos":25,
//											"endPos":37
//											}
//										]
//							}
//						  ]
//			}


//   Output format - move "blockData" to be an element of "blockDataItems"  copy positions to new names
//
//	var inputData
//		= { "maxSequenceLength": 255,
//			"rowItems": [
//							{"label":"BBpilabel1",
//							"blockItems": [
//											{
//											"blockDataItems": [ {"level":42,"id":85} ],
//											"blockStartPos":25,
//											"blockEndPos":37
//											}
//										]
//							}
//						  ]
//			}
	/*
	 * reformat the provided data to the internal format
	 */
MasonViewerPerInstance.prototype.reformatDataToInternalFormat = function( requestParams ) {

	var inputData = requestParams.inputData;

	
	if ( ! inputData ) {
		
		throw "requestParams.inputData is missing or null";
	}



	if ( inputData.maxSequenceLength === undefined || inputData.maxSequenceLength === null || typeof inputData.maxSequenceLength !== 'number' ) {
		
		throw "requestParams.inputData.maxSequenceLength is missing or null or is not a number";
	}
	
	
	var outputRowItems = [];
	
	

	var inputDataReformatted = { maxSequenceLength: inputData.maxSequenceLength, rowItems: outputRowItems, vertLinesAllRowsItems: inputData.vertLinesAllRowsItems };

	var rowItems = inputData.rowItems;
	
	
	
	if ( ! inputData.rowItems ) {
		
		throw "requestParams.inputData.rowItems is missing or null";
	}
	
	if ( inputData.rowItems.length === 0 ) {
		
		throw "requestParams.inputData.rowItems is empty";
	}



	for ( var rowItemsIdx = 0; rowItemsIdx < rowItems.length; rowItemsIdx++ ) {

		var rowItem = rowItems[ rowItemsIdx ];
		

		if ( rowItem.label === undefined || rowItem.label === null || rowItem.label === "" ) {
			
			throw "requestParams.inputData.rowItems.rowItem[ index ].label is missing or null or is empty for index = " + rowItemsIdx;
		}


		var outputBlockItems = [];

		var blockItems = rowItem.blockItems;
		
		
		if ( ! blockItems ) {
			
			throw "requestParams.inputData.rowItems.rowItem[ index ].blockItems is missing or null for index = " + rowItemsIdx;
		}

		for ( var blockItemsIdx = 0; blockItemsIdx < blockItems.length; blockItemsIdx++ ) {
				
			var blockItem = blockItems[ blockItemsIdx ];
			
			
			if ( blockItem.startPos === undefined ) {
				
				throw "requestParams.inputData.rowItems.rowItem[ rowItemsIdx ].blockItem[ blockItemsIdx ] is missing property 'startPos' rowItemsIdx = " 
					+ rowItemsIdx + ", and blockItemsIdx = " + blockItemsIdx;
			}
			
			if ( blockItem.endPos === undefined ) {
				
				throw "requestParams.inputData.rowItems.rowItem[ rowItemsIdx ].blockItem[ blockItemsIdx ] is missing property 'endPos' rowItemsIdx = " 
					+ rowItemsIdx + ", and blockItemsIdx = " + blockItemsIdx;
			}
			
			
			if ( blockItem.blockData === undefined ) {
				
				throw "requestParams.inputData.rowItems.rowItem[ rowItemsIdx ].blockItem[ blockItemsIdx ] is missing property 'blockData' rowItemsIdx = " 
					+ rowItemsIdx + ", and blockItemsIdx = " + blockItemsIdx;
			}
			
			var outputBlockItem = { blockStartPos: blockItem.startPos, blockEndPos: blockItem.endPos, blockDataItems: [ blockItem.blockData ] };

			outputBlockItems.push( outputBlockItem );
		}


		var outputRowItem = { label: rowItem.label, blockItems: outputBlockItems, inputRowItem: rowItem, vertLinesItems: rowItem.vertLinesItems };

		outputRowItems.push( outputRowItem );
	}


	return inputDataReformatted;
};