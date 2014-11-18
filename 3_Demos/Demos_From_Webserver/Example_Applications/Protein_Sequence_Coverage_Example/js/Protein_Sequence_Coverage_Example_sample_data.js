
//example_Multi_row_example_All_Features_sample_data.js

//This is a Javascript file for this demo

//Depends on jquery



//JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


//Sample data for the Mason Viewer


//  The data for the Mason Core starts at {"maxSequenceLength"

//   The data at the root level and under {"results" is used by this specific viewer creator and call backs

var multiRowAllFeaturesMasonViewerData
=

	//  Data in the objects surrounding the object that holds the Mason Viewer data.
	//      This data is used for post AJAX processing and in the viewer creator and in call backs
{"status":"success",
 "results":
 {"proteinId":528817,"peptideCoverageAcrossAllRuns":64.200,

  "protViewerCoreInputData":

	  //  Input data to core Mason viewer starts here
  {"maxSequenceLength":324,"rowItems":
	  [

	   //  Data for the first row
	{"label":"Run: 803",

		//  Blocks for this row
		"blockItems":
		[
		 	///  Blocks for this row
			{"blockData":{"id":4907595,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":6,"uniquePeptide":"Y"},
				"startPos":18,"endPos":30},
			{"blockData":{"id":256849,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":5,"uniquePeptide":"Y"},
					"startPos":56,"endPos":74},
			{"blockData":{"id":19711760,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":4,"uniquePeptide":"Y"},"startPos":188,"endPos":207},
			{"blockData":{"id":19713832,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":2,"uniquePeptide":"Y"},"startPos":115,"endPos":123},
			{"blockData":{"id":16418191,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":177,"endPos":187},
			{"blockData":{"id":18906090,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":31,"endPos":55},
			{"blockData":{"id":2597403,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":38,"endPos":55},
			{"blockData":{"id":19713179,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":75,"endPos":95},
			{"blockData":{"id":19713905,"peptideRunQValue":0.0020000,"peptideRunQValueDisplay":"2E-3","bestQValue":0.0010,"bestQValueDisplay":"1E-3","totalPsm":1,"uniquePeptide":"Y"},"startPos":235,"endPos":245},
			{"blockData":{"id":19712499,"peptideRunQValue":0.0030000,"peptideRunQValueDisplay":"3E-3","bestQValue":0.0020,"bestQValueDisplay":"2E-3","totalPsm":1,"uniquePeptide":"Y"},"startPos":213,"endPos":224},
			{"blockData":{"id":5093293,"peptideRunQValue":0.0030000,"peptideRunQValueDisplay":"3E-3","bestQValue":0.0020,"bestQValueDisplay":"2E-3","totalPsm":1,"uniquePeptide":"Y"},"startPos":232,"endPos":245},
			{"blockData":{"id":19715811,"peptideRunQValue":0.0040000,"peptideRunQValueDisplay":"4E-3","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":3,"uniquePeptide":"Y"},"startPos":312,"endPos":324},
			{"blockData":{"id":19716595,"peptideRunQValue":0.0040000,"peptideRunQValueDisplay":"4E-3","bestQValue":0.0020,"bestQValueDisplay":"2E-3","totalPsm":1,"uniquePeptide":"Y"},"startPos":308,"endPos":324},
			{"blockData":{"id":5883099,"peptideRunQValue":0.0090000,"peptideRunQValueDisplay":"9E-3","bestQValue":0.0070,"bestQValueDisplay":"7E-3","totalPsm":1,"uniquePeptide":"Y"},"startPos":273,"endPos":307}
		],


		//  additional data for this specific viewer, used by the call backs at the row level
		"rowData":{"runId":803,"sequenceCoverage":60.500}

	},  //  End of data for the first row

	//   Start of the data for the second row

	{"label":"Run: 811",
		"blockItems":[
			{"blockData":{"id":256849,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":4,"uniquePeptide":"Y"},"startPos":56,"endPos":74},
			{"blockData":{"id":19711760,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":3,"uniquePeptide":"Y"},"startPos":188,"endPos":207},
			{"blockData":{"id":19713832,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":115,"endPos":123},
			{"blockData":{"id":19714125,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":59,"endPos":74},
			{"blockData":{"id":2597403,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":38,"endPos":55},
			{"blockData":{"id":16418191,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":177,"endPos":187},
			{"blockData":{"id":19713836,"peptideRunQValue":0.0010000,"peptideRunQValueDisplay":"1E-3","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":2,"uniquePeptide":"Y"},"startPos":256,"endPos":266},
			{"blockData":{"id":19715811,"peptideRunQValue":0.0010000,"peptideRunQValueDisplay":"1E-3","bestQValue":0.0010,"bestQValueDisplay":"1E-3","totalPsm":1,"uniquePeptide":"Y"},"startPos":312,"endPos":324},
			{"blockData":{"id":19712499,"peptideRunQValue":0.0060000,"peptideRunQValueDisplay":"6E-3","bestQValue":0.0050,"bestQValueDisplay":"5E-3","totalPsm":1,"uniquePeptide":"Y"},"startPos":213,"endPos":224}
		],


		"rowData":{"runId":811,"sequenceCoverage":34.900}},

	//   Start of the data for the next row

	{"label":"Run: 867","blockItems":[
	{"blockData":{"id":19712499,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0020,"bestQValueDisplay":"2E-3","totalPsm":1,"uniquePeptide":"Y"},"startPos":213,"endPos":224},
	{"blockData":{"id":19713832,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":115,"endPos":123},
	{"blockData":{"id":19713905,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0020,"bestQValueDisplay":"2E-3","totalPsm":1,"uniquePeptide":"Y"},"startPos":235,"endPos":245},
	{"blockData":{"id":19716254,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":255,"endPos":266},
	{"blockData":{"id":256849,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":56,"endPos":74},
	{"blockData":{"id":2597403,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":38,"endPos":55}],


	"rowData":{"runId":867,"sequenceCoverage":25.000}},

	//   Start of the data for the next row

	{"label":"Run: 858","blockItems":[
	{"blockData":{"id":256849,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":56,"endPos":74},
	{"blockData":{"id":2597403,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":38,"endPos":55},
	{"blockData":{"id":19713832,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":115,"endPos":123},
	{"blockData":{"id":19713836,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":256,"endPos":266}],

	"rowData":{"runId":858,"sequenceCoverage":17.600}},

	//   Start of the data for the next row

	{"label":"Run: 848","blockItems":[
	{"blockData":{"id":256849,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":2,"uniquePeptide":"Y"},"startPos":56,"endPos":74},
	{"blockData":{"id":2597403,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":38,"endPos":55},
	{"blockData":{"id":19965306,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":19,"endPos":30}],

	"rowData":{"runId":848,"sequenceCoverage":15.100}},

	//   Start of the data for the next row

	{"label":"Run: 851","blockItems":[
	{"blockData":{"id":256849,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":56,"endPos":74},
	{"blockData":{"id":2597403,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":38,"endPos":55}],
	//  Vertical lines for this row

	"rowData":{"runId":851,"sequenceCoverage":11.400}},

	//   Start of the data for the next row

	{"label":"Run: 806","blockItems":[
	{"blockData":{"id":19713832,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0000,"bestQValueDisplay":"0","totalPsm":1,"uniquePeptide":"Y"},"startPos":115,"endPos":123},
	{"blockData":{"id":19716254,"peptideRunQValue":0E-7,"peptideRunQValueDisplay":"0","bestQValue":0.0010,"bestQValueDisplay":"1E-3","totalPsm":1,"uniquePeptide":"Y"},"startPos":255,"endPos":266}],

	"rowData":{"runId":806,"sequenceCoverage":6.500}}
	],


	//   Viewer wide data:

	//  Vertical lines data that will be displayed across all the rows.
	//        If the same lines are needed for all the rows, this is the most efficient as they result in far fewer
	//        SVG elements in the viewer.

	//  All the line positions in this case are on the half (using ".5") so that they land
	//     specifically on the edges/boundaries between the blocks.

	//  The data under "vertLineData" is passed to the callback for determining the color, tool tip, and click handling

	"vertLinesAllRowsItems":
		[{"linePos":3.5,"vertLineData":{"type":"CP"}},{"linePos":6.5,"vertLineData":{"type":"CP"}},{"linePos":10.5,"vertLineData":{"type":"CP"}},{"linePos":12.5,"vertLineData":{"type":"CP"}},{"linePos":17.5,"vertLineData":{"type":"CP"}},{"linePos":18.5,"vertLineData":{"type":"CP"}},{"linePos":30.5,"vertLineData":{"type":"CP"}},{"linePos":37.5,"vertLineData":{"type":"CP"}},{"linePos":55.5,"vertLineData":{"type":"CP"}},{"linePos":74.5,"vertLineData":{"type":"CP"}},{"linePos":95.5,"vertLineData":{"type":"CP"}},{"linePos":106.5,"vertLineData":{"type":"CP"}},{"linePos":114.5,"vertLineData":{"type":"CP"}},{"linePos":123.5,"vertLineData":{"type":"CP"}},{"linePos":156.5,"vertLineData":{"type":"CP"}},{"linePos":160.5,"vertLineData":{"type":"CP"}},{"linePos":167.5,"vertLineData":{"type":"CP"}},{"linePos":168.5,"vertLineData":{"type":"CP"}},{"linePos":172.5,"vertLineData":{"type":"CP"}},{"linePos":176.5,"vertLineData":{"type":"CP"}},{"linePos":187.5,"vertLineData":{"type":"CP"}},{"linePos":190.5,"vertLineData":{"type":"CP"}},{"linePos":207.5,"vertLineData":{"type":"CP"}},{"linePos":212.5,"vertLineData":{"type":"CP"}},{"linePos":213.5,"vertLineData":{"type":"CP"}},{"linePos":224.5,"vertLineData":{"type":"CP"}},{"linePos":231.5,"vertLineData":{"type":"CP"}},{"linePos":234.5,"vertLineData":{"type":"CP"}},{"linePos":245.5,"vertLineData":{"type":"CP"}},{"linePos":249.5,"vertLineData":{"type":"CP"}},{"linePos":251.5,"vertLineData":{"type":"CP"}},{"linePos":254.5,"vertLineData":{"type":"CP"}},{"linePos":255.5,"vertLineData":{"type":"CP"}},{"linePos":266.5,"vertLineData":{"type":"CP"}},{"linePos":271.5,"vertLineData":{"type":"CP"}},{"linePos":272.5,"vertLineData":{"type":"CP"}},{"linePos":284.5,"vertLineData":{"type":"CP"}},{"linePos":307.5,"vertLineData":{"type":"CP"}},{"linePos":308.5,"vertLineData":{"type":"CP"}},{"linePos":311.5,"vertLineData":{"type":"CP"}}
		]

  } //  End of data for the core Mason Viewer, end of data for property "protViewerCoreInputData"

 }  //  End of data for property  "results"
};