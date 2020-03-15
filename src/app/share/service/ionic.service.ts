import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonicService {

  constructor(
    public toastController: ToastController
  ) { }

  /**
   * ionic toast 提示框
   * @param message 提示框要显示的信息
   * @param color 提示框颜色
   * @param position 提示框位置
   * @param duration 提示框出现至消失时间间隔
   * @param animated 提示框动画
   */
  async Toast(message: string, color: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "medium" | "dark", position?: "top" | "bottom" | "middle", duration?: number, animated?: boolean) {
    // 默认位置在底部
    if (!position) {
      position = 'bottom';
    }
    // 默认时长1500ms
    if (!duration) {
      duration = 1500
    }
    // 默认开启动画
    if (!animated) {
      animated = true;
    }
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      animated: animated,
      color: color,
      position: position
    });
    toast.present();
  }
}
