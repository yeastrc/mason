


//   mason_viewer_render_on_page_general_utils.js

//     This is a part of MasonViewer

//   General Utilities


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



	//////////////////////////////////////
	
	MasonViewerPerInstanceRenderOnPage.prototype. convertBlockColorTo_SVGJS_FillColor = function( colorForBlock ) {
	
		//  SVGjs requires the fill color object to be { r: , g: , b: } or to be a string as listed above.

		//  The block callbacks are returning either a hex string six based (e.g. #ff0066)
		//                   or an object with { red: , green: , blue: }
		
		//  If a string is passed in, it will be validated and returned
		
		//  If anything else is passed in, it will be assumed to be the object 
		//  and will be validated and rounded and converted to  { r: , g: , b: }
		

		if ( colorForBlock === undefined || colorForBlock === null ) {

			throw "ERROR: colorForBlock === undefined || colorForBlock === null";
		}

		if (typeof colorForBlock == 'string' || colorForBlock instanceof String) {

			//  Throws Exception if error
			this.isValidColor( colorForBlock );
				
			return colorForBlock;
			

		} else {

			var colorForBlockRoundedAndValidated = this.roundAndValidateColor( colorForBlock );

			var fillColor = { r: colorForBlockRoundedAndValidated.red, g: colorForBlockRoundedAndValidated.green, b: colorForBlockRoundedAndValidated.blue };
			
			return fillColor;
		}
		
		
		throw "Code error in 'convertBlockColorTo_SVGJS_FillColor', should have returned by this point: value passed is: " + colorForBlock;
	};
	


	//////////////////////////////////////
	
	MasonViewerPerInstanceRenderOnPage.prototype. isValidColor = function( colorParam ) {
	

		if (typeof colorParam == 'string' || colorParam instanceof String) {

			
		} else {
			
			throw "'isValidColor' only valid for string input.  colorParam: " + colorParam;
		}
		
//	    if ( colorParam.match(/^#[a-f0-9]{6}$/i) !== null ) {
		
		if ( /^#[a-f0-9]{6}$/i.test( colorParam ) ) {
			
	    	// The pattern is in the string.  
	    	// Since the pattern covers from the start to the end of the string, the whole string is checked.
			
			return; 
	    }
	    
		throw "color is a string but is not a valid hex color with 6 positions  (e.g. #ff0066): value passed is: " + colorParam;

	};

	//	^ match beginning
	//	# a hash
	//	[a-f0-9] any letter from a-f and 0-9
	//	{6} the previous group appears exactly 6 times
	//	$ match end
	//	i ignore case

	//////////////////////////////////////

	MasonViewerPerInstanceRenderOnPage.prototype. roundAndValidateColor = function( colorForBlock ) {

//		var objectThis = this;

		if ( colorForBlock === undefined || colorForBlock === null ) {

			throw "ERROR: colorForBlock === undefined || colorForBlock === null";
		}
		

		if ( colorForBlock.red === undefined || colorForBlock.red === null ) {

			throw "ERROR: colorForBlock.red === undefined || colorForBlock.red === null";
		}

		if ( colorForBlock.green === undefined || colorForBlock.green === null ) {

			throw "ERROR: colorForBlock.green === undefined || colorForBlock.green === null";
		}

		if ( colorForBlock.blue === undefined || colorForBlock.blue === null ) {

			throw "ERROR: colorForBlock.blue === undefined || colorForBlock.blue === null";
		}

		var colorForBlockOut = { red: Math.round( colorForBlock.red  ), green: Math.round( colorForBlock.green  ), blue: Math.round( colorForBlock.blue  ) };

		if ( colorForBlockOut.red < 0 || colorForBlockOut.red > 255 ) {

			throw "colorForBlock.red calculated < 0 or > 255, is = " + colorForBlockOut.red ;
		}


		if ( colorForBlockOut.green < 0 || colorForBlockOut.green > 255 ) {

			throw "colorForBlock.green calculated < 0 or > 255, is = " + colorForBlockOut.green ;
		}



		if ( colorForBlockOut.blue < 0 || colorForBlockOut.blue > 255 ) {

			throw "colorForBlock.blue calculated < 0 or > 255, is = " + colorForBlockOut.blue ;
		}

		return colorForBlockOut;
	};








	//////////////////////////////////////

	//   Get raw SVG element Id for SVG.js item

	MasonViewerPerInstanceRenderOnPage.prototype. getIdForSVG_js_item = function( SVG_js_item ) {

		var id = SVG_js_item.attr('id');

		return id;
	};

	//////////////////////////////////////

	//   Get jQuery Object for SVG.js item

	MasonViewerPerInstanceRenderOnPage.prototype. getJQueryObjForRawSVGFromSVG_js_item = function( SVG_js_item ) {

		if ( SVG_js_item === undefined || SVG_js_item === null ) {

			throw "ERROR: SVG_js_item === undefined || SVG_js_item === null";
		}


		var $jQueryObj = $( SVG_js_item.node );

//		var id = getIdForSVG_js_item( SVG_js_item );
//
//		var $jQueryObj = $( "#" + id );

		return $jQueryObj;
	};


		//////////////////////////////////////

	//   Get SVG.js object for jQuery Object

	MasonViewerPerInstanceRenderOnPage.prototype. getSVG_js_itemForJQueryObj = function( $jQueryObj ) {

		if ( $jQueryObj === undefined || $jQueryObj === null ) {

			throw "ERROR: $jQueryObj === undefined || $jQueryObj === null";
		}

		if ( $jQueryObj.length === 0 ) {

			throw "ERROR: $jQueryObj.length === 0";
		}


		var SVG_js_item = $jQueryObj[0].instance;

		return SVG_js_item;
	};


	
	//////////////////////////////////////////////////////////////
	
	//////   ProgramaticDataStorageGroupOfRows


	//////////////////////////////////////

	//   Add ProgramaticDataStorageGroupOfRows to an jQuery item

	MasonViewerPerInstanceRenderOnPage.prototype. addProgramaticDataStorageGroupOfRowsToJQueryItem = function( $item ) {

		var programaticDataStorageGroupOfRows = new ProgramaticDataStorageGroupOfRows();

		$item.data( MasonViewerPerInstanceRenderOnPage.prototype. CONSTANTS.JQUERY_DATA_LABELS.JQUERY_DATA_LABEL_PROGRAMATIC, programaticDataStorageGroupOfRows );


		programaticDataStorageGroupOfRows.$item = $item; //  For debugging


		return programaticDataStorageGroupOfRows;
	};


	//////////////////////////////////////

	//   Get ProgramaticDataStorageGroupOfRows in an jQuery item

	MasonViewerPerInstanceRenderOnPage.prototype. getProgramaticDataStorageGroupOfRowsFromJQueryItem = function( $item ) {

		var programaticDataStorageGroupOfRows = $item.data( MasonViewerPerInstanceRenderOnPage.prototype. CONSTANTS.JQUERY_DATA_LABELS.JQUERY_DATA_LABEL_PROGRAMATIC );

		if ( programaticDataStorageGroupOfRows === undefined ) {

//			var z = 0;
		}

		return programaticDataStorageGroupOfRows;
	};


	//////////////////////////////////////

	//   Add ProgramaticDataStorageGroupOfRows to an SVG.js item,  added to underlying SVG element via jQuery

	MasonViewerPerInstanceRenderOnPage.prototype. addProgramaticDataStorageGroupOfRowsToSVG_js_Item = function( SVGitem ) {

		var $jQueryItem = this.getJQueryObjForRawSVGFromSVG_js_item( SVGitem );

		return this.addProgramaticDataStorageGroupOfRowsToJQueryItem( $jQueryItem );
	};


	//////////////////////////////////////

	//   Get ProgramaticDataStorageGroupOfRows in an SVG.js item,  retreived from underlying SVG element via jQuery

	MasonViewerPerInstanceRenderOnPage.prototype. getProgramaticDataStorageGroupOfRowsFromSVG_js_Item = function( SVGitem ) {

		var $jQueryItem = this.getJQueryObjForRawSVGFromSVG_js_item( SVGitem );

		var programaticDataStorageGroupOfRows = this.getProgramaticDataStorageGroupOfRowsFromJQueryItem( $jQueryItem );

		return programaticDataStorageGroupOfRows;
	};
	
	
	/////////////////////////////////////////////////////////////
	
	//////////  ProgramaticDataStorage


	//////////////////////////////////////

	//   Add ProgramaticDataStorage to an jQuery item

	MasonViewerPerInstanceRenderOnPage.prototype. addProgramaticDataStorageToJQueryItem = function( $item ) {

		var programaticDataStorage = new ProgramaticDataStorage();

		$item.data( MasonViewerPerInstanceRenderOnPage.prototype. CONSTANTS.JQUERY_DATA_LABELS.JQUERY_DATA_LABEL_PROGRAMATIC, programaticDataStorage );


		programaticDataStorage.$item = $item; //  For debugging


		return programaticDataStorage;
	};


	//////////////////////////////////////

	//   Get ProgramaticDataStorage in an jQuery item

	MasonViewerPerInstanceRenderOnPage.prototype. getProgramaticDataStorageFromJQueryItem = function( $item ) {

		var programaticDataStorage = $item.data( MasonViewerPerInstanceRenderOnPage.prototype. CONSTANTS.JQUERY_DATA_LABELS.JQUERY_DATA_LABEL_PROGRAMATIC );

		if ( programaticDataStorage === undefined ) {

//			var z = 0;
		}

//		if ( programaticDataStorage !== undefined ) {
//
//			programaticDataStorage.$item = $item; //  For debugging
//		}

		return programaticDataStorage;
	};


	//////////////////////////////////////

	//   Add ProgramaticDataStorage to an SVG.js item,  added to underlying SVG element via jQuery

	MasonViewerPerInstanceRenderOnPage.prototype. addProgramaticDataStorageToSVG_js_Item = function( SVGitem ) {

		var $jQueryItem = this.getJQueryObjForRawSVGFromSVG_js_item( SVGitem );

		return this.addProgramaticDataStorageToJQueryItem( $jQueryItem );
	};


	//////////////////////////////////////

	//   Get ProgramaticDataStorage in an SVG.js item,  retreived from underlying SVG element via jQuery

	MasonViewerPerInstanceRenderOnPage.prototype. getProgramaticDataStorageFromSVG_js_Item = function( SVGitem ) {

		var $jQueryItem = this.getJQueryObjForRawSVGFromSVG_js_item( SVGitem );

		var programaticDataStorage = this.getProgramaticDataStorageFromJQueryItem( $jQueryItem );

		return programaticDataStorage;
	};

	//////////////////////////////////


	MasonViewerPerInstanceRenderOnPage.prototype. set_class_directly_OnSVGItem_using_jQuery = function( SVGItem, classValue ) {


		var $SVGItem = this.getJQueryObjForRawSVGFromSVG_js_item( SVGItem );

		$SVGItem.attr( "class", classValue );
	};


	//////////////////////////////////


	MasonViewerPerInstanceRenderOnPage.prototype. set_attr_directly_OnSVGtextItem_using_jQuery = function( SVGtextItem, attrName, attrValue ) {


		var $SVGtextItem = this.getJQueryObjForRawSVGFromSVG_js_item( SVGtextItem );

		$SVGtextItem.attr( attrName, attrValue );

		var $tspanChild = $SVGtextItem.children( "tspan" );

		$tspanChild.attr( attrName, attrValue );
	};

	//////////////////////////////////

	//  Clear the "style" attr on an SVG text item

	//  This hack is being used to clear out the invalid font-size entry

	MasonViewerPerInstanceRenderOnPage.prototype. clearStyleAnd_dy_OnSVGtextItem = function( SVGtextItem ) {

		//  Does not work
//		SVGitem.attr( "style", "" );

		//  Does work

		var $SVGtextItem = this.getJQueryObjForRawSVGFromSVG_js_item( SVGtextItem );

		$SVGtextItem.attr( "style", "" );

		$SVGtextItem.attr( "dy", "" );

		var $tspanChild = $SVGtextItem.children( "tspan" );

		$tspanChild.attr( "style", "" );

		$tspanChild.attr( "dy", "" );

//		var z = 0;
	};


	////////////////////////////////////////////////////////

	//   attach Tool Tip to the provided jquery object using the provided function to get the tool tip text


	MasonViewerPerInstanceRenderOnPage.prototype. attachToolTipToJqueryHtmlNode = function( $htmlNode, getTooltipTextFcn, callbackFunctions ) {

//		var objectThis = this;

		$htmlNode.mouseenter( function(eventObject) {

			var text = getTooltipTextFcn();

			Tip( text, DELAY, 0 );

			if ( callbackFunctions && callbackFunctions.mouseenter ) {

				callbackFunctions.mouseenter( this );
			}
		} );

		$htmlNode.mouseleave( function(eventObject) {

			UnTip();

			if ( callbackFunctions && callbackFunctions.mouseleave ) {

				callbackFunctions.mouseleave( this );
			}

		} );

	};


	//  Not used since switched tool tip library
	
