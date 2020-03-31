import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IonicService } from 'src/app/share/service/ionic.service';
import { INEncrypt } from 'src/app/share/class/INEncrypt';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {

  public title: string = '新闻详情';
  public backButton: boolean = true;

  // 收藏量
  @ViewChild('collect_number', { static: false }) collectNumber: any;
  // 收藏图标
  @ViewChild('collectIcon', { static: false }) collectIcon: any;

  // 存储newsId
  public newsId: string;
  // 存储news数据
  public newsData = {};
  // 存储comment数据
  public commentInfo = [];

  // 存储userId
  public userId: string;

  constructor(
    public http: HttpClient,
    public route: ActivatedRoute,
    public ionic: IonicService
  ) { }

  ngOnInit() {
    // 从路由中获取id
    this.route.params.subscribe((data: any) => {
      this.newsId = data.id;
    });
    // 获取userId
    this.userId = INEncrypt.basicDecrypt(window.localStorage.getItem('userId'));
    // 获取数据
    this.fetchNDData();
    //判断此用户是否收藏了此新闻
    this.userCollectJudge();
  }

  // 获取新闻详情数据
  fetchNDData() {
    this.http.post<any>(environment.rootPath + "getNewsDetail", { newsId: this.newsId }).subscribe((data: any) => {
      if (data.status === 'success') {
        this.newsData = data.data.newsInfo;
        this.commentInfo = data.data.commentInfo;
      } else {
        this.ionic.Toast(data.data.msg, "danger", "top");
      }
    }, err => {
      throw new Error(err);
    });
  }

  // 判断此用户是否收藏了此新闻
  userCollectJudge() {
    this.http.post<any>(environment.rootPath + 'getUserCollectNews', { userId: this.userId }).subscribe((data: any) => {
      if (data.status === 'success') {
        let res = data.data;
        // 如果没有收藏的新闻
        if (res.length === 0) {
          this.collectIcon.name = 'heart-circle-outline';
        } else {
          res.forEach((item: any, index: number) => {
            // 定义标识，证明有这个新闻的id
            let flag = false;
            // 如果有这个新闻的id，则为收藏过
            if (item.newsId === this.newsId) {
              this.collectIcon.name = 'heart-circle';
              // 改变标识
              flag = true;
            }
            // 如果是最后一次循环
            if (index + 1 === res.length) {
              if (!flag) {
                this.collectIcon.name = 'heart-circle-outline';
              }
            }
          });
        }
      } else {
        this.ionic.Toast(data.data.msg, "danger", "top");
      }
    }, err => {
      throw new Error(err);
    });
  }

  // 点击收藏
  collectNews() {
    // 获取dom元素
    let colNum = Number(this.collectNumber.el.innerText);
    // 如果没有点过，则走收藏的接口
    if (this.collectIcon.name === 'heart-circle-outline') {
      this.http.post<any>(environment.rootPath + 'collectNews', { "userId": this.userId, "newsId": this.newsId }).subscribe((data: any) => {
        if (data.status === 'success') {
          this.ionic.Toast(data.data.msg, "success", "top");
          colNum = colNum + 1;    // 改变收藏图标
          this.collectIcon.name = 'heart-circle';
          // 更改收藏量
          this.collectNumber.el.textContent = String(colNum);
          this.ionic.Toast(data.data.msg, "success", "top");
        } else {
          this.ionic.Toast(data.data.msg, "danger", "top");
        }
      }, err => {
        throw new Error(err);
      });
    } else {
      // 取消收藏的接口
      this.http.post<any>(environment.rootPath + 'collectNews/cancelCollectNews', { userId: this.userId, newsId: this.newsId }).subscribe((data: any) => {
        if (data.status === 'success') {
          colNum = colNum - 1;    // 改变收藏图标
          this.collectIcon.name = 'heart-circle-outline';
          // 更改收藏量
          this.collectNumber.el.textContent = String(colNum);
          this.ionic.Toast(data.data.msg, "success", "top");
        } else {
          this.ionic.Toast(data.data.msg, "danger", "top");
        }
      }, err => {
        throw new Error(err);
      });
    }
  }

}
