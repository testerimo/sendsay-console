export function copyToClipboard(value) {
  const textarea = document.createElement('textarea');
  textarea.setAttribute('type', 'hidden');
  textarea.value = value;

  document.body.append(textarea);

  textarea.select();
  textarea.setSelectionRange(0, 99999);

  document.execCommand('copy');

  textarea.remove();
}
