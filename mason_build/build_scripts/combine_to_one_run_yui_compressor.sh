
#  combine_to_one_run_yui_compressor.sh

#  Script for creating the files in the download directories.

#  This script: 

#	combines the files that make up the Mason core into one file in the mason_download/orig dir.
#	copies the Mason Registry file to the mason_download/orig dir.
#	minifies the Mason core and Registry and writes them to mason_download/min.
#	zips the files in mason_download/orig.
#	zips the files in mason_download/min.


#  Run this on linux using:
#  bash combine_to_one_run_yui_compressor.sh


# abort the script for any errors
set -e


#  run with "bash -x" to debug

#   YUI Compressor jar is required at the variable YUICOMRESSOR_JAR_WITH_PATH

#  yuicompressor-2.4.8.jar  is required to be at the parent of the checkout of mason project
#   ( parent dir of parent dir of "mason_build" of the path: mason_build/build_scripts/ )


#  This variable MUST include the jar file name

YUICOMRESSOR_JAR_WITH_PATH=../../../yuicompressor-2.4.8.jar

# !!  Relative Paths from "build_scripts" directory

#  This variable MUST end in "/"

PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES=../mason_source/mason_core/


#  This variable MUST end in "/"

PATH_TO_MASON_VIEWER_REGISTRY_JS_FILE=../mason_source/mason_registry/


#  This variable MUST end in "/"

PATH_TO_MASON_VIEWER_DOWNLOAD_UN_MINIFIED_JS_FILES=../../mason_download/orig/

#  This variable MUST end in "/"

PATH_TO_MASON_VIEWER_DOWNLOAD_MINIFIED_JS_FILES=../../mason_download/min/


#  This variable MUST end in "/"

PATH_TO_MASON_VIEWER_DOWNLOAD_MINIFIED_JS_FILES_FROM_DOWNLOAD_ORIG_FILES=../min/


NON_MINIFIED_ZIP_FILENAME=mason_js.zip

MINIFIED_ZIP_FILENAME=mason_js_min.zip




#  This variable MUST end in "/"

PATH_TO_MASON_VIEWER_RUNSPACE=build_runspace/

#  This variable MUST end in "/"

PATH_TO_MASON_VIEWER_RUNSPACE_FROM_DOWNLOAD_DIR_ORIG_OR_MIN=../../mason_build/build_scripts/build_runspace




if [ ! -d ${PATH_TO_MASON_VIEWER_RUNSPACE} ];
then
    echo "Directory '${PATH_TO_MASON_VIEWER_RUNSPACE}' defined by variable PATH_TO_MASON_VIEWER_RUNSPACE not found, creating it"
	mkdir ${PATH_TO_MASON_VIEWER_RUNSPACE}
fi

if [ ! -f ${YUICOMRESSOR_JAR_WITH_PATH} ];
then
    echo "File '${YUICOMRESSOR_JAR_WITH_PATH}' defined by variable YUICOMRESSOR_JAR_WITH_PATH not found!"
	exit 1;
fi

if [ ! -d ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES} ];
then
    echo "Directory '${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}' defined by variable PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES not found!"
	exit 1;
fi


if [ ! -d ${PATH_TO_MASON_VIEWER_DOWNLOAD_UN_MINIFIED_JS_FILES} ];
then
    echo "Directory '${PATH_TO_MASON_VIEWER_DOWNLOAD_UN_MINIFIED_JS_FILES}' defined by variable PATH_TO_MASON_VIEWER_DOWNLOAD_MINIFIED_JS_FILES not found!"
	exit 1;
fi

if [ ! -d ${PATH_TO_MASON_VIEWER_DOWNLOAD_MINIFIED_JS_FILES} ];
then
    echo "Directory '${PATH_TO_MASON_VIEWER_DOWNLOAD_MINIFIED_JS_FILES}' defined by variable PATH_TO_MASON_VIEWER_DOWNLOAD_MINIFIED_JS_FILES not found!"
	exit 1;
fi


# echo before remove files

rm -f ${PATH_TO_MASON_VIEWER_DOWNLOAD_UN_MINIFIED_JS_FILES}mason_viewer.js

rm -f ${PATH_TO_MASON_VIEWER_DOWNLOAD_MINIFIED_JS_FILES}mason_viewer_all-min.js

# echo after remove files, before combine files

cat \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_01_comment_header.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_05_start_outer_enclosing_function.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_10_main.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_20_constants.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_30_per_instance.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_35_compute_representation.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_35_process_overlapping_blocks.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_35_reformat_data_to_internal_format.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_40_ProgramaticDataStorage.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_50_render_on_page.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_55_configDisplayOptionDefaults.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_55_render_on_page_addnl_methods.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_55_render_on_page_animate.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_55_render_on_page_constants.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_55_render_on_page_full_height_lines.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_55_render_on_page_general_utils.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_55_render_on_page_hidden_row_show_hide.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_55_render_on_page_main_row.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_55_render_on_page_pixel_positioning.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_55_render_on_page_totals_row.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_95_end_outer_enclosing_function.js  \
    > ${PATH_TO_MASON_VIEWER_DOWNLOAD_UN_MINIFIED_JS_FILES}mason_viewer.js

catExitValue=$?
if [ $catExitValue -ne 0 ] ; then
	echo cat of files to combine them to download dir failed with exit value $catExitValue
    exit $catExitValue
fi

# echo after combine files

# copy registry file to download dir

cp  ${PATH_TO_MASON_VIEWER_REGISTRY_JS_FILE}mason_viewer_registry.js  ${PATH_TO_MASON_VIEWER_DOWNLOAD_UN_MINIFIED_JS_FILES}

copyExitValue=$?
if [ $copyExitValue -ne 0 ] ; then
	echo copy of registry file to download dir failed with exit value $copyExitValue
    exit $catExitValue
