
//   mason_viewer_render_on_page_constants.js

//     This is a part of MasonViewer




//////////////  !!!!!!!!!!!!!   Order of calling "precompute" call backs.

///////    For the Main blocks and the Hidden blocks, the precompute is called for each block right before the call to get the color

///////    For the Totals Per Row blocks on the right, the precompute is called for all the rows before the get color and size is called for each block

//////     For the Totals Row, the precompute is called for all the rows before the get color is called for each block



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


	//    A set of constants

	MasonViewerPerInstanceRenderOnPage.prototype. CONSTANTS = {
		
		MIN_MAX_VALUES: {
			MINIMUM_ROWS_PER_GROUP: 20 //  100,  //  Min number of rows per "Group of rows

			//  TODO  For testing 
//			MINIMUM_ROWS_PER_GROUP: 2, //  Min number of rows per "Group of rows
//			MAXIMUM_ROWS_PER_GROUP: 2  //  Max number of rows per "Group of rows
		},
		
		CLASSES: {
			PROT_COV_VIEWER_GROUP_OR_ROWS: "prot_cov_viewer_group_of_rows",

			PROT_COV_VIEWER_GROUP_ROW_MAIN: "prot_cov_viewer_group_row_main",

			PROT_COV_VIEWER_GROUP_ROW_VISIBLE: "prot_cov_viewer_group_row_visible"
		},

		JQUERY_DATA_LABELS: {

			//  Stored by jQuery code data()

			JQUERY_DATA_LABEL_PROGRAMATIC : "programatic"  //  Data needed for the program to run
		}

	};

