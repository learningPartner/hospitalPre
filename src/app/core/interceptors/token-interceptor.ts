import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { GlobalConstant } from '../constant/GlobalConstant';
import { catchError, tap, throwError } from 'rxjs';


//15 => service ,Guards

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;
  const token = localStorage.getItem(GlobalConstant.TOKEN_KEY);

  if (req.url.includes("login")) {
    return next(req);
  } else {
    const newRequest = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    })
    return next(newRequest)
  }
}

