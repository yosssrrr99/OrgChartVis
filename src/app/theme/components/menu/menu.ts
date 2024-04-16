import { Menu } from './menu.model';

export const horizontalMenuItems = [ 
    new Menu (1, 'NAV.HOME', '/', null, null, false, 0),
    new Menu (2, 'Document', '/menu', null, null, false, 0), 
    new Menu (10, 'NAV.PAGES', null, null, null, true, 0),  
    new Menu (63, 'Org Chart', '/org', null, null, false, 10),  
    new Menu (64, '404 Page', '/404', null, null, false, 10),  
    new Menu (70, ' Recruitment Budget', '/contact', null, null, false, 0),  
    new Menu (80, 'NAV.ABOUT_US', '/about', null, null, false, 0)
       
]

export const verticalMenuItems = [ 
    new Menu (1, 'NAV.HOME', '/', null, null, false, 0),
    new Menu (2, 'Document', '/menu', null, null, false, 0), 
    new Menu (10, 'NAV.PAGES', null, null, null, true, 0),  
    new Menu (63, 'Org Chart', '/org', null, null, false, 10),  
    new Menu (64, '404 Page', '/404', null, null, false, 10),  
    new Menu (70, ' Recruitment Budget', '/contact', null, null, false, 0),  
    new Menu (80, 'NAV.ABOUT_US', '/about', null, null, false, 0)
]