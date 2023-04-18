import { ModalService } from './../../services/modal.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { moveFromWindow, getOffsetInWindow, moveWindowTop } from 'src/app/helper/tool';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ServiceComponent } from 'src/app/components/modal/service/service.component';

export interface IServiceConfig {
  title: string;
  caption: string;
  link: string;
}

const techMap = [
  {
    name: '前端',
    list: ['Javascript', 'Css3', 'Html5', 'React', 'Angular', 'Vue'],
  },
  {
    name: 'Database',
    list: ['MySQL', 'Redis', 'SCYLLA', 'Oracle', 'Mssql', 'Influxdb']
  },
  {
    name: '後端',
    list: ['PHP', 'Go', 'Python', 'Docker', 'K8s', 'Lua', 'Git', 'Nsq', 'Helm', 'Istio', 'Devops']
  },
  {
    name: 'VR',
    list: ['Unity', '3dsMAX', 'Maya', 'Unreal', 'Vizard', 'Substance_Painter']
  },
  {
    name: '大數據',
    list: ['Google_Analytics', 'Tableau', 'SPSS', 'SAS', 'R', 'Apache_Hadoop', 'ELK', 'Spark']
  },
  {
    name: 'Mobile',
    list: ['Android', 'IOS'],
  },
  {
    name: '視覺',
    list: ['Photoshop', 'Illustrator', 'After_Effects', 'Premiere', 'XD', 'Axure', 'Spine']
  }
]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  @ViewChild('bannerEl') bannerEl!: ElementRef;
  @ViewChild('clipPaper') clipPaper!: ElementRef;
  @ViewChild('clipPaperContent') clipPaperContent!: ElementRef;
  @ViewChild('aboutTitle') aboutTitle!: ElementRef;
  @ViewChild('logoIcon') logoIcon!: ElementRef;
  @ViewChild('aboutMobile') aboutMobile!: ElementRef;
  @ViewChild('aboutDesktop') aboutDesktop!: ElementRef;
  @ViewChild('serviceEl') serviceEl!: ElementRef;
  @ViewChild('serviceTitleEl') serviceTitleEl!: ElementRef;
  @ViewChild('serviceDescDesktopEl') serviceDescDesktopEl!: ElementRef;
  @ViewChild('serviceDescMobileEl') serviceDescMobileEl!: ElementRef;
  @ViewChild('supportEl') supportEl!: ElementRef;
  @ViewChild('techEl') techEl!: ElementRef;
  @ViewChild('contactEl') contactEl!: ElementRef;
  @ViewChild('planePurpleEl') planePurpleEl!: ElementRef;
  @ViewChild('planeYellowEl') planeYellowEl!: ElementRef;
  @ViewChild('planeGreenEl') planeGreenEl!: ElementRef;
  @ViewChild('AplanePurpleEl') AplanePurpleEl!: ElementRef;
  @ViewChild('AplaneYellowEl') AplaneYellowEl!: ElementRef;
  @ViewChild('SplaneYellowEl') SplaneYellowEl!: ElementRef;
  @ViewChild('SplaneGreenEl') SplaneGreenEl!: ElementRef;
  @ViewChild('PplaneYellowEl') PplaneYellowEl!: ElementRef;

  techList: any;
  serviceConfig: IServiceConfig[];

  currentTechIndex = 0
  isMenuOpened = false
  endOfPage: number
  isShowGoTop = false
  isSuccess = false;
  @HostListener('window:scroll')
  onWindowScroll() {
    this.isShowGoTop = window.pageYOffset > 200
  }

  constructor(
    private modal: ModalService
  ) {
    this.techList = techMap
    this.serviceConfig = [
      {
        title: '客製化網站開發',
        caption: '',
        link: 'customized'
      },
      {
        title: 'VR虛擬實境應用開發',
        caption: '',
        link: 'responsive'
      },
      {
        title: 'APP 開發',
        caption: '',
        link: 'app'
      },
      {
        title: '視覺美術設計',
        caption: '',
        link: 'hosting'
      },
      {
        title: '資訊顧問服務',
        caption: '',
        link: 'seo'
      },
      {
        title: '大數據分析',
        caption: '',
        link: 'bigdata'
      },
    ];

    this.endOfPage = Math.round(this.techList.length / 3)
  }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.bannerEl.nativeElement.classList.add('is-play')
    }, 500)

    this.gsapAnimation();
    this.flyPlane()
  }

  flyPlane() {
    this.generatePlane(this.AplanePurpleEl.nativeElement, this.getRandomIntInclusive(8, 10));
    this.generatePlane(this.AplaneYellowEl.nativeElement, this.getRandomIntInclusive(8, 10));
    this.generatePlane(this.SplaneYellowEl.nativeElement, this.getRandomIntInclusive(8, 10));
    this.generatePlane(this.SplaneGreenEl.nativeElement, this.getRandomIntInclusive(8, 10));
    this.generatePlane(this.PplaneYellowEl.nativeElement, this.getRandomIntInclusive(8, 10));
  }

  flyPlaneBanner() {
    this.generatePlane(this.planePurpleEl.nativeElement, this.getRandomIntInclusive(8, 10));
    this.generatePlane(this.planeYellowEl.nativeElement, this.getRandomIntInclusive(8, 10));
    this.generatePlane(this.planeGreenEl.nativeElement, this.getRandomIntInclusive(8, 10));
  }

  gsapAnimation() {
    gsap.timeline()
      // banner logo
      .to(this.logoIcon.nativeElement,
        {
        duration: 1.25,
        scrollTrigger: {
          toggleClass: "is-play",
          trigger: this.logoIcon.nativeElement,
          // once: true
        }
      })
      // banner clipPaper
      .fromTo(this.clipPaper.nativeElement,
        {
          xPercent: -30,
          opacity: 0
        },
        {
        opacity: 1,
        xPercent: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: this.clipPaper.nativeElement
        },
        onComplete: () => {
          this.flyPlaneBanner()
        }
      })
      .to(this.clipPaperContent.nativeElement, {
        scrollTrigger: {
          toggleClass: "is-play",
          trigger: this.clipPaperContent.nativeElement,
        }
      })
    // about title
    gsap.set(this.aboutTitle.nativeElement, {
      xPercent: -8
    })
    gsap.to(this.aboutTitle.nativeElement, {
      xPercent: 0,
      duration: 1.25,
      scrollTrigger: {
        toggleClass: "is-active",
        trigger: this.aboutTitle.nativeElement,
        start: "top center",
        end: "bottom",
        scrub: true
      }
    })

    // about items
    gsap.to(this.aboutDesktop.nativeElement, {
      xPercent: -5,
      duration: 1.25,
      scrollTrigger: {
        toggleClass: "is-play",
        trigger: this.aboutDesktop.nativeElement,
        start: "top center",
        end: "bottom",
      }
    })
    gsap.to(this.aboutMobile.nativeElement, {
      xPercent: -5,
      duration: 1.25,
      scrollTrigger: {
        toggleClass: "is-play",
        trigger: this.aboutMobile.nativeElement,
        start: "top 80%",
        end: "bottom",
      }
    })
    // service
    gsap.fromTo(this.serviceEl.nativeElement,
      {yPercent: 20},
      {
      yPercent: 0,
      duration: 1.7,
      scrollTrigger: {
        toggleClass: "is-play",
        trigger: this.serviceEl.nativeElement,
        start: "top 90%",
        end: "bottom",
      },
    })
    // service title
    gsap.fromTo(this.serviceTitleEl.nativeElement,
      {
        xPercent: -5,
        opacity: 0
      },
      {
      xPercent: 0,
      opacity: 1,
      duration: 1.25,
      scrollTrigger: {
        trigger: this.serviceTitleEl.nativeElement,
        start: "top center",
        end: "bottom",
        scrub: true
      },
    })
    // service desc desktop
    gsap.fromTo(this.serviceDescDesktopEl.nativeElement,
      {
        xPercent: 5,
        opacity: 0
      },
      {
      xPercent: 0,
      opacity: 1,
      duration: 1.25,
      scrollTrigger: {
        trigger: this.serviceDescDesktopEl.nativeElement,
        start: "top center",
        end: "bottom",
        scrub: true
      },
    })
    // service desc mobile
    gsap.fromTo(this.serviceDescMobileEl.nativeElement,
      {
        xPercent: 5,
        opacity: 0
      },
      {
      xPercent: 0,
      opacity: 1,
      duration: 1.25,
      scrollTrigger: {
        trigger: this.serviceDescMobileEl.nativeElement,
        start: "top center",
        end: "bottom",
      },
    })
    // support
    gsap.fromTo(this.supportEl.nativeElement,
      {
        xPercent: -5,
        opacity: 0
      },
      {
      xPercent: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: this.supportEl.nativeElement,
        toggleClass: "is-play",
        start: "top center",
        end: "bottom",
      },
    })
    // support tech
    gsap.fromTo(this.techEl.nativeElement,
      {
        xPercent: 5,
        opacity: 0
      },
      {
      xPercent: 0,
      opacity: 1,
      duration: 1.25,
      scrollTrigger: {
        trigger: this.techEl.nativeElement,
        start: "top center",
        end: "bottom",
      },
    })
    // contact
    gsap.fromTo(this.contactEl.nativeElement,
      {
        yPercent: 10,
        opacity: 0
      },
      {
      yPercent: 0,
      opacity: 1,
      duration: 1.25,
      scrollTrigger: {
        trigger: this.contactEl.nativeElement,
        start: "top center",
        end: "bottom",
        once: true,
      },
    })
  }

  randomNumber(maximum: number) {
    return Math.floor(Math.random() * maximum);
  }

  computeFlightAngle(initX: number, initY: number, destinationX: number, destinationY: number) {
    if (initX < destinationX) {
      // right
      var adjacent = initX - destinationX;

      if (initY < destinationY) {
        // down
        var opposite = initY - destinationY;

        var tan = adjacent/opposite;
        return 180 - Math.atan(tan) * (180/Math.PI);
      } else {
        // up
        var opposite = destinationY - initY;

        var tan = adjacent/opposite;
        return Math.atan(tan) * (180/Math.PI);
      }
    } else {
      // left
      var adjacent = destinationX - initX;

      if (initY < destinationY) {
        // down
        var opposite = initY - destinationY;

        var tan = adjacent/opposite;
        return 180 + Math.atan(tan) * (180/Math.PI);
      } else {
        // up
        var opposite = destinationY - initY;

        var tan = adjacent/opposite;
        return Math.atan(tan) * (180/Math.PI) * -1;
      }
    }
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generatePlane(plane: ElementRef, sec: number) {
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    const that = this;

    var initX 	= this.randomNumber(windowWidth);
    var initY  	= this.randomNumber(windowHeight);
    var destinationX 	= this.randomNumber(windowWidth);
    var destinationY	= this.randomNumber(windowHeight);
    var angle = this.computeFlightAngle(initX, initY, destinationX, destinationY);


    gsap.timeline()
    .to(plane, {opacity: 1, duration: -2})
    .fromTo(plane,
      {
        x: initX,
        y: initY,
        rotate: angle,
      },
      {
        x: destinationX,
        y: destinationY,
        duration: sec,
        ease: 'linear',
        onComplete: () => {
          const interval = setInterval(() => {
            that.generatePlane(plane, sec)
            window.clearInterval(interval)
          }, this.getRandomIntInclusive(0.5, 2) * 1000)
        }
      })
    .to(plane, {
      opacity: 0,
      duration: 0.5},
      "-=2.5"
    )
  }

  removeUnderline(name: string) {
    return name.split('_').join(' ')
  }

  openModal(title: string) {
    let modal = null;
    const index = this.serviceConfig.findIndex(item => item.title === title);
    if (index > -1) {
      modal = this.modal.open(ServiceComponent, {
        index,
        serviceConfigs: this.serviceConfig
      });
    }

    modal?.onSubmit.subscribe(item => {
      this.move('sec--contact')
    })
  }
  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened
  }
  closeMenu() {
    this.isMenuOpened = false
  }

  prevService() {
    let currentTechIndex = this.currentTechIndex;

    if (this.currentTechIndex === 0) {
      this.currentTechIndex = 6
      return
    }

    currentTechIndex -= 1
    this.currentTechIndex = currentTechIndex
  }

  nextService() {
    let currentTechIndex = this.currentTechIndex;

    if (this.currentTechIndex === 6) {
      this.currentTechIndex = 0
      return
    }

    currentTechIndex += 1;
    this.currentTechIndex = currentTechIndex
  }

  move(className: string){
    const el: HTMLElement = document.querySelector(`.${className}`) as HTMLElement
    if(el) {
      this.isMenuOpened = false
      if(window.innerWidth <= 992) {
        moveFromWindow(true, getOffsetInWindow(el).top )
        return;
      }
      moveFromWindow(true, getOffsetInWindow(el).top)
    }
  }

  moveTop(){
    moveWindowTop(0,true)
  }

  submit() {
    this.isSuccess = true;
    document.querySelectorAll('.form-content input, textarea').forEach((item: any)=> {
      item.value = ''
    })
    const successInfo: HTMLElement = document.querySelector('.contact-form') as HTMLElement
    if(successInfo) {
      if(window.innerWidth <= 992) {
        moveFromWindow(true, getOffsetInWindow(successInfo).top - 70 )
        return;
      }
      moveFromWindow(true, getOffsetInWindow(successInfo).top )

    }
    return ;
  }

}
