import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MedicinesMaster } from './pages/medicines-master/medicines-master';
import { MedicineService } from './core/services/medicine-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hospitalPre');
   

 
}
