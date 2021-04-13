import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './common/auth/auth.module';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    LayoutModule,
    AppRoutingModule,
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  providers: [
    {
      provide: NG_ENTITY_SERVICE_CONFIG,
      useValue: { baseUrl: environment.api.books.baseUrl }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
