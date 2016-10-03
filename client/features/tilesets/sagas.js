import { select, put, call } from 'redux-saga/effects';
import { map } from 'lodash';

const loadTileset = (path) => (
  new Promise((resolve, reject) => {
    console.log(`Loading tileset at ${path}`);
    try {
      const img = new Image();
      img.addEventListener('load', () => {
        console.log(`Done loading tileset at ${path}`);
        resolve({path, img});
      });
      img.src = path;
    } catch (err) {
      reject(err);
    }
  })
);

export function *initTilesets() {
  const images = yield select(state => state.tilesets.images);

  const loadedImages = yield map(images, (image, path) => (
    call(loadTileset, path)
  ));

  yield put({
    type: "LOADED_IMAGES",
    payload: { loadedImages },
  });
}