fi


#   Minifiy and munge the core Mason file and the the Mason Registry file

# run with " --nomunge" param to not munge  variable names

 java -jar ${YUICOMRESSOR_JAR_WITH_PATH} --line-break 6000  \
  --verbose \
  -o ${PATH_TO_MASON_VIEWER_DOWNLOAD_MINIFIED_JS_FILES}mason_viewer-min.js \
  ${PATH_TO_MASON_VIEWER_DOWNLOAD_UN_MINIFIED_JS_FILES}mason_viewer.js \
  > ${PATH_TO_MASON_VIEWER_RUNSPACE}zzz_yuicompressor-min-munged_out.txt \
  2> ${PATH_TO_MASON_VIEWER_RUNSPACE}zzz_yuicompressor-min_munged_err.txt

yuiCompressorExitValue=$?
if [[ $yuiCompressorExitValue != 0 ]] ; then
	echo YUICompressor Failed for minifiy and munge, exitted with exit value $yuiCompressorExitValue
    exit $yuiCompressorExitValue
fi


 java -jar ${YUICOMRESSOR_JAR_WITH_PATH} --line-break 6000  \
  --verbose \
  -o ${PATH_TO_MASON_VIEWER_DOWNLOAD_MINIFIED_JS_FILES}mason_viewer_registry-min.js \
  ${PATH_TO_MASON_VIEWER_DOWNLOAD_UN_MINIFIED_JS_FILES}mason_viewer_registry.js \
  > ${PATH_TO_MASON_VIEWER_RUNSPACE}zzz_yuicompressor_mason_viewer_registry.js_-min-munged_out.txt \
  2> ${PATH_TO_MASON_VIEWER_RUNSPACE}zzz_yuicompressor_mason_viewer_registry.js_-min_munged_err.txt

yuiCompressorExitValue=$?
if [[ $yuiCompressorExitValue != 0 ]] ; then
	echo YUICompressor Failed for minifiy and munge of registry file, exitted with exit value $yuiCompressorExitValue
    exit $yuiCompressorExitValue
fi


#  Zip up the download directories



#  cd to download orig directory 


cd ${PATH_TO_MASON_VIEWER_DOWNLOAD_UN_MINIFIED_JS_FILES} 

cdExitValue=$?
if [ $cdExitValue -ne 0 ] ; then
	echo cd to ${PATH_TO_MASON_VIEWER_DOWNLOAD_UN_MINIFIED_JS_FILES} failed with exit value $cdExitValue
    exit $cdExitValue
fi	


echo pwd after cd ${PATH_TO_MASON_VIEWER_DOWNLOAD_UN_MINIFIED_JS_FILES} 

pwd


if [ -f ${NON_MINIFIED_ZIP_FILENAME} ];
then
    echo "Zip File '${PATH_TO_MASON_VIEWER_DOWNLOAD_UN_MINIFIED_JS_FILES}${NON_MINIFIED_ZIP_FILENAME}' defined by variable NON_MINIFIED_ZIP_FILENAME exists so renaming it"

	mv ${NON_MINIFIED_ZIP_FILENAME} ${NON_MINIFIED_ZIP_FILENAME}_OLD
	
	moveExitValue=$?
	if [ $moveExitValue -ne 0 ] ; then
		echo move of ${NON_MINIFIED_ZIP_FILENAME} to ${NON_MINIFIED_ZIP_FILENAME}_OLD failed with exit value $moveExitValue
	    exit $moveExitValue
	fi	
fi



#  Zip up the download orig directory

zip -v -r -x\*.md ${NON_MINIFIED_ZIP_FILENAME} \
 mason_viewer.js \
 mason_viewer_registry.js \
 required_libraries 


zipExitValue=$?
if [ $zipExitValue -ne 0 ] ; then
	echo zip -v -r -x\*.md ${NON_MINIFIED_ZIP_FILENAME}  failed with exit value $zipExitValue
    exit $zipExitValue
fi	


cd ${PATH_TO_MASON_VIEWER_DOWNLOAD_MINIFIED_JS_FILES_FROM_DOWNLOAD_ORIG_FILES} 


cdExitValue=$?
if [ $cdExitValue -ne 0 ] ; then
	echo cd to ${PATH_TO_MASON_VIEWER_DOWNLOAD_MINIFIED_JS_FILES_FROM_DOWNLOAD_ORIG_FILES} failed with exit value $cdExitValue
    exit $cdExitValue
fi	


echo pwd after cd ${PATH_TO_MASON_VIEWER_DOWNLOAD_MINIFIED_JS_FILES_FROM_DOWNLOAD_ORIG_FILES}  

pwd


if [ -f ${MINIFIED_ZIP_FILENAME} ];
then
    echo "Zip File '${MINIFIED_ZIP_FILENAME}' defined by variable MINIFIED_ZIP_FILENAME exists so renaming it"

	mv ${MINIFIED_ZIP_FILENAME} ${MINIFIED_ZIP_FILENAME}_OLD

	moveExitValue=$?
	if [ $moveExitValue -ne 0 ] ; then
		echo move of ${MINIFIED_ZIP_FILENAME} to ${MINIFIED_ZIP_FILENAME}_OLD failed with exit value $moveExitValue
	    exit $moveExitValue
	fi	
	
fi



#  Zip up the download min directory

zip -v -r -x\*.md ${MINIFIED_ZIP_FILENAME} \
 mason_viewer-min.js \
 mason_viewer_registry-min.js \
 required_libraries


zipExitValue=$?
if [ $zipExitValue -ne 0 ] ; then
	echo zip -v -r -x\*.md ${NON_MINIFIED_ZIP_FILENAME}  failed with exit value $zipExitValue
    exit $zipExitValue
fi	



