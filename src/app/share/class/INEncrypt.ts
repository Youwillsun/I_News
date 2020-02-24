export class INEncrypt {
      /**
   * 加密算法
   * @param pwd 加密的字符串
   */
  public static basicEncrypt(pwd: string): string {
    let encrypt = '';

    let sumCode = 0;
    for (let i = 0; i < pwd.length; i++) {
      sumCode += pwd.charCodeAt(i);
    }
    const offset = sumCode % 10;

    for (let i = 0; i < pwd.length; i++) {
      encrypt += String.fromCharCode(pwd.charCodeAt(i) + (i % 2 === 0 ? offset : -offset));
    }
    return encrypt + pwd.charAt(0) + pwd.charAt(pwd.length - 1) + Math.round(Math.random() * 10) + offset;
  }

  /**
   * 解密算法
   * @param enc 解密的字符串
   */
  public static basicDecrypt(enc: string): string {

    if (!enc) {
      return null;
    }

    if (enc.length < 6) {
      console.log('Not a encrypt format: ' + enc);
      return null;
    }
    const encrypted = enc.substring(0, enc.length - 4);
    const offset = +enc.charAt(enc.length - 1);

    let decrypt = '';

    for (let i = 0; i < encrypted.length; i++) {
      decrypt += String.fromCharCode(encrypted.charCodeAt(i) + (i % 2 === 0 ? -offset : offset));
    }
    return decrypt;
  }
}