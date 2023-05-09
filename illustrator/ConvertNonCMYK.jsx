// Check if there's an open document
if (app.documents.length === 0) {
    alert("No open document found. Please open a document to run the script.");
} else {
    var doc = app.activeDocument;
    var nonCMYKObjects = [];

    // Set the document color mode to CMYK
    doc.documentColorSpace = DocumentColorSpace.CMYK;

    // Recursively process all page items
    function processItems(items) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            // Check if the item has a fillColor and it's not CMYK
            if (item.fillColor && item.fillColor.typename !== "CMYKColor" && item.typename !== "GroupItem") {
                nonCMYKObjects.push(item);
                item.fillColor = convertToCMYK(item.fillColor);
            }

            // Check if the item has a strokeColor and it's not CMYK
            if (item.strokeColor && item.strokeColor.typename !== "CMYKColor" && item.typename !== "GroupItem") {
                nonCMYKObjects.push(item);
                item.strokeColor = convertToCMYK(item.strokeColor);
            }

            // Check if the item is a group or compound path, then process its children
            if (item.typename === "GroupItem" || item.typename === "CompoundPath") {
                processItems(item.pageItems);
            }
        }
    }

    // Convert color to CMYK
    function convertToCMYK(color) {
        var cmykColor = new CMYKColor();

        if (color.typename === "RGBColor") {
            var tempColor = app.convertSampleColor(ImageColorSpace.RGB, [color.red, color.green, color.blue], ImageColorSpace.CMYK);
            cmykColor.cyan = tempColor[0];
            cmykColor.magenta = tempColor[1];
            cmykColor.yellow = tempColor[2];
            cmykColor.black = tempColor[3];
        } else if (color.typename === "SpotColor") {
            cmykColor = convertToCMYK(color.spot.color);
        } else {
            // Handle other color types here, if needed
            alert("Unhandled color type: " + color.typename);
        }

        return cmykColor;
    }

    // Run the script
    processItems(doc.pageItems);
    doc.selection = nonCMYKObjects;
    alert(nonCMYKObjects.length + " non-CMYK objects found and converted to CMYK.");
}
