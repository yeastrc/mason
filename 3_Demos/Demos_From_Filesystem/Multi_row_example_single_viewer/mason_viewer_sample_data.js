
//   mason_viewer_sample_data.js

//     This is a Javascript file for this demo

//   Depends on jquery

//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


//  Sample data for the Mason Viewer




	var masonViewerData
		= { "maxSequenceLength": 255,
			"rowItems": [
							{"label":"BBpilabel1",
							"blockItems": [
											{
											"blockData":{ "count":25, "otherData":"TheOtherData"},
											"startPos":25,
											"endPos":37
											},
											{
											"blockData":{"count":13, "otherData":"TheOtherData"},
											"startPos":33,
											"endPos":79
											}
										]
							}
							,
							{"label":"pilabel2",
							"blockItems": [
											{
											"blockData":{"count":41, "otherData":"TheOtherData"},
											"startPos":15,
											"endPos":27
											},
											{
											"blockData":{"count":68, "otherData":"TheOtherData"},
											"startPos":25,
											"endPos":37
											},
											{
											"blockData":{"count":57, "otherData":"TheOtherData"},
											"startPos":22,
											"endPos":45
											}
										]
							}
							,
							{"label":"pilabel3",
							"blockItems": [
											{
											"blockData":{"count":47, "otherData":"TheOtherData"},
											"startPos":64,
											"endPos":81
											}
										]
							}
						]};
