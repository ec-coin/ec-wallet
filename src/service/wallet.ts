import * as bip39 from "bip39";
import {ec as EC} from "elliptic";
import crypto from "crypto";
import base_58 from "base-58";


const ec = new EC('secp256k1');

export class Wallet {
    static generateMnemonic(): string {
        return bip39.generateMnemonic(256);
    }

    static getAddress(mnemonic: string): string {
        const publicKey = this.mnemonicToPublicKey(mnemonic);
        const sha256Hasher = crypto.createHash("sha256");
        const publicKeyHash = sha256Hasher.update(publicKey).digest();
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
        const signature = key.sign(msgBuffer, { canonical: true });
        return signature.toDER('hex');
    }
}
