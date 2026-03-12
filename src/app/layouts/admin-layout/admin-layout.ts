import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { RouterModule, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { PermissionService } from '@/services/permission.service';
import { HasPermissionDirective } from '@/directives/hasPermission.directive';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    imports: [MenuModule, BadgeModule, RippleModule,RouterModule, HasPermissionDirective],
    templateUrl: './admin-layout.html',
    styleUrl: './admin-layout.scss',
})
export class AdminLayout implements OnInit {
    items: MenuItem[] | undefined;

    constructor (
        private router: Router,
        private messageService: MessageService,
        private permsSvc: PermissionService
    ){
        const jwtPerms = ['user:view', 'user:edit'];
        this.permsSvc.setPermissions(jwtPerms);
    }

    ngOnInit() {
        const allItems = [
            {
                label: 'Usuarios',
                icon: 'pi pi-users',
                routerLink: '/admin/users',
                permission: 'user:view'
            },
            {
                label: 'Grupos',
                icon: 'pi pi-folder',
                routerLink: '/admin/groups',
                permission: 'group:view'
            },
            {
                label: 'Perfil',
                icon: 'pi pi-user-edit',
                routerLink: '/admin/profile',
                permission: null  // SIEMPRE VISIBLE
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                permission: null,
                command: () => this.logout()
            }
        ];

        this.items = [
            {
                separator:true
            },
            {
                label: 'Administrador',
                items: allItems.filter(item => 
                    item.permission === null || 
                    this.permsSvc.hasAnyPermission(Array.isArray(item.permission) ? item.permission : [item.permission])
                )
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
