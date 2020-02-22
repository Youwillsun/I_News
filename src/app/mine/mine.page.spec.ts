import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MinePage } from './mine.page';

describe('MinePage', () => {
  let component: MinePage;
  let fixture: ComponentFixture<MinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
