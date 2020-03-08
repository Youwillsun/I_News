import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DateMethod } from '../share/class/DateMethod';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  // 存储新闻数据
  public newsData = [];
  // 首页标题
  public title = '热点新闻';

  constructor(
    public router: Router,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.fetchNewsData();
  }

  // 加载首页数据
  fetchNewsData() {
    // 获取当前时间
    this.http.get('../../assets/data/news.json').subscribe((data: any) => {
      if (data.statusText === 'OK') {
        let result = data.data;
        result.forEach((item: any, index: number) => {
          // 调用日期比较函数，值选择当前日期及其之前的新闻
          if (DateMethod.compare(item.date) === 'ok') {
            this.newsData.push(item);
          }

          if (index + 1 === result.length){
            // 最后一次循环结束，对数组进行排序
            DateMethod.dateSort(this.newsData,'date','rev')
          }
        });
      } else {
        throw new Error('data有误');
      }
    }, err => {
      console.log(err);
      throw new Error(err);
    });
  }

  // 去新闻详情页
  toNewsDetail(id: string) {
    this.router.navigate(['/newsDetails', { id }]);
  }

}
