import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientArticleComponent } from './client-article.component';

describe('ClientArticleComponent', () => {
  let component: ClientArticleComponent;
  let fixture: ComponentFixture<ClientArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
