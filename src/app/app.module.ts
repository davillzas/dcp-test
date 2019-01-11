import { EditAccountPage } from './../pages/edit-account/edit-account';
import { MaketingPage } from './../pages/maketing/maketing';
import { WithdrawDetailPage } from './../pages/withdraw-detail/withdraw-detail';

import { WithdrawPage } from './../pages/withdraw/withdraw';
import { TranferDetailPage } from './../pages/tranfer-detail/tranfer-detail';
import { WalletPage } from './../pages/wallet/wallet';
import { HistoryUserPage } from './../pages/history-user/history-user';
import { CheckLoginPage } from './../pages/check-login/check-login';
import { BankQrcodePage } from './../pages/bank-qrcode/bank-qrcode';
import { LinkAdvisorPage } from './../pages/link-advisor/link-advisor';
import { StreamingPage } from './../pages/streaming/streaming';
import { ScanQrcodePage } from './../pages/scan-qrcode/scan-qrcode';
import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilePath } from '@ionic-native/file-path';
import { Clipboard } from '@ionic-native/clipboard';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BrowserTab } from '@ionic-native/browser-tab';
//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
// import services
import {PlaceService} from '../services/place-service';
import {CollectionService} from '../services/collection-service';
import {ReviewService} from '../services/review-service';
import { UserService } from '../services/user-service';
// end import services

// import pages
import {AccountPage} from '../pages/account/account';
import {AddReviewPage} from '../pages/add-review/add-review';
import {BookmarksPage} from '../pages/bookmarks/bookmarks';
import {CollectionsPage} from '../pages/collections/collections';
import {FeedPage} from '../pages/feed/feed';
import {FiltersPage} from '../pages/filters/filters';
import {ForgotPasswordPage} from '../pages/forgot-password/forgot-password';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {MainTabsPage} from '../pages/main-tabs/main-tabs';
import {MapPage} from '../pages/map/map';
import {MenuPage} from '../pages/menu/menu';
import {NearbyPage} from '../pages/nearby/nearby';
import {PhotosPage} from '../pages/photos/photos';
import {PlaceDetailPage} from '../pages/place-detail/place-detail';
import {PlacesPage} from '../pages/places/places';
import {ReviewsPage} from '../pages/reviews/reviews';
import {SearchPage} from '../pages/search/search';
import {SelectLocationPage} from '../pages/select-location/select-location';
import {SignUpPage} from '../pages/sign-up/sign-up';
import {UserPage} from '../pages/user/user';
import { ApiProvider } from '../providers/api/api';
import { QrCodeDiscoutPage } from '../pages/qr-code-discout/qr-code-discout';
import { LocationHomePage } from '../pages/location-home/location-home';
import { CustomerPage } from './../pages/customer/customer';
import { CustomerDetailPage } from './../pages/customer-detail/customer-detail';
import { CustomerPicPage } from './../pages/customer-pic/customer-pic';
import { UserDiscountPage } from './../pages/user-discount/user-discount';
import { UserTotalDiscountPage } from './../pages/user-total-discount/user-total-discount';
import { UserPaymentPage } from './../pages/user-payment/user-payment';
import { UserCheckPaymentPage } from './../pages/user-check-payment/user-check-payment';
import { InsertAdvisorCodePage } from '../pages/insert-advisor-code/insert-advisor-code';
import { ApiCategoryProvider } from '../providers/api-category/api-category';
import { AppBankPage } from "./../pages/app-bank/app-bank";

import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { GetPhonePage } from '../pages/get-phone/get-phone';
import { DepositPage } from '../pages/deposit/deposit';
import { TranferPage } from './../pages/tranfer/tranfer';
import { ReceivePage } from '../pages/receive/receive';
import { WithdrawHistoryPage } from './../pages/withdraw-history/withdraw-history';
import { TopupH2hPage } from './../pages/topup-h2h/topup-h2h';
import { TopupH2hTypePage } from './../pages/topup-h2h-type/topup-h2h-type';
import { TopupMobilePage } from './../pages/topup-mobile/topup-mobile';
import { TopupMobileQrcodePage } from './../pages/topup-mobile-qrcode/topup-mobile-qrcode';
import { Apidcp } from '../providers/api/apidcp';


