import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PermissionService {
    private permissions = signal<string[]> ([]);

    setPermissions(permissions: string[]) {
        this.permissions.set(permissions);
    }

    hasPermission(permission: string): boolean {
        return this.permissions().includes(permission);
    }

    hasAnyPermission(permissions: string[]): boolean {
        return permissions.some(p => this.hasPermission(p));
    }
}