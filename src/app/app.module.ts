import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Logger } from 'angular2-logger/core';
import { LOG_LOGGER_PROVIDERS } from 'angular2-logger/core';

import { SignUp } from '../pages/user/signUp/sign-up.component';
import { EditCpf } from '../pages/user/edit/editCpf/edit-cpf.component'
import { EditGender } from '../pages/user/edit/editGender/edit-gender.component'
import { EditRg } from '../pages/user/edit/editRg/edit-rg.component'
import { EditAddress } from '../pages/user/edit/editAddress/edit-address.component'
import { EditAdditionalInformation } from '../pages/user/edit/editAdditionalInformation/edit-additional-information.component';
import { EditMain } from '../pages/user/edit/editMain/edit-main.component';

import { SignIn } from '../pages/user/signIn/sign-in.component';
import { UserHome } from '../pages/user/userHome/user-home.component';
import { UserTokenSession } from '../pages/user/signIn/user-token-session.service';
import { SettingsMain } from '../pages/user/accountSettings/settingsMain/settings-main.component';
import { DeleteUser } from '../pages/user/accountSettings/deleteUser/delete-user.component';
import { RegisterEnterprise } from '../pages/enterprise/registerEnterprise/register-enterprise.component';
import { EditEnterprise } from '../pages/enterprise/editEnterprise/edit-enterprise.component';
import { ListEnterprises } from '../pages/enterprise/listEnterprises/list-enterprises.component';

import { AddEmployees } from '../pages/enterprise/addEmployees/add-employees.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    SignUp,
    EditCpf,
    EditGender,
    EditRg,
    EditAddress,
    EditAdditionalInformation,
    EditMain,
    SignIn,
    UserHome,
    RegisterEnterprise,
    SettingsMain,
    DeleteUser,
    EditEnterprise,
    ListEnterprises,
    AddEmployees
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignUp,
    EditCpf,
    EditGender,
    EditRg,
    EditAddress,
    EditAdditionalInformation,
    EditMain,
    SignIn,
    UserHome,
    RegisterEnterprise,
    SettingsMain,
    DeleteUser,
    EditEnterprise,
    ListEnterprises,
    AddEmployees
  ],
  providers: [
    Logger,
    LOG_LOGGER_PROVIDERS,
    StatusBar,
    SplashScreen,
    UserTokenSession,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
