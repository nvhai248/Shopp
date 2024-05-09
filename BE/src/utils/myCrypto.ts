import * as CryptoJS from 'crypto-js';

const secretKey = process.env.CRYPTO_SECRET;

// Function to encode JSON object to encrypted string
export function EncodeToEncryptedString(data: object): string {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey,
  ).toString();
  return encryptedData;
}

// Function to decode encrypted string to JSON object
export function DecodeFromEncryptedString(encryptedString: string): object {
  const bytes = CryptoJS.AES.decrypt(encryptedString, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}
