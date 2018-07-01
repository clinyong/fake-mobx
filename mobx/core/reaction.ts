import { getNextId } from "../utils/utils";
import { IObservable } from "../utils/reactive";
import { globalState } from "../utils/globalstate";

export interface IReactionPublic {
  dispose(): void;
}

export class Reaction {
  observing: IObservable[] = [];
  isDisposed = false;
  public name: string = "Reaction@" + getNextId();

  constructor(private onInvalidate: () => void) {}

  schedule() {
    if (!this.isDisposed) {
      this.onInvalidate();
    }
  }

  track(fn: Function) {
    if (!this.isDisposed) {
      globalState.trackingDerivation = this;
      return fn.call(this, arguments);
    }
  }

  dispose() {
    if (!this.isDisposed) {
      this.isDisposed = true;
      this.observing.forEach(o => {
        delete o.observers[this.name];
      });
      this.observing = [];
    }
  }
}
