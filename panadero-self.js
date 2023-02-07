// * * *     *       *   *       *   *   *   * *** *
// *    *       *     *      *   *       *   *     *
// *   API : panadero-colors.js      * *           * 
// *   Location i5v14-self/build/panadero-self   * * 
// *   Modified :JaWsome.Orbit   *                 * 
// *   Date:    7 feb 2023              *          *
// *   Version: v0.9.1.            *        *      *
// ** *     *       *   *       *   *   *   *     **
// * *  *       *     *      *   *       *  *  * * *


class Self {
  constructor(name, code) {
    this.name = name;
    this.code = code;
  }
}

const allSelfs = [
  new Color('brightred', '#E74C3C'),
  new Color('soothingpurple', '#9B59B6'),
  new Color('skyblue', '#5DADE2'),
  new Color('leafygreen', '#48C9B0'),
  new Color('sunkissedyellow', '#F4D03F'),
  new Color('groovygray', '#D7DBDD'),
];

const simpleSelf = ['red','grey','white','yellow','magenta','green','blue','cyan','purple','teal'];


exports.getRandomSelf = () => {
  return allColors[Math.floor(Math.random() * allColors.length)];
}

exports.getSimpleRandom = () => {
  return simpleSelf[Math.floor(Math.random() * simpleColors.length)];
}



exports.allColors = allSelfs;



module.exports = {};

module.exports.camelToSnake = (str) => str.replace(
    /([A-Z])/g, "_$1"
).toLowerCase();