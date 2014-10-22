
//    mason_viewer_registry.js


//     This is a part of Mason Viewer

//     This is a central registry of Viewers and handles message passing calls between the viewers

//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";



//  Constructor

var MasonViewerRegistry = function () {

	this.viewerRegistry = {};
};



//   

MasonViewerRegistry.prototype.addMasonViewer = function ( params ) {

	var itemKey = params.itemKey;
	var protCovViewer = params.protCovViewer;
	
	this.viewerRegistry[ itemKey ] = protCovViewer;
	
	protCovViewer.registerBlockHoverListener( { hoverListener: this } );
};

MasonViewerRegistry.prototype.removeMasonViewer = function ( params ) {

	var itemKey = params.itemKey;
	
	this.viewerRegistry[ itemKey ] = null;
	
};


MasonViewerRegistry.prototype.passMessage = function ( params ) {
	
	$.each( this.viewerRegistry, function( index, viewerRegistryItem ) {

		viewerRegistryItem.acceptMessage( params );
	});
};


var MasonViewerRegistryFactory = { createMasonViewerRegistry: function (  ) {
	
		var protCovViewerRegistry = new MasonViewerRegistry();
		
		return protCovViewerRegistry;
	}
};