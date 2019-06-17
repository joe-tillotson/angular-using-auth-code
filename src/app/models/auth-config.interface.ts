export interface AuthConfigurationInterface {
    apiBaseUrl: string;
    callbackPath: string;
    oAuth2Config: {
        clientId: string;
        clientDomain: string;
        audience: string;
    };
}
