import argon2 from "argon2";

export default async function passwordHash(password) {
  const hash = await argon2.hash(password, { type: argon2.argon2id });

  return hash;
}

export async function checkPassword(password, hashedPassword) {

  try {
    const isPasswordValid = await argon2.verify(hashedPassword, password);
    return isPasswordValid;
  } catch (error) {
    console.error("Error verifying password:", error);
    throw error;
  }
}
