import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {

  data = [
    {
      "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png",
      "name": "Anna Fali",
      "title": "CFO",
      "email": "annafeli@gmail.com",
      "tel": "96000123"
    },
    {
      "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png",
      "name": "Stephen",
      "title": "Financial Analyst",
      "email": "stephen@gmail.com",
      "tel": "51321654"
    },
    {
      "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/elwinsharvill.png",
      "name": "Amanda",
      "title": "Finance Manager",
      "email": "amandasharvil@gmail.com",
      "tel": "96000123"
    },
    {
      "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png",
      "name": "Ivan",
      "title": "Budget Analyst",
      "email": "ivanshaw@gmail.com",
      "tel": "21006789"
    },
    {
      "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png",
      "name": "Christopher",
      "title": "Treasury Analyst",
      "email": "christopher@yahoo.fr",
      "tel": "50000123"
    }
  ];




  dataVacant= [
    {
      "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png",
      "name": "Anna Fali",
      "title": "CFO",
      "email": "annafeli@gmail.com",
      "tel": "96000123"
    },
    {
      "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png",
      "name": "Stephen",
      "title": "Financial Analyst",
      "email": "stephen@gmail.com",
      "tel": "51321654"
    },
    {
      "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/elwinsharvill.png",
      "name": "Amanda",
      "title": "Finance Manager",
      "email": "amandasharvil@gmail.com",
      "tel": "96000123"
    },
    {
      "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png",
      "name": "Ivan",
      "title": "Budget Analyst",
      "email": "ivanshaw@gmail.com",
      "tel": "21006789"
    },
    {
      "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png",
      "name": "Christopher",
      "title": "Treasury Analyst",
      "email": "christopher@yahoo.fr",
      "tel": "50000123"
    }
  ];



  onDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data, 
        event.previousIndex, 
        event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
   
     
    }
  }
  
 

  
}