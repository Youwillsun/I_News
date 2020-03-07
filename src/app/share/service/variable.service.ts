import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  // 信息改变是否成功判断
  public infoCgJudge: EventEmitter<string> = new EventEmitter();

  constructor() { }
}
