import { InjectionToken } from '@angular/core';
import { AuthConfigurationInterface } from './auth-config.interface';

export class AuthConfiguration implements AuthConfigurationInterface {
  [key: string]: any;
  private readonly _authConfig: AuthConfigurationInterface;

  constructor(overrides: Partial<AuthConfigurationInterface>) {
    this._authConfig = Object.assign({
      callbackPath: '/callback'
    }, overrides ) as AuthConfigurationInterface;

    const requiredOAuth2Values = [ 'audience', 'clientId', 'clientDomain' ];
    if ( !this._authConfig.apiBaseUrl ) {
      throw new Error( 'AuthConfiguration: an API base URL must be provided.' );
    } else if ( !this._authConfig.oAuth2Config ||
      !requiredOAuth2Values.every( ( key ) => this._authConfig.oAuth2Config.hasOwnProperty(key) ) ) {
        throw new Error( `AuthConfiguration: values for oAuth2: ${requiredOAuth2Values.join( ';' )} must be provided.` );
      // the above line is missing a check for the "this._authConfig.oAuth2Config[key]"
      // actually having a value.  It causes a TypeScript compilation error I haven't
      // been able to resolve yet.
    }
  }

  get apiBaseUrl(): string {
    return this._authConfig.apiBaseUrl;
  }

  get callbackPath(): string {
    return this._authConfig.callbackPath;
  }

  get oAuth2Config(): { clientId: string, clientDomain: string, audience: string } {
    return this._authConfig.oAuth2Config;
  }
}

export const AUTH_CONFIG: InjectionToken<AuthConfigurationInterface> = new InjectionToken<AuthConfiguration>('AUTH_CONFIG');
