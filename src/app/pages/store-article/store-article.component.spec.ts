import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreArticleComponent } from './store-article.component';

describe('StoreArticleComponent', () => {
  let component: StoreArticleComponent;
  let fixture: ComponentFixture<StoreArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
