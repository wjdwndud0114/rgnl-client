import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { LandingComponent } from './_pages/landing/landing.component';
import { SingleCardViewComponent } from './_pages/single-card-view/single-card-view.component';
import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import { AdminDashboardComponent } from './_pages/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'login',
    component: SingleCardViewComponent,
    data: { card: 'login' }
  },
  {
    path: 'register',
    component: SingleCardViewComponent,
    data: { card: 'register' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { roles: ['producer', 'consumer', 'admin'] },
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    data: { roles: ['admin'] },
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
