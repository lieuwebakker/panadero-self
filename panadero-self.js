// * * *     *       *   *       *   *   *   * *** *
// *    *       *     *      *   *       *   *     *
// *   API : panadero-self.js      * *           * 
// *   Location modules//panadero-self   * * 
// *   Modified :JaWsome.Orbit   *                 * 
// *   Date:    23 nov 2024              *         *
// *   Version: v0.9.59            *        *      *
// ** *     *       *   *       *   *   *   *     **
// * *  *       *     *      *   *       *  *  * * *
//  change 0.9.47 : add totalSupply
//  change 0.9.48 : add contract parameters totalSupply(_contract)
//  change 0.9.49 : added burner.json to package
//  change 0.9.50 : import endPoints from .env
//  change 0.9.51 : recover import.meta.env
//      If  using Vite, use import.meta.env instead, process.env is removed.
//      And make sure variables start with VITE_ in .env file.
//  change 0.9.52 : fix endpoint madness network eth or bsc [_network]
//  change 0.9.53 : changed _network for object
//  change 0.9.54 : retrieve endPoint from .env for totalSupply
//  change 0.9.55 : repair 'network="bsc" for native calls
//  change 0.9.56 : included checkSupplyDelta()
//  change 0.9.57 : included createBurnMsg(), idleMsg()
//  change 0.9.58 : remove 134 //_quotient= _burner.max_fire;
//  change 0.9.59 : remove dotenv;
//  change 0.9.60 : add balanceOf


import { ethers, keccak256, toUtf8Bytes } from "ethers";
//import {} from "dotenv";
import axios from 'axios';

const moduleName = "Panadero-SELF";
const moduleGit = "https://github.com/lieuwebakker/panadero-self";
const moduleVersion = "0.9.59";

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

// endpoint abi contract // default bsc
let e = {"bsc":"https://bsc-dataseed1.binance.org/", "eth":""};

let _network="bsc";
const a = [{"inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],"name": "ownerOf","outputs": [{ "internalType": "address", "name": "", "type": "address" }],"stateMutability": "view","type": "function"}];
const c = "0x125Bb13F77f3565d421bD22e92aaFfC795D97a72"; // SelfNft v2.2.4
const c2 = "0x50c34995a273075a80c23625F69F40d56CE414DE"; // Self

const abi = [{"inputs":[{"internalType":"address","name":"_self","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AlreadyAgentError","type":"error"},{"inputs":[],"name":"ConsecutiveUnderscoreError","type":"error"},{"inputs":[],"name":"InvalidAddressError","type":"error"},{"inputs":[],"name":"InvalidCommissionError","type":"error"},{"inputs":[],"name":"NameAlreadyRegisteredError","type":"error"},{"inputs":[],"name":"NameLengthOutOfRangeError","type":"error"},{"inputs":[],"name":"NameNotReservedError","type":"error"},{"inputs":[],"name":"NameReservedError","type":"error"},{"inputs":[],"name":"NoTokensAvailableError","type":"error"},{"inputs":[],"name":"NotAgentError","type":"error"},{"inputs":[],"name":"NotNameOwnerError","type":"error"},{"inputs":[],"name":"PriceNotSet","type":"error"},{"inputs":[],"name":"ReservedWordStartError","type":"error"},{"inputs":[],"name":"UnderscoreStartError","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"agent","type":"address"},{"indexed":false,"internalType":"uint256","name":"commission","type":"uint256"}],"name":"AgentAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"agent","type":"address"}],"name":"AgentRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"agent","type":"address"},{"indexed":false,"internalType":"uint256","name":"commission","type":"uint256"}],"name":"AgentUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"CollectedSelfForwarded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"string","name":"metadata","type":"string"}],"name":"MetadataUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"NameRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"string","name":"name","type":"string"}],"name":"NameReserved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"string","name":"name","type":"string"}],"name":"NameUnreserved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"length","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"price","type":"uint256"}],"name":"PriceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newSelfToken","type":"address"}],"name":"SelfTokenUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"_agent","type":"address"},{"internalType":"uint256","name":"_commission","type":"uint256"}],"name":"addAgent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"string","name":"_name","type":"string"}],"name":"adminRegisterName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"string","name":"_name","type":"string"}],"name":"agentRegisterName","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"agents","outputs":[{"internalType":"bool","name":"isAgent","type":"bool"},{"internalType":"uint256","name":"commission","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string[]","name":"_names","type":"string[]"}],"name":"batchReserveNames","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"_names","type":"string[]"}],"name":"batchUnreserveNames","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collectedSelf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_agent","type":"address"},{"internalType":"uint256","name":"_commission","type":"uint256"}],"name":"editAgent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"forwardCollectedSelf","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"getNames","outputs":[{"internalType":"string[]","name":"names","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"isNameAvailable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lengthToPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"registerName","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_agent","type":"address"}],"name":"removeAgent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"reserveName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"reservedNames","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"reservedWords","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_salePrice","type":"uint256"}],"name":"royaltyInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"self","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"uint96","name":"_feeNumerator","type":"uint96"}],"name":"setDefaultRoyalty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"string","name":"_metadata","type":"string"}],"name":"setNameMetadata","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_length","type":"uint256"},{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_self","type":"address"}],"name":"setSelf","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenIdToName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"unreserveName","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// requirements

