import { Component, OnInit } from '@angular/core';
import { IonicService } from 'src/app/share/service/ionic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-collects',
  templateUrl: './my-collects.page.html',
  styleUrls: ['./my-collects.page.scss'],
})
export class MyCollectsPage implements OnInit {

  // 标题
  public title: string = "我的收藏";
  public backButton: boolean = true;
  // 存储新闻数据
  public newsData = [];
  // 存储userId
  public userId: string;

  constructor(
    public http: HttpClient,
    public ionic: IonicService,
    public router: Router
  ) { }

  ngOnInit() {
    // 获取userId
    this.userId = window.localStorage.getItem('userId');
    // 获取我的收藏
    this.fetchMyCollect();
  }

  // 获取我的收藏
  fetchMyCollect() {
    // 调用接口
    this.http.post<any>(environment.rootPath + 'getUserCollectNews', { userId: this.userId }).subscribe((data: any) => {
      if (data.status === 'success') {
        // 如果收藏为空
        if(data.data.length === 0){
          this.ionic.Toast('暂无收藏的新闻', "danger", "top");
          this.router.navigate(['/tabs/mine']);
        } else {
          this.newsData = data.data;
        }
      } else {
        this.ionic.Toast(data.data.msg, "danger", "top");
      }
    }, err => {
      throw new Error(err);
    });
  }

}
