import { addHiddenProp } from "../utils/utils";
import { ObservableValue } from "./observablevalue";

const $mobx = Symbol("mobx");

function addObservableFlag(target) {
  addHiddenProp(target, $mobx, true);
}

function addObservableProp(target: any, propName: string, v?: any) {
  const value = new ObservableValue(v);
  Object.defineProperty(target, propName, {
    configurable: true,
    enumerable: true,
    get: value.get.bind(value),
    set: value.set.bind(value)
  });
}

export function extendObservable<A extends Object>(props: A): A {
  const res = {};

  Object.keys(props).forEach(k => {
    addObservableProp(res, k, props[k]);
  });

  addObservableFlag(res);

  return res as any;
}
