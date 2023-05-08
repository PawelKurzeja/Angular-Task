import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppComponent } from './app/app.component';
import { DbDataService } from './app/core/services/db-data.service';
import { storeEffects } from './app/core/store/store.effects';
import { storeReducer } from './app/core/store/store.reducer';
import routeConfig from './app/routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routeConfig),
    HttpClientModule,
    provideHttpClient(),
    provideAnimations(),
    provideStore(storeReducer),
    provideEffects(storeEffects),
    provideStoreDevtools(),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(DbDataService, { delay: 500, put204: false })),
  ],
}).catch((err) => console.error(err));
