import { Menu } from './menu.model';


  // Définition des menus pour les autres rôles
  export const horizontalMenuItems = [
    new Menu(1, 'NAV.HOME', '/', null, null, false, 0),
    new Menu(2, 'Document', '/menu', null, null, false, 0),
    new Menu(3, 'Org Chart', '/org', null, null, false, 0),
    new Menu(86, 'Recruitment Budget', null, null, null, true, 0),
    new Menu(63, 'Add Envelope', '/unity', null, null, false, 86),
    new Menu(63, 'Update Envelope', '/update', null, null, false, 86),
    new Menu(63, 'Envelope History', '/history', null, null, false, 86),
    new Menu(64, '404 Page', '/404', null, null, false, 10),
    new Menu(80, 'NAV.ABOUT_US', '/about', null, null, false, 0)
  ];

export const verticalMenuItems = [ 
  new Menu (1, 'NAV.HOME', '/', null, null, false, 0),
  new Menu (2, 'Document', '/menu', null, null, false, 0), 
  new Menu (3, ' Org Chart', '/org', null, null, false, 0), 
  new Menu (6, 'Affectation Par U0','/affectation',null, null, false, 0),  
  new Menu (86, 'Simulation budgétaire', null, null, null, true, 0),    
  new Menu (63, 'de recrutement', '/validate', null, null, false, 86),  
  new Menu (63, 'de rémuneration', '/remuneration', null, null, false, 86),  
  //new Menu (63, 'Envelope History', '/history', null, null, false, 86),  
  new Menu (64, '404 Page', '/404', null, null, false, 10),  
  new Menu (80, 'NAV.ABOUT_US', '/about', null, null, false, 0)
]