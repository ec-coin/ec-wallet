import { assert } from 'chai'
import {Wallet} from "@/service/wallet";

const MNEMONIC = 'jacket dutch rely addict ball aunt urban typical engage boss neglect accuse average rival nest explain auto guess cloth swallow tobacco cost toss depend';

const PRIVATE_KEY = new Uint8Array([
    244, 156, 233, 38, 199, 218, 117, 221,
    27,  61, 110, 39, 156, 127, 211,  26,
    173, 200,  61, 12, 139, 167,   5,  57,
    47, 227, 160,  2,  42, 145, 236, 169
]);

describe('wallet', () => {

    it('should generate 24 word mnemonic', () => {
        assert(Wallet.generateMnemonic().split(' ').length === 24, 'not 24 words');
    });

    it('should convert mnemonic to private key', () => {
        assert(Wallet.mnemonicToPrivateKey(MNEMONIC).equals(PRIVATE_KEY), 'wrong private key');
    });

    it('should convert mnemonic to address', () => {
        assert(Wallet.getAddress(MNEMONIC) === 'GAiMXNT95tjLwScd5YGnKaX9B1m449Uhw3A6QGocUcUV', 'wrong address')
    });
})



