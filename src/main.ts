import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare let Office: any;
declare let app: any;
declare let $: any;

if (environment.production) {
  enableProdMode();
}

function launch() {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
}


if (window.hasOwnProperty('Office')
  //&& window.hasOwnProperty('Mailbox')
) {
  Office.initialize = reason => {
    $(document).ready(function () {
      app.initialize();
    });
    launch();
  }
}
else {
  launch();
}

