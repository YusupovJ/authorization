import { randomBytes, scryptSync } from "crypto";

/* 
    For hashing and comparing hashed data.
*/

const encrypt = (string: string, salt: string) => {
    return scryptSync(string, salt, 32).toString("hex");
};

class Hasher {
    static hash(string: string) {
        const salt = randomBytes(16).toString("hex");
        return encrypt(string, salt) + salt;
    }

    static compare(string: string, hash: string) {
        const salt = hash.slice(64);
        const originalHash = hash.slice(0, 64);
        const currentHash = encrypt(string, salt);
        return originalHash === currentHash;
    }
}

export default Hasher;
