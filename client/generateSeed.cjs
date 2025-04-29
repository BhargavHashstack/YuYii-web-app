const fs = require("fs");
const path = require("path");

// __dirname is available because we are using CommonJS
const inputPath = path.join(__dirname, "Yuyiiitest.newselectedstaycopy.json");
const outputPath = path.join(__dirname, "mongodbSeedData.js");

// Read the JSON file from your newselecteddestination collection
fs.readFile(inputPath, "utf8", (err, jsonData) => {
  if (err) {
    console.error("Error reading input JSON file:", err);
    return;
  }

  let documents;
  try {
    documents = JSON.parse(jsonData);
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError);
    return;
  }

  // Create the content for your seed file with an export statement.
  const outputContent =
    "export const stayDocuments = " +
    JSON.stringify(documents, null, 2) +
    ";";

  // Write the output to mongodbSeedData.js
  fs.writeFile(outputPath, outputContent, "utf8", (err) => {
    if (err) {
      console.error("Error writing seed data file:", err);
    } else {
      console.log("Seed data successfully generated!");
    }
  });
});
