import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-class',
  templateUrl: './class.page.html',
  styleUrls: ['./class.page.scss'],
})
export class ClassPage implements OnInit {

  // 标题
  public title = '新闻分类';
  // 存储newsClass数据
  public newsClassData = [];

  constructor(
    public router: Router,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.fetchNewsClassData();
  }

  // 获取newsClass数据
  fetchNewsClassData() {
    this.http.get<any>("../../assets/data/news-class.json").subscribe((data: any) => {
      if (data.statusText === 'OK') {
        this.newsClassData = data.data;
      } else {
        throw new Error('data有误');
      }
    }, err => {
      throw new Error(err);
    });
  }

  // 去新闻分类子页
  toSubNews(id: string, className: string) {
    this.router.navigate(['/classSubNews', { id, name: className }])
  }

}