// getProvider
function gp() {return new ethers.JsonRpcProvider(e[_network]);}

// readContract
async function rc( _c, _a, _f, _p=[]) {
    const p = gp();
    const c = new ethers.Contract(_c, _a, p);
    return await c[_f](..._p);
}

async function resolveName(_n) {
    _network="bsc";
    return( await rc(c,abi,"ownerOf",[keccak256(toUtf8Bytes(_n))]));
}

async function totalSupply(_c) {
    // overrule endpoint
    _network = _c.network;
    e[_network] = _c.endPoint; 

    return( await rc(_c.address,_c.abi,"totalSupply"));
}

async function balanceOf(_c, _a) {
    // overrule endpoint
    _network = _c.network;
    e[_network] = _c.endPoint; 
    return( await rc(_c.address,_c.abi,"balanceOf",[_a]));
}


async function resolveAllNames(_n) {
    _network="bsc";
    let _wallet = await rc(c,abi,"ownerOf",[keccak256(toUtf8Bytes(_n))]);
    let _moreNames =( await rc(c,abi,"getNames",[_wallet]));
    return _moreNames;
}

// burnServer.vue
async function checkSupplyDelta(_burner, _decimals=1e18) {
    return new Promise( async (resolve, reject) => {
        try {
            let _bigIntTotalSupply = await totalSupply(_burner);
            let _nSupply = Number(_bigIntTotalSupply)/_decimals;
            let _burned = _burner.actual_supply - _nSupply;
            resolve({
                "burned":_burned,
                "supply":_nSupply
            });
        } catch (err) {
            console.log(err);
            resolve(0);
      }
    });
}

async function checkBalance(_burner, _address, _decimals=1e18 ) {
    return new Promise( async (resolve, reject) => {
        try {
            let _bigIntBalance = await balanceOf(_burner, _address);
            let _balance = Number(_bigIntBalance)/_decimals;
            resolve(
                balance
            );
        } catch (err) {
            console.log(err);
            resolve(0);
      }
    });
}

// burnServer.vue
async function createBurnMsg(_burner, _supply, _burned) {
    return new Promise( async (resolve, reject) => {
        try {
            const NR_FORMAT = 'en-US';
            let nf = new Intl.NumberFormat(NR_FORMAT);

            let _quotient = Math.floor(_burned / _burner.tokens_per_fire);
            if (_quotient > _burner.max_fire)_quotient = _burner.max_fire;
            //_quotient= _burner.max_fire;

            let _oPrice = await axios.get(`https://api.geckoterminal.com/api/v2/simple/networks/${_burner.network}/token_price/${_burner.address}`);
            let _price = parseFloat(_oPrice.data.data.attributes.token_prices[_burner.address.toLowerCase()]); 

            let _burnedUsd = (parseFloat(_burned)*parseFloat(_price)).toFixed(2);
            let _burnedPerc =  (((_burner.initial_supply - _supply)/_burner.initial_supply) * 100).toFixed(2);

            const _burnMsg= `🔥` + '🔥'.repeat(_quotient);
            const _msg =` NEW *$${_burner.symbol}* BURN !!

${_burnMsg}

*Quantity Burned:* : ${nf.format(_burned)} ($ ${_burnedUsd})
*New Total Supply* : ${nf.format(_supply)}
*Total % Burned* : ${_burnedPerc}%

${_burner.footer_msg}
`;
            resolve(_msg);
        } catch (err) {
            console.log(err);
            resolve(0);
        }
    }); 
}
/*
Quantity Burned: 89,638 ($637.79)
Circulating Supply : 896,410,729
Total % Burned : 10.03%
*/


// burnServer.vue
async function idleMsg(_input) {
    return new Promise( async (resolve, reject) => {
        try {
            let _msg = _input.replace("🔥","💧")
                .replace("💧🔥","🔥💧")
                .replace("💧💧💧💧💧","🔥🔥🔥🔥🔥")
                .replace(".......................................","💥")
                .replace("💥💥💥💥💥💥💥💥💥💥","🌈")+'.';
            resolve(_msg);
        } catch (err) {
            console.log(err);
            resolve(0);
        }
    }); 
}

export { Self, moduleName, moduleVersion, moduleGit, resolveName, resolveAllNames, totalSupply, checkSupplyDelta, checkBalance, createBurnMsg, idleMsg };

