import { Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginService } from './core/login.service';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mobileQuery: MediaQueryList;
  spinnerFlag :boolean = false;
  @ViewChild("scrollered",{static:false}) scrollered:ElementRef;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private route:ActivatedRoute,
              public loginService:LoginService,public afAuth:AngularFireAuth, private authService:AuthService,
              private bd:AngularFireDatabase,private iconRegistry: MatIconRegistry,private sanitizer: DomSanitizer ) {
                this.assetsIcons();

  setTimeout(() => {
       this.spinnerFlag = true;
    }, 2000);
    this.mobileQuery = media.matchMedia('(max-width: 900px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  assetsIcons(){
    // this.iconRegistry.addSvgIcon('facebook', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/facebook.svg'));
    // this.iconRegistry.addSvgIcon('twitter', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/twitter.svg'));
    // this.iconRegistry.addSvgIcon('instagram', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/instagram.svg'));
    // this.iconRegistry.addSvgIcon('whatsapp', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/whatsapp.svg'));
  }

}
