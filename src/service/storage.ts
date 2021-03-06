import encryptpwd from "encrypt-with-password";
import crypto from "crypto";

export class Storage {
    static saveEncrypted(key: string, value: string, password: string): void {
        const encrypt = encryptpwd.encrypt(`${this.getChecksum(password)}:${value}`, password);
        localStorage.setItem(key, encrypt);
    }

    static getEncrypted(key: string, password: string): string | null {
        const value = localStorage.getItem(key);
        if (value == null) {
            return null;
        }

        try {
            const decrypted = encryptpwd.decrypt(value, password);
            const checksum = decrypted.toString().substr(0, decrypted.indexOf(':'));

            if (checksum === this.getChecksum(password) || checksum === this.getChecksum(password, 10)) {
                return decrypted.substr(decrypted.indexOf(':') + 1)
            }

        } catch {
            return null;
        }

        return null;
    }

    static isPasswordCorrect(key: string, password: string): boolean {
        return this.getEncrypted(key, password) !== null;
    }

    private static getChecksum(password: string, length = 9) {
        const sha256Hasher = crypto.createHash("sha256");
        return sha256Hasher.update(password).digest().toString('utf-8', 0, length);
    }
}
