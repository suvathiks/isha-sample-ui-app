import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { FetchCountries } from './cdi.actions';
import { endpoints } from './../../sdk/config/api.config';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { handleError } from './../../services/api/api-utils.service';
import { CDIService } from './../../services/cdi/cdi.service';
import { sortBy } from 'lodash';

export class CDIStateModel {
    countries: any[];
    phoneCodes: any[];
    isFetchingCountries: boolean;
    countriesFetched: boolean;
}
export const defaultCDIState = {
    countries: [],
    phoneCodes: [],
    isFetchingCountries: false,
    countriesFetched: false
};

@State<CDIStateModel>({
    name: 'cdi',
    defaults: defaultCDIState
})
export class CDIState {
    @Selector()
    static phoneCodes(state: CDIStateModel) {
        return state.phoneCodes;
    }
    public constructor(private util: CDIService, private store: Store, private http: HttpClient) {}

    @Action(FetchCountries)
    fetchCountries({ getState, patchState }: StateContext<CDIStateModel>) {
        const state = getState();
        if (!state.countriesFetched) {
            this.util.listCountries().subscribe(res => {
                let phoneCodes = res.body.map(c => {
                    return {
                        iso3: c.iso3,
                        name: c.name,
                        phoneCode: sanitizePhoneCode(c.phoneCode),
                        option: c.iso3 + ' (+' + sanitizePhoneCode(c.phoneCode) + ')'
                    };
                });
                phoneCodes = sortBy(phoneCodes, 'iso3');
                phoneCodes = [{ iso3: null, name: null, phoneCode: null, option: 'Select' }].concat(phoneCodes);
                patchState({ countries: res.body, phoneCodes, countriesFetched: true });
            });
        }
    }
}

const sanitizePhoneCode = code => {
    if (code.includes(',')) {
        code = code.split(',')[0];
    }
    code = code.replace('-', '');
    return code;
};
