// Define the target color profile
var profileName = "US Web Coated (SWOP) v2";

// Assign the color profile to the active document
var docRef = app.activeDocument;
docRef.colorProfileName = profileName;

// Convert any RGB objects to the new color profile
var objects = docRef.pageItems;
for (var i = 0; i < objects.length; i++) {
  if (objects[i].typename == "RGBColor") {
    objects[i].convertToProfile(profileName);
  }
}
