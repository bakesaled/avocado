import * as machina from 'machina';
import { Fsm, FsmClient } from 'machina';
import { VehicleSignalFsmState } from '../interfaces/vehicle-signal-fsm-state.interface';
import { SignalClient } from '../interfaces/signal-client.interface';

export class VehicleSignal {
  private fsm: Fsm;
  public static create(): VehicleSignal {
    return new VehicleSignal();
  }

  constructor() {
    this.fsm = new machina.BehavioralFsm({
      initialize: (options) => {

      },
      namespace: 'vehicle-signal',
      initialState: 'uninitialized',
      eventListeners: {
        '*': [ function(eventName: string, data: any) {
          // console.log('here');
          // console.log(eventName);
          // console.log(data);
          // console.log(client);
          switch (eventName) {
            case 'transition':
              console.log( data.client.direction, data.namespace, data.fromState, "->", data.toState );
              break;
            default:
              break;
          }
        }]
      },
      states: {
        uninitialized: {
          '*': function(client) {
            this.deferUntilTransition(client);
            this.transition(client, 'green');
          }
        },
        green: <VehicleSignalFsmState>{
          _onEnter: function(client: SignalClient) {
            this.timer = setTimeout(() => {
              this.handle(client, 'timeout');
            }, 30000);
            this.emit('vehicles', { client: client, status: 'green' })
          },
          timeout: 'green-interruptible',
          pedestrianWaiting: function(client: SignalClient) {
            this.deferUntilTransition(client, 'green-interruptible' );
          },
          _onExit: function(client: SignalClient) {
            clearTimeout(client.timer);
          }
        },
        'green-interruptible': <VehicleSignalFsmState>{
          pedestrianWaiting: 'yellow'
        },
        yellow: {
          _onEnter: function(client: SignalClient) {
            this.timer = setTimeout( function() {
              this.handle(client, 'timeout' );
            }.bind( this ), 5000 );
            this.emit( 'vehicles', { client: client, status: 'yellow' } );
          },
          timeout: 'red',
          _onExit: function(client: SignalClient) {
            clearTimeout(client.timer);
          }
        },
        red: {
          _onEnter: function(client: SignalClient) {
            this.timer = setTimeout( function() {
              this.handle(client, 'timeout' );
            }.bind( this ), 1000 );
          },
          _reset: 'green',
          _onExit: function(client: SignalClient) {
            clearTimeout( client.timer );
          }
        }
      },
      // reset: function(client: SignalClient) {
      //   this.handle(client, "_reset" );
      // },
      // pedestrianWaiting: function(client ) {
      //   this.handle( client, "pedestrianWaiting" );
      // }
    })
  }

  public handle(client: FsmClient, state: string) {
    this.fsm.handle(client, state);
  }

  public on(eventName: string, callback: (data: any) => void) {
    this.fsm.on(eventName, callback);
  }
}
