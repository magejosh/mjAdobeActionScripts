// This script will convert a selected raster image to a vector mesh using Image Trace in Adobe Illustrator

// Check if there is an active document
if (app.documents.length > 0) {
  // Get the active document
  var doc = app.activeDocument;

  // Check if an item is selected
  if (doc.selection.length > 0) {
    var selectedItem = doc.selection[0];

    // Check if the selected item is a RasterItem (Raster Image)
    if (selectedItem.typename == "RasterItem") {
      // Setup Image Trace options
      var traceOptions = {
        tracingMode: TracingModeType.TRACINGMODECOLOR,
        viewMode: ViewType.TRACINGVIEWVECTORTRACINGRESULT,
        palette: TracingPaletteType.TRACINGFULLTONES,
        maxColors: 30, // Adjust this value to control the number of colors in the output
        pathFitting: 2,
        noiseFidelity: 1,
        cornerFidelity: 1,
      };

      // Convert raster image to vector using Image Trace
      var tracingObject = selectedItem.trace(traceOptions);

      // Expand the tracing result
      tracingObject.expand();

      // Deselect the original raster image
      selectedItem.selected = false;

      // Select the expanded vector mesh
      tracingObject.selected = true;

      alert("The raster image has been converted to a vector mesh.");
    } else {
      alert("Please select a raster image.");
    }
  } else {
    alert("No item is selected. Please select a raster image.");
  }
} else {
  alert("No active document found. Please open a document containing a raster image.");
}
