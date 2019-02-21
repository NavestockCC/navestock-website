import { TestBed } from '@angular/core/testing';

import { ContactUsServiceService } from './contact-us-service.service';

describe('ContactUsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactUsServiceService = TestBed.get(ContactUsServiceService);
    expect(service).toBeTruthy();
  });
});
