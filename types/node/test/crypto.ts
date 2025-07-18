import * as crypto from "node:crypto";
import assert = require("node:assert");
import { promisify } from "node:util";

{
    // crypto hash copy with outputLength
    const copied: crypto.Hash = crypto.createHash("shake256").copy({ outputLength: 128 });
}

{
    const copied: crypto.Hash = crypto.createHash("md5").copy().copy({
        encoding: "ascii",
    });
}

{
    // crypto_hash_string_test
    let hashResult: string = crypto.createHash("md5").update("world").digest("hex");
    hashResult = crypto.createHash("shake256", { outputLength: 16 }).update("world").digest("hex");
}

{
    // crypto_hash_buffer_test
    const hashResult: string = crypto.createHash("md5").update(new Buffer("world")).digest("hex");
}

{
    // crypto_hash_dataview_test
    const hashResult: string = crypto
        .createHash("md5")
        .update(new DataView(new Buffer("world").buffer))
        .digest("hex");
}

{
    // crypto_hash_int8array_test
    const hashResult: string = crypto
        .createHash("md5")
        .update(new Int8Array(new Buffer("world").buffer))
        .digest("hex");
}

{
    // crypto_hmac_string_test
    const hmacResult: string = crypto.createHmac("md5", "hello").update("world").digest("hex");
}

{
    // crypto_hmac_buffer_test
    const hmacResult: string = crypto.createHmac("md5", "hello").update(new Buffer("world")).digest("hex");
}

{
    // crypto_hmac_dataview_test
    const hmacResult: string = crypto
        .createHmac("md5", "hello")
        .update(new DataView(new Buffer("world").buffer))
        .digest("hex");
}

{
    // crypto_hmac_int8array_test
    const hmacResult: string = crypto
        .createHmac("md5", "hello")
        .update(new Int8Array(new Buffer("world").buffer))
        .digest("hex");
}

{
    let hmac: crypto.Hmac;
    (hmac = crypto.createHmac("md5", "hello")).end("world", "utf8", () => {
        const hash: Buffer | string = hmac.read();
    }).end();
}

{
    // update Hmac with base64 encoded string
    const message = Buffer.from("message").toString("base64");
    crypto.createHmac("sha256", "key").update(message, "base64").digest();
}

{
    // update Hmac with base64url encoded string
    const message = Buffer.from("message").toString("base64url");
    crypto.createHmac("sha256", "key").update(message, "base64url").digest();
}

{
    // crypto_cipheriv_decipheriv_aad_ccm_test
    const key: string | null = "keykeykeykeykeykeykeykey";
    const nonce = crypto.randomBytes(12);
    const aad = Buffer.from("0123456789", "hex");

    const cipher = crypto.createCipheriv("aes-192-ccm", key, nonce, {
        authTagLength: 16,
    });
    const plaintext = "Hello world";
    cipher.setAAD(aad, {
        plaintextLength: Buffer.byteLength(plaintext),
    });
    const ciphertext = cipher.update(plaintext, "utf8");
    cipher.final();
    const tag = cipher.getAuthTag();

    const decipher = crypto.createDecipheriv("aes-192-ccm", key, nonce, {
        authTagLength: 16,
    });
    decipher.setAuthTag(tag);
    decipher.setAAD(aad, {
        plaintextLength: ciphertext.length,
    });
    const receivedPlaintext: string = decipher.update(ciphertext, undefined, "utf8");
    decipher.final();
}

{
    // crypto_cipheriv_decipheriv_aad_gcm_test
    const key = "keykeykeykeykeykeykeykey";
    const nonce = crypto.randomBytes(12);
    const aad = Buffer.from("0123456789", "hex");

    const cipher = crypto.createCipheriv("aes-192-gcm", key, nonce);
    const plaintext = "Hello world";
    cipher.setAAD(aad, {
        plaintextLength: Buffer.byteLength(plaintext),
    });
    const ciphertext = cipher.update(plaintext, "utf8");
    cipher.final();
    const tag = cipher.getAuthTag();

    const decipher = crypto.createDecipheriv("aes-192-gcm", key, nonce);
    decipher.setAuthTag(tag);
    decipher.setAAD(aad, {
        plaintextLength: ciphertext.length,
    });
    const receivedPlaintext: string = decipher.update(ciphertext, undefined, "utf8");
    decipher.final();
}

{
    // crypto_cipheriv_decipheriv_aad_ocb_test
    const key = "keykeykeykeykeykeykeykey";
    const iv = crypto.randomBytes(12);
    const aad = Buffer.from("0123456789", "hex");

    const cipher = crypto.createCipheriv("aes-192-ocb", key, iv, { authTagLength: 16 });
    const plaintext = "Hello world";
    cipher.setAAD(aad, {
        plaintextLength: Buffer.byteLength(plaintext),
    });
    const ciphertext = Buffer.concat([
        cipher.update(plaintext, "utf8"),
        cipher.final(),
    ]);
    const tag = cipher.getAuthTag();

    const decipher = crypto.createDecipheriv("aes-192-ocb", key, iv, { authTagLength: 16 });
    decipher.setAuthTag(tag);
    decipher.setAAD(aad, {
        plaintextLength: ciphertext.length,
    });
    const receivedPlaintext: Buffer = Buffer.concat([
        decipher.update(ciphertext),
        decipher.final(),
    ]);
}

{
    // crypto_cipheriv_decipheriv_cbc_string_encoding_test
    const key: string | null = "keykeykeykeykeykeykeykey";
    const nonce = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv("aes-192-cbc", key, nonce);
    const plaintext = "Hello world";
    // $ExpectType string
    const ciphertext = cipher.update(plaintext, "utf8", "binary");
    cipher.final();

    const decipher = crypto.createDecipheriv("aes-192-cbc", key, nonce);
    // $ExpectType string
    const receivedPlaintext = decipher.update(ciphertext, "binary", "utf8");
    decipher.final();
}

{
    // crypto_cipheriv_decipheriv_cbc_buffer_encoding_test
    const key: string | null = "keykeykeykeykeykeykeykey";
    const nonce = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv("aes-192-cbc", key, nonce);
    const plaintext = "Hello world";
    // $ExpectType Buffer || Buffer<ArrayBufferLike>
    const cipherBuf = cipher.update(plaintext, "utf8");
    cipher.final();

    const decipher = crypto.createDecipheriv("aes-192-cbc", key, nonce);
    // $ExpectType string
    const receivedPlaintext = decipher.update(cipherBuf, undefined, "utf8");
    decipher.final();
}

{
    // crypto_cipheriv_decipheriv_cbc_buffer_encoding_test
    const key: string | null = "keykeykeykeykeykeykeykey";
    const nonce = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv("aes-192-cbc", key, nonce);
    const plaintext = "Hello world";
    // $ExpectType Buffer || Buffer<ArrayBufferLike>
    const cipherBuf = cipher.update(plaintext, "utf8");
    cipher.final();

    const decipher = crypto.createDecipheriv("aes-192-cbc", key, nonce);
    // $ExpectType Buffer || Buffer<ArrayBufferLike>
    const receivedPlaintext = decipher.update(cipherBuf);
    decipher.final();
}

