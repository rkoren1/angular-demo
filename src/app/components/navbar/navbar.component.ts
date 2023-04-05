import {
  Component,
  OnInit,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  location: Location;
  mobile_menu_visible: any = 0;
  isSignedIn = false;
  username: string = null;
  private listTitles: any[];
  private toggleButton: any;
  private sidebarVisible: boolean;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    gapi.load('client:auth2', () => {
      gapi.auth2.init({
        client_id:
          '379646810701-pd2bq1jpqrcjtq8gvqker5htaugaa8ub.apps.googleusercontent.com',
      });
    });
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      const $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
  }

  alreadySigned() {
    if (this.isSignedIn) {
      return;
    }
    this.authenticate().then(this.loadClient);
  }

  authenticate() {
    return gapi.auth2
      .getAuthInstance()
      .signIn({
        scope: '',
      })
      .then((res: any) => {
        this.username = res.tv.yf;
        this.cd.detectChanges();
        this.isSignedIn = true;
      })
      .catch((err) => {
        this.isSignedIn = false;
        console.error('Error signing in', err);
      });
  }

  loadClient() {
    gapi.client.setApiKey('AIzaSyB7xtRv85QdFium7U2-aoYLqUhzHS_xpaM');
    return gapi.client
      .load(
        'https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        'auth2'
      )
      .then(
        function () {
          //console.log('GAPI client loaded for API');
        },
        function (err) {
          console.error('Error loading GAPI client for API', err);
        }
      );
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    body.classList.add('nav-open');

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    const $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName('body')[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      body.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');

      if (body.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (body.classList.contains('off-canvas-sidebar')) {
        document
          .getElementsByClassName('wrapper-full-page')[0]
          .appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function () {
        //asign a function
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      body.classList.add('nav-open');
      this.mobile_menu_visible = 1;
    }
  }
  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    const splitTitle = titlee.split('/');
    if (!isNaN(+splitTitle[2])) {
      if (splitTitle[1].includes('-')) {
        splitTitle[1] = splitTitle[1].replace('-', ' ');
      }
      return this.capitalizeFirstLetter(splitTitle[1]);
    }

    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
}
