import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicService } from 'src/app/share/service/ionic.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-release-msg',
  templateUrl: './release-msg.page.html',
  styleUrls: ['./release-msg.page.scss'],
})
export class ReleaseMsgPage implements OnInit {

  // 标题
  public title: string = "发布消息";
  public backButton: boolean = true;

  // 存储消息内容
  public msgContent: string;

  constructor(
    public http: HttpClient,
    public ionic: IonicService
  ) { }

  ngOnInit() {
  }

  releaseMsg() {
    if (this.msgContent) {
      this.http.post<any>(environment.rootPath + 'releaseMsg', { messageContent: this.msgContent }).subscribe((data: any) => {
        if (data.status === 'success') {
          this.msgContent = "";
          this.ionic.Toast(data.data.msg, "success", "top");
        } else {
          this.ionic.Toast(data.data.msg, "danger", "top");
        }
      }, err => {
        throw new Error(err);
      });
    } else {
      this.ionic.Toast('消息通知内容为空', "danger", "top");
    }
  }
}