{
    let key: crypto.CipherKey = "" as crypto.CipherKey;
    let iv: crypto.BinaryLike = "" as crypto.BinaryLike;
    {
        let cipher = crypto.createCipheriv("aes-128-ccm", key, iv, { authTagLength: 16 });
        cipher = crypto.createCipheriv("aes-128-ccm", key, iv, {
            authTagLength: 16,
            read(size) {
                // $ExpectType Transform
                this;
                // $ExpectType number
                size;
            },
        });
        cipher = cipher.setAAD(Buffer.from([]), { plaintextLength: 0 });
        // $ExpectType Buffer<ArrayBufferLike>
        cipher.getAuthTag();
    }

    {
        let cipher = crypto.createCipheriv("aes-128-gcm", key, iv);
        cipher = crypto.createCipheriv("aes-128-gcm", key, iv, {});
        cipher = crypto.createCipheriv("aes-128-gcm", key, iv, { authTagLength: 16 });
        cipher = crypto.createCipheriv("aes-128-gcm", key, iv, {
            read(size) {
                // $ExpectType Transform
                this;
                // $ExpectType number
                size;
            },
        });
        cipher = cipher.setAAD(Buffer.from([]), { plaintextLength: 0 });
        // $ExpectType Buffer<ArrayBufferLike>
        cipher.getAuthTag();
    }

    {
        let cipher = crypto.createCipheriv("aes-128-ocb", key, iv, { authTagLength: 16 });
        cipher = crypto.createCipheriv("aes-128-ocb", key, iv, {
            authTagLength: 16,
            read(size) {
                // $ExpectType Transform
                this;
                // $ExpectType number
                size;
            },
        });
        cipher = cipher.setAAD(Buffer.from([]), { plaintextLength: 0 });
        // $ExpectType Buffer<ArrayBufferLike>
        cipher.getAuthTag();
    }

    {
        let cipher = crypto.createCipheriv("chacha20-poly1305", key, iv);
        cipher = crypto.createCipheriv("chacha20-poly1305", key, iv, {});
        cipher = crypto.createCipheriv("chacha20-poly1305", key, iv, { authTagLength: 16 });
        cipher = crypto.createCipheriv("chacha20-poly1305", key, iv, {
            read(size) {
                // $ExpectType Transform
                this;
                // $ExpectType number
                size;
            },
        });
        cipher = cipher.setAAD(Buffer.from([]), { plaintextLength: 0 });
        // $ExpectType Buffer<ArrayBufferLike>
        cipher.getAuthTag();
    }

    let cipher = crypto.createCipheriv("aes-128-ecb", key, iv);
    cipher = crypto.createCipheriv("aes-128-ecb", key, iv, {
        read(size) {
            // $ExpectType Transform
            this;
            // $ExpectType number
            size;
        },
    });
    // @ts-expect-error - .setAAD() does not exist
    cipher = cipher.setAAD(Buffer.from([]), { plaintextLength: 0 });
    // @ts-expect-error - .getAuthTag() does not exist
    cipher.getAuthTag();
}

{
    let key: crypto.CipherKey = "" as crypto.CipherKey;
    let iv: crypto.BinaryLike = "" as crypto.BinaryLike;
    {
        let cipher = crypto.createDecipheriv("aes-128-ccm", key, iv, { authTagLength: 16 });
        cipher = crypto.createDecipheriv("aes-128-ccm", key, iv, {
            authTagLength: 16,
            read(size) {
                // $ExpectType Transform
                this;
                // $ExpectType number
                size;
            },
        });
        cipher = cipher.setAAD(Buffer.from([]), { plaintextLength: 0 });
        cipher.setAuthTag(Buffer.from([]));
    }

    {
        let cipher = crypto.createDecipheriv("aes-128-gcm", key, iv);
        cipher = crypto.createDecipheriv("aes-128-gcm", key, iv, {});
        cipher = crypto.createDecipheriv("aes-128-gcm", key, iv, { authTagLength: 16 });
        cipher = crypto.createDecipheriv("aes-128-gcm", key, iv, {
            read(size) {
                // $ExpectType Transform
                this;
                // $ExpectType number
                size;
            },
        });
        cipher = cipher.setAAD(Buffer.from([]), { plaintextLength: 0 });
        cipher.setAuthTag(Buffer.from([]));
    }

    {
        let cipher = crypto.createDecipheriv("aes-128-ocb", key, iv, { authTagLength: 16 });
        cipher = crypto.createDecipheriv("aes-128-ocb", key, iv, {
            authTagLength: 16,
            read(size) {
                // $ExpectType Transform
                this;
                // $ExpectType number
                size;
            },
        });
        cipher = cipher.setAAD(Buffer.from([]), { plaintextLength: 0 });
        cipher.setAuthTag(Buffer.from([]));
    }

    {
        let cipher = crypto.createDecipheriv("chacha20-poly1305", key, iv);
        cipher = crypto.createDecipheriv("chacha20-poly1305", key, iv, {});
        cipher = crypto.createDecipheriv("chacha20-poly1305", key, iv, { authTagLength: 16 });
        cipher = crypto.createDecipheriv("chacha20-poly1305", key, iv, {
            read(size) {
                // $ExpectType Transform
                this;
                // $ExpectType number
                size;
            },
        });
        cipher = cipher.setAAD(Buffer.from([]), { plaintextLength: 0 });
        cipher.setAuthTag(Buffer.from([]));
    }

    let cipher = crypto.createDecipheriv("aes-128-ecb", key, iv);
    cipher = crypto.createDecipheriv("aes-128-ecb", key, iv, {
        read(size) {
            // $ExpectType Transform
            this;
            // $ExpectType number
            size;
        },
    });
    // @ts-expect-error - .setAAD() does not exist
    cipher = cipher.setAAD(Buffer.from([]), { plaintextLength: 0 });
    // @ts-expect-error - .setAuthTag() does not exist
    cipher.setAuthTag(Buffer.from([]));
}

{
    // crypto_timingsafeequal_buffer_test
    const buffer1: Buffer = new Buffer([1, 2, 3, 4, 5]);
    const buffer2: Buffer = new Buffer([1, 2, 3, 4, 5]);
    const buffer3: Buffer = new Buffer([5, 4, 3, 2, 1]);

    assert(crypto.timingSafeEqual(buffer1, buffer2));
    assert(!crypto.timingSafeEqual(buffer1, buffer3));
}

{
    // crypto_timingsafeequal_uint32array_test
    const arr1: Uint32Array = Uint32Array.of(1, 2, 3, 4, 5);
    const arr2: Uint32Array = Uint32Array.of(1, 2, 3, 4, 5);
    const arr3: Uint32Array = Uint32Array.of(5, 4, 3, 2, 1);

    assert(crypto.timingSafeEqual(arr1, arr2));
    assert(!crypto.timingSafeEqual(arr1, arr3));
}

{
    // crypto_timingsafeequal_safe_typedarray_variant_test
    const arr1: Uint32Array = Uint32Array.of(1, 2, 3, 4, 5);
    const arr2: Int32Array = Int32Array.of(1, 2, 3, 4, 5);
    const arr3: Uint32Array = Uint32Array.of(5, 4, 3, 2, 1);

    assert(crypto.timingSafeEqual(arr1, arr2));
    assert(!crypto.timingSafeEqual(arr1, arr3));
}

{
    // crypto_timingsafeequal_safe_int8array_variant_test
    const arr1: Int8Array = Int8Array.of(1, 2, 3, 4, 5, ~0, ~1, ~2, ~3, ~4);
    const arr2: Uint8Array = Uint8Array.of(1, 2, 3, 4, 5, ~0, ~1, ~2, ~3, ~4);
    const arr3: Uint8ClampedArray = Uint8ClampedArray.of(1, 2, 3, 4, 5, ~0, ~1, ~2, ~3, ~4);

    assert(crypto.timingSafeEqual(arr1, arr2)); // binary same
    assert(!crypto.timingSafeEqual(arr1, arr3)); // binary differ
}

{
    // crypto_timingsafeequal_safe_arraybufferiew_variant_test
    /* throws as of v10.4.1 */
    // let arr1: Uint8Array = Uint8Array.of(1, 0, 2, 0, 3, 0, 4, 0);
    // let arr2: Uint16Array = Uint16Array.of(1, 2, 3, 4);
    // let arr3: Uint32Array = Uint8ClampedArray.of(131073, 262147);
    // assert(crypto.timingSafeEqual(arr1, arr2)); // binary same
    // assert(crypto.timingSafeEqual(arr1, arr3)); // binary same
}

