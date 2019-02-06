import { TestBed } from "@angular/core/testing";
import { HttpErrorResponse } from "@angular/common/http";
import { GlobalErrorHandler } from "./global-error-handler.service";

describe("GlobalErrorHandler Service", () => {
  let service: GlobalErrorHandler;
  let error;
  beforeEach(() => {
    service = new GlobalErrorHandler();
    error = new HttpErrorResponse({
      url: "Some url",
      error: { message: "error message details" },
      status: 404
    });
  });
  afterEach(() => {
    service = null;
    error = null;
  });
  
  it("should show output error message to console", () => {
    const errorSpy = spyOn(console, "error");
    let promise = new Promise((resolve, reject) => {
      resolve(()=>service.handleError(error));
    })
    promise.then(()=> {},()=>expect(errorSpy).toHaveBeenCalled());
  });
});
