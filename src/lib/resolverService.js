import {
  getProvider,
  getWanchainResolverAddress
} from './web3Service';
import Resolver from './resolver';
import {
  getContentHash
} from '../helpers/ipfsHelper';
import {
  contentHash
} from '../lib/resolver';
const abi = require('ethereumjs-abi');
const Web3 = require('web3');
const namehash = require('eth-ens-namehash');
let web3 = new Web3();
let resolver = null;

const setWeb3Provider = () => {
  web3.setProvider(new web3.providers.HttpProvider(getProvider(process.env.WNS_NETWORK)));
  resolver = new Resolver(web3, getWanchainResolverAddress(process.env.WNS_NETWORK));
}

/**
 * 
 * @param {*} name 
 * @param {*} content 
 */
export const setContent = async (name, content) => {
  try {
    // name 要用 namehash
    console.log('name', name, 'content', content);
    let byteData = "0x" +
      abi.methodID("setContent", ["bytes32", "bytes32"]).toString("hex") +
      abi.rawEncode(["bytes32", "bytes32"], [namehash.hash(name), getContentHash(content)]).toString("hex");
    console.log('HASHED: name', namehash.hash(name), 'content', getContentHash(content));
    return byteData;
  } catch (err) {
    console.log('setResolver: ', name, content, err);
    return 'startAuctionsAndBid error';
  }
}

export const getContent = async (name) => {
  try {
    web3.setProvider(new web3.providers.HttpProvider(getProvider(process.env.ENS_NETWORK)));
    resolver = new Resolver(web3, getWanchainResolverAddress(process.env.ENS_NETWORK));
    const content = await contentHash(namehash.hash(name));
    return content;
  } catch (err) {
    console.log('getContent: ', name, err);
    return 'entries not found';
  }
}
