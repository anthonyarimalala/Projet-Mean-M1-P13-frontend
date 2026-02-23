import { TestBed } from '@angular/core/testing';

import { AboutiqueService } from './aboutique.service';

describe('AboutiqueService', () => {
  let service: AboutiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
