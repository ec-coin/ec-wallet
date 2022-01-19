import * as bip39 from "bip39";
import {ec as EC} from "elliptic";
import crypto from "crypto";
import base_58 from "base-58";
import BN from "bn.js";


const ec = new EC('secp256k1');

export class Wallet {
    static generateMnemonic(): string {
        return bip39.generateMnemonic(256);
    }

    static getAddress(mnemonic: string): string {
        const privateKey = this.mnemonicToPrivateKey(mnemonic);
        const key = ec.keyFromPrivate(privateKey);
        const toHash = key.getPublic().getX().toString('hex') + key.getPublic().getY().toString('hex')
        const sha256Hasher = crypto.createHash("sha256");
        const publicKeyHash = sha256Hasher.update(toHash).digest();

        return base_58.encode(publicKeyHash);
    }

    static mnemonicToPublicKey(mnemonic: string): any {
        const privateKey = this.mnemonicToPrivateKey(mnemonic);
        const key = ec.keyFromPrivate(privateKey);
        const pubkey = key.getPublic().encode('hex', false);
        return pubkey;
    }

    static mnemonicToPrivateKey(mnemonic: string): Buffer {
        const entropy = bip39.mnemonicToSeedSync(mnemonic);
        const sha256Hasher = crypto.createHash("sha256");
        return sha256Hasher.update(entropy).digest();
    }

    static sign(publicKey: string, mnemonic: string, payload: string) {
        const key = ec.keyFromPrivate(this.mnemonicToPrivateKey(mnemonic));
        const encoder = new TextEncoder();
        const msgBuffer = encoder.encode(payload);
        const hashedMsgBuffer = crypto.createHash("sha256").update(msgBuffer).digest();
        const signature = key.sign(hashedMsgBuffer);
        return signature.toDER('hex');
    }
}
