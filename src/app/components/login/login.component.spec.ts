import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it(`should have as title 'rabbit-next'`, () => {
  //   const fixture = TestBed.createComponent(LoginComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('rabbit-next');
  // });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(LoginComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to rabbit-next!');
  // });
});
