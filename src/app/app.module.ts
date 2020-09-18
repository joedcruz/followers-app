import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { fakeBackendProvider } from './fake-backend';
import { AuthService } from './auth.service';
import { OrderService } from './order.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppErrorHandler } from './common/app-error-handler';

import { SummaryPipe } from './summary.pipe';

import { GithubFollowersService } from './github-followers.service';
import { PostService } from './services/post.service';
import { AuthorsService } from './authors.service';
import { CoursesService } from './courses.service';

import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses.component';
import { AuthorComponent } from './author/author.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { PanelComponent } from './panel/panel.component';
import { LikeComponent } from './like/like.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { NewCourseFormComponent } from './newcourseform/newcourseform.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PostsComponent } from './posts/posts.component';
import { GithubFollowersComponent } from './github-followers/github-followers.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ArchiveComponent } from './archive/archive.component';
import { ArchiveDetailComponent } from './archive-detail/archive-detail.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    CoursesComponent,
    CourseComponent,
    AuthorComponent,
    SummaryPipe,
    FavoriteComponent,
    PanelComponent,
    LikeComponent,
    ContactFormComponent,
    NewCourseFormComponent,
    ChangePasswordComponent,
    PostsComponent,
    GithubFollowersComponent,
    NavbarComponent,
    HomeComponent,
    GithubProfileComponent,
    NotFoundComponent,
    ArchiveComponent,
    ArchiveDetailComponent,
    AdminComponent,
    LoginComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'followers/:id/:username',
        component: GithubProfileComponent
      },
      {
        path: 'followers',
        component: GithubFollowersComponent
      },
      {
        path: 'posts',
        component: PostsComponent
      },
      {
        path: 'archive/:year/:month',
        component: ArchiveDetailComponent
      },
      {
        path: 'archive',
        component: ArchiveComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'no-access',
        component: NoAccessComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      },
    ])
    // FontAwesomeModule
  ],
  providers: [
    PostService,
    CoursesService,
    AuthorsService,
    OrderService,
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    GithubFollowersService,
    fakeBackendProvider,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
