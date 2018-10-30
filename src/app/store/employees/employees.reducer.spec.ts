import { employeesReducer, initialState } from './employees.reducer';

describe('Employees Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = employeesReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
