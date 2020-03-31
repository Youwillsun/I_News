import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {

  @Input() newsData: Array<any>

  constructor(
    public router: Router
  ) { }

  ngOnInit() { }

  // 去新闻详情页
  toNewsDetail(id: string) {
    this.router.navigate(['/newsDetails', { id }]);
  }

}