{
    // crypto_timingsafeequal_unsafe_arraybufferiew_variant_test
    /* dumps core as of v10.4.1 */
    // let arr1: Uint8Array = Uint8Array.of(1, 2, 3, 4);
    // let arr2: Uint16Array = Uint16Array.of(1, 2, 3, 4);
    // let arr3: Uint32Array = Uint8ClampedArray.of(1, 2, 3, 4);
    // assert(!crypto.timingSafeEqual(arr1, arr2)); // dumps core
    // assert(!crypto.timingSafeEqual(arr1, arr3)); // dumps core
}

{
    // crypto_timingsafeequal_dataview_test
    const dv1B: Uint8Array = Uint8Array.of(1, 2, 3, 4, 5);
    const dv2B: Int8Array = Int8Array.of(1, 2, 3, 4, 5);
    const dv3B: Buffer = Buffer.of(5, 4, 3, 2, 1);
    const dv4B: Uint8ClampedArray = Uint8ClampedArray.of(5, 4, 3, 2, 1);
    const dv1: DataView = new DataView(dv1B.buffer, dv1B.byteOffset, dv1B.byteLength);
    const dv2: DataView = new DataView(dv2B.buffer, dv2B.byteOffset, dv2B.byteLength);
    const dv3: DataView = new DataView(dv3B.buffer, dv3B.byteOffset, dv3B.byteLength);
    const dv4: DataView = new DataView(dv4B.buffer, dv4B.byteOffset, dv4B.byteLength);

    assert(crypto.timingSafeEqual(dv1, dv2));
    assert(crypto.timingSafeEqual(dv1, dv1B));
    assert(crypto.timingSafeEqual(dv2, dv1B));
    assert(crypto.timingSafeEqual(dv3, dv4));

    assert(!crypto.timingSafeEqual(dv1, dv3));
    assert(!crypto.timingSafeEqual(dv2, dv3));
    assert(!crypto.timingSafeEqual(dv1, dv4));
    // ... I'm not going to write all those tests.
}

{
    // crypto_timingsafeequal_uint32array_test
    const ui32_1: Uint32Array = Uint32Array.of(1, 2, 3, 4, 5);
    const ui32_2: Uint32Array = Uint32Array.of(1, 2, 3, 4, 5);
    const ui32_3: Uint32Array = Uint32Array.of(5, 4, 3, 2, 1);

    assert(crypto.timingSafeEqual(ui32_1, ui32_2));
    assert(!crypto.timingSafeEqual(ui32_1, ui32_3));
}

{
    // crypto_randomfill_buffer_test
    const buffer: Buffer = new Buffer(10);
    crypto.randomFillSync(buffer);
    crypto.randomFillSync(buffer, 2);
    crypto.randomFillSync(buffer, 2, 3);

    crypto.randomFill(buffer, (err: Error | null, buf: Buffer) => void {});
    crypto.randomFill(buffer, 2, (err: Error | null, buf: Buffer) => void {});
    crypto.randomFill(buffer, 2, 3, (err: Error | null, buf: Buffer) => void {});

    // crypto_randomfill_uint8array_test
    const ui8arr: Uint8Array = new Uint8Array(10);
    crypto.randomFillSync(ui8arr);
    crypto.randomFillSync(ui8arr, 2);
    crypto.randomFillSync(ui8arr, 2, 3);

    crypto.randomFill(ui8arr, (err: Error | null, buf: Uint8Array) => void {});
    crypto.randomFill(ui8arr, 2, (err: Error | null, buf: Uint8Array) => void {});
    crypto.randomFill(ui8arr, 2, 3, (err: Error | null, buf: Uint8Array) => void {});

    // crypto_randomfill_int32array_test
    const i32arr: Int32Array = new Int32Array(10);
    crypto.randomFillSync(i32arr);
    crypto.randomFillSync(i32arr, 2);
    crypto.randomFillSync(i32arr, 2, 3);

    crypto.randomFill(i32arr, (err: Error | null, buf: Int32Array) => void {});
    crypto.randomFill(i32arr, 2, (err: Error | null, buf: Int32Array) => void {});
    crypto.randomFill(i32arr, 2, 3, (err: Error | null, buf: Int32Array) => void {});
}

{
    // scrypt
    const pwd: string | Buffer | Int32Array | DataView = Buffer.alloc(16);
    const salt: string | Buffer | Int32Array | DataView = Buffer.alloc(16);
    crypto.scrypt(pwd, salt, 64, (err: Error | null, derivedKey: Buffer): void => {});
    const opts: crypto.ScryptOptions = {
        cost: 16384,
        blockSize: 8,
        parallelization: 1,
        maxmem: 32 * 1024 * 1024,
    };
    crypto.scrypt(pwd, salt, 64, opts, (err: Error | null, derivedKey: Buffer): void => {});
    crypto.scrypt(pwd, salt, 64, { maxmem: 16 * 1024 * 1024 }, (err: Error | null, derivedKey: Buffer): void => {});
    crypto.scryptSync(pwd, salt, 64);
    crypto.scryptSync(pwd, salt, 64, opts);
    crypto.scryptSync(pwd, salt, 64, { N: 1024 });
    const optsWithAliases: crypto.ScryptOptions = {
        N: opts.cost,
        r: opts.blockSize,
        p: opts.parallelization,
        maxmem: opts.maxmem,
    };
    crypto.scrypt(pwd, salt, 64, optsWithAliases, (err: Error | null, derivedKey: Buffer): void => {});
    crypto.scryptSync(pwd, salt, 64, optsWithAliases);
}

{
    let key: string | Buffer = Buffer.from("buf");
    const curve = "secp256k1";
    let ret: string | Buffer = crypto.ECDH.convertKey(key, curve);
    key = "0xfff";
    ret = crypto.ECDH.convertKey(key, curve);
    ret = crypto.ECDH.convertKey(key, curve, "hex");
    ret = crypto.ECDH.convertKey(key, curve, "hex", "hex");
    ret = crypto.ECDH.convertKey(key, curve, "hex", "hex", "uncompressed");
    ret = crypto.ECDH.convertKey(key, curve, "hex", "hex", "compressed");
    ret = crypto.ECDH.convertKey(key, curve, "hex", "hex", "hybrid");
}

{
    crypto.generateKey(
        "hmac",
        {
            length: 123,
        },
        (err: Error | null, key: crypto.KeyObject) => {},
    );

    crypto.generateKey(
        "aes",
        {
            length: 128,
        },
        (err: Error | null, key: crypto.KeyObject) => {},
    );

    crypto.generateKey(
        "aes",
        {
            length: 192,
        },
        (err: Error | null, key: crypto.KeyObject) => {},
    );

    crypto.generateKey(
        "aes",
        {
            length: 256,
        },
        (err: Error | null, key: crypto.KeyObject) => {},
    );
}

{
    const generateKeyPromisified = promisify(crypto.generateKey);

    const resHmac: Promise<crypto.KeyObject> = generateKeyPromisified(
        "hmac",
        {
            length: 123,
        },
    );

    const resAes128: Promise<crypto.KeyObject> = generateKeyPromisified(
        "aes",
        {
            length: 128,
        },
    );

    const resAes192: Promise<crypto.KeyObject> = generateKeyPromisified(
        "aes",
        {
            length: 192,
        },
    );

    const resAes256: Promise<crypto.KeyObject> = generateKeyPromisified(
        "aes",
        {
            length: 256,
        },
    );
}

