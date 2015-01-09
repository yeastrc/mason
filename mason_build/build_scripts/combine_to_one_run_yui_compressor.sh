

#  run with "bash -x" to debug

#   YUI Compressor jar is required at the variable YUICOMRESSOR_JAR_WITH_PATH

#  yuicompressor-2.4.8.jar  is required to be at the parent of the checkout of mason project
#   ( parent dir of parent dir of "mason_build" of the path: mason_build/build_scripts/ )


#  This variable MUST include the jar file name

YUICOMRESSOR_JAR_WITH_PATH=../../../yuicompressor-2.4.8.jar


#  This variable MUST end in "/"

PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES=../mason_source/mason_core/


#  This variable MUST end in "/"

PATH_TO_MASON_VIEWER_REGISTRY_JS_FILE=../mason_source/mason_registry/


#  This variable MUST end in "/"

PATH_TO_MASON_VIEWER_DOWNLOAD_JS_FILES=../../mason_download/orig/

#  This variable MUST end in "/"

PATH_TO_MASON_VIEWER_DOWNLOAD_MINIFIED_JS_FILES=../../mason_download/min/


#  This variable MUST end in "/"

PATH_TO_MASON_VIEWER_RUNSPACE=build_runspace/

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


if [ ! -d ${PATH_TO_MASON_VIEWER_DOWNLOAD_JS_FILES} ];
then
    echo "Directory '${PATH_TO_MASON_VIEWER_DOWNLOAD_JS_FILES}' defined by variable PATH_TO_MASON_VIEWER_DOWNLOAD_MINIFIED_JS_FILES not found!"
	exit 1;
fi

if [ ! -d ${PATH_TO_MASON_VIEWER_DOWNLOAD_MINIFIED_JS_FILES} ];
then
    echo "Directory '${PATH_TO_MASON_VIEWER_DOWNLOAD_MINIFIED_JS_FILES}' defined by variable PATH_TO_MASON_VIEWER_DOWNLOAD_MINIFIED_JS_FILES not found!"
	exit 1;
fi


# echo before remove files

rm -f ${PATH_TO_MASON_VIEWER_DOWNLOAD_JS_FILES}mason_viewer.js

rm -f ${PATH_TO_MASON_VIEWER_DOWNLOAD_MINIFIED_JS_FILES}mason_viewer_all-min.js

# echo after remove files, before combine files

cat \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_01_comment_header.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_05_start_outer_enclosing_function.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_10_main.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_20_constants.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_30_per_instance.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_35_compute_representation.js  \
    ${PATH_TO_MASON_VIEWER_INDIVIDUAL_JS_FILES}mason_viewer_35_process_overlapping_peptides.js  \
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
    > ${PATH_TO_MASON_VIEWER_DOWNLOAD_JS_FILES}mason_viewer.js

catExitValue=$?
if [ $catExitValue -ne 0 ] ; then
	echo cat of files to combine them to download dir failed
    exit $catExitValue
fi

# echo after combine files

# copy registry file to download dir

cp  ${PATH_TO_MASON_VIEWER_REGISTRY_JS_FILE}mason_viewer_registry.js  ${PATH_TO_MASON_VIEWER_DOWNLOAD_JS_FILES}

copyExitValue=$?
if [ $copyExitValue -ne 0 ] ; then
	echo copy of registry file to download dir failed
    exit $catExitValue
fi


# run with " --nomunge" param to not munge  variable names

 java -jar ${YUICOMRESSOR_JAR_WITH_PATH} --line-break 6000  \
  --verbose \
  -o ${PATH_TO_MASON_VIEWER_DOWNLOAD_MINIFIED_JS_FILES}mason_viewer-min.js \
  ${PATH_TO_MASON_VIEWER_DOWNLOAD_JS_FILES}mason_viewer.js \
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
  ${PATH_TO_MASON_VIEWER_DOWNLOAD_JS_FILES}mason_viewer_registry.js \
  > ${PATH_TO_MASON_VIEWER_RUNSPACE}zzz_yuicompressor-min-munged_out.txt \
  2> ${PATH_TO_MASON_VIEWER_RUNSPACE}zzz_yuicompressor-min_munged_err.txt

yuiCompressorExitValue=$?
if [[ $yuiCompressorExitValue != 0 ]] ; then
	echo YUICompressor Failed for minifiy and munge of registry file, exitted with exit value $yuiCompressorExitValue
    exit $yuiCompressorExitValue
fi



