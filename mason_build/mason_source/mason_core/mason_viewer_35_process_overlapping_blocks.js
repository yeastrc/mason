
//   mason_viewer_process_overlapping_peptides.js

//     This is a part of MasonViewer


//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";

/*
 * Sort by start position ascending then end position descending
 */
MasonViewerPerInstance.prototype.combineOverlaps_Z_compareForSortBlocks = function( a, b ) {

	if ( a.blockStartPos === b.blockStartPos ) {

		return b.blockEndPos - a.blockEndPos;
	}

	return a.blockStartPos - b.blockStartPos;
};


/*
 * Shallow Copy Array
 */
MasonViewerPerInstance.prototype.copyArray = function( inputArray ) {

	var outputArray = inputArray.concat();

	return outputArray;
};

/*
 * Shallow Concat Two Arrays
 */
MasonViewerPerInstance.prototype.concatArrays = function( inputArray1, inputArray2 ) {

	var outputArray = inputArray1.concat( inputArray2 );

	return outputArray;
};


/////////////////////////////////////////////////////////////////



MasonViewerPerInstance.prototype.combineOverlapsProteinPositionBased = function( blockItemsInputParam ) {

	var splitAnyEntries = false;



	var splitAnEntryThisIterationOfLoop = true;

	var numTimesSplitAnEntryLoop = 0;

	var blockItemListInput = null;

	//  combine entries first to simplify later processing

	var blockItemListOutput = this.combineEntriesProteinPositionBased( numTimesSplitAnEntryLoop, blockItemsInputParam );

	while ( splitAnEntryThisIterationOfLoop ) {

		numTimesSplitAnEntryLoop++;

		if ( numTimesSplitAnEntryLoop > 200 ) {

			var errorMsg = "combineOverlapsProteinPositionBased(...):  numTimesSplitAnEntryLoop > 200 so throwing exception.  ";

			throw errorMsg;
		}

		//   While entries have been split

		splitAnEntryThisIterationOfLoop = false;


		blockItemListInput = blockItemListOutput;

		blockItemListOutput = [];


		//  Split entries

		blockItemListInput.sort( this.combineOverlaps_Z_compareForSortBlocks );

		var index = -1;

		while ( ( ++index ) < blockItemListInput.length ) {

			var blockItem = blockItemListInput[ index ];

			if ( index === ( blockItemListInput.length - 1 ) ) {

				//  if is last entry( and not processed yet below ), put in output list.

				blockItemListOutput.push( blockItem );

			} else {

				var blockItemNext = blockItemListInput[ index + 1 ];

				if ( blockItem.blockEndPos < blockItemNext.blockStartPos ) {

					//  if not overlap next entry, put in output list.

					blockItemListOutput.push( blockItem );

				} else {

					splitAnEntryThisIterationOfLoop = true;

					splitAnyEntries = true;

					if ( blockItem.blockStartPos === blockItemNext.blockStartPos ) {

						//  If same start point, the current entry is longer so split to end of next and what is left

						//  Split current entry to before next next entry and starts at next entry


						var blockItemSplitBefore
						= {
							blockDataItems: this.copyArray( blockItem.blockDataItems ),
							blockStartPos: blockItem.blockStartPos,
							blockEndPos: blockItemNext.blockEndPos
						};

						var blockItemSplitAfter
						= {
							blockDataItems: this.copyArray( blockItem.blockDataItems ),
							blockStartPos: blockItemNext.blockEndPos + 1,
							blockEndPos: blockItem.blockEndPos
						};

						blockItemListOutput.push( blockItemSplitBefore );
						blockItemListOutput.push( blockItemSplitAfter );

					} else {

						//  Split current entry to before next entry and starts at next entry

						var blockItemSplitBefore
						= {
							blockDataItems: this.copyArray( blockItem.blockDataItems ),
							blockStartPos: blockItem.blockStartPos,
							blockEndPos: ( blockItemNext.blockStartPos - 1 )
						};

						var blockItemSplitAfter
						= {
							blockDataItems: this.copyArray( blockItem.blockDataItems ),
							blockStartPos: blockItemNext.blockStartPos,
							blockEndPos: blockItem.blockEndPos
						};


						blockItemListOutput.push( blockItemSplitBefore );
						blockItemListOutput.push( blockItemSplitAfter );

					}
				}
			}
		}


		blockItemListOutput = this.combineEntriesProteinPositionBased( numTimesSplitAnEntryLoop, blockItemListOutput);

	}


	var finalOutput = { splitAnyEntries: splitAnyEntries, outputList: blockItemListOutput };

	return finalOutput;
};


///////////////////////////////////////////////////



MasonViewerPerInstance.prototype.combineEntriesProteinPositionBased = function( numTimesSplitAnEntryLoop, blockItemListInput ) {



		var blockItemListOutput = [];
		var index;

		blockItemListInput.sort( this.combineOverlaps_Z_compareForSortBlocks );


		index = -1;
		while ( ( ++index ) < blockItemListInput.length ) {

			var blockItem = blockItemListInput[ index ];

			if ( index === ( blockItemListInput.length - 1 ) ) {

				//  if is last entry( and not processed yet below ), put in output list.

				blockItemListOutput.push( blockItem );

			} else {

				var indexNext = index;

				while ( ( ++indexNext ) < blockItemListInput.length ) {

					var blockItemNext = blockItemListInput[ indexNext ];

					if ( blockItem.blockStartPos === blockItemNext.blockStartPos
							&& blockItem.blockEndPos === blockItemNext.blockEndPos ) {

						index = indexNext;

						blockItem.blockDataItems = this.concatArrays( blockItem.blockDataItems, blockItemNext.blockDataItems );


					} else {

						break;
					}

				}

				blockItemListOutput.push( blockItem );
			}
		}


		return blockItemListOutput;
};
