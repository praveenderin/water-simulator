import { TestBed } from '@angular/core/testing';

import { AppBroadcastService } from './app-broadcast.service';

describe('AppBroadcastService', () => {
  let service: AppBroadcastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppBroadcastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
