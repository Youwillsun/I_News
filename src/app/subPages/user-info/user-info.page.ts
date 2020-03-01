import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { CommonDataService } from '../../share/service/common-data.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {

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

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public commonData: CommonDataService
  ) { }

  ngOnInit() {
    // 调用修改出生日期函数
    this.changeBirthday();
  }

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
              // 修改页面中的值
              this.nickName = data.nickName;
              // 向后台发送数据
            } else {
              const message = "昵称不能为空，请检查！";
              this.presentToast(message, 'danger');
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
              // 修改页面中的数据
              this.name = data.name;
              // 向后台发送数据
            } else {
              const message = "姓名不能为空，请检查！";
              this.presentToast(message, 'danger');
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
                this.phone = data.phone;
                // 向后台发送数据

              } else {
                const message = "手机号格式有误，请检查！";
                this.presentToast(message, 'danger');
                return false;
              }
            } else {
              const message = "手机号为空，请检查！";
              this.presentToast(message, 'danger');
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
                this.qqNumber = data.QQ;
                // 向后台发送数据

              } else {
                const message = "QQ号格式有误，请检查！";
                this.presentToast(message, 'danger');
                return false;
              }
            } else {
              const message = "QQ号为空，请检查！";
              this.presentToast(message, 'danger');
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
                this.weChatNumber = data.weChat;
                // 向后台发送数据

              } else {
                const message = "微信号格式有误，请检查！";
                this.presentToast(message, 'danger');
                return false;
              }
            } else {
              const message = "微信号为空，请检查！";
              this.presentToast(message, 'danger');
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
          // 修改页面中的值
          this.birthday = `${data.year.text}-${data.month.text}-${data.day.text}`;
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
              // 向后台发送
              this.labelCopy = data.join(',');
            } else {
              const message = "请选择至少一个个性标签！";
              this.presentToast(message, 'danger');
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
              // 修改页面中的值
              this.signature = data.signature;
            } else {
              const message = "个性签名不能为空，请检查！";
              this.presentToast(message, 'danger');
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // ionic alert
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Prompt!',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Placeholder 1'
        },
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Placeholder 2'
        },
        // multiline input.
        {
          name: 'paragraph',
          id: 'paragraph',
          type: 'textarea',
          placeholder: 'Placeholder 3'
        },
        {
          name: 'name3',
          value: 'http://ionicframework.com',
          type: 'url',
          placeholder: 'Favorite site ever'
        },
        // input date with min & max
        {
          name: 'name4',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12'
        },
        // input date without min nor max
        {
          name: 'name5',
          type: 'date'
        },
        {
          name: 'name6',
          type: 'number',
          min: -5,
          max: 10
        },
        {
          name: 'name7',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

  // ionic toast
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: color,
      position: 'top'
    });
    toast.present();
  }

}
