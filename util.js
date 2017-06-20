function getUrl(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    const failHandler = (ev) => {
      reject(ev);
    };
    xhr.onerror = failHandler;
    xhr.onabort = failHandler;
    xhr.ontimeout = failHandler;

    xhr.onload = (ev) => {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        failHandler(ev);
      }
    };

    xhr.send();
  });
}
