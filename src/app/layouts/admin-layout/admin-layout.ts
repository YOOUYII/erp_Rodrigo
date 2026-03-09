import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { RouterModule, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    imports: [MenuModule, BadgeModule, RippleModule,RouterModule],
    templateUrl: './admin-layout.html',
    styleUrl: './admin-layout.scss',
})
export class AdminLayout implements OnInit {
    items: MenuItem[] | undefined;

    constructor (
        private router: Router,
        private messageService: MessageService,
    ){}

    ngOnInit() {
        this.items = [
            {
                separator:true
            },
            {
                label: 'Aministrador',
                items: [
                    {
                        label: 'Usuarios',
                        icon: 'pi pi-users',
                        routerLink: '/admin/users'
                    },
                    {
                        label: 'Grupos',
                        icon: 'pi pi-folder',
                        routerLink: '/admin/groups'
                    },
                    {
                        label: 'Perfil',
                        icon: 'pi pi-user-edit',
                        routerLink: '/admin/profile'
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        command: () => {
                            this.logout();
                        },
                    }
                ]
            },
            {
                separator: true
            }
        ];
    }

    logout() {
        this.router.navigate(['']).then(() => {
            this.messageService.add({ 
                key: 'loginAlerts',
                severity: 'info', 
                summary: '¡Adiós!', 
                detail: 'Sesión Cerrada Correctamente' 
            });
        })
        localStorage.removeItem('isLoggedIn');
    }
}