{
    const rsaRes: {
        publicKey: Buffer;
        privateKey: string;
    } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 123,
        publicKeyEncoding: {
            format: "der",
            type: "pkcs1",
        },
        privateKeyEncoding: {
            cipher: "some-cipher",
            format: "pem",
            passphrase: "secret",
            type: "pkcs8",
        },
    });

    const rsaResNoPassphrase: {
        publicKey: Buffer;
        privateKey: string;
    } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 123,
        publicKeyEncoding: {
            format: "der",
            type: "pkcs1",
        },
        privateKeyEncoding: {
            format: "pem",
            type: "pkcs8",
        },
    });

    const rsaPssRes: {
        publicKey: Buffer;
        privateKey: string;
    } = crypto.generateKeyPairSync("rsa-pss", {
        modulusLength: 123,
        publicKeyEncoding: {
            format: "der",
            type: "spki",
        },
        privateKeyEncoding: {
            cipher: "some-cipher",
            format: "pem",
            passphrase: "secret",
            type: "pkcs8",
        },
    });

    const rsaPssResNoPassphrase: {
        publicKey: Buffer;
        privateKey: string;
    } = crypto.generateKeyPairSync("rsa-pss", {
        modulusLength: 123,
        publicKeyEncoding: {
            format: "der",
            type: "spki",
        },
        privateKeyEncoding: {
            format: "pem",
            type: "pkcs8",
        },
    });

    const dsaRes: {
        publicKey: string;
        privateKey: Buffer;
    } = crypto.generateKeyPairSync("dsa", {
        modulusLength: 123,
        divisorLength: 123,
        publicKeyEncoding: {
            format: "pem",
            type: "spki",
        },
        privateKeyEncoding: {
            cipher: "some-cipher",
            format: "der",
            passphrase: "secret",
            type: "pkcs8",
        },
    });

    const dsaResNoPassphrase: {
        publicKey: string;
        privateKey: Buffer;
    } = crypto.generateKeyPairSync("dsa", {
        modulusLength: 123,
        divisorLength: 123,
        publicKeyEncoding: {
            format: "pem",
            type: "spki",
        },
        privateKeyEncoding: {
            format: "der",
            type: "pkcs8",
        },
    });

    const ecRes: {
        publicKey: string;
        privateKey: string;
    } = crypto.generateKeyPairSync("ec", {
        namedCurve: "curve",
        publicKeyEncoding: {
            format: "pem",
            type: "pkcs1",
        },
        privateKeyEncoding: {
            cipher: "some-cipher",
            format: "pem",
            passphrase: "secret",
            type: "pkcs8",
        },
    });

    const ecResNoPassphrase: {
        publicKey: string;
        privateKey: string;
    } = crypto.generateKeyPairSync("ec", {
        namedCurve: "curve",
        publicKeyEncoding: {
            format: "pem",
            type: "pkcs1",
        },
        privateKeyEncoding: {
            format: "pem",
            type: "pkcs8",
        },
    });

    const ecExplicit: {
        publicKey: string;
        privateKey: string;
    } = crypto.generateKeyPairSync("ec", {
        namedCurve: "curve",
        paramEncoding: "explicit",
        publicKeyEncoding: {
            format: "pem",
            type: "pkcs1",
        },
        privateKeyEncoding: {
            format: "pem",
            type: "pkcs8",
        },
    });
}

{
    crypto.generateKeyPair(
        "rsa",
        {
            modulusLength: 123,
            publicKeyEncoding: {
                format: "der",
                type: "pkcs1",
            },
            privateKeyEncoding: {
                cipher: "some-cipher",
                format: "pem",
                passphrase: "secret",
                type: "pkcs8",
            },
        },
        (err: NodeJS.ErrnoException | null, publicKey: Buffer, privateKey: string) => {},
    );

    crypto.generateKeyPair(
        "rsa-pss",
        {
            modulusLength: 123,
            publicKeyEncoding: {
                format: "der",
                type: "spki",
            },
            privateKeyEncoding: {
                cipher: "some-cipher",
                format: "pem",
                passphrase: "secret",
                type: "pkcs8",
            },
        },
        (err: NodeJS.ErrnoException | null, publicKey: Buffer, privateKey: string) => {},
    );

    crypto.generateKeyPair(
        "dsa",
        {
            modulusLength: 123,
            divisorLength: 123,
            publicKeyEncoding: {
                format: "pem",
                type: "spki",
            },
            privateKeyEncoding: {
                cipher: "some-cipher",
                format: "der",
                passphrase: "secret",
                type: "pkcs8",
            },
        },
        (err: NodeJS.ErrnoException | null, publicKey: string, privateKey: Buffer) => {},
    );

    crypto.generateKeyPair(
        "ec",
        {
            namedCurve: "curve",
            publicKeyEncoding: {
                format: "pem",
                type: "pkcs1",
            },
            privateKeyEncoding: {
                cipher: "some-cipher",
                format: "pem",
                passphrase: "secret",
                type: "pkcs8",
            },
        },
        (err: NodeJS.ErrnoException | null, publicKey: string, privateKey: string) => {},
    );

    crypto.generateKeyPair(
        "ec",
        {
            namedCurve: "curve",
            paramEncoding: "explicit",
            publicKeyEncoding: {
                format: "pem",
                type: "pkcs1",
            },
            privateKeyEncoding: {
                cipher: "some-cipher",
                format: "pem",
                passphrase: "secret",
                type: "pkcs8",
            },
        },
        (err: NodeJS.ErrnoException | null, publicKey: string, privateKey: string) => {},
    );

    crypto.generateKeyPair(
        "ed25519",
        {
            publicKeyEncoding: {
                format: "pem",
                type: "spki",
            },
            privateKeyEncoding: {
                format: "pem",
                type: "pkcs8",
            },
        },
        (err: NodeJS.ErrnoException | null, publicKey: string, privateKey: string) => {},
    );

    crypto.generateKeyPair(
        "x25519",
        {
            publicKeyEncoding: {
                format: "pem",
                type: "spki",
            },
            privateKeyEncoding: {
                format: "pem",
                type: "pkcs8",
            },
        },
        (err: NodeJS.ErrnoException | null, publicKey: string, privateKey: string) => {},
    );
}

{
    const generateKeyPairPromisified = promisify(crypto.generateKeyPair);

    const rsaRes: Promise<{
        publicKey: Buffer;
        privateKey: string;
    }> = generateKeyPairPromisified("rsa", {
        modulusLength: 123,
        publicKeyEncoding: {
            format: "der",
            type: "pkcs1",
        },
        privateKeyEncoding: {
            cipher: "some-cipher",
            format: "pem",
            passphrase: "secret",
            type: "pkcs8",
        },
    });

    const rsaPssRes: Promise<{
        publicKey: Buffer;
        privateKey: string;
    }> = generateKeyPairPromisified("rsa-pss", {
        modulusLength: 123,
        publicKeyEncoding: {
            format: "der",
            type: "spki",
        },
        privateKeyEncoding: {
            cipher: "some-cipher",
            format: "pem",
            passphrase: "secret",
            type: "pkcs8",
        },
    });

    const dsaRes: Promise<{
        publicKey: string;
        privateKey: Buffer;
    }> = generateKeyPairPromisified("dsa", {
        modulusLength: 123,
        divisorLength: 123,
        publicKeyEncoding: {
            format: "pem",
            type: "spki",
        },
        privateKeyEncoding: {
            cipher: "some-cipher",
            format: "der",
            passphrase: "secret",
            type: "pkcs8",
        },
    });

    const ecRes: Promise<{
        publicKey: string;
        privateKey: string;
    }> = generateKeyPairPromisified("ec", {
        namedCurve: "curve",
        publicKeyEncoding: {
            format: "pem",
            type: "pkcs1",
        },
        privateKeyEncoding: {
            cipher: "some-cipher",
            format: "pem",
            passphrase: "secret",
            type: "pkcs8",
        },
    });

    const ed25519Res: Promise<{
        publicKey: string;
        privateKey: string;
    }> = generateKeyPairPromisified("ed25519", {
        publicKeyEncoding: {
            format: "pem",
            type: "spki",
        },
        privateKeyEncoding: {
            format: "pem",
            type: "pkcs8",
        },
    });

    const x25519Res: Promise<{
        publicKey: string;
        privateKey: string;
    }> = generateKeyPairPromisified("x25519", {
        publicKeyEncoding: {
            format: "pem",
            type: "spki",
        },
        privateKeyEncoding: {
            format: "pem",
            type: "pkcs8",
        },
    });
}

