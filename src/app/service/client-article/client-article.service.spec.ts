import { TestBed } from '@angular/core/testing';

import { ClientArticleService } from './client-article.service';

describe('ClientArticleService', () => {
  let service: ClientArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
