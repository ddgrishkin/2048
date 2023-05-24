# 2048
Reproduction of the popular game - 2048. It was developed for personal training purposes. I utilized the React library for the user interface. One of the most intriguing challenges involved ensuring accurate rendering to prevent unnecessary redraws and preserve smooth tile animations, all while leveraging React's reconciliation mechanism.

The main feature of this implementation is the ability to change the field size and digit. To achieve this, simply set the configurable property to true.

## CSS Variables
The visual colors can be changed using CSS variables (except for the tiles; I didn't have enough motivation to support this part). Please refer to [./src/game.css](./src/game.css) to see the available CSS variables that you can reuse or redefine in your app.
