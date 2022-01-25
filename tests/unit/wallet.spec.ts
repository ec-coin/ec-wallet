import { assert } from 'chai'
import {Wallet} from "@/service/wallet";

const MNEMONIC = 'bind grunt joke slab debris mean build cry image solid eternal sign';

const PRIVATE_KEY = new Uint8Array([
    146, 239, 122, 106, 105, 40, 94, 107, 126, 206, 41, 100, 120, 152, 7, 133,
    28, 211, 162, 157, 214, 155, 22, 123, 134, 201, 80, 206, 90, 3, 34, 9
]);

describe('wallet', () => {

    it('should generate 24 word mnemonic', () => {
        assert(Wallet.generateMnemonic().split(' ').length === 12, 'not 12 words');
    });

    it('should convert mnemonic to private key', () => {
        assert(Wallet.mnemonicToPrivateKey(MNEMONIC).equals(PRIVATE_KEY), 'wrong private key');
    });

    it('should convert mnemonic to address', () => {
        assert(Wallet.getAddress(MNEMONIC) === '3AAS2iEPsGxsc3CK2bSyWmpeGLakLCtVewaLqbmV5umH', 'wrong address')
    });
})



