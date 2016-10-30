import { put, call } from "redux-saga/effects";
import { registerImage } from "features/tilesets";
import { batchRegisterTiles } from "features/tilesets";


export const loadImage = (path) => new Promise((resolve, reject) => {
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

export const loadAndRegisterImage = function* (imageDef, size) {
  const { path, tiledefs } = imageDef;

  const img = yield call(loadImage, path);
  yield put(registerImage(path, img, size));
  
  if (tiledefs) {
    yield put(batchRegisterTiles(path, tiledefs));
  }
}
