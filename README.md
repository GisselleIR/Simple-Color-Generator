# Simple-Color-Generator
Generate color palettes from different palette types while being in control of hue, saturation and lightness ranges

## Installation
Ensure all three files (paletteHTML.html, paletteCSS.css, and paletteJS.js) are in the same folder before attempting to use them

## Use
To run the project, open the HTML file within your browswer.  It should look something like this:
![Screenshot of the overall program, which shows the default appearance of a monochromatic red color palette with 5 panels, 3 sliders corresponding to Hue, Saturation and Lightness values, as well as 6 buttons to generate palettes of different types.  These buttons are in this order: Monochromatic, analogous, complementary, split complementary, triadic and random.  The hexidecimal code is displayed on each color panel.](https://i.postimg.cc/k5jNm2xs/image.png)

As you adjust the hue slider, the preview color palette will change to reflect the chosen value.

You may also adjust the saturation and lightness levels.  By default, both values use the full range of options to generate palettes with any mixture of saturation and light values.  In order to make a color palette much lighter (pastel), move the maximum light slider to 100% and the mimimum light slider away from 0%.  If you'd like a palette that's closer to grayscale, keep the mimimum saturation slider at 0% and move the maximum slider downwards.

![A similar view of the previous screenshot.  The only difference is that the hue slider now has a value of 248 degrees, rather than the default 0 degrees.  The color palette below it is also a monochromatic blue color scheme instead of red.](https://i.postimg.cc/K8jpghJ0/image.png)

The only button that is not affected by the sliders will be the "Random" button.  It will generate a palette made of completely randomized hue, saturation and lightness values.
