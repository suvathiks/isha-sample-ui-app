import { State, Action, StateContext, Selector } from "@ngxs/store";
import { map, catchError } from "rxjs/operators";
import { ConstantType, ConstantValue } from "./../../models/constant.model";
import { FetchConstants } from "./constants.actions";
import { ConstantsService } from "./../../services/api/constants.service";
import { HttpErrorResponse } from "@angular/common/http";
import { keyTextValue } from "./../../models/shared.model";

import _ from "lodash";

export class ConstantStateModel {
  constantTypes: ConstantType[];
  constantValues: ConstantValue[];
  constantTypeOptions: keyTextValue[];
  constantValueOptions: keyTextValue[];
  constantsLoaded: boolean;
  constantTypesLoaded: boolean;
  constantValuesLoaded: boolean;
  isFetchingConstantTypes: boolean;
  isFetchingConstantValues: boolean;
  isFetchingConstants: boolean;
}

@State<ConstantStateModel>({
  name: "constants",
  defaults: {
    constantTypes: [],
    constantValues: [],
    constantTypeOptions: [],
    constantValueOptions: [],
    constantsLoaded: false,
    constantTypesLoaded: false,
    constantValuesLoaded: false,
    isFetchingConstantTypes: false,
    isFetchingConstantValues: false,
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
    return state.constantValues;
  }

  @Action(FetchConstants)
  fetchConstants({
    getState,
    patchState,
    setState
  }: StateContext<ConstantStateModel>) {
    let state = getState();
    patchState({
      isFetchingConstantTypes: true,
      isFetchingConstantValues: true,
      isFetchingConstants: true
    });
    this.constantsService.fetchConstantTypes().subscribe((res: any) => {
      if (res) {
        state = getState();
        setState({
          ...state,
          constantTypes: res,
          constantTypeOptions: parseConstantTypes(res),
          constantTypesLoaded: true,
          constantsLoaded: state.constantValuesLoaded,
          isFetchingConstantTypes: false,
          isFetchingConstants: state.isFetchingConstantValues
        });
      } else {
        state = getState();
        setState({
          ...state,
          isFetchingConstantTypes: false,
          isFetchingConstants: state.isFetchingConstantValues,
          constantTypesLoaded: false,
          constantsLoaded: false
        });
      }
    });
    this.constantsService.fetchConstantValues().subscribe((res: any) => {
      if (res) {
        state = getState();
        setState({
          ...state,
          constantValues: res,
          constantValueOptions: parseConstantValues(res),
          constantValuesLoaded: true,
          constantsLoaded: state.constantTypesLoaded,
          isFetchingConstantValues: false,
          isFetchingConstants: state.isFetchingConstantTypes
        });
      } else {
        state = getState();
        setState({
          ...state,
          constantValuesLoaded: false,
          constantsLoaded: false,
          isFetchingConstantValues: false,
          isFetchingConstants: state.isFetchingConstantTypes
        });
      }
    });
  }
}

const parseConstantTypes = (data: ConstantType[]) => {
  const parsedConstantTypes: keyTextValue[] = data.map(d => {
    return {
      key: d.constantTypeCode,
      text: d.constantType,
      value: d.constantTypeCode
    };
  });
  return parsedConstantTypes;
};

const parseConstantValues = (data: ConstantValue[]) => {
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
