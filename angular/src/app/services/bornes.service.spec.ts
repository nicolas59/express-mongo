import { TestBed, inject } from '@angular/core/testing';

import { BornesService } from './bornes.service';

describe('BornesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BornesService]
    });
  });

  it('should be created', inject([BornesService], (service: BornesService) => {
    expect(service).toBeTruthy();
  }));
});
