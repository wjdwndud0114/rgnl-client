import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LandingComponent } from './_pages/landing/landing.component';
import { LoginComponent } from './_common/login/login.component';
import { RegisterComponent } from './_common/register/register.component';
import { ProfileComponent } from './_common/profile/profile.component';
import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import { AdminDashboardComponent } from './_pages/admin-dashboard/admin-dashboard.component';
import { ErrorInterceptor, JwtInterceptor } from './_helpers';
import { SingleCardViewComponent } from './_pages/single-card-view/single-card-view.component';
import { SideContentComponent } from './_pages/dashboard/side-content/side-content.component';
import { PostsComponent } from './_common/posts/posts.component';
import { PostComponent } from './_common/posts/post/post.component';
import { GovsComponent } from './_common/govs/govs.component';
import { GovComponent } from './_common/govs/gov/gov.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DashboardComponent,
    AdminDashboardComponent,
    SingleCardViewComponent,
    SideContentComponent,
    PostsComponent,
    PostComponent,
    GovsComponent,
    GovComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
