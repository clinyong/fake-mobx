export { observable } from "./core/observable";

import { Reaction } from "./core/reaction";

export function autorun(view: () => any) {
  let reaction: Reaction;

  reaction = new Reaction(function() {
    this.track(view);
  });

  reaction.schedule();
  return reaction.dispose.bind(reaction);
}
