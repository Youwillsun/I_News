import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppProtocolPage } from './app-protocol.page';

describe('AppProtocolPage', () => {
  let component: AppProtocolPage;
  let fixture: ComponentFixture<AppProtocolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppProtocolPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppProtocolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
