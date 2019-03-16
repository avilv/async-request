import { Observable } from 'rxjs';

/**
 * This pipe emits an AsyncRequest<TValue, TError> type 
 */
export const asAsyncRequest = <TValue, TError>() => (source: Observable<any>): Observable<AsyncRequest<TValue, TError>> => {
    return new Observable(observer => {
        observer.next(RequestLoading());
        return source.subscribe({
            next(val) {
                observer.next(RequestSuccess(val));
            },
            error(err) {
                observer.next(RequestError(err));
                observer.error(err);
            },
            complete() { observer.complete(); }
        });
    });
};

export type AsyncRequest<TValue, TError> = RequestLoading | RequestSuccess<TValue> | RequestError<TError>;

export interface RequestLoading {
    state: "loading";
}

export interface RequestSuccess<T> {
    state: "success";
    value: T;
}

export interface RequestError<T> {
    state: "error";
    value: T;
}
export const RequestLoading = (): RequestLoading => ({ state: "loading" });

export const RequestSuccess = <T>(value: T): RequestSuccess<T> => ({
    state: "success",
    value,
})

export const RequestError = <T>(value: T): RequestError<T> => ({
    state: "error",
    value,
})

