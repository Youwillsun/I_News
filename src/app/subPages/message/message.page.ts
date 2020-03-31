import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateMethod } from 'src/app/share/class/DateMethod';
import { environment } from 'src/environments/environment';
import { IonicService } from 'src/app/share/service/ionic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  public title: string = '消息通知';
  public backButton: boolean = true;

  // 存储消息数据
  public messageData = [];

  constructor(
    public http: HttpClient,
    public ionic: IonicService,
    public router: Router
  ) { }

  ngOnInit() {
    // 获取数据
    this.fetchMessageData();
  }

  // 获取消息数据
  fetchMessageData() {
    this.http.get<any>(environment.rootPath + "getMessageInfo/getAllMessage").subscribe((data: any) => {
      if (data.status === 'success') {
        let res = data.data;
        if (res.length === 0) {
          this.ionic.Toast(data.data.msg, "danger", "top");
          this.router.navigate(['/tabs/mine']);
        } else {
          res.forEach((item: any, index: number) => {
            this.messageData.push(item);
            if (index + 1 === res.length) {
              // 对此数组进行排序
              DateMethod.dateSort(this.messageData, 'messageTime', 'rev');
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

}
