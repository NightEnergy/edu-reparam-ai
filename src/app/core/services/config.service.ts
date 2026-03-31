// src/app/core/services/config.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  get apiUrl(): string {
    return environment.apiUrl;
  }

  get keycloakConfig() {
    return environment.keycloak;
  }

  get isProduction(): boolean {
    return environment.production;
  }
}
