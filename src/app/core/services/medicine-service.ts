import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GlobalConstant } from '../constant/GlobalConstant';

@Service()
export class MedicineService {


    http = inject(HttpClient);
    
    constructor() {

    }

    getAllMedicine() {
        return this.http.get(environment.API_URL + "medicines")
    }

    getSearchMedicine(text: string) {
        return this.http.get(environment.API_URL + GlobalConstant.API_METHODS.MEDICINE_SEARCH + text)
    }

    createMedicine() {
        
    }
}
