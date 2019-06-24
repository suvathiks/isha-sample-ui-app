import { Component, OnInit, Input, forwardRef, Injector, TemplateRef, ViewChild } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";

@Component({
    selector: 'form-field',
    templateUrl: './form-fields.component.html',
    styleUrls: [ './form-fields.component.scss' ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FormFieldComponent),
        multi: true
    }]

})
export class FormFieldComponent implements OnInit, ControlValueAccessor {

    @Input () formControlName;
    @Input () fieldParam;
    @Input () fWidth;
    @Input () fType;
    @Input () fOptions;
    ngControl: NgControl;
    @ViewChild('input') input:TemplateRef<any>;
    @ViewChild('inputDate') inputDate:TemplateRef<any>;
    @ViewChild('select') select:TemplateRef<any>;

    // @ViewChild('two') two:TemplateRef<any>;

    /**
     * Holds the current value of the slider
     */
    value: any = 0;
    validateStatus: object = {};
    
    /**
     * Invoked when the model has been changed
     */
    onChange: (_: any) => void = (_: any) => {};

    /**
     * Invoked when the model has been touched
     */
    onTouched: () => void = () => {};

    constructor(private inj: Injector) {}

    ngOnInit() {
        this.ngControl = this.inj.get(NgControl)
        this.validate(this.value);
    }

    public validate(value: string):any {
      let valid: any;
      this.fieldParam[1].forEach(validator => {
        this.validateStatus = validator(value, this.fieldParam[2]);
      })
    }
    // if(this.fieldParam.validators)
    // const index = this.fieldParam.validators.indexOf("required");
    /**
     * Method that is invoked on an update of a model.
     */
    updateChanges() {
        this.onChange(this.value);
        this.validate(this.value);
    }

    ///////////////
    // OVERRIDES //
    ///////////////

    /**
     * Writes a new item to the element.
     * @param value the value
     */
    writeValue(value: number): void {
        this.value = value;
        this.updateChanges();
    }

    /**
     * Registers a callback function that should be called when the control's value changes in the UI.
     * @param fn
     */
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    /**
     * Registers a callback function that should be called when the control receives a blur event.
     * @param fn
     */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    markTouched() {
        if(this.ngControl.control)
            this.ngControl.control.markAsTouched();
    }

}