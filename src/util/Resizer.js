const MAX_WIDTH = 1000
const MAX_HEIGHT = 1000

const Jimp = require('jimp');

class Resizer {
    static async resize(image) {
        if (!this.#needsResize(image)) {
            return image;
        }

        return image.scaleToFit(MAX_WIDTH, MAX_HEIGHT, Jimp.RESIZE_BEZIER, (err) => {
            if (err) {
                throw err;
            }
        });
    }

    static #needsResize(image) {
        const width = image.bitmap.width;
        const height = image.bitmap.height;

        return width > MAX_WIDTH || height > MAX_HEIGHT;
    }
}

module.exports = Resizer;
