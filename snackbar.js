function show(message, options) {
  options = options || {};

  var snackbar = document.createElement('div');
  snackbar.className = 'snackbar show';
  snackbar.innerHTML = message || 'Default message';
  snackbar.style.color = options.color || '#fff';
  snackbar.style.backgroundColor = options.backgroundColor || '#333';

  var duration = options.duration || 3000;
  document.body.appendChild(snackbar)

  setTimeout(() => {
    document.body.removeChild(snackbar);
  }, duration);
}
