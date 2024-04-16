import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';


@Component({
  selector: 'app-unity',
  templateUrl: './unity.component.html',
  styleUrls: ['./unity.component.scss']
})
export class UnityComponent {
  selectedNodes!: TreeNode[];
  selectedNode: TreeNode | null = null;
  searchEmployee: any;
  currentPage = 1;
  pageSize = 3; 

  data: TreeNode[] = [
    
      {
        "expanded": true,
        "type": "person",
        "styleClass": "myClass",
        "data": {
          "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png",
          "name": "Anna Fali",
          "title": "CFO",
          "dep": "Finance",
          "email": "annafeli@gmail.com",
          "tel": "96000123"
        }
      },
      {
        "expanded": true,
        "type": "person",
        "styleClass": "myClass",
        "data": {
          "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png",
          "name": "Stephen",
          "title": "Financial Analyst",
          "dep": "Finance",
          "email": "stephen@gmail.com",
          "tel": "51321654"
        }
      },
      {
        "expanded": true,
        "type": "person",
        "styleClass": "myClass",
        "data": {
          "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/elwinsharvill.png",
          "name": "Amanda",
          "title": "Finance Manager",
          "dep": "Finance",
          "email": "amandasharvil@gmail.com",
          "tel": "96000123"
        }
      },
      {
        "expanded": true,
        "type": "person",
        "styleClass": "myClass",
        "data": {
          "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png",
          "name": "Ivan",
          "title": "Budget Analyst",
          "dep": "Finance",
          "email": "ivanshaw@gmail.com",
          "tel": "21006789"
        }
      },
      {
        "expanded": true,
        "type": "person",
        "styleClass": "myClass",
        "data": {
          "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png",
          "name": "Christopher",
          "title": "Treasury Analyst",
          "dep": "Finance",
          "email": "christopher@yahoo.fr",
          "tel": "50000123"
        }
      }


  ]

  get currentPageData(): TreeNode[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.data.length);
    const data_page = this.data.slice(startIndex, endIndex)
    console.log(data_page);
    return data_page;
  }

  totalPages(): number[] {
    const total = Math.ceil(this.data.length / this.pageSize);
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  setPage(page: number) {
    this.currentPage = page;
  }



  isMatch(node: TreeNode, searchTerm: string): boolean {
    if (!searchTerm) {
      return true; // If no search term, show all nodes
    }

    // Check if any data in the node matches the search term
    return JSON.stringify(node.data).toLowerCase().includes(searchTerm.toLowerCase());
  }
}
