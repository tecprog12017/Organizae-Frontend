import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SignUp } from '../pages/user/signUp/sign-up.component';
import { EditCpf } from '../pages/user/edit/editCpf/editCpf.component'
import { EditGender } from '../pages/user/edit/editGender/editGender.component'
import { EditRg } from '../pages/user/edit/editRg/editRg.component'
import { EditAddress } from '../pages/user/edit/editAddress/editAddress.component'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SignUp,
    EditCpf,
    EditGender,
    EditRg,
    EditAddress
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SignUp,
    EditCpf,
    EditGender,
    EditRg,
    EditAddress
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
