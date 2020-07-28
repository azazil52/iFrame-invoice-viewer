import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../animations/index';
import { ApiConnectService } from './../api-connect.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-monthly-validation',
  templateUrl: './monthly-validation.component.html',
  styleUrls: ['./monthly-validation.component.css'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class MonthlyValidationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceservice:ApiConnectService) { }

  ngOnInit() {
  }

}
