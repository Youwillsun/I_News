import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassPage } from './class.page';

describe('ClassPage', () => {
  let component: ClassPage;
  let fixture: ComponentFixture<ClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
