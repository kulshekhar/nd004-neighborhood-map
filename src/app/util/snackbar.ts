export function show(message: string, options: SnackBarOptions = {}) {
  const snackbar = document.createElement('div');
  snackbar.className = 'snackbar show';
  snackbar.innerHTML = message || 'Default message';
  snackbar.style.color = options.color || '#fff';
  snackbar.style.backgroundColor = options.backgroundColor || '#333';

  const duration = options.duration || 3000;
  document.body.appendChild(snackbar)

  setTimeout(() => {
    document.body.removeChild(snackbar);
  }, duration);
}

export type SnackBarOptions = {
  backgroundColor?: string;
  color?: string;
  duration?: number;
};
