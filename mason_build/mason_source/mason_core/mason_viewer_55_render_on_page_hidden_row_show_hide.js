
//   mason_viewer_render_on_page_hidden_row_show_hide.js

//     This is a part of MasonViewer




//////////////  !!!!!!!!!!!!!   Order of calling "precompute" call backs.

///////    For the Main blocks and the Hidden blocks, the precompute is called for each block right before the call to get the color

///////    For the Totals Per Row blocks on the right, the precompute is called for all the rows before the get color and size is called for each block

//////     For the Totals Row, the precompute is called for all the rows before the get color is called for each block



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";

//  https://github.com/wout/svg.js#animating-elements

// Svg.js has a dedicated color module handling different types of colors. Accepted values are:
//  hex string; three based (e.g. #f06) or six based (e.g. #ff0066)
//  rgb string; e.g. rgb(255, 0, 102)
//  rgb object; e.g. { r: 255, g: 0, b: 102 }


//   Visible as attributes in the DOM
//		blockBlockSVG.data( "label", { d1: 12, d4: "wwww"} );

//   NOT Visible as attributes in the DOM
//		blockBlockSVG.remember('oldBBox', { d1: 12, d4: "wwww"} );

//   SVG.js remember method doesn't just save a reference to an object so not using it

//  !!!!!!!!!!!  All variables that have SVG in them but not "$" are some instance of a type from the svg.js library  !!!!!!!!


	/////////////////////////////////

	//   Handling clicking to show or hide the hidden blocks for a row for a label.

	//     The click bubbles up to the group.  Using jQuery since SVG.js click handling allowed the click to continue bubbling up

	MasonViewerPerInstanceRenderOnPage.prototype. clickShowHideToggleHiddenBlocksRow = function( event, ui, clickThis /* "this" for the clicked on element */ ) {

		var objectThis = this;

		var $clickThis = $(clickThis);

		var $rowMainGroup = this.get$rowMainGroupFor$currentElement( $clickThis );

		var SVGrowMainGroupProgramaticDataStorage =  this.getProgramaticDataStorageFromJQueryItem( $rowMainGroup );


		//  retrieve and run the callback that will create the hidden blocks if they are not already created

		var createHiddenBlocksIfNotCreatedCallback = SVGrowMainGroupProgramaticDataStorage.getCreateHiddenBlocksIfNotCreatedCallback();

		createHiddenBlocksIfNotCreatedCallback();


		var hiddenBlocksForRowSet = SVGrowMainGroupProgramaticDataStorage.getHiddenBlocksForRowSet( );

		//  Only perform this transform and show if there is a set of blocks to uncover and show
		if ( hiddenBlocksForRowSet !== undefined && hiddenBlocksForRowSet !== null ) {


			var SVGRowXmainBlocksGROUP = SVGrowMainGroupProgramaticDataStorage.getSVGRowXmainBlocksGROUP();

			var hiddenBlocksHeight = SVGrowMainGroupProgramaticDataStorage.getHiddenBlocksHeight();

			var SVGGroupExpansionIcon = SVGrowMainGroupProgramaticDataStorage.getSVGGroupExpansionIcon();

			var mainBlocksBoxUnderEachRow = SVGrowMainGroupProgramaticDataStorage.getMainBlocksBoxUnderEachRow();

			var hiddenBlocksBoxUnderEachRow = SVGrowMainGroupProgramaticDataStorage.getHiddenBlocksBoxUnderEachRow();


			var SVGoGroupToMove = SVGrowMainGroupProgramaticDataStorage.getGroupToMoveForExpansion();

			//		var rowIdx = SVGofThis.data( "row-rowIdx" );
					
			var animateAdjustChildGroupOfRowsVerticalOffset = true;

			if ( SVGoGroupToMove ) {

				animateAdjustChildGroupOfRowsVerticalOffset = false;

			}
					
			if ( SVGrowMainGroupProgramaticDataStorage.getHiddenBlocksVisible() ) {

				hiddenBlocksForRowSet.hide();

				if ( hiddenBlocksBoxUnderEachRow !== undefined ) {
					hiddenBlocksBoxUnderEachRow.hide();
				}

				if ( mainBlocksBoxUnderEachRow !== undefined ) {
					mainBlocksBoxUnderEachRow.show();
				}

				if ( SVGRowXmainBlocksGROUP !== undefined ) {
					SVGRowXmainBlocksGROUP.show();
				}

				SVGGroupExpansionIcon.show();

				var yToTransformTo = 0;

				var functionToRunAfterAnimate = function(){

					SVGrowMainGroupProgramaticDataStorage.setHiddenBlocksVisible( false );

					var adjustChildParams = {
						
						animateAdjustChildGroupOfRowsVerticalOffset: animateAdjustChildGroupOfRowsVerticalOffset,
						$rowMainGroup: $rowMainGroup
					};

					objectThis.adjustChildGroupOfRowsVerticalOffset( adjustChildParams );
					
					objectThis.resizeOverallImageLength();
				};

				var animateTransformYParams = {
					SVGoGroupToMove: SVGoGroupToMove,
					yToTransformTo: yToTransformTo,
					functionToRunAfterAnimate: functionToRunAfterAnimate
				};


				if ( SVGoGroupToMove ) { 

					this.animateTransformY( animateTransformYParams );

				} else {

					//  no group to move so just run the next part
					functionToRunAfterAnimate();
				}


			} else {

				if ( SVGRowXmainBlocksGROUP !== undefined ) {
					SVGRowXmainBlocksGROUP.hide();
				}

				if ( mainBlocksBoxUnderEachRow !== undefined ) {
					mainBlocksBoxUnderEachRow.hide();
				}

				var yToTransformTo = hiddenBlocksHeight;

				var functionToRunAfterAnimate = function(){

					hiddenBlocksForRowSet.show();

					if ( hiddenBlocksBoxUnderEachRow !== undefined ) {
						hiddenBlocksBoxUnderEachRow.show();
					}

					SVGGroupExpansionIcon.hide();

					SVGrowMainGroupProgramaticDataStorage.setHiddenBlocksVisible( true );

					var adjustChildParams = {
						
						animateAdjustChildGroupOfRowsVerticalOffset: animateAdjustChildGroupOfRowsVerticalOffset,
						$rowMainGroup: $rowMainGroup
					};

					objectThis.adjustChildGroupOfRowsVerticalOffset( adjustChildParams );

					objectThis.resizeOverallImageLength();
				};

				var animateTransformYParams = {
					SVGoGroupToMove: SVGoGroupToMove,
					yToTransformTo: yToTransformTo,
					functionToRunAfterAnimate: functionToRunAfterAnimate
				};
				
				
				if ( SVGoGroupToMove ) { 

					this.animateTransformY( animateTransformYParams );

				} else {

					//  no group to move so just run the next part
					functionToRunAfterAnimate();
				}
				
			}

		}

		return false; // to stop bubbling up the click
	};

	/////////////////////////////

	/////////////////////////////////

	//   Ajust the vertical offset of the Child group of rows to account for the new height in the current group of rows  

	MasonViewerPerInstanceRenderOnPage.prototype. adjustChildGroupOfRowsVerticalOffset = function( params ) {

//		var objectThis = this;
		
		var $rowMainGroup = params.$rowMainGroup;
		var animateAdjustChildGroupOfRowsVerticalOffset = params.animateAdjustChildGroupOfRowsVerticalOffset;
		
		var $groupOfRows = this.get$groupOfRowsFor$currentElement($rowMainGroup );
		
		var SVGgroupOfRows = this.getSVG_js_itemForJQueryObj( $groupOfRows );
		
		var groupOfRowsSVGgroupProgramaticStorage = this.getProgramaticDataStorageFromSVG_js_Item( SVGgroupOfRows );
		
		var childGroupOfRowsProgramaticDataStorageGroupOfRows = groupOfRowsSVGgroupProgramaticStorage.getNextProgramaticDataStorageGroupOfRows();
		
		if ( childGroupOfRowsProgramaticDataStorageGroupOfRows ) {

			var SVGgroupOfRowXandBelow = groupOfRowsSVGgroupProgramaticStorage.getFirstOutputRowSVGGroup();

			var totalHiddenRowsVerticalOffset = 0; 

			while ( SVGgroupOfRowXandBelow ) {

				var rowProgramaticStorage = this.getProgramaticDataStorageFromSVG_js_Item( SVGgroupOfRowXandBelow );

				if ( rowProgramaticStorage.getHiddenBlocksVisible() ) {

					totalHiddenRowsVerticalOffset += rowProgramaticStorage.getHiddenBlocksHeight();
				}

				SVGgroupOfRowXandBelow = rowProgramaticStorage.getGroupToMoveForExpansion();
			}

			var childGroupOfRows = childGroupOfRowsProgramaticDataStorageGroupOfRows.getSVGGroup();
			
			if ( animateAdjustChildGroupOfRowsVerticalOffset ) {
			
				var animateTransformYParams = {
					SVGoGroupToMove: childGroupOfRows,
					yToTransformTo: totalHiddenRowsVerticalOffset,
					functionToRunAfterAnimate: function(){}
				};
	
				this.animateTransformY( animateTransformYParams );
				
			} else {
				
				childGroupOfRows.transform( { y: totalHiddenRowsVerticalOffset } );
			}
		}
	};
