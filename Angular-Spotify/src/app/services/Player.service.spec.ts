/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlayerService } from './Player.service';

describe('Service: Player', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerService]
    });
  });

  it('should ...', inject([PlayerService], (service: PlayerService) => {
    expect(service).toBeTruthy();
  }));
});
