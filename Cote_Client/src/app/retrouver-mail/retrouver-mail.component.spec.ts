import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrouverMailComponent } from './retrouver-mail.component';

describe('RetrouverMailComponent', () => {
  let component: RetrouverMailComponent;
  let fixture: ComponentFixture<RetrouverMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetrouverMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrouverMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
