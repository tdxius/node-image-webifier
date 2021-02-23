const fs = require("fs")
const path = require('path')
const isImage = require('is-image');

class Directory {
    static* getFiles(inputFolder) {
        const files = fs.readdirSync(inputFolder, {withFileTypes: true});
        for (let i = 0; i < files.length; i++) {
            if (files[i].isDirectory()) {
                yield* Directory.getFiles(path.join(inputFolder, files[i].name));
            } else {
                yield path.join(inputFolder, files[i].name);
            }
        }
    }

    static* getImages(inputFolder) {
        for (let file of Directory.getFiles(inputFolder)) {
            if (!isImage(file)) {
                continue
            }

            yield file
        }
    }
}

module.exports = Directory;
