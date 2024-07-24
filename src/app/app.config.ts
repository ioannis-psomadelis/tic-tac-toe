import { type ApplicationConfig, isDevMode } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideStore } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideRouterStore } from '@ngrx/router-store'
import { boardReducer } from './+state/board.reducer'

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideStore({ board: boardReducer }),
        provideEffects(),
        provideRouterStore(),
        provideStoreDevtools({
            maxAge: 25, // Retains last 25 states
            logOnly: !isDevMode(),
            autoPause: true,
            trace: false,
            traceLimit: 75,
            connectInZone: true,
        }),
    ],
}
