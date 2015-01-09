# Mason
### A JavaScript widget for viewing sequence features and annotations

Mason is a JavaScript and SVG-based viewer meant to display annotated regions or features of DNA and protein sequences. Mason is designed to be portable (integrated into any web site), flexible (supporting annotation data from any source), and easy-to-use (the provided "Generic JSON module" requires no JavaScript knowledge to set up). Mason is also extremely customizable, and with knowledge of JavaScript, may be greatly extended and customized through the use of callback functions passed into the Mason Viewer object. Mason is especially optimized for many overlapping regions, such as in the case of displaying a highly-abundant protein's peptide coverage from proteomics experiments.

## Read the Paper or Cite Mason
A thorough description of Mason, its features and capabilities, may be found in the following publication:

Daniel Jaschob, Trisha N. Davis, and Michael Riffle. Mason: A JavaScript web site widget for visualizing and comparing annotated features in nucleotide or protein sequences. Journal. Date. Volume(Issue) Pages.

## Get Started with Mason

### What can Mason do?
Working demos, examples and pre-built modules may be accessed at <a href="http://www.yeastrc.org/mason">our Mason demo site</a>. Pre-built modules may be used out-of-the-box with no JavaScript knowledge to display sequence feature annotations from some commonly-used annotation programs.

### Generic JSON Module
We have developed a generalized pre-built module that accepts simple JSON as input for feature annotations, which works out-of-the-box and requires no JavaScript editing to install. This module includes support for overlapping annotations, row-level coloring, expanded row coloring (when expanding rows to disambiguate overlapping features), and feature-level tooltips and links. Please see our <a href="http://www.yeastrc.org/mason/generic-jason-module">generic JSON module</a> page at <a href="http://www.yeastrc.org/mason">our Mason demo site</a> for a demo, installation instructions, and to download.


### Documentation
Please see <a href="mason_docs">our documentation section</a> for more information on installing, configuring, and customizing Mason--including a step-by-step example on how to build a new module if your needs exceed those that can be met by our generic JSON module or other pre-built modules.

## Download and Install Mason
The <a href="mason_download">mason_download</a> directory contains the core Mason JavaScript files and all required 3rd party libraries to install Mason on your web site. 

Once downloaded, place the JavaScript files in an appropriate directory on your web server and import the file susing standard HTML:

```html
<script type="text/javascript" src="js/libraries/jquery-1.8.0.min.js" ></script>
<script type="text/javascript" src="js/libraries/modernizr.v2.7.1__custom.39924_min.js"></script>
<script type="text/javascript" src="js/libraries/svg.min.js"></script>
<script type="text/javascript" src="js/libraries/wz_tooltip-min.js"></script>
<script type="text/javascript" src="js/mason_viewer/mason_viewer-min-munged.js"></script>
<script type="text/javascript" src="js/mason_viewer/mason_viewer_registry.js"></script>
```

## Build Mason
If you wish to download, change, and rebuild the Mason JavaScript files youself, please visit our <a href="mason_build">mason_build</a> directory for more information. This directory holds the official source used to build Mason.

