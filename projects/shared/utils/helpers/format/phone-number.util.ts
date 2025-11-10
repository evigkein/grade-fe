export function formatPhoneNumberToView(phoneNumberString: string): string | null {
  // Remove all non-digit characters
  const cleaned = `${phoneNumberString}`.replace(/\D/g, '');

  // Define a general pattern to break numbers into chunks
  const patterns = [
    /^(\d{1,4})(\d{1,3})(\d{1,4})(\d{1,4})(\d{1,4})$/,  // 5 chunks
    /^(\d{1,4})(\d{1,3})(\d{1,4})(\d{1,4})$/,          // 4 chunks
    /^(\d{1,4})(\d{1,3})(\d{1,4})$/,                   // 3 chunks
    /^(\d{1,4})(\d{1,4})$/,                            // 2 chunks
    /^(\d{1,15})$/,                                     // 1 chunk (up to 15 digits)
  ];

  for (const pattern of patterns) {
    const match = cleaned.match(pattern);
    if (match) {
      // Remove the full match from the beginning
      match.shift();
      // Filter out undefined groups and join with spaces
      return `+${match.filter(Boolean).join(' ')}`;
    }
  }

  return null;
}
export function formatPhoneNumberFromView(formattedPhoneNumber: string): string {
  // Remove all non-digit characters
  return formattedPhoneNumber.replace(/\D/g, '');
}
