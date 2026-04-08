import { keccak256, toBytes, encodePacked } from "viem";

export function validatePasswordFormat(password: string): boolean {
    if (password.length !== 6) return false;

    let letters = 0;
    let digits = 0;

    for (const char of password) {
        if (/[a-zA-Z]/.test(char)) {
            letters++;
        } else if (/[0-9]/.test(char)) {
            digits++;
        } else {
            return false;
        }
    }

    return letters === 3 && digits === 3;
}

export function hashPassword(password: string): `0x${string}` {
    return keccak256(toBytes(password));
}

export function buildCommitHash(
    password: string,
    nonce: bigint,
    tokenAddress: string,
    to: string,
    amount: bigint
): `0x${string}` {
    const packed = encodePacked(
        ["string", "uint256", "address", "address", "uint256"],
        [password, nonce, tokenAddress as `0x${string}`, to as `0x${string}`, amount]
    );
    return keccak256(packed);
}

export function getPasswordStrengthLabel(password: string): string {
    if (password.length === 0) return "";
    if (password.length < 6) return "Too short";
    if (!validatePasswordFormat(password)) return "Need 3 letters and 3 numbers";
    return "Valid vault proof format";
}
