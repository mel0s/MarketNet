import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/client',         title: 'Client',             icon:'nc-diamond',    class: '' },
    { path: '/store',          title: 'Store',              icon:'nc-pin-3',      class: '' },
    { path: '/article', title: 'Article',     icon:'nc-bell-55',    class: '' },
    { path: '/store-article', title: 'Store Article',     icon:'nc-bell-55',    class: '' },
    { path: '/client-article', title: 'Client Article',     icon:'nc-bell-55',    class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
