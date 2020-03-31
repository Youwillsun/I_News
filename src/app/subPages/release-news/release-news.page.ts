import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-release-news',
  templateUrl: './release-news.page.html',
  styleUrls: ['./release-news.page.scss'],
})
export class ReleaseNewsPage implements OnInit {

  // 标题
  public title: string = "发布新闻";
  public backButton: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
