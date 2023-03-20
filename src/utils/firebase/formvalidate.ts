export function firebaseValidateFormByErrorCode(code: string) {
  switch (code) {
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Make sure you have entered the correct email address or password.";
    case "auth/invalid-email":
      return "Enter the vaild email address.";
    case "auth/weak-password":
      return "Password must be at least 6 characters long.";
    default:
      return "An error occurred. Please try again later.";
  }
}
