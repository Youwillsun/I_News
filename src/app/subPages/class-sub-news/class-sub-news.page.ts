import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DateMethod } from 'src/app/share/class/DateMethod';
import { IonicService } from 'src/app/share/service/ionic.service';

@Component({
  selector: 'app-class-sub-news',
  templateUrl: './class-sub-news.page.html',
  styleUrls: ['./class-sub-news.page.scss'],
})
export class ClassSubNewsPage implements OnInit {

  // 标题
  public title: string;
  public backButton:boolean = true;
  // 新闻类别id
  public newsClassId: string;
  // 存储新闻数据
  public newsData = [];

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public http: HttpClient,
    public ionic:IonicService
  ) { }

  ngOnInit() {
    // 标题和新闻类别id从路由中获取
    this.route.params.subscribe((data: any) => {
      this.title = data.name;
      this.newsClassId = data.id;
    });
    // 获取数据
    this.fetchNewsData();
  }

  // 获取对应新闻类别的新闻数据
  fetchNewsData() {
    this.http.get<any>("../../../assets/data/news.json").subscribe((data: any) => {
      if (data.statusText === 'OK') {
        let res = data.data;
        res.forEach((item: any, index: number) => {
          // 今日及其之前的新闻，且属于这一类别
          if (DateMethod.compare(item.date) === 'ok' && this.newsClassId === item.classId) {
            this.newsData.push(item);
          }
          // 如果是最后一次循环
          if (index + 1 === res.length) {
            // 如果这一类别新闻数组为空
            if (this.newsData.length === 0) {
              this.ionic.Toast('此类新闻暂无数据！', 'danger',"top");
              // 路由回分类页面
              this.router.navigate(['/tabs/class']);
              return false;
            } else {
              // 对此数组进行排序
              DateMethod.dateSort(this.newsData,'date','rev');
            }
          }
        });
      } else {
        throw new Error('data有误');
      }
    }, err => {
      throw new Error(err);
    });
  }

  // 去新闻详情页
  toNewsDetail(id: string) {
    this.router.navigate(['/newsDetails', { id }]);
  }

}
