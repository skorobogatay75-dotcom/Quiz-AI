/** Оставляет только цифры и нормализует к российскому формату. */
export function digitsOnly(value) {
  return value.replace(/\D/g, '');
}

export function formatPhone(value) {
  let digits = digitsOnly(value);

  if (digits.startsWith('8')) {
    digits = `7${digits.slice(1)}`;
  }

  if (digits && !digits.startsWith('7')) {
    digits = `7${digits}`;
  }

  digits = digits.slice(0, 11);

  const parts = ['+7'];

  if (digits.length > 1) {
    parts.push(' (', digits.slice(1, 4));
  }
  if (digits.length >= 4) {
    parts.push(') ');
  }
  if (digits.length > 4) {
    parts.push(digits.slice(4, 7));
  }
  if (digits.length > 7) {
    parts.push('-', digits.slice(7, 9));
  }
  if (digits.length > 9) {
    parts.push('-', digits.slice(9, 11));
  }

  return parts.join('');
}

export function isValidPhone(value) {
  const digits = digitsOnly(value);
  return digits.length === 11 && digits.startsWith('7');
}
