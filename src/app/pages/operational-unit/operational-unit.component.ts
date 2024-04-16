import {  Component, ElementRef, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/api';
@Component({
  selector: 'app-operational-unit',
  templateUrl: './operational-unit.component.html',
  styleUrls: ['./operational-unit.component.scss']
})
export class OperationalUnitComponent {
  @ViewChild('overlayContainer') overlayContainer!: ElementRef;

  selectedNodes!: TreeNode[];
  selectedNode: TreeNode | null = null;

  data: TreeNode[] = [
    {
      expanded: true,
      type: 'person',
      styleClass: 'myClass',
      data: {
        image: 'https://media.licdn.com/dms/image/C5603AQHhnU4ekdFJqg/profile-displayphoto-shrink_800_800/0/1638809032175?e=2147483647&v=beta&t=XoSspaUkKz3sJU4h9ax1PMWbJR5ZCKRt1ks6xRCz3nk',
        name: 'Amy Elsner',
        title: 'CEO',
        email: 'amyelsner@gmail.com',
        tel: '25100417'
      },
      children: [
        {
          expanded: true,
          type: 'person',
          styleClass: 'myClass',
          data: {
            image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
            name: 'Anna Fali',
            title: 'CFO',
            dep: 'Finance ',
            email: 'annafeli@gmail.com',
            tel: '96000123'
          },
          children: [
            {
              expanded: true,
              type: 'person',
              styleClass: 'myClass',
              data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                name: 'Stephen ',
                title: 'Financial Analyst',
                dep: 'Finance ',
                email: 'stephen@gmail.com',
                tel: '51321654'
              },

            },
            {
              expanded: true,
              type: 'person',
              styleClass: 'myClass',
              data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/elwinsharvill.png',
                name: 'Amanda',
                title: 'Finance Manager',
                dep: 'Finance ',
                email: 'amandasharvil@gmail.com',
                tel: '96000123'
              },
              children: [
                {
                  expanded: true,
                  type: 'person',
                  styleClass: 'myClass',
                  data: {
                    image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                    name: 'Ivan ',
                    title: 'Budget Analyst',
                    dep: 'Finance ',
                    email: 'ivanshaw@gmail.com',
                    tel: '21006789'
                  }
                }
                ,
                {
                  expanded: true,
                  type: 'person',
                  styleClass: 'myClass',
                  data: {
                    image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png',
                    name: 'Christopher ',
                    title: 'Treasury Analyst',
                    dep: 'Finance ',
                    email: 'christopher@yahoo.fr',
                    tel: '50000123'
                  }
                }]


            },

          ]
        },
        {
          expanded: false,
          type: 'person',
          styleClass: 'myClass',
          data: {
            image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png',
            name: 'Emily Davis ',
            title: 'CHRO',
            dep: 'Human Ressources',
            email: 'emilydavis@yahoo.fr',
            tel: '21360581'

          },
          children: [
            {
              expanded: false,
              type: 'person',
              styleClass: 'myClass',
              data: {
                image: 'https://th.bing.com/th/id/OIP.V4R8pbjrT-HABV5cME_pxAHaGK?rs=1&pid=ImgDetMain',
                name: 'John ',
                title: 'RH Manager',
                dep: 'Human Ressources',
                email: 'John@gmail.com',
                tel: '98623657'

              }
            },
            {
              expanded: false,
              type: 'person',
              styleClass: 'myClass',
              data: {
                image: 'https://th.bing.com/th/id/OIP.zXMwBf1k8BCY25UWNDb9rQHaHa?rs=1&pid=ImgDetMain',
                name: 'Michael ',
                title: 'HR Analyst',
                dep: 'Human Ressources',
                email: 'Michael@gmail.com',
                tel: '24578596'


              }
            },
          ]
        },
        {
          expanded: false,
          type: 'person',
          styleClass: 'myClass',
          data: {
            image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png',
            name: 'Daniel Taylor',
            title: 'CTO',
            dep: 'Information Technology',
            email: 'danieltaylor@gmail.com',
            tel: '50147852'
          },
          children: [
            {
              expanded: true,
              type: 'person',
              styleClass: 'myClass',
              data: {
                image: 'https://www.ibconcepts.com/wp-content/uploads/2021/08/IBC-Colored-Circles_Joe.png',
                name: ' Shaw Joes',
                title: 'Network Engineer',
                dep: 'Information Technology',
                email: 'shaw@gmail.com',
                tel: '24147852'
              }

            },

            {
              expanded: false,
              type: 'person',
              styleClass: 'myClass',
              data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png',
                name: 'David ',
                title: 'UI/UX Designer',
                dep: 'Information Technology',
                email: 'david@gmail.com',
                tel: '24147852'



              }
            },
          ]

        },

      ]
    }
  ];

  constructor() {
    this.truncateNames(this.data);
  }

  truncateNames(nodes: TreeNode[]): void {
    const maxLength = 13;
    nodes.forEach(node => {
      if (node.data && node.data.name && node.data.name.length > maxLength) {
        node.data.name = node.data.name.substring(0, maxLength) + '...';
      }
      if (node.children) {
        this.truncateNames(node.children);
      }
    });
  }

  updateOverlayPosition(): void {
    // Mettre à jour la position de l'overlay
    const overlayElement = this.overlayContainer.nativeElement as HTMLElement;
    console.log(this.selectedNodePosition)
    overlayElement.style.left = this.selectedNodePosition.left + 'px';
    overlayElement.style.top = this.selectedNodePosition.top + 'px';
  }

  selectedNodePosition: { left: number, top: number } = { left: 0, top: 0 };

  // Declare these variables in your component
  showOverlayFlag: boolean = false;
  overlayPosition: { left: number, top: number } = { left: 0, top: 0 };

  showOverlay(event: MouseEvent, node: any) {
    this.selectedNode = node;
    this.showOverlayFlag = true;
    // Set the position of the overlay relative to the mouse position
    this.overlayPosition = { left: event.clientX, top: event.clientY };
  }

  hideOverlay() {
    this.showOverlayFlag = false;
  }

}
