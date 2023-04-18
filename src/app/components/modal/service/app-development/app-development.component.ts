import { interval } from 'rxjs';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';

export interface IDsvelopConfig {
  id: string;
  title: string;
  caption: string;
}

@Component({
  selector: 'app-app-development',
  templateUrl: './app-development.component.html',
  styleUrls: ['./app-development.component.sass']
})
export class AppDevelopmentComponent implements OnInit, OnDestroy {
  @Output() contactUs: EventEmitter<any>
  currentIndex = 0
  currentDevelopIcon: any;
  currentCaption: string;
  isShowdDescribe: boolean;
  developList: IDsvelopConfig[];
  isHover = false;
  supportSlideSb: any;
  isSlide: boolean;

  constructor() {
    this.contactUs = new EventEmitter<any>();
    this.currentDevelopIcon = [];
    this.currentCaption = '';
    this.isShowdDescribe = false;
    this.isSlide = false;
    this.developList = [
      {
        id: 'ec',
        title: '電商',
        caption: '提供B2C和C2C的商品交流平台，包含買賣家管理平台、購物車、金流、訂單管理、出貨管理、曝光與優惠管理...等基本功能，另外還提供很多好用的創意加值模組等您來了解！'
      },
      {
        id: 'log',
        title: '物流',
        caption: '網購的高度發展，帶動物流業的各種革命！我們的App結合衛星定位地圖功能，讓您與您的客戶能夠很輕鬆的追蹤目前貨物狀況與送貨狀態！從寄送到簽收，清楚簡約的設計，讓資訊一手掌握！'
      },
      {
        id: 'edu',
        title: '教育',
        caption: '隨著行動裝置的普及，人們可以更好地利用瑣碎時間來各式各樣的學習！我們的行動學習平台，學生可隨時隨地進行學習有興趣的課程，老師也可上傳影片進行教學，也有討論區讓老師與學生能夠進行課程線下討論！</br></br>在老師提供專業的同時，學生也可透過app的金流功能付學費給老師，形成一個友善互惠的學習環境！'
      },
      {
        id: 'office',
        title: '辦公',
        caption: '辦公App可以整合貴司的辦公系統，輔助公司成員能夠更順暢地執行各式專案，讓管理者能夠快速管理公司的營運狀況！不論人在何地，皆可充分得到資訊後立即進行處理，發揮移動式作業的經大優勢！'
      },
      {
        id: 'live',
        title: '社交直播',
        caption: '每個人的心中，都有一個想表現的靈魂，透過App平台，讓客戶能夠支出最小的成本，獲得最大的成就感！可自我實現、可互動交誼、可探索生活圈外的陌生世界！抑或是各地區商家在地化社群經營，透過日常互動經營與話題操作，提高自身曝光率與知名度，進而得到一加一大於二的加乘效果。'
      }
    ];
    this.autoPlaySlide();

  }

  ngOnDestroy(): void {
    if (this.supportSlideSb) {
      this.supportSlideSb.unsubscribe();
    }
  }

  ngOnInit(): void {
  }

  autoPlaySlide() {
    this.supportSlideSb = interval(3500).subscribe(() => {
      this.isSlide = !this.isSlide
    });
  }

  showDescribe(id: string) {
    const list = this.developList.filter(item => {
      return item.id === id
    });
    this.currentDevelopIcon = list
  }

  cleanIcon() {
    this.currentDevelopIcon.length = 0
  }

  contact() {
    this.contactUs.emit();
  }

}
