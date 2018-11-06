import { TestBed, async, inject } from '@angular/core/testing';

import { LeaveFormGuard } from './leave-form.guard';

describe('LeaveFormGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveFormGuard]
    });
  });

  it('should ...', inject([LeaveFormGuard], (guard: LeaveFormGuard) => {
    expect(guard).toBeTruthy();
  }));
});
