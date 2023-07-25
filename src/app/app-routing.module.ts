import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';

const routes: Routes = [
  // Aquí es donde se hace el lazyload (usamos el loadChildren)
  {
    path: "auth",
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "dashboard",
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: "**",
    // guards,
    redirectTo: "auth"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
