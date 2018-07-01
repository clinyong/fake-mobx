import { extendObservable } from "./core/extendobservable";
import { Reaction } from "./core/reaction";
import { isPlainObject } from "./utils/utils";

export function observable(v: any) {
  if (isPlainObject(v)) {
    return extendObservable(v);
  }

  return v;
}

export function autorun(view: () => any) {
  let reaction: Reaction;

  reaction = new Reaction(function() {
    this.track(view);
  });

  reaction.schedule();
  return reaction.dispose.bind(reaction);
}
