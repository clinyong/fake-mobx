import { IDerivation } from "./reactive";

export class MobXGlobals {
  /**
   * 'guid' for general purpose. Will be persisted amongst resets.
   */
  mobxGuid = 0;
  trackingDerivation: IDerivation | null = null;
}

export let globalState: MobXGlobals = new MobXGlobals();
