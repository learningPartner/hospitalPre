import { Service } from '@angular/core';
import { Subject } from 'rxjs';

@Service()
export class MasterService {

 omSearchChnages$: Subject<string> = new Subject<string>();

}
