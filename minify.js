const readline = require('readline');
const fs = require("fs");
const path = require("path");
const tinify = require("tinify");

require('dotenv').config();
const API_KEY = process.env.API_KEY;
tinify.key = API_KEY;

// taget folder is the folder where your original target files is located.
const sourceFolder = "./target";

/*
  based on usr choose 1.compress 2.converted 
  it will created compress(folder) and converted(folder) accordingly.
*/
const compressedDestinationFolder = "./Compressed";
const convertedDestinationFolder = "./Converted";

const validExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Select the operation:\n1. Compress images\n2. Convert image formats\nEnter your choice (1/2): ", function (answer) {
    switch (answer) {
        case '1':
            compressImages();
            break;
        case '2':
            convertImageFormats();
            break;
        default:
            console.log("Invalid input. Please enter '1' or '2'.");
            rl.close();
    }
});

function compressImages() {
    if (!fs.existsSync(compressedDestinationFolder)) {
        fs.mkdirSync(compressedDestinationFolder);
        console.log("Created destination folder for compressed images:", compressedDestinationFolder);
    }

    fs.readdirSync(sourceFolder).forEach(file => {
        const sourcePath = path.join(sourceFolder, file);
        const destinationPath = path.join(compressedDestinationFolder, file);

        if (validExtensions.has(path.extname(file).toLowerCase())) {
            compressImage(sourcePath, destinationPath)
                .then(() => {
                    console.log("Compressed and saved:", file);
                })
                .catch(error => {
                    console.error("Error processing", file, ":", error.message);
                });
        } else {
            console.log("Skipped non-image file:", file);
        }
    });

    rl.close();
}

function compressImage(sourcePath, destinationPath) {
    const source = tinify.fromFile(sourcePath);
    return source.toFile(destinationPath);
}

function convertImageFormats() {
    rl.question("Select the desired output format:\n1. PNG\n2. WebP\n3. JPEG\nEnter your choice (1/2/3): ", function (answer) {
        switch (answer) {
            case '1':
                handleUserInput('png');
                break;
            case '2':
                handleUserInput('webp');
                break;
            case '3':
                handleUserInput('jpeg');
                break;
            default:
                console.log("Invalid input. Please enter '1', '2', or '3'.");
        }
        rl.close();
    });
}

function handleUserInput(format) {
    if (!fs.existsSync(convertedDestinationFolder)) {
        fs.mkdirSync(convertedDestinationFolder);
        console.log("Created destination folder for converted images:", convertedDestinationFolder);
    }

    fs.readdirSync(sourceFolder).forEach(file => {
        const sourcePath = path.join(sourceFolder, file);
        const destinationPath = path.join(convertedDestinationFolder, file.replace(/\.[^/.]+$/, `.${format}`));

        if (validExtensions.has(path.extname(file).toLowerCase())) {
            convertAndSaveImage(sourcePath, destinationPath, format)
                .then(() => {
                    console.log(`Converted and saved: ${file} to ${format.toUpperCase()} format.`);
                })
                .catch(error => {
                    console.error(`Error processing ${file}:`, error.message);
                });
        } else {
            console.log("Skipped non-image file:", file);
        }
    });
}

async function convertAndSaveImage(sourcePath, destinationPath, format) {
    const source = tinify.fromFile(sourcePath);
    await source.toFile(destinationPath);
}
