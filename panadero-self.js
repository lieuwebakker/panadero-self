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
  new Self('brightred', '#E74C3C'),
  new Self('soothingpurple', '#9B59B6'),
  new Self('skyblue', '#5DADE2'),
  new Self('leafygreen', '#48C9B0'),
  new Self('sunkissedyellow', '#F4D03F'),
  new Self('groovygray', '#D7DBDD'),
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
module.exports.waitFor = (ms) => new Promise(r => setTimeout(r, ms));
module.exports.happyWait= (ms,msg='') => { return new Promise(resolve => { setTimeout(() => { resolve(msg+'🤡'); }, ms);});}
module.exports.pulseServer = async (a) => { await waitFor(a); }
module.exports.asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports.argv = () => {
    const arguments = {};
    process.argv.slice(2).map( (element) => {
        const matches = element.match( '--([a-zA-Z0-9]+)=(.*)');
        if ( matches ){
            arguments[matches[1]] = matches[2]
                .replace(/^['"]/, '').replace(/['"]$/, '');
        }
    });
    return arguments;
};

module.exports.encrypt = (_c) => {
    if(_c=="*")_c='A';
    if(_c=="&")_c='B';
    if(_c=="€")_c='C';
    if(_c=="@")_c='D';
    if(_c=="#")_c='E';
    if(_c=="$")_c='F';
    if(_c=="£")_c='G';
    if(_c=="%")_c='H';
    if(_c=="¥")_c='I';
    if(_c=="_")_c='J';
    if(_c=="-")_c='K';
    const o = {a:4,b:6,c:70,d:71,e:3,f:72,g:73,h:74,i:1,j:75,k:76,l:77,m:78,n:79,o:0,p:80,q:81,r:82,s:5,t:83,u:2,v:84,w:85,x:86,y:87,z:88,
    9:89,0:90,1:91,2:92,3:93,4:94,5:95,6:96,7:97,8:98,A:9901,B:9902,C:9903,D:9904,E:9905,F:9906,G:9907,H:9908,I:9909,J:9910,K:9911};
    return o[_c];
};

module.exports.decrypt = (_c) => {
    const o = {a:4,b:6,c:70,d:71,e:3,f:72,g:73,h:74,i:1,j:75,k:76,l:77,m:78,n:79,o:0,p:80,q:81,r:82,s:5,t:83,u:2,v:84,w:85,x:86,y:87,z:88,
    9:89,0:90,1:91,2:92,3:93,4:94,5:95,6:96,7:97,8:98,A:9901,B:9902,C:9903,D:9904,E:9905,F:9906,G:9907,H:9908,I:9909,J:9910,K:9911};
    return o[_c];
};



// dotenv
//const dotenv = require('dotenv');
//dotenv.config();