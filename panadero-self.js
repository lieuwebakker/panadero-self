// * * *     *       *   *       *   *   *   * *** *
// *    *       *     *      *   *       *   *     *
// *   API : panadero-self.js      * *           * 
// *   Location modules//panadero-self   * * 
// *   Modified :JaWsome.Orbit   *                 * 
// *   Date:    13 sep 2024              *          *
// *   Version: v0.9.42.            *        *      *
// ** *     *       *   *       *   *   *   *     **
// * *  *       *     *      *   *       *  *  * * *

//const Moralis = require("moralis").default;
//const { EvmChain } = require("@moralisweb3/common-evm-utils");

import { ethers, keccak256, toUtf8Bytes  } from "ethers";

const moduleName = "Panadero-SELF";
const moduleGit = "https://github.com/lieuwebakker/panadero-self";
const moduleVersion = "0.9.42";

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


// endpoint abi contract
const e = "https://bsc-dataseed1.binance.org/";
const a = [{"inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],"name": "ownerOf","outputs": [{ "internalType": "address", "name": "", "type": "address" }],"stateMutability": "view","type": "function"}];
const c = "0x125Bb13F77f3565d421bD22e92aaFfC795D97a72"; // SelfNft v2.2.4
const abi = [{"inputs":[{"internalType":"address","name":"_self","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AlreadyAgentError","type":"error"},{"inputs":[],"name":"ConsecutiveUnderscoreError","type":"error"},{"inputs":[],"name":"InvalidAddressError","type":"error"},{"inputs":[],"name":"InvalidCommissionError","type":"error"},{"inputs":[],"name":"NameAlreadyRegisteredError","type":"error"},{"inputs":[],"name":"NameLengthOutOfRangeError","type":"error"},{"inputs":[],"name":"NameNotReservedError","type":"error"},{"inputs":[],"name":"NameReservedError","type":"error"},{"inputs":[],"name":"NoTokensAvailableError","type":"error"},{"inputs":[],"name":"NotAgentError","type":"error"},{"inputs":[],"name":"NotNameOwnerError","type":"error"},{"inputs":[],"name":"PriceNotSet","type":"error"},{"inputs":[],"name":"ReservedWordStartError","type":"error"},{"inputs":[],"name":"UnderscoreStartError","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"agent","type":"address"},{"indexed":false,"internalType":"uint256","name":"commission","type":"uint256"}],"name":"AgentAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"agent","type":"address"}],"name":"AgentRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"agent","type":"address"},{"indexed":false,"internalType":"uint256","name":"commission","type":"uint256"}],"name":"AgentUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"CollectedSelfForwarded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"string","name":"metadata","type":"string"}],"name":"MetadataUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"NameRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"string","name":"name","type":"string"}],"name":"NameReserved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"string","name":"name","type":"string"}],"name":"NameUnreserved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"length","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"price","type":"uint256"}],"name":"PriceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newSelfToken","type":"address"}],"name":"SelfTokenUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"_agent","type":"address"},{"internalType":"uint256","name":"_commission","type":"uint256"}],"name":"addAgent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"string","name":"_name","type":"string"}],"name":"adminRegisterName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"string","name":"_name","type":"string"}],"name":"agentRegisterName","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"agents","outputs":[{"internalType":"bool","name":"isAgent","type":"bool"},{"internalType":"uint256","name":"commission","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string[]","name":"_names","type":"string[]"}],"name":"batchReserveNames","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"_names","type":"string[]"}],"name":"batchUnreserveNames","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collectedSelf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_agent","type":"address"},{"internalType":"uint256","name":"_commission","type":"uint256"}],"name":"editAgent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"forwardCollectedSelf","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"getNames","outputs":[{"internalType":"string[]","name":"names","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"isNameAvailable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lengthToPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"registerName","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_agent","type":"address"}],"name":"removeAgent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"reserveName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"reservedNames","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"reservedWords","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_salePrice","type":"uint256"}],"name":"royaltyInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"self","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"uint96","name":"_feeNumerator","type":"uint96"}],"name":"setDefaultRoyalty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"string","name":"_metadata","type":"string"}],"name":"setNameMetadata","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_length","type":"uint256"},{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_self","type":"address"}],"name":"setSelf","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenIdToName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"unreserveName","outputs":[],"stateMutability":"nonpayable","type":"function"}];


// requirements

// getProvider
function gp() {return new ethers.JsonRpcProvider(e);}

// readContract
async function rc( _c, _a, _f, _p=[]) {
    const p = gp();
    const c = new ethers.Contract(_c, _a, p);
    return await c[_f](..._p);
}

async function resolveName(_n) {return( await rc(c,abi,"ownerOf",[keccak256(toUtf8Bytes(_n))]));}

export { Self, moduleName, moduleVersion, moduleGit, resolveName };

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