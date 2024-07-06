import argon2 from "argon2";

class Argon2Utils {
  static async hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }

  static async verifyPassword(
    hash: string,
    password: string
  ): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}

export default Argon2Utils;
