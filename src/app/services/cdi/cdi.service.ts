import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { createRequestOption, handleError } from './../../services/api/api-utils.service';
import { catchError, retry, map } from 'rxjs/operators';

const CDI_ENDPOINTS = {
    listCountries: `http://192.168.99.126:8981/ContactInfoValidation/api/country-metas`,
    validateEmail: `http://192.168.99.126:2030/api/validation/email`,
    validatePhone: `http://192.168.99.126:2030/api/validation/phone`
};

@Injectable({ providedIn: 'root' })
export class CDIService {
    private listCountriesURL = CDI_ENDPOINTS.listCountries;
    private validateEmailURL = CDI_ENDPOINTS.validateEmail;
    private validatePhoneURL = CDI_ENDPOINTS.validatePhone;
    constructor(private http: HttpClient) {}

    listCountries(): Observable<any> {
        return this.http.get(this.listCountriesURL, { observe: 'response' }).pipe(catchError(handleError));
    }
    validateEmail(email): Observable<any> {
        const emailIds = [{ emailId: email }];
        return this.http.post(this.validateEmailURL, { emailIds }, { observe: 'response' }).pipe(catchError(handleError));
    }
    validatePhone(phone): Observable<any> {
        const phoneNumbers = [{ number: phone }];
        return this.http.post(this.validatePhoneURL, { phoneNumbers }, { observe: 'response' }).pipe(catchError(handleError));
    }
}
