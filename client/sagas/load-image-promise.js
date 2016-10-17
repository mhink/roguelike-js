export default (path) => new Promise((resolve, reject) => {
  try {
    const img = new Image();
    img.addEventListener("load", () => {
      resolve(img);
    });
    img.src = path;
  } catch (err) {
    reject(err);
  }
});
