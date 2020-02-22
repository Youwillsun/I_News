import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassSubNewsPage } from './class-sub-news.page';

describe('ClassSubNewsPage', () => {
  let component: ClassSubNewsPage;
  let fixture: ComponentFixture<ClassSubNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassSubNewsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassSubNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
