import { FsmClient } from 'machina';

export interface SignalClient extends FsmClient{
  location: string;
  direction: string;
}
