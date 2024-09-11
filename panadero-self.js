// * * *     *       *   *       *   *   *   * *** *
// *    *       *     *      *   *       *   *     *
// *   API : panadero-self.js      * *           * 
// *   Location i5v14-self/build/panadero-self   * * 
// *   Modified :JaWsome.Orbit   *                 * 
// *   Date:    13 jun 2023              *          *
// *   Version: v0.9.4.            *        *      *
// ** *     *       *   *       *   *   *   *     **
// * *  *       *     *      *   *       *  *  * * *

//const Moralis = require("moralis").default;
//const { EvmChain } = require("@moralisweb3/common-evm-utils");

const moduleName = "Panadero-SELF";
const moduleGit = "https://github.com/lieuwebakker/panadero-self";
const version = "0.9.4";

class Self {
    constructor(_code) {
    this.code = _code;
    this.name = 'panadero-self.js';
    this.colors = [];
    this.simpleColors = ['red','grey','white','yellow','magenta','green','blue','cyan','purple','teal'];
    }

    async getName() {
        var that = this;
        return that.name;
    }

    async getColors() {
        var that = this;
        return that.colors;
    }

    async setColors() {
        var that = this;
        this.colors= [ 
            {'name':'brightred', "code":'#E74C3C'},
            {'name':'soothingpurple', "code":'#9B59B6'},
            {'name':'skyblue', "code":'#5DADE2'},
            {'name':'leafygreen', "code":'#48C9B0'},
            {'name':'sunkissedyellow', "code":'#F4D03F'},
            {'name':'groovygray', "code":'#D7DBDD'}
            ];
    }
}

export { Self, moduleName, moduleGit };


/*
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


const getKeyByValue = function (_obj, value) {return Object.keys(_obj).find(key => _obj[key] === value);}


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

 const CODES = {a:4,b:6,c:70,d:71,e:3,f:72,g:73,h:74,i:1,j:75,k:76,l:77,m:78,n:79,o:0,p:80,q:81,r:82,s:5,t:83,u:2,v:84,w:85,x:86,y:87,z:88,
    9:89,0:90,1:91,2:92,3:93,4:94,5:95,6:96,7:97,8:98,A:9901,B:9902,C:9903,D:9904,E:9905,F:9906,G:9907,H:9908,I:9909,J:9910,K:9911};
  
const encrypt = function(_c) {
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
    return CODES[_c];
};

const decrypt = function(_c) {
    if(_c=="A")_c='*';
    if(_c=="B")_c='&';
    if(_c=="C")_c='€';
    if(_c=="D")_c='@';
    if(_c=="E")_c='#';
    if(_c=="F")_c='$';
    if(_c=="G")_c='£';
    if(_c=="H")_c='%';
    if(_c=="I")_c='¥';
    if(_c=="J")_c='_';
    if(_c=="K")_c='-';
    return _c;
};

const codes = function(){
    return CODES;
};


module.exports.eencrypt = (_nick) => {
    let f,r,r2,s,v1,v2,e,i;
    f=1;
    i = _nick.length;
    r =[];while(i--)r.push(encrypt(_nick.toLowerCase().charAt(i)));
    r2=r.reverse()
    r2.push(999);
    s = r2.reduce((a,b)=>a+b,0);
    v1=s.toString().substr(0,2)+f;
    v2= ('000'+ ('sum',s%1000).toString()).substr(-3);
    e = v1+r2.toString().replaceAll(',','')+v2;
    //console.log(e);

    return e;
};

const validations = function(_eNick) {
    try {
        // validations
        let val1 = _eNick.substr(0,2); 
        _eNick=_eNick.substr(2);
        let formule = _eNick.substr(0,1); 
        _eNick=_eNick.substr(1);
        let val2 = e.substr(-3); 
        _eNick=_eNick.substr(0,_eNick.length-3)

        console.log('formule', formule)
        console.log('validation 1:', val1)
        console.log('validation 2:', val2)
    } catch(err){
        console.log(err);
    }
}

module.exports.decrypt = (_eNick) => {
    let i=3;
    let decrypted='';
    while (i<_eNick.length) {
        // 1 chars
        if('0123456'.includes(_eNick[i])){
            decrypted+=(getKeyByValue(codes(),parseInt(_eNick[i])));
            i++; 
            continue;
        } 
        // 2 chars
        if(parseInt(_eNick.substr(i,2))>69 && parseInt(_eNick.substr(i,2))<99) {
            decrypted+=(getKeyByValue(codes(),parseInt(_eNick.substr(i,2))));
            i+=2;
            continue;
        } 
        // 3 end ?
        if(_eNick.substr(i,3)=='999') {i=_eNick.length; break;} 
        // 4 chars
        let c4 = parseInt(_eNick.substr(i,4));
        if(c4>9900 && c4<9912) {
        let d=decrypt((getKeyByValue(codes(),c4)));
        decrypted+=d;
            i+=4;
            continue;
        } 
        i++;
    }
    let response = {eNick:_eNick,decrypted:decrypted,validate1:"ok", validate2:"notOk"}
    return (response);
};
*/