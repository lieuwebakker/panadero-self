// * * *     *       *   *       *   *   *   * *** *
// *    *       *     *      *   *       *   *     *
// *   API : panadero-colors.js      * *           * 
// *   Location i5v14-self/build/panadero-self   * * 
// *   Modified :JaWsome.Orbit   *                 * 
// *   Date:    7 feb 2023              *          *
// *   Version: v0.9.0.            *        *      *
// ** *     *       *   *       *   *   *   *     **
// * *  *       *     *      *   *       *  *  * * *





module.exports = {};

module.exports.camelToSnake = (str) => str.replace(
    /([A-Z])/g, "_$1"
).toLowerCase();