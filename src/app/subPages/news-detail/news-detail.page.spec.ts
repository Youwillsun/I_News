import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsDetailPage } from './news-detail.page';

describe('NewsDetailPage', () => {
  let component: NewsDetailPage;
  let fixture: ComponentFixture<NewsDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
