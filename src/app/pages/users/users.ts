import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Dialog, DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { FileUploadModule } from 'primeng/fileupload';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '@/services/user.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { User } from '@/models/user';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-users',
    imports: [
        ButtonModule, 
        ConfirmDialogModule, 
        DialogModule, 
        SelectModule, 
        FileUploadModule, 
        IconFieldModule, 
        InputIconModule, 
        InputNumberModule, 
        RadioButtonModule, 
        TableModule, 
        TagModule, 
        ToastModule, 
        ToolbarModule,
        InputTextModule, 
        FormsModule,
        CommonModule,
        MultiSelectModule
    ],
    providers: [UserService, MessageService, ConfirmationService],
    templateUrl: './users.html',
    styleUrl: './users.scss',
})
export class Users implements OnInit {
    private userService = inject(UserService);
    private messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);
    userDialog: boolean = false;
    users!: User[];
    user!: User;
    selectedUsers!: User[] | null;
    submitted: boolean = false;
    statuses!: any[];
    cols!: Column[];
    exportColumns!: ExportColumn[];
    possiblePermissions!: any[];

    ngOnInit() {
        this.userService.getUsers().then((data) => {
            this.users = data;
            this.users = data.map(user => ({
                ...user,
                permissionTags: this.getPermissionTags(user.permissions ?? [])
            }));
        });
        this.statuses = [
            { label: 'Activo',   value: 1 },
            { label: 'Inactivo', value: 0},
        ];
        this.cols = [ // SIRVE MAS QUE NADA PARA LA EXPORTACION PORQUE 
            { field: 'id', header: 'Id', customExportHeader: 'Id Usuario' },
            { field: 'name', header: 'Nombre' },
            { field: 'email', header: 'Image' },
            { field: 'groups', header: 'Grupos' },
            { field: 'permissions', header: 'Permisos' },
            { field: 'status', header: 'Estado'}
        ];
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));

        this.possiblePermissions = [
            {label: 'Usuario: Ver',      value:'user:view'},
            {label: 'Usuario: Editar',   value:'user:edit'},
            {label: 'Usuario: Crear',    value:'user:add'},
            {label: 'Usuario: Eliminar', value:'user:delete'},
            {label: 'Grupo: Ver',        value:'group:view'},
            {label: 'Grupo: Editar',     value:'group:edit'},
            {label: 'Grupo: Crear',      value:'group:add'},
            {label: 'Grupo: Eliminar',   value:'group:delete'},
            {label: 'Ticket: Ver',       value:'ticket:view'},
            {label: 'Ticket: Editar',    value:'ticket:edit'},
            {label: 'Ticket: Crear',     value:'ticket:add'},
            {label: 'Ticket: Eliminar',  value:'ticket:delete'},
        ];
    }

    openNew() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    editUser(product: User) {
        this.user = { ...product };
        this.userDialog = true;
    }

    deleteSelectedUsers() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'No',
                severity: 'secondary',
                variant: 'text'
            },
            acceptButtonProps: {
                severity: 'danger',
                label: 'Yes'
            },
            accept: () => {
                this.users = this.users.filter((val) => !this.selectedUsers?.includes(val));
                this.selectedUsers = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Products Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    deleteUser(product: User) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'No',
                severity: 'secondary',
                variant: 'text'
            },
            acceptButtonProps: {
                severity: 'danger',
                label: 'Yes'
            },
            accept: () => {
                this.users = this.users.filter((val) => val.id !== product.id);
                this.user = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Deleted',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === id) {
                index = i;
                break;
            }
        }
        
        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getStatusTags(status: number): { severity: 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast', label: string } {
        switch (status) {
            case 1:
            return {
                severity: 'success',
                label: 'Activo'
            };
            case 0:
                return {
                    severity: 'danger',
                    label: 'Inactivo' 
                };
            default:
                return {
                    severity: 'info',
                    label: 'Indefinido'
                };
        }
    }

    getPermissionTags(permissions: string[]): { severity: 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast', label: string }[] {
        return permissions.map(permission => {
            const found = this.possiblePermissions.find(p => p.value === permission);
            
            if (permission.includes('view'))   return { severity: 'info', label: found?.label ?? permission };
            if (permission.includes('edit'))   return { severity: 'warn', label: found?.label ?? permission };
            if (permission.includes('add'))    return { severity: 'success', label: found?.label ?? permission };
            if (permission.includes('delete')) return { severity: 'danger', label: found?.label ?? permission };
            
            return { severity: 'secondary', label: found?.label ?? permission };
        });
    }

    saveUser() {
        this.submitted = true;
        
        if (this.user.name?.trim()) {
            if (this.user.id) {
                this.users[this.findIndexById(this.user.id)] = this.user;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exito',
                    detail: 'Usuario Actualizado',
                    life: 3000
                });
            } else {
                this.user.id = this.createId();
                this.users.push(this.user);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exito',
                    detail: 'Usuario Creado',
                    life: 3000
                });
            }
        
            this.users = [...this.users];
            this.userDialog = false;
            this.user = {};
        }
    }

    exportCSV(dt: any){
        dt.exportCSV();
    }
}
