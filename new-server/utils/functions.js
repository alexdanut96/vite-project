import CryptoJS from "crypto-js";

const hashPassword = (password) => {
  return CryptoJS.AES.encrypt(password, process.env.HASHED_PASSWORD).toString();
};

export { hashPassword };
