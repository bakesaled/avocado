declare module 'machina' {
  import machina = require('machina');
  import Timer = NodeJS.Timer;

  export var Fsm: new(options: FsmOptions) => Fsm;
  export var BehavioralFsm: new(options: FsmOptions) => Fsm;

  export interface Fsm {
    handle: (client: FsmClient, state: string) => void;
    on: (eventName: string, callback: (data: any) => void) => void;
  }

  export interface FsmOptions {
    initialize: (options: any) => any;
    namespace: string;
    initialState: string;
    eventListeners: {};
    states: { [name: string]: FsmState };
  }

  export interface FsmState {
    _onEnter?: (client?: any) => void;
    _onExit?: (client?: any) => void;
    '*'?: (client?: any) => void;
    timeout?: string;
    _reset?: string;
  }

  export interface FsmClient {
    timer?: Timer;
  }
}
