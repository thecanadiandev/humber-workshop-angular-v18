import { Observable, catchError, debounceTime, retry, throwError, timer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const DEFAULT_DEBOUNCE_TIME = 300;
export const MAX_RETRIES = 3;
export const RETRY_DELAY = 1000;

export function handleError(error: HttpErrorResponse) {
  let errorMessage = 'An error occurred';
  
  if (error.error instanceof ErrorEvent) {
    // Client-side error
    errorMessage = error.error.message;
  } else {
    // Server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  
  return throwError(() => errorMessage);
}

export function withRetry(maxRetries = MAX_RETRIES, delayMs = RETRY_DELAY) {
  return <T>(source: Observable<T>) =>
    source.pipe(
      retry({
        count: maxRetries,
        delay: (error, retryCount) => {
          console.log(`Retry attempt: ${retryCount}`);
          return timer(delayMs * retryCount);
        }
      }),
      catchError(handleError)
    );
}

export function withDebounce(time = DEFAULT_DEBOUNCE_TIME) {
  return <T>(source: Observable<T>) => source.pipe(debounceTime(time));
} 