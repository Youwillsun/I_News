import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IonicService } from '../share/service/ionic.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit {

  // 柱状图配置
  public barOption: any;
  // 饼图配置
  public pieOption: any;
  // 判断是否为柱状图
  public isBar: boolean;

  // 标题
  public title = "新闻统计";

  constructor(
    public http: HttpClient,
    public ionic: IonicService
  ) { }

  ngOnInit() {
    // 默认显示柱状图
    this.isBar = true;
    // 加载数据
    this.chartData();
  }

  // 今日新闻统计
  todayNews() {
    this.isBar = true;
  }

  // 各类新闻占比
  newsClass() {
    this.isBar = false;
  }

  // Echarts图数据
  chartData() {
    // 拿到news-class数据
    this.http.get<any>(environment.rootPath + "newsStatData").subscribe((data: any) => {
      if (data.status === 'success') {
        let newsClassData = data.data;
        // 存储newclass的名称【给柱状图，饼图用】
        let newsClassName: string[] = [];
        // 存储此类新闻的数量【给柱状图】
        let newClassNumber: number[] = [];
        // 存储新闻数量和此类新闻名称【给饼图】
        let newsNameANumber: any[] = [];
        newsClassData.forEach((item: any, index: number) => {
          // 剪切并存储标题
          newsClassName.push(item.className.substring(0, 2));
          // 存储新闻数量
          newClassNumber.push(item.count);
          // 饼图的
          newsNameANumber.push({ value: item.count, name: item.className.substring(0, 2) });
          if (index + 1 === newsClassData.length) {
            // 柱状图配置
            this.barOption = {
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                },
                formatter: '{a} <br/>{b} : {c}个'
              },
              legend: {
                data: ['新闻数量']
              },
              grid: {
                left: '3%',
                top: '10%',
                right: '3%', ///   调整大小
                bottom: '10%',
                containLabel: true
              },
              xAxis: {
                data: newsClassName
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                name: '新闻数量',
                type: 'bar',
                data: newClassNumber
              },
              {
                name: '新闻数量',
                type: 'line',
                data: newClassNumber,
                lineStyle: {
                  color: '#FF9B00'
                }
              }]
            }
            // 饼图配置
            this.pieOption = {
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}个({d}%)'
              },
              legend: {
                left: 'left',
                data: newsClassName
              },
              series: [
                {
                  name: '新闻占比',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '55%'],
                  data: newsNameANumber
                }
              ]
            }
          }
        });
      } else {
        this.ionic.Toast(data.data.msg, "danger", "top");
      }
    }, err => {
      throw new Error(err);
    });
  }

}
