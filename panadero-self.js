// * * *     *       *   *       *   *   *   * *** *
// *    *       *     *      *   *       *   *     *
// *   API : panadero-colors.js      * *           * 
// *   Location i5v0/build/panadero-colors       * * 
// *   Modified :JaWsome.Orbit   *                 * 
// *   Date:    17 jun 2022             *          *
// *   Version: v1.0.1.            *        *      *
// ** *     *       *   *       *   *   *   *     **
// * *  *       *     *      *   *       *  *  * * *


class Color {
  constructor(name, code) {
    this.name = name;
    this.code = code;
  }
}

const allColors = [
  new Color('brightred', '#E74C3C'),
  new Color('soothingpurple', '#9B59B6'),
  new Color('skyblue', '#5DADE2'),
  new Color('leafygreen', '#48C9B0'),
  new Color('sunkissedyellow', '#F4D03F'),
  new Color('groovygray', '#D7DBDD'),
];

const simpleColors = ['red','grey','white','yellow','magenta','green','blue','cyan','purple','teal'];


exports.getRandomColor = () => {
  return allColors[Math.floor(Math.random() * allColors.length)];
}

exports.getSimpleRandom = () => {
  return simpleColors[Math.floor(Math.random() * simpleColors.length)];
}



exports.allColors = allColors;