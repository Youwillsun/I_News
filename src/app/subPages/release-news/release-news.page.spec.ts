import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReleaseNewsPage } from './release-news.page';

describe('ReleaseNewsPage', () => {
  let component: ReleaseNewsPage;
  let fixture: ComponentFixture<ReleaseNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseNewsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReleaseNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
