import { AbstractControl } from "@angular/forms";

export function ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== undefined && (isNaN(control.value) || control.value < 18 || control.value > 45)) {
        return { 'ageRange': true };
    }
    return null;
  }
export function dateRangeValidator(control): { [key: string]: boolean } | null {

	let formGrp = control.parent;
	if( (formGrp && formGrp.controls.startDate.value != ''&& formGrp.controls.endDate.value != '') )
	{
		if( formGrp.controls.startDate.value > formGrp.controls.endDate.value)
		{
			return {'dateRange': true};
		}
		else if(formGrp.controls.startDate.value <= formGrp.controls.endDate.value){
			formGrp.controls['startDate'].setErrors(null);
		}
	}

	return null;
}

export function required(value, fieldTitle){

	let result = value != null && value != '';
	if(result === false){
		return {
			validation:'required',
			status: false,
			msg: prepValidationMsg(fieldTitle)
		}
	}
	else{
		return {
			validation:'required',
			status: true
		}
	}
}
export const minLength3 = value => value == null || value.length > 3
export const maxLength9 = value => value == null || value.length < 9

export function prepValidationMsg(ctlName){
	let msg = " $PH$ is required.";
	return msg.replace("$PH$", ctlName);
}