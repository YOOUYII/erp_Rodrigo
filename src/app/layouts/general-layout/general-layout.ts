import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-general-layout',
    standalone: true,
    imports: [MenuModule, BadgeModule, RippleModule,RouterModule ],
    templateUrl: './general-layout.html',
    styleUrl: './general-layout.scss',
})
export class GeneralLayout implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                separator:true
            },
            {
                label: 'General',
                items: [
                    {
                        label: 'Iniciar Sesion',
                        icon: 'pi pi-user',
                        routerLink: '/login'
                    },
                    {
                        label: 'Grupos',
                        icon: 'pi pi-user-plus',
                        routerLink: '/register'
                    },
                ]
            },
            {
                separator: true
            }
        ];
    }
}
