// Select All Text and Convert to Outlines
// ExtendScript for Adobe Illustrator

function processTextItem(textItem) {
    textItem.selected = true;
    app.executeMenuCommand('outline');
}

function processGroupItem(groupItem) {
    for (var i = 0; i < groupItem.pageItems.length; i++) {
        var item = groupItem.pageItems[i];

        if (item.typename === 'TextFrame') {
            processTextItem(item);
        } else if (item.typename === 'GroupItem') {
            processGroupItem(item);
        } else if (item.typename === 'ClippingMask') {
            processClippingMask(item);
        }
    }
}

function processClippingMask(clipGroup) {
    for (var i = 0; i < clipGroup.clippedItems.length; i++) {
        var item = clipGroup.clippedItems[i];

        if (item.typename === 'TextFrame') {
            processTextItem(item);
        } else if (item.typename === 'GroupItem') {
            processGroupItem(item);
        } else if (item.typename === 'ClippingMask') {
            processClippingMask(item);
        }
    }
}

function processDocument(doc) {
    for (var i = 0; i < doc.pageItems.length; i++) {
        var item = doc.pageItems[i];

        if (item.typename === 'TextFrame') {
            processTextItem(item);
        } else if (item.typename === 'GroupItem') {
            processGroupItem(item);
        } else if (item.typename === 'ClippingMask') {
            processClippingMask(item);
        }
    }
}

if (app.documents.length > 0) {
    var doc = app.activeDocument;
    processDocument(doc);
} else {
    alert('Open a document to run the script.');
}