{
    const fips: 0 | 1 = crypto.getFips();
}

{
    crypto.createPrivateKey(Buffer.from("asdf"));
    crypto.createPrivateKey({
        key: "asd",
        format: "der",
    });
    crypto.createPrivateKey({
        key: "asd",
        format: "jwk",
    });
}

{
    crypto.createPrivateKey({
        key: "abc123",
        format: "der",
        encoding: "hex",
    });
    crypto.createPublicKey({
        key: "abc123",
        format: "der",
        encoding: "hex",
    });
}

{
    const keyObject = crypto.createSecretKey(Buffer.from("asdf")); // $ExpectType KeyObject
    keyObject instanceof crypto.KeyObject;
    assert.equal(keyObject.symmetricKeySize, 4);
    assert.equal(keyObject.type, "secret");
    crypto.createSecretKey("ascii", "ascii");
}

{
    const { privateKey, publicKey } = crypto.generateKeyPairSync("ed25519");
    privateKey; // $ExpectType KeyObject
    publicKey; // $ExpectType KeyObject
    privateKey.equals(publicKey); // $ExpectType boolean
    publicKey.equals(privateKey); // $ExpectType boolean
}

{
    const { privateKey, publicKey } = crypto.generateKeyPairSync("ec", {
        namedCurve: "sect239k1",
    });

    const sign: crypto.Sign = crypto.createSign("SHA256");
    sign.write("some data to sign");
    sign.end().end();
    const signature: string = sign.sign(privateKey, "hex");

    const verify: crypto.Verify = crypto.createVerify("SHA256");
    verify.write("some data to sign");
    verify.end().verify(publicKey, signature); // $ExpectType boolean

    // ensure that instanceof works
    verify instanceof crypto.Verify;
    sign instanceof crypto.Sign;
}

{
    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
    });

    const sign: crypto.Sign = crypto.createSign("SHA256");
    sign.update("some data to sign");
    sign.end().end();
    const signature: Buffer = sign.sign(privateKey);

    const verify: crypto.Verify = crypto.createVerify("SHA256");
    verify.update("some data to sign");
    verify.end().verify(publicKey, signature); // $ExpectType boolean
}

{
    // crypto.diffieHellman_test
    const x25519Keys1 = crypto.generateKeyPairSync("x25519", {
        publicKeyEncoding: {
            type: "spki",
            format: "pem",
        },
        privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
        },
    });
    const privateKeyObject1 = crypto.createPrivateKey({ key: x25519Keys1.privateKey });
    const publicKeyObject1 = crypto.createPublicKey({ key: x25519Keys1.publicKey });

    const x25519Keys2 = crypto.generateKeyPairSync("x25519", {
        publicKeyEncoding: {
            type: "spki",
            format: "pem",
        },
        privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
        },
    });
    const privateKeyObject2 = crypto.createPrivateKey({ key: x25519Keys2.privateKey });
    const publicKeyObject2 = crypto.createPublicKey({ key: x25519Keys2.publicKey });

    const sharedSecret1 = crypto.diffieHellman({ privateKey: privateKeyObject1, publicKey: publicKeyObject2 });
    const sharedSecret2 = crypto.diffieHellman({ privateKey: privateKeyObject2, publicKey: publicKeyObject1 });
    assert.equal(sharedSecret1, sharedSecret2);

    crypto.diffieHellman({ privateKey: privateKeyObject1, publicKey: publicKeyObject1 }, (err, secret) => {
        err; // $ExpectType Error | null
        secret; // $ExpectType Buffer || Buffer<ArrayBufferLike>
    });
}

{
    crypto.hash("sha1", "Node.js");
    crypto.hash("sha1", Buffer.from("Tm9kZS5qcw==", "base64"), "buffer");
}

{
    // crypto_constants_test
    let num: number;
    let str: string;

    num = crypto.constants.OPENSSL_VERSION_NUMBER;
    num = crypto.constants.SSL_OP_ALL;
    num = crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION;
    num = crypto.constants.SSL_OP_CIPHER_SERVER_PREFERENCE;
    num = crypto.constants.SSL_OP_CISCO_ANYCONNECT;
    num = crypto.constants.SSL_OP_COOKIE_EXCHANGE;
    num = crypto.constants.SSL_OP_CRYPTOPRO_TLSEXT_BUG;
    num = crypto.constants.SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS;
    num = crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT;
    num = crypto.constants.SSL_OP_NO_COMPRESSION;
    num = crypto.constants.SSL_OP_NO_QUERY_MTU;
    num = crypto.constants.SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION;
    num = crypto.constants.SSL_OP_NO_SSLv2;
    num = crypto.constants.SSL_OP_NO_SSLv3;
    num = crypto.constants.SSL_OP_NO_TICKET;
    num = crypto.constants.SSL_OP_NO_TLSv1;
    num = crypto.constants.SSL_OP_NO_TLSv1_1;
    num = crypto.constants.SSL_OP_NO_TLSv1_2;
    num = crypto.constants.SSL_OP_TLS_ROLLBACK_BUG;
    num = crypto.constants.ENGINE_METHOD_RSA;
    num = crypto.constants.ENGINE_METHOD_DSA;
    num = crypto.constants.ENGINE_METHOD_DH;
    num = crypto.constants.ENGINE_METHOD_RAND;
    num = crypto.constants.ENGINE_METHOD_EC;
    num = crypto.constants.ENGINE_METHOD_CIPHERS;
    num = crypto.constants.ENGINE_METHOD_DIGESTS;
    num = crypto.constants.ENGINE_METHOD_PKEY_METHS;
    num = crypto.constants.ENGINE_METHOD_PKEY_ASN1_METHS;
    num = crypto.constants.ENGINE_METHOD_ALL;
    num = crypto.constants.ENGINE_METHOD_NONE;
    num = crypto.constants.DH_CHECK_P_NOT_SAFE_PRIME;
    num = crypto.constants.DH_CHECK_P_NOT_PRIME;
    num = crypto.constants.DH_UNABLE_TO_CHECK_GENERATOR;
    num = crypto.constants.DH_NOT_SUITABLE_GENERATOR;
    num = crypto.constants.RSA_PKCS1_PADDING;
    num = crypto.constants.RSA_SSLV23_PADDING;
    num = crypto.constants.RSA_NO_PADDING;
    num = crypto.constants.RSA_PKCS1_OAEP_PADDING;
    num = crypto.constants.RSA_X931_PADDING;
    num = crypto.constants.RSA_PKCS1_PSS_PADDING;
    num = crypto.constants.RSA_PSS_SALTLEN_DIGEST;
    num = crypto.constants.RSA_PSS_SALTLEN_MAX_SIGN;
    num = crypto.constants.RSA_PSS_SALTLEN_AUTO;
    num = crypto.constants.POINT_CONVERSION_COMPRESSED;
    num = crypto.constants.POINT_CONVERSION_UNCOMPRESSED;
    num = crypto.constants.POINT_CONVERSION_HYBRID;

    str = crypto.constants.defaultCoreCipherList;
    str = crypto.constants.defaultCipherList;
}

