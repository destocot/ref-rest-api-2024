import argon2 from "argon2";

class ArgonUtils {
  static async hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  static async verify(hash: string, password: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}

export default ArgonUtils;
