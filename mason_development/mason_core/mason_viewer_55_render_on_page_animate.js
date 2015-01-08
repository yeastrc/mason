
//    mason_viewer_render_on_page_animate.js


//     This is a part of MasonViewer


//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


MasonViewerPerInstanceRenderOnPage.prototype.animateTransformY = function( params ) {

//		var objectThis_MasonViewerPerInstanceRenderOnPage = this;

		var SVGoGroupToMove = params.SVGoGroupToMove;

		var yToTransformTo = params.yToTransformTo;
		var functionToRunAfterAnimate = params.functionToRunAfterAnimate;

		SVGoGroupToMove.animate({ duration: 150, ease: '-', delay: 0 }).transform( { y: yToTransformTo } ).after( functionToRunAfterAnimate );


//		var SVGoGroupToMoveNativeSVGelement = SVGoGroupToMove.node;
//
//		var $SVGoGroupToMoveNativeSVGelement = $( SVGoGroupToMoveNativeSVGelement );
//
//		var SVGoGroupToMove_nativeSVGelement_wrappedInSVGJSGroupObject  = $SVGoGroupToMoveNativeSVGelement.data( "SVGoGroupToMove_nativeSVGelement_wrappedInSVGJSGroupObject" );
//
//		if ( SVGoGroupToMove_nativeSVGelement_wrappedInSVGJSGroupObject === undefined || SVGoGroupToMove_nativeSVGelement_wrappedInSVGJSGroupObject === null ) {
//
//			SVGoGroupToMove_nativeSVGelement_wrappedInSVGJSGroupObject  = SVGwrapNativeSVG_group_InSVGJSGroupObject( SVGoGroupToMoveNativeSVGelement );
//
//			$SVGoGroupToMoveNativeSVGelement.data( "SVGoGroupToMove_nativeSVGelement_wrappedInSVGJSGroupObject", SVGoGroupToMove_nativeSVGelement_wrappedInSVGJSGroupObject );
//		}
//
//		SVGoGroupToMove_nativeSVGelement_wrappedInSVGJSGroupObject.animate({ duration: 150, ease: '-', delay: 0 }).transform( { y: yToTransformTo } ).after( functionToRunAfterAnimate );





//		if ( yToTransformTo !== 0 ) {
//			SVGoGroupToMove.animate({ duration: 150, ease: '-', delay: 0 }).transform( { y: yToTransformTo } ).after( functionToRunAfterAnimate );
//		}
//
//		var SVGoGroupToMoveNativeSVGelement = SVGoGroupToMove.node;
//
//		var $SVGoGroupToMoveNativeSVGelement = $( SVGoGroupToMoveNativeSVGelement );
//
//		var currentTransform = $SVGoGroupToMoveNativeSVGelement.attr("transform");
//
//		//  example:   translate(0,90)
//
//		var regexPattern = /translate(.)"/;  //  new RegExp (pattern,modifiers);
//
//		var currentTranslate =  regexPattern.exec( currentTransform );
//
//		var z = 0;

//		        /* delay animation */
//        this.animateTransformY_Timeout = setTimeout(function() {
//          var interval  = 1000 / 60
//            , start     = new Date().getTime()
//            , finish    = start + d
//
//          /* start animation */
//          fx.interval = setInterval(function(){
//            // This code was borrowed from the emile.js micro framework by Thomas Fuchs, aka MadRobby.
//            var time = new Date().getTime()
//              , pos = time > finish ? 1 : (time - start) / d
//
//            /* process values */
//            fx.to(pos)
//
//            /* finish off animation */
//            if (time > finish) {
//              clearInterval(fx.interval)
//              fx._after ? fx._after.apply(element, [fx]) : fx.stop()
//            }
//
//          }, d > interval ? interval : d)
//
//        }, delay || 0)




};

