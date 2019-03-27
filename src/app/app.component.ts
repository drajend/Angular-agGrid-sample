import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  @ViewChild('agGrid') agGrid: AgGridNg2;

  constructor( private http:HttpClient){}

  columnDefs = [
    { headerName:'Make', field:'make', sortable:true, filter:true, checkboxSelection: true },
    { headerName:'Model', field:'model', sortable:true, filter:true },
    { headerName:'Price', field:'price', sortable:true, filter:true }
  ];

  rowData: any;

  ngOnInit(){
    this.rowData = this.http.get('https://api.myjson.com/bins/ly7d1');

    console.log(this.rowData);
  }

  getInstanceData(){
    const selectedNode = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNode.map(node => node.data);
    const selectedDataStringPresentaion = selectedData.map( node => node.make + ' ' + node.model).join(', ');

    alert(`Selected nodes: ${selectedDataStringPresentaion}`);
  }

}
