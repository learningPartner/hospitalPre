import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { environment } from '../../../environments/environment';

@Service()
export class MedicineService {


    http = inject(HttpClient);
    
    constructor() {

    }

    getAllMedicine() {
        return this.http.get(environment.API_URL + "medicines")
    }

    createMedicine() {
        
    }
}
