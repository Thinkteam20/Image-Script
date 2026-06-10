#  Image-Script: Simple CLI Image Compression & Format Conversion Tool

##  Overview
`Image-Script` is a straightforward Node.js command-line tool that enables **batch image compression via TinyPNG API** and **format conversion** for images in a folder. It automates repetitive image optimization tasks to streamline development workflows.

##  Key Features
*  Batch processing of images in `./target` folder
*  High-quality compression through TinyPNG API
*  Format conversion support (JPEG/PNG/WebP)
*  Automatic skip of non-image files
*  Auto-creation of `./Compressed` and `./Converted` output folders

##  How to Use

### 1. Installation
```bash
git clone https://github.com/Thinkteam20/Image-Script.git
cd Image-Script
npm install
```

### 2. Environment Setup
```bash
# Create .env file with your TinyPNG API key
echo "API_KEY=your_tinypng_api_key" > .env
```

### 3. Prepare Images
* Place images to compress or convert in the `./target` folder
* Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

### 4. Run the Tool
```bash
node index.js
```
* Choose `1`: Image compression (maintains original format)
* Choose `2`: Format conversion (select PNG, WebP, or JPEG)

##  Output
* Compressed files: `./Compressed/`
* Converted files: `./Converted/`

##  Development Intent
Built to automate repetitive image optimization tasks encountered during web development projects. A simple yet practical CLI tool that has been used across 20+ real projects.

##  Tech Stack
* **Node.js** (fs, path, readline modules)
* **TinyPNG API** (`tinify` package)
* **dotenv** (API key management)

##  Future Improvements
* Duplicate filename handling
* Recursive subfolder processing
* Progress indicator display
* User configuration options (quality settings)

---
**Made to save time, not to be fancy.** *A small tool that reduces repetitive work.*
