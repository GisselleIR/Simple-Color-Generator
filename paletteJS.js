/******************************************************************************************/
/*This section of code modified from: https://codepen.io/alexpg96/pen/xxrBgbP */
/******************************************************************************************/
window.onload = function () {
    randGradientBG();

    hueSlider();

    satSlideMin();
    satSlideMax();

    lightSlideMin();
    lightSlideMax();
}

let hueVal = document.getElementById("hueRange");
let sMin = document.getElementById("satMin");
let sMax = document.getElementById("satMax");
let lMin = document.getElementById("lightMin");
let lMax = document.getElementById("lightMax");
const gap = 5;
const sliderMaxValue = 100;

/*
 Convert HSL value colors to Hex
    parameters: numbers[int R, int G, int B]
    returns: int hue, int saturation, int lightness
    written by: https://stackoverflow.com/users/1376947/juraj
    found on: https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
 */
function toHex(h, s, l) {

    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

//Hue section
function hueSlider() {
    document.getElementById("hueAmount").innerHTML = hueVal.value + "\u00B0";

    //Change the color of the saturation slider according to the hue color
    var hue = hueVal.value;
    document.querySelector("#bgTrack1").style.background = `linear-gradient(to right, hsl(${hue},0%,50%), hsl(${hue}, 100%, 50%)`;
    var light = 25;

    for (var i = 0; i < 5; i++) {
        var colorNum = "color" + (i + 1);
        var colorText = colorNum + "Text";

        //Concatenate string
        let colorString = "hsl(" + hue + "," + 75 + "%," + light + "%)";

        document.getElementById(colorNum).style.backgroundColor = colorString;
        document.getElementById(colorText).innerHTML = toHex(hue, 75, light);

        light = Number(light) + 15;
    }

    //hueFillColor();
}

//function hueFillColor() {
//    percent1 = (hueVal.value / 360) * 100;
//    percent2 = 100 - Number(percent1);
//
//    document.querySelector("#hueTrack").style.background = `linear-gradient(to right, #3264fe ${percent1}%, #ffffff ${percent1}% ${percent2}%)`;
//}

//Saturation section
function satSlideMin() {
    if (Number(sMax.value) - Number(sMin.value) <= gap) {
        sMin.value = Number(sMax.value) - gap;
    }

    document.getElementById("satAmount").innerHTML = sMin.value + "% - " + sMax.value + "%";
    satFillColor();
}

function satSlideMax() {
    if (Number(sMax.value) - Number(sMin.value) <= gap) {
        sMax.value = Number(sMin.value) + gap;
    }

    document.getElementById("satAmount").innerHTML = sMin.value + "% - " + sMax.value + "%";
    satFillColor();
}

function satFillColor() {

    let hue = hueVal.value;
    console.log(hue);

    //Change the color of the color block according to the string
    percent1 = (sMin.value / sliderMaxValue) * 100;
    percent2 = (sMax.value / sliderMaxValue) * 100;
    document.querySelector("#satTrack").style.background = `linear-gradient(to right, rgba(0,0,0,0) ${percent1}%, #ffffff ${percent1}% ${percent2}%, rgba(0,0,0,0) ${percent2}%)`;
}

////////////////
//Light section
////////////////
function lightSlideMin() {
    if (Number(lMax.value) - Number(lMin.value) <= gap) {
        lMin.value = Number(lMax.value) - gap;
    }

    document.getElementById("lightAmount").innerHTML = lMin.value + "% - " + lMax.value + "%";
    lightFillColor();
}

function lightSlideMax() {
    if (Number(lMax.value) - Number(lMin.value) <= gap) {
        lMax.value = Number(lMin.value) + gap;
    }

    document.getElementById("lightAmount").innerHTML = lMin.value + "% - " + lMax.value + "%";
    lightFillColor();
}

function lightFillColor() {
    percent1 = (lMin.value / sliderMaxValue) * 100;
    percent2 = (lMax.value / sliderMaxValue) * 100;
    document.querySelector("#lightTrack").style.background = `linear-gradient(to right, rgba(0,0,0,0) ${percent1}%, #ffffff ${percent1}% ${percent2}%, rgba(0,0,0,0) ${percent2}%)`;
}
/******************************************************************************************/
/*End of modified section*/
/******************************************************************************************/

/*
 Genearte a random integer from [min, max)
    paramaters:
        int min -- the lower end of the range (inclusive)
        int max -- the upper end of the range (non-inclusive)
    returns: int randomInteger
 */
function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


/*
 Genearte two random hexadecimal color values to be used for a gradient background
    paramaters: NA
    returns: NA
 */
function randGradientBG() {
    var validHex = "0123456789ABCDEF";
    var hexCode = "#";
    var colors = [];

    //Pick characters at random to generate hex code
    for (var c = 0; c < 2; c++) {
        for (var i = 0; i < 6; i++) {
            hexCode += validHex[getRandInt(0, 16)];
        }
        colors[c] = hexCode;
        hexCode = "#";
    }

    let gradient = "linear-gradient(to right, " + colors[0] + ", " + colors[1] + ")";

    //Set bg color to created gradient
    document.body.style.background = gradient;
}

/*
 Take string in the format "rgb(n1, n2, n3)" and extract the numbers
    paramaters: string rgb
    returns: numbers[int R, int G, int B]
 */
function stringToNum(rgb) {
    //get numbers
    let numbers = rgb.match(/\d+/g);

    //convert those numbers to hex
    numbers[0] = Number(numbers[0]);
    numbers[1] = Number(numbers[1]);
    numbers[2] = Number(numbers[2]);

    //return array of rgb number values
    return numbers;
}

/*
 Calculate the lightness of a color from RGB values
    paramaters: numbers[int R, int G, int B]
    returns: int lightness level
 */
function lightness(numbers) {
    return (Math.max(...numbers) + Math.min(...numbers)) * 0.5;
}

/*
 Calculate the saturation level of a color from RGB values
    paramaters: numbers[int R, int G, int B]
    returns: int saturation level
 */
function saturation(numbers) {
    var max = Math.max(...numbers);
    var min = Math.min(...numbers);
    var light = lightness(numbers);

    if (light == 0 || light == 1) {
        return 0;
    }

    return ((max - min) / (1 - Math.abs((2 * light) - 1)));

}

/*
 Calculate the hue of a color from RGB values
    paramaters: numbers[int R, int G, int B]
    returns: int hue value (out of 360)
 */
function hue(numbers) {

    return Math.round(
        Math.atan2(
            Math.sqrt(3) * (Number(numbers[1]) - Number(numbers[2])),
            2 * Number(numbers[0]) - Number(numbers[1]) - Number(numbers[2])) * 180 / Math.PI
    );
}


/*
 Convert RGB value colors to HSL
    parameters: numbers[int R, int G, int B]
    returns: int hue, int saturation, int lightness
 */
function toHSL(rgb) {

    var numbers = stringToNum(rgb);
    var l = lightness(numbers);
    var s = saturation(numbers);
    var h = hue(numbers);

    return [h, s, l];

}

/*
 Generate a Monochromatic Color Palette
    parameters: NA
    returns: NA
 */
function genMono() {
    //Get the color of the main color block (The block to the far left)
    const hVal = Number(document.getElementById("hueRange").value);
    const sMinVal = Number(document.getElementById("satMin").value);
    const sMaxVal = Number(document.getElementById("satMax").value);
    const lMinVal = Number(document.getElementById("lightMin").value);
    const lMaxVal = Number(document.getElementById("lightMax").value);

    //Iterate through for loop enough times to change the color of all color blocks
    for (var i = 0; i < 5; i++) {

        var colorString = "hsl(" + hVal + ",";

        //Get the color block to be changed
        var colorNum = "color" + (i + 1);
        var colorText = colorNum + "Text";

        //Get random percentages for the lightness and saturation
        var saturation = getRandInt(sMinVal, sMaxVal);
        var lightness = getRandInt(lMinVal, lMaxVal);

        //Concatenate string
        colorString += saturation + "%," + lightness + "%)";

        //Change the color of the color block according to the string
        document.getElementById(colorText).innerHTML = toHex(hVal, saturation, lightness);
        document.getElementById(colorNum).style.backgroundColor = colorString;

    }

}


/*
 Generate an Analagous Color Palette
    paramaters: NA
    returns: NA
 */
function genAnalog() {
    //Get the color of the main color block (The block to the far left)
    const hVal = Number(document.getElementById("hueRange").value);
    var hue = hVal;
    const sMinVal = Number(document.getElementById("satMin").value);
    const sMaxVal = Number(document.getElementById("satMax").value);
    const lMinVal = Number(document.getElementById("lightMin").value);
    const lMaxVal = Number(document.getElementById("lightMax").value);

    var isRight = getRandInt(0, 2); // Determines if analgous color palette is going left or right on a color wheel
    var rotateAmount = 0;
    var rotateStep = 18;
    var rotateMax = 18;

    //Iterate through for loop enough times to change the color of all color blocks
    for (var i = 0; i < 5; i++) {

        //Get the color block to be changed
        var colorNum = "color" + (i + 1);
        var colorText = colorNum + "Text";

        //Get random percentages for the lightness and saturation
        var saturation = getRandInt(sMinVal, sMaxVal);
        var lightness = getRandInt(lMinVal, lMaxVal);

        //Keep the hue user has potentially chosen themselves for the main color block
        if (colorNum == "color1") {
            //Concatenate string
            var colorString = "hsl(" + hVal + ",";
            colorString += saturation + "%," + lightness + "%)";

            document.getElementById(colorText).innerHTML = toHex(hVal, saturation, lightness);
        }
        else {
            rotateAmount = getRandInt(0, (rotateMax + 1));
            rotateMax -= rotateAmount;
            if (isRight == 0) {
                rotateAmount = Number(rotateAmount) * (-1);
            }
            hue += rotateAmount;
            rotateMax += rotateStep;


            //Concatenate string
            var colorString = "hsl(" + hue + ",";
            colorString += saturation + "%," + lightness + "%)";

            document.getElementById(colorText).innerHTML = toHex(hue, saturation, lightness);
        }

        //Change the color of the color block according to the string
        document.getElementById(colorNum).style.backgroundColor = colorString;

    }

}


/*
 Generate a Complementary Color Palette
    parameters: NA
    returns: NA
 */
function genComp() {
    //Get the color of the main color block (The block to the far left)
    const hVal = Number(document.getElementById("hueRange").value);
    const sMinVal = Number(document.getElementById("satMin").value);
    const sMaxVal = Number(document.getElementById("satMax").value);
    const lMinVal = Number(document.getElementById("lightMin").value);
    const lMaxVal = Number(document.getElementById("lightMax").value);
    var compHue = hVal - 180;

    //Iterate through for loop enough times to change the color of all color blocks
    for (var i = 0; i < 5; i++) {

        var colorString = "hsl(" + hVal + ",";

        //Get the color block to be changed
        var colorNum = "color" + (i + 1);
        var colorText = colorNum + "Text";

        //Get random percentages for the lightness and saturation
        var saturation = getRandInt(sMinVal, sMaxVal);
        var lightness = getRandInt(lMinVal, lMaxVal);

        //Keep the hue user has potentially chosen themselves for the main color block
        if (colorNum == "color1") {
            //Concatenate string
            var colorString = "hsl(" + hVal + ",";

            document.getElementById(colorText).innerHTML = toHex(hVal, saturation, lightness);
        }
        else if (colorNum == "color2") {
            let rotateAmount = getRandInt(0, 16);
            let isRight = getRandInt(0, 2);
            if (isRight == 0) {
                rotateAmount = Number(rotateAmount) * (-1);
            }
            let temp = Number(hVal) + Number(rotateAmount);

            //Concatenate string
            var colorString = "hsl(" + temp + ",";

            document.getElementById(colorText).innerHTML = toHex(temp, saturation, lightness);
        }
        else {
            let rotateAmount = getRandInt(0, 16);
            let isRight = getRandInt(0, 2);
            if (isRight == 0) {
                rotateAmount = Number(rotateAmount) * (-1);
            }
            let temp = Number(compHue) + Number(rotateAmount);

            //Concatenate string
            var colorString = "hsl(" + temp + ",";

            document.getElementById(colorText).innerHTML = toHex(temp, saturation, lightness);
        }

        //Concatenate string
        colorString += saturation + "%," + lightness + "%)";

        //Change the color of the color block according to the string
        document.getElementById(colorNum).style.backgroundColor = colorString;

    }

}


/*
 Generate a Split Complementary Color Palette
    parameters: NA
    returns: NA
 */
function genSplit() {
    //Get the color of the main color block (The block to the far left)
    const hVal = Number(document.getElementById("hueRange").value);
    const sMinVal = Number(document.getElementById("satMin").value);
    const sMaxVal = Number(document.getElementById("satMax").value);
    const lMinVal = Number(document.getElementById("lightMin").value);
    const lMaxVal = Number(document.getElementById("lightMax").value);
    var compHue1 = hVal - 210;
    var compHue2 = hVal - 150;

    //Iterate through for loop enough times to change the color of all color blocks
    for (var i = 0; i < 5; i++) {

        var colorString = "hsl(" + hVal + ",";

        //Get the color block to be changed
        var colorNum = "color" + (i + 1);
        var colorText = colorNum + "Text";

        //Get random percentages for the lightness and saturation
        var saturation = getRandInt(sMinVal, sMaxVal);
        var lightness = getRandInt(lMinVal, lMaxVal);

        //Keep the hue user has potentially chosen themselves for the main color block
        if (colorNum == "color1") {
            //Concatenate string
            var colorString = "hsl(" + hVal + ",";

            document.getElementById(colorText).innerHTML = toHex(hVal, saturation, lightness);
        }
        else if (colorNum == "color2" || colorNum == "color3") {
            //Concatenate string
            var colorString = "hsl(" + compHue1 + ",";

            document.getElementById(colorText).innerHTML = toHex(compHue1, saturation, lightness);
        }
        else {
            //Concatenate string
            var colorString = "hsl(" + compHue2 + ",";

            document.getElementById(colorText).innerHTML = toHex(compHue2, saturation, lightness);
        }

        //Concatenate string
        colorString += saturation + "%," + lightness + "%)";

        //Change the color of the color block according to the string
        document.getElementById(colorNum).style.backgroundColor = colorString;
    }

}


/*
 Generate a Triadic Color Palette
    parameters: NA
    returns: NA
 */
function genTriad() {
    //Get the color of the main color block (The block to the far left)
    const hVal = Number(document.getElementById("hueRange").value);
    const sMinVal = Number(document.getElementById("satMin").value);
    const sMaxVal = Number(document.getElementById("satMax").value);
    const lMinVal = Number(document.getElementById("lightMin").value);
    const lMaxVal = Number(document.getElementById("lightMax").value);
    var hue1 = hVal;
    var hue2 = hue1 + 120;
    var hue3 = hue1 - 120;
    console.log("TRIADIC -- Hue 1: " + hue1 + ", Hue2: " + hue2 + ", Hue3: " + hue3);

    for (var i = 0; i < 5; i++) {

        var colorString = "hsl(" + hue1 + ",";

        //Get the color block to be changed
        var colorNum = "color" + (i + 1);
        var colorText = colorNum + "Text";

        //Get random percentages for the lightness and saturation
        var saturation = getRandInt(sMinVal, sMaxVal);
        var lightness = getRandInt(lMinVal, lMaxVal);

        //Keep the hue user has potentially chosen themselves for the main color block
        if (colorNum == "color1") {
            //Concatenate string
            var colorString = "hsl(" + hue1 + ",";

            document.getElementById(colorText).innerHTML = toHex(hue1, saturation, lightness);
        }
        else if (colorNum == "color2" || colorNum == "color3") {
            //Concatenate string
            var colorString = "hsl(" + hue2 + ",";

            document.getElementById(colorText).innerHTML = toHex(hue2, saturation, lightness);
        }
        else {
            //Concatenate string
            var colorString = "hsl(" + hue3 + ",";

            document.getElementById(colorText).innerHTML = toHex(hue3, saturation, lightness);
        }

        //Concatenate string
        colorString += saturation + "%," + lightness + "%)";

        //Change the color of the color block according to the string
        document.getElementById(colorNum).style.backgroundColor = colorString;

    }

}



/*
 Generate Random Color Palette
    paramaters: NA
    returns: NA
 */
function genRand() {

    //Iterate through for loop enough times to change the color of all color blocks
    for (var i = 0; i < 5; i++) {
        var hue = getRandInt(0, 361);
        var saturation = getRandInt(0, 101);
        var lightness = getRandInt(0, 101);        

        //Get the color block to be changed
        var colorNum = "color" + (i + 1);
        var colorText = colorNum + "Text";

        //Concatenate string
        var colorString = "hsl(" + hue + ",";
        colorString += saturation + "%," + lightness + "%)";

        //Change the color of the color block according to the string
        document.getElementById(colorNum).style.backgroundColor = colorString;
        document.getElementById(colorText).innerHTML = toHex(hue, saturation, lightness);

    }

}