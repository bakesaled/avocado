import { typestate } from 'typestate';
import FiniteStateMachine = typestate.FiniteStateMachine;
import { VehicleSignalState } from '../enums/vehicle-signal-state.enum';

export class VehicleSignal {
  private fsm = new FiniteStateMachine<VehicleSignalState>(VehicleSignalState.Red);

  constructor(private id: string) {

  }

  public init(initialState: VehicleSignalState) {
    this.fsm.from(VehicleSignalState.Red).to(VehicleSignalState.Green);
    this.fsm.from(VehicleSignalState.Green).to(VehicleSignalState.Yellow);
    this.fsm.from(VehicleSignalState.Yellow).to(VehicleSignalState.Red);

    this.fsm.onEnter(VehicleSignalState.Red, () => {
      console.log(this.id, 'red');
      setTimeout(() => {
        this.fsm.go(VehicleSignalState.Green);
      }, 6500);
      return true;
    });
    this.fsm.onEnter(VehicleSignalState.Yellow, () => {
      console.log(this.id, 'yellow');
      setTimeout(() => {
        this.fsm.go(VehicleSignalState.Red);
      }, 1000);
      return true;
    });
    this.fsm.onEnter(VehicleSignalState.Green, () => {
      console.log(this.id, 'green');
      setTimeout(() => {
        this.fsm.go(VehicleSignalState.Yellow);
      }, 5000);
      return true;
    });

    this.fsm.go(initialState);
  }
  
}
