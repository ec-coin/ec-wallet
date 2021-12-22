import * as bip39 from "bip39";
// import {ec as EC} from "elliptic";
// import crypto from "crypto";
// import BN from "bn.js";

//const ec = new EC('secp256k1');

export class Wallet {
    static generateMnemonic(): string {
        return bip39.generateMnemonic(256);
    }


}