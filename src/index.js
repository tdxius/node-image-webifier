#!/usr/bin/env node

const Directory = require('./util/Directory');
const Resizer = require('./util/Resizer');
const cliProgress = require('cli-progress');
const Jimp = require('jimp');

const createTransformationProcesses = (images) => {
    images = Array.from(images)
    return images.map(async (filePath) => {
        try {
            const image = await Jimp.read(filePath);
            const outPath = `output/${filePath}`;

            const resizedImage = await Resizer.resize(image);
            resizedImage.writeAsync(outPath);
        } catch (error) {
            console.log(filePath, error)
        }
    })
};

function allProgress(promises) {
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    let doneCount = 0;

    progressBar.start(100, 0);
    for (const promise of promises) {
        promise.then(() => {
            doneCount++;
            const progress = Math.round((doneCount * 100) / promises.length)
            progressBar.update(progress)
        });
    }

    return Promise.all(promises);
}

(async () => {
    const arguments = process.argv.slice(2);
    const inputFolder = arguments[0];

    const processes = createTransformationProcesses(Directory.getImages(inputFolder))
    await allProgress(processes)
})()
