import expect from 'expect';
import ImmutableItemsArray from '../../../util/ImmutableItemsArray';
import * as departureActions from '../departures/actions';
import * as reducer from './reducers';
import FakeFirebaseSnapshot from '../../../../test/FakeFirebaseSnapshot'

describe('modules', () => {
  describe('movements', () => {
    describe('shared', () => {
      describe('reducers', () => {
        describe('childrenAdded', () => {
          it('should add children', () => {
            const state = {
              refs: [{
                name: 'ref1'
              }],
              loading: true,
              data: new ImmutableItemsArray([{
                key: 'dep2',
                type: 'departure',
                immatriculation: 'HBKOF',
                date: '2017-04-28',
                time: '15:00'
              }, {
                key: 'dep1',
                type: 'departure',
                immatriculation: 'HBKFW',
                date: '2017-04-28',
                time: '14:00'
              }])
            };

            const snapshot = new FakeFirebaseSnapshot(null, [
              new FakeFirebaseSnapshot('dep3', {
                immatriculation: 'HBPGM',
                dateTime: '2017-04-28T14:00:00.000Z'
              }),
              new FakeFirebaseSnapshot('dep4', {
                immatriculation: 'HBSGU',
                dateTime: '2017-04-28T15:00:00.000Z'
              })
            ]);
            const action = departureActions.departuresAdded(snapshot, {name: 'ref2'});

            const newState = reducer.childrenAdded(state, action);

            expect(newState.loading).toEqual(false);
            expect(newState.refs).toEqual([{
              name: 'ref1'
            }, {
              name: 'ref2'
            }]);

            // `key` must have been added
            // `type: 'departure'` must have been added
            // `dateTime` must have been converted to `date` and `time` in local time
            // items must have been inserted in the right order
            expect(newState.data.array).toEqual([{
              key: 'dep4',
              date: '2017-04-28',
              immatriculation: 'HBSGU',
              time: '17:00',
              type: 'departure'
            }, {
              key: 'dep3',
              date: '2017-04-28',
              immatriculation: 'HBPGM',
              time: '16:00',
              type: 'departure'
            }, {
              key: 'dep2',
              date: '2017-04-28',
              immatriculation: 'HBKOF',
              time: '15:00',
              type: 'departure'
            }, {
              key: 'dep1',
              time: '14:00',
              date: '2017-04-28',
              immatriculation: 'HBKFW',
              type: 'departure'
            }]);
          });
        });

        describe('childAdded', () => {
          it('should add child', () => {
            const state = {
              data: new ImmutableItemsArray([{
                key: 'dep2',
                type: 'departure',
                immatriculation: 'HBKOF',
                date: '2017-04-28',
                time: '15:00'
              }, {
                key: 'dep1',
                type: 'departure',
                immatriculation: 'HBKFW',
                date: '2017-04-28',
                time: '14:00'
              }])
            };

            const snapshot = new FakeFirebaseSnapshot('dep3', {
              immatriculation: 'HBPGM',
              dateTime: '2017-04-28T12:30:00.000Z'
            });
            const action = departureActions.departureAdded(snapshot);

            const newState = reducer.childAdded(state, action);

            // `key` must have been added
            // `type: 'departure'` must have been added
            // `dateTime` must have been converted to `date` and `time` in local time
            // item must have been inserted in the right order
            expect(newState.data.array).toEqual([{
              key: 'dep2',
              date: '2017-04-28',
              immatriculation: 'HBKOF',
              time: '15:00',
              type: 'departure'
            }, {
              key: 'dep3',
              date: '2017-04-28',
              immatriculation: 'HBPGM',
              time: '14:30',
              type: 'departure'
            }, {
              key: 'dep1',
              time: '14:00',
              date: '2017-04-28',
              immatriculation: 'HBKFW',
              type: 'departure'
            }]);
          });
        });

        describe('childChanged', () => {
          it('should change child', () => {
            const state = {
              data: new ImmutableItemsArray([{
                key: 'dep2',
                type: 'departure',
                immatriculation: 'HBKOF',
                date: '2017-04-28',
                time: '15:00'
              }, {
                key: 'dep1',
                type: 'departure',
                immatriculation: 'HBKFW',
                date: '2017-04-28',
                time: '14:00'
              }])
            };

            const snapshot = new FakeFirebaseSnapshot('dep1', {
              immatriculation: 'HBKFW',
              dateTime: '2017-04-28T13:30:00.000Z'
            });
            const action = departureActions.departureChanged(snapshot);

            const newState = reducer.childChanged(state, action);

            // item must have been updated
            // item must have put to the right place (ordered chronologically)
            expect(newState.data.array).toEqual([{
              key: 'dep1',
              time: '15:30',
              date: '2017-04-28',
              immatriculation: 'HBKFW',
              type: 'departure'
            }, {
              key: 'dep2',
              date: '2017-04-28',
              immatriculation: 'HBKOF',
              time: '15:00',
              type: 'departure'
            }]);
          });
        });

        describe('childRemoved', () => {
          it('should remove child', () => {
            const state = {
              data: new ImmutableItemsArray([{
                key: 'dep2',
                type: 'departure',
                immatriculation: 'HBKOF',
                date: '2017-04-28',
                time: '15:00'
              }, {
                key: 'dep1',
                type: 'departure',
                immatriculation: 'HBKFW',
                date: '2017-04-28',
                time: '14:00'
              }])
            };

            const snapshot = new FakeFirebaseSnapshot('dep1');
            const action = departureActions.departureDeleted(snapshot);

            const newState = reducer.childRemoved(state, action);

            expect(newState.data.array).toEqual([{
              key: 'dep2',
              date: '2017-04-28',
              immatriculation: 'HBKOF',
              time: '15:00',
              type: 'departure'
            }]);
          });
        });
      });
    });
  });
});
