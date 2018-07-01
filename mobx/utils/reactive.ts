export interface IObservers {
  [index: string]: IDerivation;
}

export interface IObservable {
  observers: IObservers;
}

export interface IDerivation {
  name: string;
  observing: IObservable[];
  schedule: () => void;
}
