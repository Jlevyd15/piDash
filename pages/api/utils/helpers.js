import { Buffer } from "buffer";

export const fixInvalidUtf8 = (data) => {
  // This is a hacky fix because the 511 endpoint return invalid UTF-8 characters.
  // I needed to encode to latin1 which can return a the invalid character to something I can read and remove
  const encodeToLatin = Buffer.from(data, "latin1").toString("latin1");
  // after encoding to latin1 I can replace the invalid character.
  return encodeToLatin.replace("ÿ", "");
};
