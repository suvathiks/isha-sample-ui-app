import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { ConstantValue } from "./../models/constant.model";
import { keyTextValue } from "../models/shared.model";
import { optionRenderer } from "./../shared/functions/parsing.functions";
import _ from "lodash";

@Injectable({
  providedIn: "root"
})
export class ConstantParsingService {
  parseConstant(
    constantValues: ConstantValue[],
    constantTypeCode: string,
    constantCode: string
  ): string {
    const constantValueOptions = this.getConstantValues(
      constantValues,
      constantTypeCode
    );
    return optionRenderer(constantValueOptions, constantCode);
  }
  getConstantValues = (
    options: ConstantValue[],
    code: string
  ): keyTextValue[] => {
    let constantValues = options.filter(o => {
      return o.constantTypeCode === code && o.active;
    });
    let constantValueOptions = constantValues.map(c => {
      const constantValueOption = {
        key: c.constantCode,
        text: c.constant,
        value: c.constantCode
      };
      return constantValueOption;
    });
    // Sorting contacts by the name...
    let sortedArray = _.sortBy(constantValueOptions, "text");
    return sortedArray;
  };

  constructor() {}
}
