import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyCollectsPage } from './my-collects.page';

describe('MyCollectsPage', () => {
  let component: MyCollectsPage;
  let fixture: ComponentFixture<MyCollectsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCollectsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyCollectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
