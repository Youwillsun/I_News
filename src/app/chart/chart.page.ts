import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    public http: HttpClient
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

  // 今日新闻柱状图数据
  chartData() {
    // 拿到news-class数据
    this.http.get<any>("../../assets/data/news-class.json").subscribe((data: any) => {
      let newsClassData = data.data;
      // 拿到news数据
      this.http.get<any>("../../assets/data/news.json").subscribe((res: any) => {
        let newsData = res.data;

        // 存储newclass的名称【给柱状图，饼图用】
        let newsClassName: string[] = [];
        // 存储此类新闻的数量【给柱状图】
        let newClassNumber: number[] = [];
        // 存储新闻数量和此类新闻名称【给饼图】
        let newsNameANumber: any[] = [];
        newsClassData.forEach((item: any, index: number) => {
          // 设置一个初始值
          let count = 0;
          newsClassName.push(item.class.substring(0,2));
          newsData.forEach((el: any, num: number) => {
            if (item.id === el.classId) {
              count++;
            }
            if (num + 1 === newsData.length) {
              newClassNumber.push(count);
              newsNameANumber.push({ value: count, name: item.class.substring(0,2) });
            }
          });
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
      }, err => {
        throw new Error(err);
      });
    }, err => {
      throw new Error(err);
    });
  }

}
