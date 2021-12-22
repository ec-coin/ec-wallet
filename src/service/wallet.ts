import * as bip39 from "bip39";
import {ec as EC} from "elliptic";
import crypto from "crypto";
import base_58 from "base-58";


const ec = new EC('secp256k1');

export class Wallet {
    static generateMnemonic(): string {
        return bip39.generateMnemonic(256);
    }

    static mnemonicToPrivateKey(mnemoic: string): Buffer {
        const entropy = bip39.mnemonicToSeedSync(mnemoic);
        const sha256Hasher = crypto.createHash("sha256");
        return sha256Hasher.update(entropy).digest();
    }

    static getAddress(mnemoic: string): string {
        const privateKey = this.mnemonicToPrivateKey(mnemoic);
        const key = ec.keyFromPrivate(privateKey);
        const publicKey = key.getPublic().encode('hex', false);
        const sha256Hasher = crypto.createHash("sha256");
        const publicKeyHash = sha256Hasher.update(publicKey).digest();
        return base_58.encode(publicKeyHash);
    }
}