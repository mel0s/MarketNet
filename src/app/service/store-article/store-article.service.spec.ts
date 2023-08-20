import { TestBed } from '@angular/core/testing';

import { StoreArticleService } from './store-article.service';

describe('StoreArticleService', () => {
  let service: StoreArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
