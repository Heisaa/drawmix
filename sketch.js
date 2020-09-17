let img; // Declare variable 'img'.
let d;
let filled = [];

function preload() {
    img = loadImage('pico2.jpg');
    d = pixelDensity();
}

function setup() {
    createCanvas(img.width, img.height);


    img.loadPixels();
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {

            let pixel = getPixel(x, y);

            if (filled.length == 0) {
                floodFill(x, y, pixel);
            } else {
                let isInFilled = true;
                for (let i = 0; i < filled.length; i++) {
                    if ((filled[i][0] != x && filled[i][1] != y)) {
                        isInFilled = false;
                    }
                }
                if (!isInFilled) {
                    floodFill(x, y, pixel);
                    //print("fill");
                }

            }

        }
        print(filled.length)
    }
    img.updatePixels();
    image(img, 0, 0, width, height);
    
}

function draw() {

}

// Helper functions
function floodFill(x, y, startPixel) {
    if (x < 0 || x >= img.width || y < 0 || y >= img.height) {
        return;
    }
    if (colorDistance(getPixel(x, y), startPixel) > 500) {
        return;
    }
    for (let i = 0; i < filled.length; i++) {
        if (filled[i][0] == x && filled[i][1] == y) {
            return;
        }
    }


    //print(colorDistance(startPixel, getPixel(x,y)));
    //print(filled)
    setPixel(x, y, startPixel);
    //setPixel(x, y, [255,0,0,255]);
    filled.push([x, y]);

    floodFill(x + 1, y, startPixel);
    floodFill(x - 1, y, startPixel);
    floodFill(x, y + 1, startPixel); getPixel(x, y)
    floodFill(x, y - 1, startPixel);
}

function setPixel(x, y, rgb) {

    for (let i = 0; i < d; i++) {
        for (let j = 0; j < d; j++) {
            // loop over
            index = 4 * ((y * d + j) * img.width * d + (x * d + i));
            img.pixels[index] = rgb[0];
            img.pixels[index + 1] = rgb[1];
            img.pixels[index + 2] = rgb[2];
            img.pixels[index + 3] = 255;
        }
    }
}

function getPixel(x, y) {
    let rgb = [];
    for (let i = 0; i < d; i++) {
        for (let j = 0; j < d; j++) {
            // loop over
            index = 4 * ((y * d + j) * img.width * d + (x * d + i));
            rgb[0] = img.pixels[index];
            rgb[1] = img.pixels[index + 1];
            rgb[2] = img.pixels[index + 2];
        }
    }
    return rgb;
}

function colorDistance(c1, c2) {
    let rmean = (c1[0] + c2[0]) / 2;
    let r = c1[0] - c2[0];
    let g = c1[1] - c2[1];
    let b = c1[2] - c2[2];

    return sqrt((((512 + rmean) * r * r) >> 8) + 4 * g * g + (((767 - rmean) * b * b) >> 8));
}