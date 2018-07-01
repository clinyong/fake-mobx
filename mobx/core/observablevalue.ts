import { IObservers } from "../utils/reactive";
import { globalState } from "../utils/globalstate";
import { observable } from "..";

export class ObservableValue {
  value: any;
  observers: IObservers = {};

  constructor(value) {
    this.value = observable(value);
  }

  private reportObserved() {
    const derivation = globalState.trackingDerivation;

    if (derivation) {
      const id = derivation.name;
      if (!this.observers[id]) {
        derivation.observing.push(this);
        this.observers[id] = derivation;
      }
      globalState.trackingDerivation = null;
    }
  }

  private reportChanged() {
    const keys = Object.keys(this.observers);

    if (keys.length > 0) {
      keys.forEach(k => {
        this.observers[k].schedule();
      });
    }
  }

  get() {
    this.reportObserved();
    return this.value;
  }

  set(value) {
    this.value = observable(value);
    this.reportChanged();
  }
}