{
    const sig: Buffer = crypto.sign("md5", Buffer.from(""), "mykey");

    crypto.sign("md5", Buffer.from(""), "mykey", (error: Error | null, data: Buffer) => {});

    const correct: boolean = crypto.verify("md5", sig, "mykey", sig);
    crypto.verify("md5", sig, "mykey", sig, (error: Error | null, result: boolean) => {});
}

{
    const key = {
        key: "test",
        oaepHash: "sha1",
        oaepLabel: Buffer.from("asd"),
    };
    const buf: Buffer = crypto.publicEncrypt(key, Buffer.from([]));
    const dec: Buffer = crypto.publicDecrypt(key, buf);

    const bufP: Buffer = crypto.privateEncrypt(key, Buffer.from([]));
    const decp: Buffer = crypto.privateDecrypt(key, bufP);

    const bufS: Buffer = crypto.publicEncrypt(key, "hello");
    const decS: Buffer = crypto.publicDecrypt(key, bufS);

    const bufPS: Buffer = crypto.privateEncrypt(key, "hello");
    const decpS: Buffer = crypto.privateDecrypt(key, bufPS);
}

// crypto.randomInt
{
    const callback = (error: Error | null, value: number): void => {};

    const a: number = crypto.randomInt(10);
    const b: number = crypto.randomInt(1, 10);
    crypto.randomInt(10, callback);
    crypto.randomInt(1, 10, callback);
}

{
    const callback = (error: Error | null, signature: Buffer): void => {};
    const key = crypto.createPrivateKey("pkey");
    crypto.sign("sha256", Buffer.from("asd"), {
        key: Buffer.from("keylike"),
        dsaEncoding: "der",
    });
    crypto
        .createSign("sha256")
        .update(Buffer.from("asd"))
        .sign({
            key: Buffer.from("keylike"),
            dsaEncoding: "der",
        });
    crypto.sign("sha256", Buffer.from("asd"), {
        key,
        dsaEncoding: "der",
    });
    crypto.sign("sha256", Buffer.from("asd"), {
        key,
        dsaEncoding: "der",
    }, callback);
    promisify(crypto.sign)("sha256", Buffer.from("asd"), {
        key,
        dsaEncoding: "der",
    }).then((signature: Buffer) => {});
    crypto.createSign("sha256").update(Buffer.from("asd")).sign({
        key,
        dsaEncoding: "der",
    });

    const jwk = key.export({ format: "jwk" });
    crypto.sign("sha256", Buffer.from("asd"), {
        format: "jwk",
        key: jwk,
        dsaEncoding: "der",
    });
    crypto.sign("sha256", Buffer.from("asd"), {
        format: "jwk",
        key: jwk,
        dsaEncoding: "der",
    }, callback);
    promisify(crypto.sign)("sha256", Buffer.from("asd"), {
        format: "jwk",
        key: jwk,
        dsaEncoding: "der",
    }).then((signature: Buffer) => {});
    crypto.createSign("sha256").update(Buffer.from("asd")).sign({
        format: "jwk",
        key: jwk,
        dsaEncoding: "der",
    });
}

{
    const callback = (error: Error | null, result: boolean): void => {};
    const key = crypto.createPublicKey("pkey");
    crypto.verify(
        "sha256",
        Buffer.from("asd"),
        {
            key: Buffer.from("keylike"),
            dsaEncoding: "der",
        },
        Buffer.from("sig"),
    );
    crypto
        .createVerify("sha256")
        .update(Buffer.from("asd"))
        .verify(
            {
                key: Buffer.from("keylike"),
                dsaEncoding: "der",
            },
            Buffer.from("sig"),
        );
    crypto.verify(
        "sha256",
        Buffer.from("asd"),
        {
            key,
            dsaEncoding: "der",
        },
        Buffer.from("sig"),
    );
    crypto.verify(
        "sha256",
        Buffer.from("asd"),
        {
            key,
            dsaEncoding: "der",
        },
        Buffer.from("sig"),
        callback,
    );
    promisify(crypto.verify)(
        "sha256",
        Buffer.from("asd"),
        {
            key,
            dsaEncoding: "der",
        },
        Buffer.from("sig"),
    ).then((result: boolean) => {});
    crypto.createVerify("sha256").update(Buffer.from("asd")).verify(
        {
            key,
            dsaEncoding: "der",
        },
        Buffer.from("sig"),
    );

    const jwk = key.export({ format: "jwk" });
    crypto.verify(
        "sha256",
        Buffer.from("asd"),
        {
            format: "jwk",
            key: jwk,
            dsaEncoding: "der",
        },
        Buffer.from("sig"),
    );
    crypto.verify(
        "sha256",
        Buffer.from("asd"),
        {
            format: "jwk",
            key: jwk,
            dsaEncoding: "der",
        },
        Buffer.from("sig"),
        callback,
    );
    promisify(crypto.verify)(
        "sha256",
        Buffer.from("asd"),
        {
            format: "jwk",
            key: jwk,
            dsaEncoding: "der",
        },
        Buffer.from("sig"),
    ).then((result: boolean) => {});
    crypto.createVerify("sha256").update(Buffer.from("asd")).verify(
        {
            format: "jwk",
            key: jwk,
            dsaEncoding: "der",
        },
        Buffer.from("sig"),
    );
}

{
    const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from("key"), Buffer.from("iv"), { authTagLength: 16 });
    cipher.setAAD(Buffer.from("iv"));
    cipher.setAAD(new Uint8Array());
}

{
    crypto.generateKeyPairSync("x25519").privateKey; // $ExpectType KeyObject
    crypto.generateKeyPairSync("x448").privateKey; // $ExpectType KeyObject
    crypto.generateKeyPairSync("ed25519").privateKey; // $ExpectType KeyObject
    crypto.generateKeyPairSync("ed448").privateKey; // $ExpectType KeyObject

    [undefined, {}].forEach(opts => {
        crypto.generateKeyPair("x25519", opts, (err, publicKey, privateKey) => {
            privateKey; // $ExpectType KeyObject
            publicKey; // $ExpectType KeyObject
        });
        crypto.generateKeyPair("x448", opts, (err, publicKey, privateKey) => {
            privateKey; // $ExpectType KeyObject
            publicKey; // $ExpectType KeyObject
        });
        crypto.generateKeyPair("ed25519", opts, (err, publicKey, privateKey) => {
            privateKey; // $ExpectType KeyObject
            publicKey; // $ExpectType KeyObject
        });
        crypto.generateKeyPair("ed448", opts, (err, publicKey, privateKey) => {
            privateKey; // $ExpectType KeyObject
            publicKey; // $ExpectType KeyObject
        });
    });

    const pGenerateKeyPair = promisify(crypto.generateKeyPair);
    [undefined, {}].forEach(async opts => {
        (await pGenerateKeyPair("x25519", opts)).privateKey; // $ExpectType KeyObject
        (await pGenerateKeyPair("x448", opts)).privateKey; // $ExpectType KeyObject
        (await pGenerateKeyPair("ed25519", opts)).privateKey; // $ExpectType KeyObject
        (await pGenerateKeyPair("ed448", opts)).privateKey; // $ExpectType KeyObject
    });
}

{
    crypto.createSecretKey(new Uint8Array([0])); // $ExpectType KeyObject
}

{
    crypto.hkdf("sha256", Buffer.alloc(32, 0xFF), Buffer.alloc(16, 0x00), "SomeInfo", 42, (err, derivedKey) => {});
}

{
    const derivedKey = crypto.hkdfSync("sha256", Buffer.alloc(32, 0xFF), Buffer.alloc(16, 0x00), "SomeInfo", 42);
}

{
    const usage: crypto.SecureHeapUsage = crypto.secureHeapUsed();
}

{
    crypto.randomUUID({});
    crypto.randomUUID({ disableEntropyCache: true });
    crypto.randomUUID({ disableEntropyCache: false });
    crypto.randomUUID();
}

