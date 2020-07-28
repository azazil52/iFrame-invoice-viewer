import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../animations/index';
import { ApiConnectService } from './../api-connect.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-card-validation',
  templateUrl: './card-validation.component.html',
  styleUrls: ['./card-validation.component.css'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class CardValidationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceservice:ApiConnectService) { }

  ngOnInit() {
  }

}
