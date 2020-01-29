import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  Courses = [
    {"name":"Excel" , "route":"excel"},
    {"name":"VBA" ,"route":"VBA"},
    {"name":"SQL" ,"route":"sql"},
    {"name":"Tally ERP9","route":"tally"}
  ];
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

}
