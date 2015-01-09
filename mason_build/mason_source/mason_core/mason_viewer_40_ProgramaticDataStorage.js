
//   mason_viewer_ProgramaticDataStorage.js

//     This is a part of MasonViewer


//   Used in the class MasonViewerPerInstanceRenderOnPage


//   This file contains the classes  ProgramaticDataStorage and ProgramaticDataStorageGroupOfRows

//  ProgramaticDataStorage is a class containing data for a given row in the viewer

//  ProgramaticDataStorageGroupOfRows is a class containing data for a group of rows



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


	//////////////////////////////////////

	//   Constructor for ProgramaticDataStorageGroupOfRows

	//   This class contains data for a group of rows in the viewer

	var ProgramaticDataStorageGroupOfRows = function () {

		this.SVGGroup = undefined;  //  The SVG JS Group associated with this object
		
		this.firstOutputRowSVGGroup = undefined;  //  Top level SVG JS object for the top level output row within this group

		this.nextProgramaticDataStorageGroupOfRows = undefined;  //  The ProgramaticDataStorageGroupOfRows object that holds the next group of rows
	};

	

	////////

	//   "getter" and "setter" methods for this class


	ProgramaticDataStorageGroupOfRows.prototype.getSVGGroup = function() {

		return this.SVGGroup;
	};
	ProgramaticDataStorageGroupOfRows.prototype.setSVGGroup = function( SVGGroup_ ) {

		this.SVGGroup = SVGGroup_;
	};
	
	ProgramaticDataStorageGroupOfRows.prototype.getFirstOutputRowSVGGroup = function() {

		return this.firstOutputRowSVGGroup;
	};
	ProgramaticDataStorageGroupOfRows.prototype.setFirstOutputRowSVGGroup = function( firstOutputRowSVGGroup_ ) {

		this.firstOutputRowSVGGroup = firstOutputRowSVGGroup_;
	};
	
	ProgramaticDataStorageGroupOfRows.prototype.getNextProgramaticDataStorageGroupOfRows = function() {

		return this.nextProgramaticDataStorageGroupOfRows;
	};
	ProgramaticDataStorageGroupOfRows.prototype.setNextProgramaticDataStorageGroupOfRows = function( nextProgramaticDataStorageGroupOfRows_ ) {

		this.nextProgramaticDataStorageGroupOfRows = nextProgramaticDataStorageGroupOfRows_;
	};
	
	
	//////////////////////////////////////

	//   Constructor for ProgramaticDataStorage

	//   This class contains data for a given row of the viewer 

	var ProgramaticDataStorage = function () {

		this.outputRow = undefined;

		this.rowIdx = undefined;

		this.rowOffset = undefined;

		this.createHiddenBlocksIfNotCreatedCallback = undefined;  // calback function

		this.SVGRowXmainBlocksGROUP = undefined;

		this.groupToMoveForExpansion = undefined;

		this.hiddenBlocksVisible = false;
		this.hiddenBlocksForRowSet = undefined;
		this.hiddenBlocksHeight = 0;

		this.SVGGroupExpansionIcon = undefined;

		this.mainBlocksBoxUnderEachRow = undefined;

		this.hiddenBlocksBoxUnderEachRow = undefined;

		this.toolTipHTML = undefined;

	};

	////////

	//   "getter" and "setter" methods for this class


	ProgramaticDataStorage.prototype.getCreateHiddenBlocksIfNotCreatedCallback = function() {

		return this.createHiddenBlocksIfNotCreatedCallback;
	};

	ProgramaticDataStorage.prototype.setCreateHiddenBlocksIfNotCreatedCallback = function( createHiddenBlocksIfNotCreatedCallback_ ) {

		this.createHiddenBlocksIfNotCreatedCallback = createHiddenBlocksIfNotCreatedCallback_;
	};


	ProgramaticDataStorage.prototype.getOutputRow = function() {

		return this.outputRow;
	};

	ProgramaticDataStorage.prototype.setOutputRow = function( outputRow_ ) {

		this.outputRow = outputRow_;
	};

	ProgramaticDataStorage.prototype.getRowOffset = function() {

		return this.rowOffset;
	};

	ProgramaticDataStorage.prototype.setRowOffset = function( rowOffset_ ) {

		this.rowOffset = rowOffset_;
	};

	ProgramaticDataStorage.prototype.getRowIdx = function() {

		return this.rowIdx;
	};

	ProgramaticDataStorage.prototype.setRowIdx = function( rowIdx_ ) {

		this.rowIdx = rowIdx_;
	};


	ProgramaticDataStorage.prototype.getSVGRowXmainBlocksGROUP = function() {

		return this.SVGRowXmainBlocksGROUP;
	};

	ProgramaticDataStorage.prototype.setSVGRowXmainBlocksGROUP = function( SVGRowXmainBlocksGROUP_ ) {

		this.SVGRowXmainBlocksGROUP = SVGRowXmainBlocksGROUP_;
	};

	ProgramaticDataStorage.prototype.getGroupToMoveForExpansion = function() {

		return this.groupToMoveForExpansion;
	};

	ProgramaticDataStorage.prototype.setGroupToMoveForExpansion = function( groupToMoveForExpansion_ ) {

		this.groupToMoveForExpansion = groupToMoveForExpansion_;
	};

	ProgramaticDataStorage.prototype.getHiddenBlocksVisible = function() {

		return this.hiddenBlocksVisible;
	};



	ProgramaticDataStorage.prototype.setHiddenBlocksVisible = function( hiddenBlocksVisible_ ) {

		this.hiddenBlocksVisible = hiddenBlocksVisible_;
	};

	ProgramaticDataStorage.prototype.getHiddenBlocksForRowSet = function () {

		return this.hiddenBlocksForRowSet;
	};

	ProgramaticDataStorage.prototype.setHiddenBlocksForRowSet = function ( hiddenBlocksForRowSet_ ) {

		this.hiddenBlocksForRowSet = hiddenBlocksForRowSet_;
	};

	ProgramaticDataStorage.prototype.getHiddenBlocksHeight = function () {

		return this.hiddenBlocksHeight;
	};

	ProgramaticDataStorage.prototype.setHiddenBlocksHeight = function ( hiddenBlocksHeight_ ) {

		this.hiddenBlocksHeight = hiddenBlocksHeight_;
	};




	ProgramaticDataStorage.prototype.getSVGGroupExpansionIcon = function () {

		return this.SVGGroupExpansionIcon;
	};

	ProgramaticDataStorage.prototype.setSVGGroupExpansionIcon = function ( SVGGroupExpansionIcon_ ) {

		this.SVGGroupExpansionIcon = SVGGroupExpansionIcon_;
	};



	ProgramaticDataStorage.prototype.getMainBlocksBoxUnderEachRow = function ( ) {

		return this.mainBlocksBoxUnderEachRow;
	};

	ProgramaticDataStorage.prototype.setMainBlocksBoxUnderEachRow = function ( mainBlocksBoxUnderEachRow_ ) {

		this.mainBlocksBoxUnderEachRow = mainBlocksBoxUnderEachRow_;
	};

	ProgramaticDataStorage.prototype.getHiddenBlocksBoxUnderEachRow = function ( ) {

		return this.hiddenBlocksBoxUnderEachRow;
	};

	ProgramaticDataStorage.prototype.setHiddenBlocksBoxUnderEachRow = function ( hiddenBlocksBoxUnderEachRow ) {

		this.hiddenBlocksBoxUnderEachRow = hiddenBlocksBoxUnderEachRow;
	};



	ProgramaticDataStorage.prototype.getToolTipHTML = function ( ) {

		return this.toolTipHTML;
	};

	ProgramaticDataStorage.prototype.setToolTipHTML = function ( toolTipHTML ) {

		this.toolTipHTML = toolTipHTML;
	};



