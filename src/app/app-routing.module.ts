import { AuthGuard } from './common/auth/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule),
    data: {
      title: 'Welcome',
      displayInMenu: false
    }
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
    canActivate: [AuthGuard],
    data: {
      title: 'Search',
      displayInMenu: true
    }
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./wishlist/wishlist.module').then(m => m.WishlistModule),
    canActivate: [AuthGuard],
    data: {
      title: 'Wishlist',
      displayInMenu: true
    }
  },
  {
    path: '**',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
