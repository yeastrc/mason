




//   mason_viewer_render_on_page_pixel_positioning.js

//     This is a part of MasonViewer

//   Pixel positioning code


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


/////////    All of these function expect "1" based positions


//////////////////////////////////////

MasonViewerPerInstanceRenderOnPage.prototype. positionLeftEdgeToPixel = function( leftEdgeCharPosition ) {

	leftEdgeCharPosition -= 0.5;  //  subract 0.5 to extend towards previous block

	var positionPixel = this.positionPrivateCharPosToPixel( leftEdgeCharPosition );

	return positionPixel;
};

//////////////////////////////////////

MasonViewerPerInstanceRenderOnPage.prototype. positionRightEdgeToPixel = function( rightEdgeCharPosition ) {

	rightEdgeCharPosition += 0.5;  //  add 0.5 to extend towards next block

	var positionPixel = this.positionPrivateCharPosToPixel( rightEdgeCharPosition );

	return positionPixel;
};

//////////////////////////////////////

//   This is designed for lines

MasonViewerPerInstanceRenderOnPage.prototype. positionCharPositionToPixel = function( positionCharPosition ) {

	var positionPixel = this.positionPrivateCharPosToPixel( positionCharPosition );

	return positionPixel;
};


//////////////////////////////////////

MasonViewerPerInstanceRenderOnPage.prototype. positionPrivateCharPosToPixel = function( positionCharPosition ) {

	positionCharPosition = this.limitCharPositionMaxSeqLength( positionCharPosition );

	positionCharPosition -= 0.5;    //  subtract  to be zero based

	var positionPixel = ( positionCharPosition * this.GLOBALS.sequenceMultiplier );

	return positionPixel;
};


//////////////////////////////////////

//   restrict charPosition to the limits of the viewer

MasonViewerPerInstanceRenderOnPage.prototype. limitCharPositionMaxSeqLength = function( positionCharPosition ) {


	var minPosition = 0.5;
	var maxPosition = this.constructorParams.requestParams.inputData.maxSequenceLength + 0.5;

	if ( positionCharPosition <minPosition ) {

		positionCharPosition = minPosition;

	} else if ( positionCharPosition > maxPosition ) {

		positionCharPosition = maxPosition;
	}

	return positionCharPosition;
};





