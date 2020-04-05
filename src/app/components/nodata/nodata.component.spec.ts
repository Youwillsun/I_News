import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NodataComponent } from './nodata.component';

describe('NodataComponent', () => {
  let component: NodataComponent;
  let fixture: ComponentFixture<NodataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodataComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NodataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
