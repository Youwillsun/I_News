import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonDataService } from '../../share/service/common-data.service';
import { environment } from 'src/environments/environment';
import { VariableService } from 'src/app/share/service/variable.service';
import { IonicService } from 'src/app/share/service/ionic.service';
import { INEncrypt } from 'src/app/share/class/INEncrypt';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {

  public title: string = '我的信息';
  public backButton: boolean = true;

  // ionic日期组件配置
  public dateOptions: any;

  // 昵称
  public nickName: string;
  // 姓名
  public name: string;
  // 手机号
  public phone: string;
  // QQ号
  public qqNumber: string;
  // 微信号
  public weChatNumber: string;
  // 出生日期
  public birthday: string;
  // 爱好
  public label = [];
  public labelCopy: string;
  // 个性签名
  public signature: string;
  // 用户id
  public userId: string;

  constructor(
    public http: HttpClient,
    public alertController: AlertController,
    public ionic: IonicService,
    public commonData: CommonDataService,
    public changeJudge: VariableService
  ) { }

  ngOnInit() {
    this.userId = INEncrypt.basicDecrypt(window.localStorage.getItem('userId'));
    // 调用修改出生日期函数
    this.changeBirthday();
    // 调用获取默认值函数
    this.defaultValue();
  }

  // 获取默认值
  public defaultValue() {
    this.http.post<any>(environment.rootPath + 'getUserInfo', { id: this.userId }).subscribe((data: any) => {
      if (data.status === 'success') {
        let res = data.data;
        // 名字
        this.name = res.realName;
        // 手机
        this.phone = res.phone;

        // 昵称
        this.nickName = res.nickName;

        // QQ
        this.qqNumber = res.qqNumber;

        // 微信
        this.weChatNumber = res.weChatNumber;

        // 个性标签
        this.label = this.commonData.matchLabel(res.personalityLabel);

        // 个人签名
        this.signature = res.introduction;

        // 出生日期
        this.birthday = res.birthday;
      } else { }
    }, err => {
      throw new Error(err);
    });
  };

  // 修改昵称
  async changeNickName() {
    const alert = await this.alertController.create({
      header: '修改昵称',
      animated: true,
      inputs: [
        {
          name: 'nickName',
          type: 'text',
          id: 'nickName',
          value: this.nickName,
          placeholder: '请输入您的昵称'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        }, {
          text: '确认',
          handler: (data: any) => {
            if (data.nickName) {
              // 向后台发送数据
              this.sendUserMsg({ nickName: data.nickName });
              this.changeJudge.infoCgJudge.subscribe((value: string) => {
                if (value === 'ok') {
                  // 修改页面中的值
                  this.nickName = data.nickName;
                } else {
                  this.ionic.Toast('修改失败！', 'danger', "top", 1000);
                }
              });
            } else {
              this.ionic.Toast("昵称不能为空，请检查！", 'danger', "top", 1000);
              return false;
            }

          }
        }
      ]
    });

    await alert.present();
  }

  // 修改姓名
  async changeName() {
    const alert = await this.alertController.create({
      header: '修改姓名',
      animated: true,
      inputs: [
        {
          name: 'name',
          type: 'text',
          id: 'name',
          value: this.name,
          placeholder: '请输入您的姓名'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        }, {
          text: '确认',
          handler: (data: any) => {
            if (data.name) {
              // 向后台发送数据
              this.sendUserMsg({ realName: data.name });
              this.changeJudge.infoCgJudge.subscribe((value: string) => {
                if (value === 'ok') {
                  // 修改页面中的数据
                  this.name = data.name;
                } else {
                  this.ionic.Toast('修改失败！', 'danger', "top", 1000);
                }
              });
            } else {
              this.ionic.Toast("姓名不能为空，请检查！", 'danger', "top", 1000);
              return false;
            }

          }
        }
      ]
    });

    await alert.present();
  }

  // 修改手机号
  async changePhone() {
    const alert = await this.alertController.create({
      header: '修改手机号',
      animated: true,
      inputs: [
        {
          name: 'phone',
          type: 'text',
          id: 'phone',
          value: this.phone,
          placeholder: '请输入您的手机号'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        }, {
          text: '确认',
          handler: (data: any) => {
            const phoneRegExp = new RegExp('^[0-9]{11}$');
            if (data.phone) {
              if (phoneRegExp.test(data.phone)) {
                // 向后台发送数据
                this.sendUserMsg({ phone: data.phone });
                this.changeJudge.infoCgJudge.subscribe((value: string) => {
                  if (value === 'ok') {
                    // 修改页面中的数据
                    this.phone = data.phone;
                  } else {
                    this.ionic.Toast('修改失败！', 'danger', "top", 1000);
                  }
                });
              } else {
                this.ionic.Toast("手机号格式有误，请检查！", 'danger', "top", 1000);
                return false;
              }
            } else {
              this.ionic.Toast("手机号为空，请检查！", 'danger', "top", 1000);
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // 修改QQ号
  async changeQQ() {
    const alert = await this.alertController.create({
      header: '修改QQ号',
      animated: true,
      inputs: [
        {
          name: 'QQ',
          type: 'text',
          id: 'QQ',
          value: this.qqNumber,
          placeholder: '请输入您的QQ号'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        }, {
          text: '确认',
          handler: (data: any) => {
            const qqRegExp = new RegExp('^[1-9][0-9]{4,9}$');
            if (data.QQ) {
              if (qqRegExp.test(data.QQ)) {
                // 向后台发送数据
                this.sendUserMsg({ qqNumber: data.QQ });
                this.changeJudge.infoCgJudge.subscribe((value: string) => {
                  if (value === 'ok') {
                    // 修改页面中的数据
                    this.qqNumber = data.QQ;
                  } else {
                    this.ionic.Toast('修改失败！', 'danger', 'top', 1000);
                  }
                });
              } else {
                this.ionic.Toast("QQ号格式有误，请检查！", 'danger', 'top', 1000);
                return false;
              }
            } else {
              this.ionic.Toast("QQ号为空，请检查！", 'danger', 'top', 1000);
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // 修改微信号
  async changeWeChat() {
    const alert = await this.alertController.create({
      header: '修改微信号',
      animated: true,
      inputs: [
        {
          name: 'weChat',
          type: 'text',
          id: 'weChat',
          value: this.weChatNumber,
          placeholder: '请输入您的微信号'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        }, {
          text: '确认',
          handler: (data: any) => {
            const weChatRegExp = new RegExp('^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$');
            if (data.weChat) {
              if (weChatRegExp.test(data.weChat)) {
                // 向后台发送数据
                this.sendUserMsg({ weChatNumber: data.weChat });
                this.changeJudge.infoCgJudge.subscribe((value: string) => {
                  if (value === 'ok') {
                    // 修改页面中的数据
                    this.weChatNumber = data.weChat;
                  } else {
                    this.ionic.Toast('修改失败！', 'danger', "top", 1000);
                  }
                });
              } else {
                this.ionic.Toast("微信号格式有误，请检查！", 'danger', "top", 1000);
                return false;
              }
            } else {
              this.ionic.Toast("微信号为空，请检查！", 'danger', "top", 1000);
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // 修改出生日期
  public changeBirthday() {
    this.dateOptions = {
      buttons: [{
        text: '取消'
      }, {
        text: '确认',
        handler: (data: any) => {
          // 向后台发送数据
          this.sendUserMsg({ birthday: `${data.year.text}-${data.month.text}-${data.day.text}` });
          this.changeJudge.infoCgJudge.subscribe((value: string) => {
            if (value === 'ok') {
              // 修改页面中的值
              this.birthday = `${data.year.text}-${data.month.text}-${data.day.text}`;
            } else {
              this.ionic.Toast('修改失败！', 'danger', "top", 1000);
            }
          });
        }
      }]
    }
  }

  // 修改爱好
  public changeLabel() {
    // 拼接input格式
    let iptArr = [];
    // 遍历个性标签大全数组
    for (let i = 0; i < this.commonData.labelArr.length; i++) {
      iptArr.push({ name: i, type: 'checkbox', label: this.commonData.labelArr[i].tag, value: this.commonData.labelArr[i].tag, checked: false });
      if (i + 1 === this.commonData.labelArr.length) {
        // 如果用户本身选择的有个性标签
        if (this.label.length !== 0) {
          for (let j = 0; j < this.label.length; j++) {
            iptArr.forEach((item: any) => {
              if (this.label[j].tag === item.label) {
                item.checked = true;
              }
            });
            if (j + 1 === this.label.length) {
              this.labelChildFun(iptArr);
            }
          }
        } else {
          this.labelChildFun(iptArr);
        }
      }
    }
  }
  async labelChildFun(iptArr: Array<any>) {
    const alert = await this.alertController.create({
      header: '修改个性标签',
      animated: true,
      inputs: iptArr,
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        }, {
          text: '确认',
          handler: (data: any) => {
            if (data.length !== 0) {
              // 向后台发送
              this.labelCopy = data.join(',');
              this.sendUserMsg({ personalityLabel: this.labelCopy });
              this.changeJudge.infoCgJudge.subscribe((value: string) => {
                if (value === 'ok') {
                  // 清空原有的个性标签
                  this.label = [];
                  // 修改页面中的值
                  for (let j = 0; j < data.length; j++) {
                    this.commonData.labelArr.forEach((item: any) => {
                      if (data[j] === item.tag) {
                        this.label.push(item);
                      }
                    });
                  }
                } else {
                  this.ionic.Toast('修改失败！', 'danger', "top", 1000);
                }
              });
            } else {
              this.ionic.Toast("请选择至少一个个性标签！", 'danger', "top", 1000);
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // 修改个性签名
  async changeSignature() {
    const alert = await this.alertController.create({
      header: '修改个性签名',
      animated: true,
      inputs: [
        {
          name: 'signature',
          id: 'signature',
          type: 'textarea',
          value: this.signature,
          placeholder: '请输入您的个性签名'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        }, {
          text: '确认',
          handler: (data: any) => {
            if (data.signature) {
              // 向后台发送数据
              this.sendUserMsg({ introduction: data.signature });
              this.changeJudge.infoCgJudge.subscribe((value: string) => {
                if (value === 'ok') {
                  // 修改页面中的值
                  this.signature = data.signature;
                } else {
                  this.ionic.Toast('修改失败！', 'danger', "top", 1000);
                }
              });
            } else {
              this.ionic.Toast("个性签名不能为空，请检查！", 'danger', "top", 1000);
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // 向后台发送信息
  sendUserMsg(userInfo: any) {
    // 定义请求头
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // 发送请求
    this.http.post<any>(environment.rootPath + 'updateUserInfo', { id: this.userId, data: userInfo }, httpOptions).subscribe((data: any) => {
      if (data.status === 'success') {
        this.changeJudge.infoCgJudge.emit('ok');
        this.ionic.Toast(data.data.msg, "success", "top", 1000);
      } else {
        this.changeJudge.infoCgJudge.emit('no');
        this.ionic.Toast(data.data.msg, "danger", "top", 1000);
      }
    }, err => {
      throw new Error(err);
    });
  }

}