{
    const cert = new crypto.X509Certificate("dummy");
    cert.ca; // $ExpectType boolean
    cert.fingerprint; // $ExpectType string
    cert.fingerprint256; // $ExpectType string
    cert.fingerprint512; // $ExpectType string
    cert.infoAccess; // $ExpectType string | undefined
    cert.issuer; // $ExpectType string
    cert.issuerCertificate; // $ExpectType X509Certificate | undefined
    cert.keyUsage; // $ExpectType string[]
    cert.publicKey; // $ExpectType KeyObject
    cert.raw; // $ExpectType Buffer || Buffer<ArrayBufferLike>
    cert.serialNumber; // $ExpectType string
    cert.subject; // $ExpectType string
    cert.subjectAltName; // $ExpectType string | undefined
    cert.validFrom; // $ExpectType string
    cert.validFromDate; // $ExpectType Date
    cert.validTo; // $ExpectType string
    cert.validToDate; // $ExpectType Date

    const checkOpts: crypto.X509CheckOptions = {
        multiLabelWildcards: true,
        partialWildcards: true,
        singleLabelSubdomains: true,
        subject: "always",
        wildcards: true,
    };

    cert.checkEmail("test@test.com"); // $ExpectType string | undefined
    cert.checkEmail("test@test.com", checkOpts); // $ExpectType string | undefined
    cert.checkEmail("test@test.com", { subject: "always" }); // $ExpectType string | undefined
    cert.checkHost("test.com"); // $ExpectType string | undefined
    cert.checkHost("test.com", checkOpts); // $ExpectType string | undefined
    cert.checkHost("test.com", { subject: "default" }); // $ExpectType string | undefined
    cert.checkIP("1.1.1.1"); // $ExpectType string | undefined
    cert.checkIssued(new crypto.X509Certificate("dummycert")); // $ExpectType boolean
    cert.checkPrivateKey(crypto.createPrivateKey("dummy")); // $ExpectType boolean
    cert.toLegacyObject(); // $ExpectType PeerCertificate
    cert.toJSON(); // $ExpectType string
    cert.toString(); // $ExpectType string
}

{
    crypto.generatePrime(123, (err: Error | null, prime: ArrayBuffer) => {});
    crypto.generatePrime(123, { rem: 123n, add: 123n }, (err: Error | null, prime: ArrayBuffer) => {});
    crypto.generatePrime(123, { bigint: true }, (err: Error | null, prime: bigint) => {});
    crypto.generatePrime(123, { bigint: Math.random() > 0 }, (err: Error | null, prime: ArrayBuffer | bigint) => {});

    crypto.generatePrimeSync(123); // $ExpectType ArrayBuffer
    crypto.generatePrimeSync(123, { rem: 123n, add: 123n }); // $ExpectType ArrayBuffer
    crypto.generatePrimeSync(123, { bigint: true }); // $ExpectType bigint
    crypto.generatePrimeSync(123, { bigint: Math.random() > 0 }); // $ExpectType bigint | ArrayBuffer

    crypto.checkPrime(123n, (err: Error | null, result: boolean) => {});
    crypto.checkPrime(123n, { checks: 123 }, (err: Error | null, result: boolean) => {});

    crypto.checkPrimeSync(123n); // $ExpectType boolean
    crypto.checkPrimeSync(123n, { checks: 123 }); // $ExpectType boolean
}

{
    crypto.generateKeyPair("ec", { namedCurve: "P-256" }, (err, publicKey, privateKey) => {
        for (const keyObject of [publicKey, privateKey]) {
            if (keyObject.asymmetricKeyDetails) {
                if (keyObject.asymmetricKeyDetails.modulusLength) {
                    const modulusLength: number = keyObject.asymmetricKeyDetails.modulusLength;
                }
                if (keyObject.asymmetricKeyDetails.publicExponent) {
                    const publicExponent: bigint = keyObject.asymmetricKeyDetails.publicExponent;
                }
                if (keyObject.asymmetricKeyDetails.divisorLength) {
                    const divisorLength: number = keyObject.asymmetricKeyDetails.divisorLength;
                }
                if (keyObject.asymmetricKeyDetails.namedCurve) {
                    const namedCurve: string = keyObject.asymmetricKeyDetails.namedCurve;
                }
                if (keyObject.asymmetricKeyDetails.mgf1HashAlgorithm) {
                    const mgf1HashAlgorithm: string = keyObject.asymmetricKeyDetails.mgf1HashAlgorithm;
                }
                if (keyObject.asymmetricKeyDetails.hashAlgorithm) {
                    const hashAlgorithm: string = keyObject.asymmetricKeyDetails.hashAlgorithm;
                }
                if (keyObject.asymmetricKeyDetails.saltLength) {
                    const saltLength: number = keyObject.asymmetricKeyDetails.saltLength;
                }
            }
        }
    });
    const secretKeyObject = crypto.createSecretKey(Buffer.from("secret"));
    crypto.generateKeyPair("ec", { namedCurve: "P-256" }, (err, publicKey, privateKey) => {
        for (const keyObject of [publicKey, privateKey, secretKeyObject]) {
            const jwk = keyObject.export({ format: "jwk" });
            jwk.crv;
            jwk.d;
            jwk.dp;
            jwk.dq;
            jwk.e;
            jwk.k;
            jwk.kty;
            jwk.n;
            jwk.p;
            jwk.q;
            jwk.qi;
            jwk.x;
            jwk.y;
            crypto.createPublicKey({ key: jwk, format: "jwk" });
            crypto.createPrivateKey({ key: jwk, format: "jwk" });
        }
    });
}

{
    const jwk = {
        alg: "ES256",
        crv: "P-256",
        kty: "EC",
        x: "ySK38C1jBdLwDsNWKzzBHqKYEE5Cgv-qjWvorUXk9fw",
        y: "_LeQBw07cf5t57Iavn4j-BqJsAD1dpoz8gokd3sBsOo",
        key_ops: ["sign"],
    };
    crypto.createPublicKey({ key: jwk, format: "jwk" });
    crypto.createPrivateKey({ key: jwk, format: "jwk" });
    crypto.verify(
        "ES256",
        Buffer.from("asd"),
        { key: jwk, format: "jwk" },
        Buffer.from("sig"),
    );
    crypto.verify(
        "ES256",
        Buffer.from("asd"),
        { key: jwk, format: "jwk" },
        Buffer.from("sig"),
        (error: Error | null, result: boolean): void => {},
    );
}

{
    // tslint:disable-next-line no-object-literal-type-assertion (webcrypto.CryptoKey is a placeholder)
    crypto.KeyObject.from({} as crypto.webcrypto.CryptoKey); // $ExpectType KeyObject
}

{
    crypto.generateKeySync("aes", { length: 128 }); // $ExpectType KeyObject
}

{
    crypto.DiffieHellmanGroup("modp14");
    new crypto.DiffieHellmanGroup("modp14");

    const alice: crypto.DiffieHellmanGroup = crypto.getDiffieHellman("modp14");
    const bob: crypto.DiffieHellmanGroup = crypto.createDiffieHellmanGroup("modp14");

    // Check that DiffieHellman still has setPublicKey/setPrivateKey:
    crypto.createDiffieHellman(2).setPublicKey("abcd", "hex");
    crypto.createDiffieHellman(2).setPrivateKey("abcd", "hex");

    // Check permutations of `create` arguments
    crypto.createDiffieHellman(new ArrayBuffer(8));
    crypto.createDiffieHellman(new ArrayBuffer(8), 123);
    crypto.createDiffieHellman(new ArrayBuffer(8), new ArrayBuffer(8));
    crypto.createDiffieHellman(new ArrayBuffer(8), "abcd", "hex");
    crypto.createDiffieHellman("abcd", "hex");
    crypto.createDiffieHellman("abcd", "hex", 123);
    crypto.createDiffieHellman("abcd", "hex", new ArrayBuffer(8));
    crypto.createDiffieHellman("abcd", "hex", "abcd", "hex");

    // While DiffieHellmanGroup should not have them:
    // @ts-expect-error
    alice.setPublicKey("abcd", "hex");
    // @ts-expect-error
    bob.setPrivateKey("abcd", "hex");

    // Those 2 methods aside, DiffieHellmanGroup should work the same as DiffieHellman
    alice.generateKeys();
    bob.generateKeys();
    const aliceSecret = alice.computeSecret(bob.getPublicKey(), null, "hex"); // $ExpectType string
    const bobSecret = bob.computeSecret(alice.getPublicKey(), null, "hex"); // $ExpectType string
    aliceSecret === bobSecret;
}

