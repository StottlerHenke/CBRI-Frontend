import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';

import { WindowRefService } from './window-ref.service';


@Injectable()
export class ConfigService {
    static MESSAGE_FOREVER_TIMEOUT = 28800000;

    environment = environment;
    _window: any;

    constructor(private injector: Injector,
                private windowRef: WindowRefService) {
                    this._window = windowRef.nativeWindow;
                }

    public setConfig(key: string, value: any): void {
        const fileConfig = this._window.config,
            envConfig = this.environment,
            appConfig = this.injector.get('config', null);

        if (fileConfig) {
            fileConfig[key] = value;
        }

        if (envConfig) {
            envConfig[key] = value;
        }

        if (appConfig) {
            appConfig[key] = value;
        }
    }

    public getConfig(key: string, defaultValue?: any): any {
        const fileConfig = this._window.config,
            envConfig = this.environment,
            appConfig = this.injector.get('config', null);

        let fileConfigValue,
            envConfigValue,
            appConfigValue;

        if (fileConfig) {
            fileConfigValue = fileConfig[key];
        }

        if (envConfig) {
            envConfigValue = envConfig[key];
        }

        if (appConfig) {
            appConfigValue = appConfig[key];
        }

        if (! fileConfigValue && ! appConfigValue && ! envConfigValue) {
            if (defaultValue !== undefined) {
                return defaultValue;
            }
            throw new Error(`This application must define a configuration object for key '${key}'`);
        }

        return fileConfigValue || envConfigValue || appConfigValue;
    }
}
