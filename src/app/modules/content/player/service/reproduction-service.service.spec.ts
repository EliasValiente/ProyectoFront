import { TestBed } from '@angular/core/testing';

import { ReproductionServiceService } from './reproduction-service.service';

describe('ReproductionServiceService', () => {
  let service: ReproductionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReproductionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
