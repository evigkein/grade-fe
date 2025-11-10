export function hiddenEmail(email: string | undefined): string {
  if(!email) return ''!;
  const [localPart, domain] = email.split('@');
  const maskedLocalPart = `${'*'.repeat(localPart.length - 3)}${localPart.slice(-3)}`;
  return `${maskedLocalPart}@${domain}`;
}

export function hiddenPhone(phone: string | undefined): string {
  if (!phone) return '';
  const visiblePart = phone.slice(-3);
  const hiddenPart = phone.slice(0, -3).replace(/\d/g, '*');
  return `${hiddenPart}${visiblePart}`;
}
