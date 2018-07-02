import { IObservers } from "../utils/reactive";
import { globalState } from "../utils/globalstate";

class ProxyObject {
  observers: IObservers = {};

  constructor(v) {
    return new Proxy(v, {
      get: this.get.bind(this),
      set: this.set.bind(this)
    });
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

  get(target, prop) {
    this.reportObserved();
    return Reflect.get(target, prop);
  }

  set(target, prop, value) {
    Reflect.set(target, prop, observable(value));
    this.reportChanged();
    return true;
  }
}

export function observable<T>(v: T): T {
  if (typeof v === "object") {
    return new ProxyObject(v) as any;
  } else {
    return v;
  }
}
