import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  // 去新闻详情页
  toNewsDetail() {
    this.router.navigate(['/newsDetails']);
  }

}
