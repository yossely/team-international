import { TestBed, async, inject } from '@angular/core/testing';

import { EnterFormGuard } from './enter-form.guard';

describe('EnterFormGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnterFormGuard]
    });
  });

  it('should ...', inject([EnterFormGuard], (guard: EnterFormGuard) => {
    expect(guard).toBeTruthy();
  }));
});
