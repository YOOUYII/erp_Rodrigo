import { Injectable } from '@angular/core';
    
@Injectable()
export class UserService {
    getUsersData() {
        return [
            {
                id: '1000',
                name: 'Raymundo Rodriguez',
                email: 'raymundo@uteq.edu.mx',
                groups: ['Grupo A','Grupo B','Grupo C'],
                permissions: ['user:view','user:edit','user:add'],
                status: 1,
            },
            {
                id: '1001',
                name: 'Armando Jaime',
                email: 'armando@uteq.edu.mx',
                groups: ['Grupo A','Grupo B'],
                permissions: ['user:view','user:edit','user:add'],
                status: 1,
            },
            {
                id: '1002',
                name: 'Rodrigo Vázquez',
                email: 'rodrigo@uteq.edu.mx',
                groups: ['Grupo B','Grupo C'],
                permissions: ['user:view','user:edit','user:add'],
                status: 1,
            },
            {
                id: '1003',
                name: 'Diego Garcia',
                email: 'diego@uteq.edu.mx',
                groups: ['Grupo C'],
                permissions: ['user:view','user:edit','user:add'],
                status: 1,
            },
        ];
    }

    getUsersMini() {
        return Promise.resolve(this.getUsersData().slice(0, 5));
    }

    getUsersSmall() {
        return Promise.resolve(this.getUsersData().slice(0, 10));
    }

    getUsers() {
        return Promise.resolve(this.getUsersData());
    }
};