import { enableAkitaProdMode } from '@datorama/akita';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import { registerAppStores } from './app/app.store';

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

registerAppStores();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
