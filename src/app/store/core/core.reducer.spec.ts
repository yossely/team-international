import { coreReducer, initialState } from './core.reducer';

describe('Core Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = coreReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
