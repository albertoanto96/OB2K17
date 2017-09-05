import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'web-animations-js/web-animations.min';
import {enableProdMode} from '@angular/core';

import { AppModule } from './app.module';
enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
