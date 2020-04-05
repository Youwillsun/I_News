import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IonicService } from '../share/service/ionic.service';
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

  // 是否显示缺省图
  public dataJudge:boolean = false;

  constructor(
    public router: Router,
    public http: HttpClient,
    public ionic:IonicService
  ) { }

  ngOnInit() {
    this.fetchNewsClassData();
  }

  // 获取newsClass数据
  fetchNewsClassData() {
    this.http.get<any>(environment.rootPath+"getNewsClass").subscribe((data: any) => {
      if (data.status === 'success') {
        this.newsClassData = data.data;
      } else {
        this.dataJudge = true;
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
