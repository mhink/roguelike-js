/* eslint-disable no-magic-numbers */

import {
  shouldRender
} from 'features/rendering';
import renderBackdrop from './render-backdrop';
import renderEntities from './render-entities';
import renderMap from './render-map';
import renderMessage from './render-message';
import renderVectorField from './render-vector-field';
import renderVisibilityOverlay from './render-visibility-overlay';

export default class CanvasRenderer {
  constructor(store, context2d, tileDimensions) {
    this._context2d = context2d;
    this._store = store;
    this._unsubscribe = store.subscribe(() => this.handleUpdate());
  }

  handleUpdate() {
    const state = this._store.getState();
    if (shouldRender(state)) {
      this.render(state);
    }
  }

  render(state) {
    renderBackdrop(this._context2d, state);
    renderMap(this._context2d, state);
    renderEntities(this._context2d, state);
    renderVisibilityOverlay(this._context2d, state);
    renderMessage(this._context2d, state);
  }
}
