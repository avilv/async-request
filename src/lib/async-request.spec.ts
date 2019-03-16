import { Observable, interval, of, throwError } from "rxjs";
import { asAsyncRequest, RequestSuccess, RequestError } from "./async-request";

it('Should return loading -> success -> { data : 1234 }', (done) => {
    let callCount = 0;
    const obs$ = of({ data: 1234 }).pipe(asAsyncRequest<string, Error>());
    const subscription = obs$.subscribe(response => {
        if (callCount == 0)
            expect(response.state).toBe("loading");
        if (callCount == 1) {
            expect(response.state).toBe("success");
            expect((<RequestSuccess<any>>response).value).toEqual({ data : 1234 });
            done();
        }
        if (callCount >= 2) {
            fail("call count >= 2");
        }
        callCount++;
    });
});

it('Should return loading -> error -> { message : "test error" }', (done) => {
    let callCount = 0;
    const obs$ = throwError({ message : "test error" }).pipe(asAsyncRequest<string, Error>());
    const subscription = obs$.subscribe(response => {
        if (callCount == 0)
            expect(response.state).toBe("loading");
        if (callCount == 1) {
            expect(response.state).toBe("error");
            expect((<RequestError<any>>response).value).toEqual({ message : "test error" });
            done();
        }
        if (callCount >= 2) {
            fail("call count >= 2");
        }
        callCount++;
    });
});