// end import pages

@NgModule({
  declarations: [
    MyApp,
    AccountPage,
    AddReviewPage,
    BookmarksPage,
    CollectionsPage,
    FeedPage,
    FiltersPage,
    ForgotPasswordPage,
    HomePage,
    LoginPage,
    MainTabsPage,
    MapPage,
    MenuPage,
    NearbyPage,
    PhotosPage,
    PlaceDetailPage,
    PlacesPage,
    ReviewsPage,
    SearchPage,
    SelectLocationPage,
    SignUpPage,
    UserPage,
    QrCodeDiscoutPage,
    LocationHomePage,
    CustomerPage,
    CustomerDetailPage,
    CustomerPicPage,
    UserDiscountPage,
    UserTotalDiscountPage,
    ScanQrcodePage,
    UserPaymentPage,
    UserCheckPaymentPage,
    StreamingPage,
    LinkAdvisorPage,
    BankQrcodePage,
    InsertAdvisorCodePage,
    CheckLoginPage,
    HistoryUserPage,
    WalletPage,
    DepositPage,
    TranferPage,
    ReceivePage,
    TranferDetailPage,
    WithdrawPage,
    WithdrawHistoryPage,
    WithdrawDetailPage,
    MaketingPage,
    EditAccountPage,
    TopupH2hPage,
    TopupH2hTypePage,
    TopupMobilePage,
    TopupMobileQrcodePage,
    AppBankPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxQRCodeModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp, {
      platforms: {
        android: {
          //tabsPlacement: 'top',
          //tabsLayout: 'title-hide'
        },
        windows: {
          tabsLayout: "title-hide"
        }
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountPage,
    AddReviewPage,
    BookmarksPage,
    CollectionsPage,
    FeedPage,
    FiltersPage,
    ForgotPasswordPage,
    HomePage,
    LoginPage,
    MainTabsPage,
    MapPage,
    MenuPage,
    NearbyPage,
    PhotosPage,
    PlaceDetailPage,
    PlacesPage,
    ReviewsPage,
    SearchPage,
    SelectLocationPage,
    SignUpPage,
    UserPage,
    QrCodeDiscoutPage,
    LocationHomePage,
    CustomerPage,
    CustomerDetailPage,
    CustomerPicPage,
    UserDiscountPage,
    UserTotalDiscountPage,
    ScanQrcodePage,
    UserPaymentPage,
    UserCheckPaymentPage,
    StreamingPage,
    LinkAdvisorPage,
    BankQrcodePage,
    InsertAdvisorCodePage,
    CheckLoginPage,
    HistoryUserPage,
    WalletPage,
    DepositPage,
    TranferPage,
    ReceivePage,
    TranferDetailPage,
    WithdrawPage,
    WithdrawHistoryPage,
    WithdrawDetailPage,
    MaketingPage,
    EditAccountPage,
    TopupH2hPage,
    TopupH2hTypePage,
    TopupMobilePage,
    TopupMobileQrcodePage,
    AppBankPage
  ],
  providers: [
    StatusBar,
    BrowserTab,
    SplashScreen,
    InAppBrowser,
    PlaceService,
    CollectionService,
    ReviewService,
    ApiProvider,
    Apidcp,
    UserService,
    Geolocation,
    BarcodeScanner,
    Camera,
    FileTransfer,
    FileTransferObject,
    File,
    FilePath,
    Transfer,
    ApiCategoryProvider,
    Clipboard,
    Device,
    Sim,
    PhotoViewer
    //Facebook
    /* import services */
  ]
})
export class AppModule {}
/*
 {
 platforms: {
 android: {
 tabbarLayout: 'title-hide'
 },
 windows: {
 tabbarLayout: 'title-hide'
 }
 }
 }
 */
