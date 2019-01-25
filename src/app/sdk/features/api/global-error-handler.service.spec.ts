import { TestBed } from "@angular/core/testing";
import { HttpErrorResponse } from "@angular/common/http";
import { GlobalErrorHandler } from "./global-error-handler.service";

describe("GlobalErrorHandler Service", () => {
  let service: GlobalErrorHandler;
  beforeEach(() => {
    service = new GlobalErrorHandler();
  });
  afterEach(() => {
    service = null;
  });

  it("should catch HttpErrors and output to console", () => {
    let error = new HttpErrorResponse({
      url: "Some url",
      error: { message: "error message details" },
      status: 404
    });
    let errorLog = {
      status: error.status,
      message: error.message,
      details: error.error.message
    };
    service.handleError(error);
    console.error = jasmine.createSpy("error");
    expect(console.error).toHaveBeenCalled();
  });
});
