import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReleaseMsgPage } from './release-msg.page';

describe('ReleaseMsgPage', () => {
  let component: ReleaseMsgPage;
  let fixture: ComponentFixture<ReleaseMsgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseMsgPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReleaseMsgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