//		$htmlNode.wTooltip({
//				content: true,
//				offsetY: 18,
//				offsetX: 15,
//				callBefore: getTooltipTextFcn,
//
//				clickAction: function(tooltip, node){
//					$(tooltip).hide();
//				},
//				style: {
//					border: "1px solid black",
//					background: "#E8EAFF",
//					fontSize: "8pt",
//					color: "black"
//				}
//			});


	////////////////////////////////////////

	//////    Vertical Lines Representing provided data processing

	///////////////

	//   Create Tool Tip for Vertical Lines Representing provided data processing

	MasonViewerPerInstanceRenderOnPage.prototype. attachMouseOverVerticalLine = function( params  ) {

//		var objectThis = this;
		
		var verticalLineSVG = params.verticalLineSVG;
		var lineData = params.lineData;
		var callbackFunctions = params.callbackFunctions;

		var $verticalLineSVG = this.getJQueryObjForRawSVGFromSVG_js_item( verticalLineSVG );

		var getToolTextParams = {

			vertLineData: lineData.vertLineData,
			linePos: lineData.linePos,

			callbackDataStorage: lineData.callbackDataStorage
		};

		this.attachToolTipToJqueryHtmlNode( $verticalLineSVG, function( tooltip, node ) {

			var tooltipHTML = callbackFunctions.getLinesToolTipText( getToolTextParams  );

			$(tooltip).html( tooltipHTML );

			return tooltipHTML;

		} );
	};




	////////////////////////

	

	/////////////////////////////////

	//   Given a jQuery element in a SVG, return it's closest Group of Rows Group

	MasonViewerPerInstanceRenderOnPage.prototype. get$groupOfRowsFor$currentElement = function( $currentElement ) {

//		var objectThis = this;

		var groupOfRowsSelector = "g." + MasonViewerPerInstanceRenderOnPage.prototype. CONSTANTS.CLASSES.PROT_COV_VIEWER_GROUP_OR_ROWS;

				// Get group of rows
		var $groupOfRows = $currentElement.parent().closest( groupOfRowsSelector );

		if ( $groupOfRows.length === 0 ) {

			throw "Unable to find group of rows element using selector '" + groupOfRowsSelector + "'.";
		}

		return $groupOfRows;

	};

	
	
	/////////////////////////////////

	//   Given a jQuery element in a SVG, return it's closest parent group, closest Row Root group

	MasonViewerPerInstanceRenderOnPage.prototype. get$rowMainGroupFor$currentElement = function( $currentElement ) {

//		var objectThis = this;

		var rowMainGroupSelector = "g." + MasonViewerPerInstanceRenderOnPage.prototype. CONSTANTS.CLASSES.PROT_COV_VIEWER_GROUP_ROW_MAIN;

				// Get Row Main Group since that is where the SVG.js set of elements to make visible is attached
		var $rowMainGroup = $currentElement.parent().closest( rowMainGroupSelector );

		if ( $rowMainGroup.length === 0 ) {

			throw "Unable to find main group element using selector '" + rowMainGroupSelector + "'.";
		}

		return $rowMainGroup;

	};



	/////////////////////////////

	MasonViewerPerInstanceRenderOnPage.prototype. attachClickShowHideToggleHiddenBlocksRow = function( SVGObject ) {

		var objectThis = this;

		var $SVGObject = this.getJQueryObjForRawSVGFromSVG_js_item( SVGObject );

		$SVGObject.click( function( event, ui ) {

			objectThis.clickShowHideToggleHiddenBlocksRow( event, ui, this /* "this" for the clicked on element */ );
		} );

	};



	/////////////////////////////

	MasonViewerPerInstanceRenderOnPage.prototype. setSVGTextPosition = function( setSVGTextPositionParams ) {

//		var objectThis = this;

		var textSVG = setSVGTextPositionParams.textSVG;
		var x = setSVGTextPositionParams.x;
		var y = setSVGTextPositionParams.y;
		var otherAttrsToSet = setSVGTextPositionParams.otherAttrsToSet;
		var additionalStyle = setSVGTextPositionParams.additionalStyle;





		if ( additionalStyle === undefined || additionalStyle === null ) {

			additionalStyle = "";
		}


		textSVG.move( x, y );


		//  Do not use since results in a call to textSVG.rebuild() which resets the "dy"
//		textSVG.size( this.configDisplayOptions.LABEL_FONT_SIZE );   //  TODO  hard coded size


		//		textSVG.attr("dy", height);

		this.set_attr_directly_OnSVGtextItem_using_jQuery( textSVG, "dy", ".35em" );  // Must be after setting the size

		//  TODO  hard coded font size
		this.set_attr_directly_OnSVGtextItem_using_jQuery( textSVG, "style", "font-size:" + this.configDisplayOptions.LABEL_FONT_SIZE + "px;font-family:Helvetica, Arial, sans-serif" + additionalStyle );

		if ( otherAttrsToSet !== undefined && otherAttrsToSet !== null && otherAttrsToSet instanceof Array && otherAttrsToSet.length > 0 ) {

			for ( var otherAttrsIdx = 0; otherAttrsIdx < otherAttrsToSet.length; otherAttrsIdx++ ) {

				var otherAttr = otherAttrsToSet[ otherAttrsIdx ];

				this.set_attr_directly_OnSVGtextItem_using_jQuery( textSVG, otherAttr.attrName, otherAttr.attrValue );  // Must be after setting the size
			}
		}



//		var labelTextSVG_BBox = textSVG.bbox(); //  The bbox() values are zero if the graph is hidden with the div having display: none;
//
//		var height = labelTextSVG_BBox.height;
//		var width = labelTextSVG_BBox.width;


//		var z = 0;
	};




	/////////////////////////////

	///  create "callbackDataStorage" on outputRow and on mainBlock

	MasonViewerPerInstanceRenderOnPage.prototype. add_callbackDataStorage_ToElementsIn_outputRows  = function( outputRows ) {

//		var objectThis = this;



		//  First create "callbackDataStorage" on outputRow and on mainBlock

		for ( var addDataStgRowIdx = 0; addDataStgRowIdx < outputRows.length; addDataStgRowIdx++ ) {

			var addDataStgRow = outputRows[ addDataStgRowIdx ];

			addDataStgRow.callbackDataStorage = {};
		}


	};


	/////////////////////////////


	MasonViewerPerInstanceRenderOnPage.prototype. setupGroupOfRows = function( currentGroupOfRowsSVGgroup ) {

//		var objectThis = this;

		this.set_class_directly_OnSVGItem_using_jQuery( currentGroupOfRowsSVGgroup, MasonViewerPerInstanceRenderOnPage.prototype. CONSTANTS.CLASSES.PROT_COV_VIEWER_GROUP_OR_ROWS );

		var programaticDataStorageGroupOfRows = this.addProgramaticDataStorageGroupOfRowsToSVG_js_Item( currentGroupOfRowsSVGgroup );
		
		programaticDataStorageGroupOfRows.setSVGGroup( currentGroupOfRowsSVGgroup );
		
		return programaticDataStorageGroupOfRows;
	};



	/////////////////////////////


	MasonViewerPerInstanceRenderOnPage.prototype. setupRootGroupForEachRow = function( currentSVGgroupOfRowXandBelow ) {

//		var objectThis = this;

		this.GLOBALS.arrayOfcurrentSVGgroupOfRowXandBelow.push( currentSVGgroupOfRowXandBelow );

		this.set_class_directly_OnSVGItem_using_jQuery( currentSVGgroupOfRowXandBelow, MasonViewerPerInstanceRenderOnPage.prototype. CONSTANTS.CLASSES.PROT_COV_VIEWER_GROUP_ROW_MAIN );

		return this.addProgramaticDataStorageToSVG_js_Item( currentSVGgroupOfRowXandBelow );
	};




	//////////////////////////////////////////////

	//  Highlight box under each main row

	MasonViewerPerInstanceRenderOnPage.prototype. highlightBoxUnderEachRow = function( SVGItem ) {

		var objectThis = this;

		var $SVGItem = $( SVGItem.node );

		var $rowMainGroup = this.get$rowMainGroupFor$currentElement( $SVGItem );

		var SVGrowMainGroupProgramaticDataStorage =  objectThis.getProgramaticDataStorageFromJQueryItem( $rowMainGroup );

		var boxUnderEachRow = SVGrowMainGroupProgramaticDataStorage.getMainBlocksBoxUnderEachRow();

		if ( SVGrowMainGroupProgramaticDataStorage.getHiddenBlocksVisible() ) {

			boxUnderEachRow = SVGrowMainGroupProgramaticDataStorage.getHiddenBlocksBoxUnderEachRow();
		}

		if ( boxUnderEachRow === undefined ) {

			return;
		}


		var $boxUnderEachRow = $( boxUnderEachRow.node );

		$boxUnderEachRow.css( { stroke: "lightgreen", "stroke-width": 5 } );
	};
		//		stroke:pink;stroke-width:5

	//////////////////////////////////////////////

	//  UN Highlight box under each main row

	MasonViewerPerInstanceRenderOnPage.prototype. unhighlightBoxUnderEachRow = function( SVGItem ) {

//		var objectThis = this;

		if ( SVGItem === undefined ) {

			return;
		}

		var $SVGItem = $( SVGItem.node );

		var $rowMainGroup = this.get$rowMainGroupFor$currentElement( $SVGItem );

		var SVGrowMainGroupProgramaticDataStorage =  this.getProgramaticDataStorageFromJQueryItem( $rowMainGroup );

		if ( SVGrowMainGroupProgramaticDataStorage === undefined ) {

			return;
		}

		var boxUnderEachRow = SVGrowMainGroupProgramaticDataStorage.getMainBlocksBoxUnderEachRow();

		if ( SVGrowMainGroupProgramaticDataStorage.getHiddenBlocksVisible() ) {

			boxUnderEachRow = SVGrowMainGroupProgramaticDataStorage.getHiddenBlocksBoxUnderEachRow();
		}


		if ( boxUnderEachRow === undefined ) {

			return;
		}

		var $boxUnderEachRow = $( boxUnderEachRow.node );

		$boxUnderEachRow.css( { stroke: "black", "stroke-width": 0 } );
	};



	//////////////////////////////////////////////

	//  Add a box under each main row

	MasonViewerPerInstanceRenderOnPage.prototype. addBoxUnderEachRowForMouseOver = function( currentSVGgroupOfRowXandBelow, SVGrowMainGroupProgramaticDataStorage, rowIdx ) {

		var objectThis = this;

		var y = ( rowIdx * this.configDisplayOptions.ROW_HEIGHT );

		y = y + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;

		var blockSVG = this.GLOBALS.masonViewerSVG.rect( this.GLOBALS.sequenceWidth, this.configDisplayOptions.BLOCK_HEIGHT );

		currentSVGgroupOfRowXandBelow.add( blockSVG );

		SVGrowMainGroupProgramaticDataStorage.setMainBlocksBoxUnderEachRow( blockSVG );

		blockSVG.attr(  { fill: { r: 255, g: 255, b: 255 },
			stroke: { r: 0, g: 0, b: 0 },
			"stroke-width": 0,
			"fill-opacity": 0 } );

		blockSVG.attr( "data-placement", "mainBlocksBoxUnderEachMainRow" );

		blockSVG.attr( "rowIdx", rowIdx );

		blockSVG.move( this.configDisplayOptions.MAIN_BOX_STARTING_POSITION, y );

		this.addProgramaticDataStorageToSVG_js_Item( blockSVG );

		var $blockSVG = this.getJQueryObjForRawSVGFromSVG_js_item( blockSVG );

		$blockSVG.hover( /* handlerIn */ function(eventObject) {

//			var $this = $(this);

			objectThis.highlightBoxUnderEachRow( this.instance );

		}, /* handlerOut */ function(eventObject) {

//			var $this = $(this);

			objectThis.unhighlightBoxUnderEachRow( this.instance );
		} );


	};

	///////////////////////////////////


	//  Add a box under each row hidden blocks

	MasonViewerPerInstanceRenderOnPage.prototype. addHiddenOrTotalsBlocksBoxUnderEachRowForMouseOver = function( placementLabel, hiddenBlocksRowsHeight, currentSVGgroupOfRowXandBelow, SVGrowMainGroupProgramaticDataStorage, rowIdx ) {

		var objectThis = this;

		var y = ( rowIdx * this.configDisplayOptions.ROW_HEIGHT );

		y = y + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;

		var blockSVG = this.GLOBALS.masonViewerSVG.rect( this.GLOBALS.sequenceWidth, hiddenBlocksRowsHeight );

		currentSVGgroupOfRowXandBelow.add( blockSVG );

		SVGrowMainGroupProgramaticDataStorage.setHiddenBlocksBoxUnderEachRow( blockSVG );



		blockSVG.attr(  { fill: { r: 255, g: 255, b: 255 },
			stroke: { r: 0, g: 0, b: 0 },
			"stroke-width": 0,
			"fill-opacity": 0 } );

		blockSVG.attr( "data-placement", placementLabel );

		blockSVG.attr( "rowIdx", rowIdx );

		blockSVG.move( this.configDisplayOptions.MAIN_BOX_STARTING_POSITION, y );

		this.addProgramaticDataStorageToSVG_js_Item( blockSVG );

		var $blockSVG = this.getJQueryObjForRawSVGFromSVG_js_item( blockSVG );

		$blockSVG.hover( /* handlerIn */ function(eventObject) {

//			var $this = $(this);

			objectThis.highlightBoxUnderEachRow( this.instance );

		}, /* handlerOut */ function(eventObject) {

//			var $this = $(this);

			objectThis.unhighlightBoxUnderEachRow( this.instance );
		} );

		blockSVG.hide();
	};


	///////////////////////////////////


	//  Add a box under each row hidden blocks

	MasonViewerPerInstanceRenderOnPage.prototype. addHiddenBlocksBoxUnderEachRowForMouseOver = function( hiddenBlocksRowsHeight, currentSVGgroupOfRowXandBelow, SVGrowMainGroupProgramaticDataStorage, rowIdx ) {

//		var objectThis = this;

		this.addHiddenOrTotalsBlocksBoxUnderEachRowForMouseOver( "hiddenBlocksBoxUnderEachMainRow", hiddenBlocksRowsHeight, currentSVGgroupOfRowXandBelow, SVGrowMainGroupProgramaticDataStorage, rowIdx );
	};


	///////////////////////////////////


	//  Add a box under each row totals blocks

	MasonViewerPerInstanceRenderOnPage.prototype. addTotalsBlocksBoxUnderEachRowForMouseOver = function( hiddenBlocksRowsHeight, currentSVGgroupOfRowXandBelow, SVGrowMainGroupProgramaticDataStorage, rowIdx ) {

//		var objectThis = this;

		this.addHiddenOrTotalsBlocksBoxUnderEachRowForMouseOver( "TotalsBlocksBoxUnderCombinedRow", hiddenBlocksRowsHeight, currentSVGgroupOfRowXandBelow, SVGrowMainGroupProgramaticDataStorage, rowIdx );
	};



	////////////////////////////////////////////

	MasonViewerPerInstanceRenderOnPage.prototype. createHiddenBlocksContractionIcon = function( tooltipText, currentSVGgroupOfRowXandBelow, rowIdx, currentSVGgroupOfRowXandBelowProgramaticDataStorage ) {

//		var objectThis = this;

		var SVGGroupContractionIcon = this.GLOBALS.masonViewerSVG.group();

		currentSVGgroupOfRowXandBelow.add( SVGGroupContractionIcon );

		SVGGroupContractionIcon.attr("label", "SVGGroupContractionIcon");


		this.attachClickShowHideToggleHiddenBlocksRow( SVGGroupContractionIcon );

		SVGGroupContractionIcon.attr("CreatedBy", "createHiddenBlocksContractionIcon");




		var y = ( rowIdx * this.configDisplayOptions.ROW_HEIGHT ) + ( this.configDisplayOptions.ROW_HEIGHT / 4 ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;



		var rectSVG = this.GLOBALS.masonViewerSVG.rect( this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 2, this.configDisplayOptions.ROW_HEIGHT / 2 );

		rectSVG.attr( { fill: { r: 255, g: 255, b: 255 },
			stroke: { r: 255, g: 0, b: 0 },
			"fill-opacity": 0 } );

		rectSVG.move( this.configDisplayOptions.ICON_EXPAND_ROW_STARTING_POSITION + this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 4, y );


		this.attachToolTipToJqueryHtmlNode( $(rectSVG.node), function(tooltip, node) {
			$(tooltip).html( tooltipText );

			return tooltipText;

		} );


		var horizLineSVG = this.GLOBALS.masonViewerSVG.line(  this.configDisplayOptions.ICON_EXPAND_ROW_STARTING_POSITION  + ( this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 4 ) + 2,
			y + this.configDisplayOptions.ROW_HEIGHT / 4,
			this.configDisplayOptions.ICON_EXPAND_ROW_STARTING_POSITION + this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH - ( this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 2 ) + ( this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 4 ) - 2,
			y + this.configDisplayOptions.ROW_HEIGHT / 4 )
			.stroke({ color: '#f06', width: 1 });

		this.attachToolTipToJqueryHtmlNode( $(horizLineSVG.node), function(tooltip, node) {

			$(tooltip).html( tooltipText );

			return tooltipText;
		});

		rectSVG.attr( "cursor", "pointer");
		horizLineSVG.attr( "cursor", "pointer");

		SVGGroupContractionIcon.add( rectSVG );
		SVGGroupContractionIcon.add( horizLineSVG );


//		var hiddenBlocksForRowSet = currentSVGgroupOfRowXandBelowProgramaticDataStorage.getHiddenBlocksForRowSet();
//
//
//		hiddenBlocksForRowSet.add( rectSVG );
//		hiddenBlocksForRowSet.add( horizLineSVG );


//		rectSVG.hide();
//		horizLineSVG.hide();
	};


	////////////////////////////////////////////

	MasonViewerPerInstanceRenderOnPage.prototype. createHiddenBlocksExpansionIcon = function( tooltipText, currentSVGgroupOfRowXandBelow, rowIdx, currentSVGgroupOfRowXandBelowProgramaticDataStorage ) {

//		var objectThis = this;

		var SVGGroupExpansionIcon = this.GLOBALS.masonViewerSVG.group();



		SVGGroupExpansionIcon.attr("label", "SVGGroupExpansionIcon");

		var SVGSetExpansionIcon = this.GLOBALS.masonViewerSVG.set();

		currentSVGgroupOfRowXandBelow.add( SVGGroupExpansionIcon );

		this.attachClickShowHideToggleHiddenBlocksRow( SVGGroupExpansionIcon );

		currentSVGgroupOfRowXandBelowProgramaticDataStorage.setSVGGroupExpansionIcon( SVGSetExpansionIcon );



		var y = ( rowIdx * this.configDisplayOptions.ROW_HEIGHT ) + ( this.configDisplayOptions.ROW_HEIGHT / 4 ) + this.configDisplayOptions.TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE;



		var rectSVG = this.GLOBALS.masonViewerSVG.rect( this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 2, this.configDisplayOptions.ROW_HEIGHT / 2 );

		rectSVG.attr( { fill: { r: 255, g: 255, b: 255 },
			stroke: { r: 255, g: 0, b: 0 },
			"fill-opacity": 0 } );

		rectSVG.move( this.configDisplayOptions.ICON_EXPAND_ROW_STARTING_POSITION + this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 4, y );

		var vertLineSVG = this.GLOBALS.masonViewerSVG.line(  this.configDisplayOptions.ICON_EXPAND_ROW_STARTING_POSITION + this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 2 ,
			y + 2,
			this.configDisplayOptions.ICON_EXPAND_ROW_STARTING_POSITION + this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 2,
			y + this.configDisplayOptions.ROW_HEIGHT / 2 - 2 )
			.stroke({ color: '#f06', width: 1 });

		var horizLineSVG = this.GLOBALS.masonViewerSVG.line(  this.configDisplayOptions.ICON_EXPAND_ROW_STARTING_POSITION  + ( this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 4 ) + 2,
			y + this.configDisplayOptions.ROW_HEIGHT / 4,
			this.configDisplayOptions.ICON_EXPAND_ROW_STARTING_POSITION + this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH - ( this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 2 ) + ( this.configDisplayOptions.ICON_EXPAND_ROW_WIDTH / 4 ) - 2,
			y + this.configDisplayOptions.ROW_HEIGHT / 4 )
			.stroke({ color: '#f06', width: 1 });

		rectSVG.attr( "cursor", "pointer");
		vertLineSVG.attr( "cursor", "pointer");
		horizLineSVG.attr( "cursor", "pointer");


		SVGGroupExpansionIcon.add( rectSVG );
		SVGGroupExpansionIcon.add( vertLineSVG );
		SVGGroupExpansionIcon.add( horizLineSVG );

		SVGSetExpansionIcon.add( rectSVG );
		SVGSetExpansionIcon.add( vertLineSVG );
		SVGSetExpansionIcon.add( horizLineSVG );


		this.attachToolTipToJqueryHtmlNode( $(rectSVG.node), function(tooltip, node) {

			$(tooltip).html( tooltipText );

			return tooltipText;
		});

		this.attachToolTipToJqueryHtmlNode( $(vertLineSVG.node), function(tooltip, node) {

			$(tooltip).html( tooltipText );

			return tooltipText;
		});

		this.attachToolTipToJqueryHtmlNode( $(horizLineSVG.node), function(tooltip, node) {

			$(tooltip).html( tooltipText );

			return tooltipText;
		});
	};



	////////////////////////////////////////

	MasonViewerPerInstanceRenderOnPage.prototype. addMouseOverToBlocks = function( blockSVG ) {

		var objectThis = this;

		var $blockSVG = this.getJQueryObjForRawSVGFromSVG_js_item( blockSVG );

		$blockSVG.hover( /* handlerIn */ function(eventObject) {

			var $this = $(this);

			$this.css(
				{ 	stroke: objectThis.configDisplayOptions.BLOCK_HIGHLIGHT_BORDER_COLOR,
					"stroke-width": objectThis.configDisplayOptions.BLOCK_HIGHLIGHT_BORDER_WIDTH } );

			objectThis.highlightBoxUnderEachRow( this.instance );


		}, /* handlerOut */ function(eventObject) {

			var $this = $(this);

			$this.css( { stroke: "black", "stroke-width": 0 } );

			objectThis.unhighlightBoxUnderEachRow( this.instance );
		} );

	};

	////////////////////////////////////////

	MasonViewerPerInstanceRenderOnPage.prototype. addMouseOverToLinesInsideMainBox = function( lineSVG ) {

		var objectThis = this;

		var $lineSVG = this.getJQueryObjForRawSVGFromSVG_js_item( lineSVG );

		$lineSVG.hover( /* handlerIn */ function(eventObject) {

//			var $this = $(this);

//			$this.css( { stroke: "pink", "stroke-width": 5 } );

			objectThis.highlightBoxUnderEachRow( this.instance );


		}, /* handlerOut */ function(eventObject) {

//			var $this = $(this);

//			$this.css( { stroke: "black", "stroke-width": 0 } );

			objectThis.unhighlightBoxUnderEachRow( this.instance );
		} );

	};


