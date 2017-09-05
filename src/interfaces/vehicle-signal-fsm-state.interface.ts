import { FsmState } from 'machina';
import { SignalClient } from './signal-client.interface';

export interface VehicleSignalFsmState extends FsmState {
  pedestrianWaiting?: ((client: SignalClient) => void) | string;
}
