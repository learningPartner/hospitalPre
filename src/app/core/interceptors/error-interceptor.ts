import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      debugger;
      if(error.status ==401) {
        alert("Please Login Again / Unauthorized Request ")
      } else if (error.status == 400) {
        alert("Invalid Body - please check Paylod")
      }
      return throwError(() => error);
    }),
    tap((res: any) => {
      debugger;
    })
  );
};


//mocking
