import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';


import { FlashMessagesService } from 'ngx-flash-messages';
import { LocalStorageService } from 'angular-2-local-storage';

import { ConfigService } from './config.service';
import { WindowRefService } from './window-ref.service';
import { MessageService } from '../message/message.service';
import { Pagination } from '../pagination.type';


interface ApiGetServiceOptions {
    apiHostKey?: string;
    apiVersionKey?: string;
    headers?: any;
    asBlob?: boolean;
    withCredentials?: boolean;
    usePut?: boolean;
    withPagination?: boolean;
}

@Injectable()
export class ApiGetService {
    _window: any;
    _token: any;

    get token(): any {
        this._token = this._token || this.localStorageService.get('token');
        return this._token;
    }

    set token(token: any) {
      this._token = token;
    }

    setRequestOptions(options: ApiGetServiceOptions = {}) {
      let requestOptions = {
          headers: new HttpHeaders(options.headers)
      };

      if (options.withCredentials) {
          requestOptions['withCredentials'] = true;
      }

      if (this.token) {
          requestOptions.headers =
            requestOptions.headers.set('Authorization', `JWT ${this.token}`);
      }
      return requestOptions;
    }

    constructor(private http: HttpClient,
                private configService: ConfigService,
                private windowRef: WindowRefService,
                private messageService: MessageService,
                private localStorageService: LocalStorageService) {
                    this._window = windowRef.nativeWindow;
                }

    getUrl(url: string, options: ApiGetServiceOptions = {}): Promise<any> {
        const request = url;

        let requestOptions = this.setRequestOptions(options);

        if (options.asBlob) {
            requestOptions['responseType'] = 'blob';
        }

        return this.http.get(request, requestOptions).toPromise();
    }

    getPlain(apiPath: string, options: ApiGetServiceOptions = {}): Promise<any> {
        const defaultOptions = this.configService.getConfig(
            'apiGetServiceOptions', {});

        options = Object.assign({}, defaultOptions, options);

        const apiHost = this.configService.getConfig(
                options.apiHostKey || 'apiHost'),
            apiVersion = this.configService.getConfig(
                options.apiVersionKey || 'apiVersion', '');

        let requestPath = [apiHost, 'api', apiPath];
        if (apiVersion) {
          requestPath.splice(2, 0, apiVersion);
        }
        const requestUrl = requestPath.join('/');

        return this.getUrl(requestUrl, options);
    }

    get<T>(apiPath: string, options: ApiGetServiceOptions = {}): Promise<T> {
        return this.getPlain(apiPath, options)
            .then((response: any) => {
                const jsonResponse = response;
                if (jsonResponse.error) {
                    if ([401, 403].indexOf(jsonResponse.error.status_code) !== -1) {
                        // Redirect, log error to user, etc
                    }
                }
                if (jsonResponse.results && ! options.withPagination) {
                    const paginatedResponse: Pagination = jsonResponse;
                    return paginatedResponse.results as T;
                } else {
                    return jsonResponse as T;
                }
            })
            .catch((error: any) => {
                if ([401, 403].indexOf(error.status) !== -1) {
                    // Redirect, log error to user, etc
                }
                return Promise.reject(error);
            });
    }

    post<T>(apiPath: string, body: any, options: ApiGetServiceOptions = {}): Promise<T> {
        const defaultOptions = this.configService.getConfig(
            'apiGetServiceOptions', {});

        options = Object.assign({}, defaultOptions, options);

        const apiHost = this.configService.getConfig(
                options.apiHostKey || 'apiHost'),
            apiVersion = this.configService.getConfig(
                options.apiVersionKey || 'apiVersion', '');

        let requestPath = [apiHost, 'api', apiPath];
        if (apiVersion) {
          requestPath.splice(2, 0, apiVersion);
        }
        const requestUrl = requestPath.join('/');

        let requestOptions = this.setRequestOptions(options);

        let httpFn = this.http.post;

        if (options.usePut) {
            httpFn = this.http.put;
        }

        return httpFn.call(this.http, requestUrl, body, requestOptions)
            .toPromise()
            .then(response => {
              try {
                return response.json() as T
              } catch {
                return response as T
              }
            })
            .catch(function(error: any) {
                return Promise.reject(error);
            });
    }

    delete<T>(apiPath: string, options: ApiGetServiceOptions = {}): Promise<T> {
        const defaultOptions = this.configService.getConfig(
            'apiGetServiceOptions', {});

        options = Object.assign({}, defaultOptions, options);

        const apiHost = this.configService.getConfig(
                options.apiHostKey || 'apiHost'),
            apiVersion = this.configService.getConfig(
                options.apiVersionKey || 'apiVersion', '');

        let requestPath = [apiHost, 'api', apiPath];
        if (apiVersion) {
          requestPath.splice(2, 0, apiVersion);
        }
        const requestUrl = requestPath.join('/');

        let requestOptions = this.setRequestOptions(options);

        const httpFn = this.http.delete;

        return httpFn.call(this.http, requestUrl, requestOptions)
            .toPromise()
            .then(response => response.json() as T)
            .catch(function(error: any) {
                return Promise.reject(error);
            });
    }

    put<T>(apiPath: string, body: any, options: ApiGetServiceOptions = {}): Promise<T> {
        const defaultOptions = this.configService.getConfig(
            'apiGetServiceOptions', {});

        options = Object.assign({}, defaultOptions, options);

        const apiHost = this.configService.getConfig(
                options.apiHostKey || 'apiHost'),
            apiVersion = this.configService.getConfig(
                options.apiVersionKey || 'apiVersion', '');

        let requestPath = [apiHost, 'api', apiPath];
        if (apiVersion) {
          requestPath.splice(2, 0, apiVersion);
        }
        const requestUrl = requestPath.join('/');

        let requestOptions = this.setRequestOptions(options);

        const httpFn = this.http.put;

        return httpFn.call(this.http, requestUrl, body, requestOptions)
            .toPromise()
            .then(response => response.json() as T)
            .catch(function(error: any) {
                return Promise.reject(error);
            });
    }

    patch<T>(apiPath: string, body: any, options: ApiGetServiceOptions = {}): Promise<T> {
        const defaultOptions = this.configService.getConfig(
            'apiGetServiceOptions', {});

        options = Object.assign({}, defaultOptions, options);

        const apiHost = this.configService.getConfig(
                options.apiHostKey || 'apiHost'),
            apiVersion = this.configService.getConfig(
                options.apiVersionKey || 'apiVersion', '');

        let requestPath = [apiHost, 'api', apiPath];
        if (apiVersion) {
          requestPath.splice(2, 0, apiVersion);
        }
        const requestUrl = requestPath.join('/');

        let requestOptions = this.setRequestOptions(options);

        const httpFn = this.http.patch;

        return httpFn.call(this.http, requestUrl, body, requestOptions)
            .toPromise()
            .then(response => response.json() as T)
            .catch(function(error: any) {
                return Promise.reject(error);
            });
    }

}
