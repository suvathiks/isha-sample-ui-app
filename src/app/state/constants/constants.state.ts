import { State, Action, StateContext, Selector } from "@ngxs/store";
import { map, catchError } from "rxjs/operators";
import { Constant } from "./../../models/constant.model";
import { FetchConstants } from "./constants.actions";
import { ConstantsService } from "./../../services/api/constants.service";
import { HttpErrorResponse } from "@angular/common/http";
import { keyTextValue } from "./../../models/shared.model";

import _ from "lodash";

export class ConstantStateModel {
  constants: Constant[];
  constantsLoaded: boolean;
  isFetchingConstants: boolean;
}

@State<ConstantStateModel>({
  name: "constants",
  defaults: {
    constants: [],
    constantsLoaded: false,
    isFetchingConstants: false
  }
})
export class ConstantState {
  constructor(private constantsService: ConstantsService) {}
  @Selector()
  static constantsLoaded(state: ConstantStateModel) {
    return state.constantsLoaded;
  }
  @Selector()
  static isFetchingConstants(state: ConstantStateModel) {
    return state.isFetchingConstants;
  }
  @Selector()
  static constantValues(state: ConstantStateModel) {
    return state.constants;
  }

  @Action(FetchConstants)
  fetchConstants({
    getState,
    patchState,
    setState
  }: StateContext<ConstantStateModel>) {
    let state = getState();
    patchState({
      isFetchingConstants: true
    });
    this.constantsService.fetchConstants().subscribe((res: any) => {
      if (res) {
        state = getState();
        setState({
          ...state,
          constants: res,
          constantsLoaded: true
        });
      } else {
        state = getState();
        setState({
          ...state,
          isFetchingConstants: false,
          constantsLoaded: false
        });
      }
    });
  }
}

const parseConstantValues = (data: Constant[]) => {
  const parsedConstantValues: keyTextValue[] = data.map(d => {
    return {
      key: d.constantCode,
      text: d.constant,
      value: d.constantCode,
      constantType: d.constantTypeCode
    };
  });
  return parsedConstantValues;
};