{
    const alice = crypto.createECDH("prime256v1");
    const bob = crypto.createECDH("prime256v1");

    alice.setPrivateKey("abcd", "hex");
    bob.setPrivateKey(Buffer.from("abcd", "hex"));

    alice.generateKeys();

    let alicePublicKey = alice.getPublicKey(); // $ExpectType Buffer || Buffer<ArrayBufferLike>
    alicePublicKey = alice.getPublicKey(null);
    alicePublicKey = alice.getPublicKey(null, "compressed");
    alicePublicKey = alice.getPublicKey(undefined, "hybrid");

    let bobPublicKey = bob.getPublicKey("hex"); // $ExpectType string
    bobPublicKey = bob.getPublicKey("hex", "compressed");

    let aliceSecret = alice.computeSecret(bobPublicKey, "hex"); // $ExpectType Buffer || Buffer<ArrayBufferLike>
    aliceSecret = alice.computeSecret(Buffer.from(bobPublicKey, "hex"));

    let bobSecret = bob.computeSecret(alicePublicKey, "hex"); // $ExpectType string
    bobSecret = bob.computeSecret(alicePublicKey.toString("hex"), "hex", "hex");

    aliceSecret.toString("hex") === bobSecret;
}

{
    crypto.setFips(false);
    crypto.setEngine("dynamic");
    crypto.setEngine("dynamic", crypto.constants.ENGINE_METHOD_RSA);
}

{
    crypto.getRandomValues(Buffer.alloc(8)); // $ExpectType Buffer || Buffer<ArrayBuffer>
    crypto.getRandomValues(new Uint8Array(8)); // $ExpectType Uint8Array || Uint8Array<ArrayBuffer>
    crypto.getRandomValues(new Int16Array(8)); // $ExpectType Int16Array || Int16Array<ArrayBuffer>
    crypto.getRandomValues(new Float32Array(8)); // $ExpectType Float32Array || Float32Array<ArrayBuffer>
    crypto.getRandomValues(new BigUint64Array(8)); // $ExpectType BigUint64Array || BigUint64Array<ArrayBuffer>
    crypto.getRandomValues(new DataView(new ArrayBuffer(8))); // $ExpectType DataView || DataView<ArrayBuffer>
    crypto.getRandomValues(new ArrayBuffer(8)); // $ExpectType ArrayBuffer
}

{
    // The Cryto and SubtleCrypto classes are not exposed at runtime.
    // @ts-expect-error
    crypto.webcrypto.Crypto;
    // @ts-expect-error
    crypto.webcrypto.SubtleCrypto;

    // The Crypto and SubtleCrypto classes should still be exposed as types.
    const a: crypto.webcrypto.Crypto = crypto.webcrypto;
    let b: crypto.webcrypto.SubtleCrypto = crypto.webcrypto.subtle;
    b = crypto.subtle;

    crypto.webcrypto.randomUUID(); // $ExpectType `${string}-${string}-${string}-${string}-${string}`
    crypto.webcrypto.getRandomValues(Buffer.alloc(8)); // $ExpectType Buffer || Buffer<ArrayBuffer>
    crypto.webcrypto.getRandomValues(new BigInt64Array(4)); // $ExpectType BigInt64Array || BigInt64Array<ArrayBuffer>
    // @ts-expect-error
    crypto.webcrypto.getRandomValues(new Float64Array(4));
    crypto.webcrypto.CryptoKey.name;
    crypto.webcrypto.CryptoKey.length;
    crypto.webcrypto.CryptoKey.prototype;
    crypto.webcrypto.CryptoKey.toString();
    // @ts-expect-error
    new crypto.webcrypto.CryptoKey(); // Illegal constructor

    crypto.webcrypto.subtle.generateKey({ name: "HMAC", hash: "SHA-1" }, true, ["sign", "decrypt", "deriveBits"]).then(
        (out) => {
            out.algorithm; // $ExpectType KeyAlgorithm
            out.extractable; // $ExpectType boolean
            out.usages; // $ExpectType KeyUsage[]
        },
    );
}

{
    // Note: The following tests are not examples of correct usage of these APIs and are simply for typechecking testing.
    const subtle = crypto.subtle;
    // The lack of top level await makes it annoying to use generateKey so let's just fake it for typings.
    const key = null as unknown as crypto.webcrypto.CryptoKey;
    const buf = new Uint8Array(16);
    // Oops, test relied on DOM `globalThis.length` before
    const length = 123;

    subtle.encrypt({ name: "AES-CBC", iv: new Uint8Array(16) }, key, new TextEncoder().encode("hello")); // $ExpectType Promise<ArrayBuffer>
    subtle.decrypt({ name: "AES-CBC", iv: new Uint8Array(16) }, key, new ArrayBuffer(8)); // $ExpectType Promise<ArrayBuffer>
    subtle.deriveBits({ name: "PBKDF2", hash: "SHA-512", salt: new ArrayBuffer(8), iterations: 1000 }, key, length); // $ExpectType Promise<ArrayBuffer>
    subtle.deriveBits({ name: "ECDH", public: key }, key, null); // $ExpectType Promise<ArrayBuffer>
    subtle.deriveKey(
        {
            name: "PBKDF2",
            hash: "SHA-512",
            salt: new ArrayBuffer(8),
            iterations: 1000,
        },
        key,
        {
            name: "AES-GCM",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"],
    );
    subtle.digest("SHA-384", buf); // $ExpectType Promise<ArrayBuffer>
    subtle.exportKey("jwk", key); // $ExpectType Promise<JsonWebKey>
    subtle.importKey("pkcs8", buf, { name: "RSA-PSS", hash: "SHA-1" }, false, []); // $ExpectType Promise<CryptoKey>
    subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, false, ["deriveKey", "deriveBits"]); // $ExpectType Promise<CryptoKeyPair>
    subtle.sign({ name: "RSA-PSS", saltLength: 64 }, key, buf); // $ExpectType Promise<ArrayBuffer>
    subtle.unwrapKey(
        "raw",
        buf,
        key,
        { name: "AES-CTR", length: 192, counter: buf },
        { name: "RSA-OAEP", hash: "SHA-512" },
        true,
        [],
    );
    subtle.verify({ name: "RSASSA-PKCS1-v1_5" }, key, buf, buf); // $ExpectType Promise<boolean>
    subtle.wrapKey("spki", key, key, { name: "AES-GCM", tagLength: 104, iv: buf }); // $ExpectType Promise<ArrayBuffer>
}

{
    let keyObject!: crypto.KeyObject;
    keyObject.toCryptoKey("EdDSA", true, ["sign"]); // $ExpectType CryptoKey
    keyObject.toCryptoKey({ name: "EdDSA" }, true, ["sign"]); // $ExpectType CryptoKey
    keyObject.toCryptoKey({ name: "RSA-OAEP", hash: "SHA-256" }, true, ["sign"]); // $ExpectType CryptoKey
    keyObject.toCryptoKey({ name: "RSA-OAEP", hash: { name: "SHA-256" } }, true, ["sign"]); // $ExpectType CryptoKey
}
