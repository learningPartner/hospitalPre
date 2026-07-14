import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GlobalConstant } from '../constant/GlobalConstant';
import { IVisitModel } from '../models/interfaces/IVisit.model';

@Service()
export class VisitService {
  http = inject(HttpClient);

  private visitApiUrl = environment.API_URL + GlobalConstant.API_METHODS.VISIT;

  createVisit(visitObj: IVisitModel): Observable<IVisitModel> {
    return this.http.post<IVisitModel>(this.visitApiUrl, visitObj);
  }

  getAllVisits(): Observable<IVisitModel[]> {
    return this.http.get<IVisitModel[]>(this.visitApiUrl);
  }

  updateVisit(visitId: number, visitObj: IVisitModel): Observable<IVisitModel> {
    return this.http.put<IVisitModel>(`${this.visitApiUrl}/${visitId}`, visitObj);
  }

  deleteVisit(visitId: number): Observable<void> {
    return this.http.delete<void>(`${this.visitApiUrl}/${visitId}`);
  }
}
