import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IonicService } from 'src/app/share/service/ionic.service';

@Component({
  selector: 'app-release-news',
  templateUrl: './release-news.page.html',
  styleUrls: ['./release-news.page.scss'],
})
export class ReleaseNewsPage implements OnInit {

  // 标题
  public title: string = "发布新闻";
  public backButton: boolean = true;

  // 富文本编辑器配置
  public quillConfig = {};

  // 存储newsClass数据
  public newsClassData = [];

  // 配置请求参数模板
  public parameter = {
    newsTile: "", // 新闻标题
    newsSummary: "", // 新闻简介
    newsSource: "", // 新闻来源
    newsThumbnail: "", // 新闻缩略图
    newsContent: "", // 新闻内容
    newsClassId: "" // 新闻分类id
  }

  constructor(
    public http: HttpClient,
    public ionic: IonicService
  ) { }

  ngOnInit() {
    // 富文本编辑器工具框配置
    this.quillConfig = {
      toolbar: [
        ['bold', 'italic', 'underline',],
        ['blockquote'],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['link', 'image']
      ]
    };
    // 获取新闻分类
    this.fetchNewsClassData();
  }

  // 获取newsClass数据
  fetchNewsClassData() {
    this.http.get<any>(environment.rootPath + "getNewsClass").subscribe((data: any) => {
      if (data.status === 'success') {
        this.newsClassData = data.data;
      } else {
        this.ionic.Toast(data.data.msg, "danger", "top");
      }
    }, err => {
      throw new Error(err);
    });
  }

  // 选择的分类对应的id
  selectNewsClass(e: { target: { value: any; }; }) {
    this.parameter.newsClassId = e.target.value;
  }

  // 发布新闻
  releaseNews() {
    // 判断填的信息是否缺失
    if (!this.parameter.newsTile || !this.parameter.newsSummary || !this.parameter.newsSource || !this.parameter.newsContent || !this.parameter.newsClassId) {
      this.ionic.Toast('新闻发布信息缺失，请检查！', "danger", "top", 2000);
    } else {
      // 判断图片链接有没有
      if (!this.parameter.newsThumbnail) {
        this.parameter.newsThumbnail = "";
        this.sendMsg();
      } else {
        let imgReg = /http(s)?:\/\/[\w.]+[\w\/]*[\w.]*\??[\w=&\+\%]*/is;
        if (!imgReg.test(this.parameter.newsThumbnail)) {
          this.ionic.Toast('图片链接不合法', "danger", "top");
        } else {
          this.sendMsg();
        }
      }
    }
  }

  // 向后台发送新闻数据
  sendMsg() {
    this.http.post<any>(environment.rootPath + 'releaseNews', this.parameter).subscribe((data: any) => {
      if (data.status === 'success') {
        this.parameter.newsTile = "";
        this.parameter.newsThumbnail = "";
        this.parameter.newsSummary = "";
        this.parameter.newsSource = "";
        this.parameter.newsContent = "";
        this.ionic.Toast(data.data.msg, "success", "top");
      } else {
        this.ionic.Toast(data.data.msg, "danger", "top");
      }
    }, err => {
      throw new Error(err);
    });
  }
}
