export enum BetterAuthErrorCodes {
  INVALID_EMAIL_OR_PASSWORD = "INVALID_EMAIL_OR_PASSWORD",
  EMAIL_IS_NOT_VERIFIED_CHECK_YOUR_EMAIL_FOR_A_VERIFICATION_LINK = "EMAIL_IS_NOT_VERIFIED_CHECK_YOUR_EMAIL_FOR_A_VERIFICATION_LINK",
}

export const BetterAuthErrorMessages: Record<BetterAuthErrorCodes, string> = {
  [BetterAuthErrorCodes.INVALID_EMAIL_OR_PASSWORD]:
    "Invalid email or password.",
  [BetterAuthErrorCodes.EMAIL_IS_NOT_VERIFIED_CHECK_YOUR_EMAIL_FOR_A_VERIFICATION_LINK]:
    "Email is not verified. Check your email for a verification link.",
};

// Function to get the error message
export function getBetterAuthErrorMessage(code: BetterAuthErrorCodes): string {
  return BetterAuthErrorMessages[code] || "Unknown error";
}
