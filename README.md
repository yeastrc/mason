# Mason
### A JavaScript widget for viewing sequence features and annotations

Mason is a JavaScript and SVG-based viewer meant to display annotated regions or features of DNA and protein sequences. Mason is designed to be portable (integrated into any web site), flexible (supporting annotation data from any source), and easy-to-use (the provided "Generic JSON module" requires no JavaScript knowledge to set up). Mason is also extremely customizable, and with knowledge of JavaScript, may be greatly extended and customized through the use of callback functions passed into the Mason Viewer object. Mason is especially optimized for many overlapping regions, such as in the case of displaying a highly-abundant protein's peptide coverage from proteomics experiments.

## Read the Paper or Cite Mason
A thorough description of Mason, its features and capabilities, may be found in the following publication:

Daniel Jaschob, Trisha N. Davis, and Michael Riffle. Mason: a JavaScript web site widget for visualizing and comparing annotated features in nucleotide or protein sequences. BMC Res Notes. 2015 Mar 7;8:70. doi: 10.1186/s13104-015-1009-z.

## Get Started with Mason

### What can Mason do?
Working demos, examples and pre-built modules may be accessed at <a href="http://www.yeastrc.org/mason">our Mason demo site</a>. Pre-built modules may be used out-of-the-box with no JavaScript knowledge to display sequence feature annotations from some commonly-used annotation programs.

### Generic JSON Module
We have developed a generalized pre-built module that accepts simple JSON as input for feature annotations, which works out-of-the-box and requires no JavaScript editing to install. This module includes support for overlapping annotations, row-level coloring, expanded row coloring (when expanding rows to disambiguate overlapping features), and feature-level tooltips and links. Please see our <a href="http://www.yeastrc.org/mason/Pre_Built_Modules/Generic_JSON/example_generic_json.html">generic JSON module page</a> at <a href="http://www.yeastrc.org/mason">our Mason demo site</a> for a demo, installation instructions, and to download.


## Documentation
Please see <a href="mason_doc">our documentation section</a> for more information on installing, configuring, and customizing Mason--including a guide on how to build a new module that customizes the appearance and behavior of the Mason viewer.

## Download and Install Mason
The <a href="mason_download">mason_download</a> directory contains the core Mason JavaScript files and all required 3rd party libraries to install Mason on your web site. 


## Build Mason
If you wish to download, change, and rebuild the Mason JavaScript files youself, please visit our <a href="mason_build">mason_build</a> directory for more information. This directory holds the official source used to build Mason.

