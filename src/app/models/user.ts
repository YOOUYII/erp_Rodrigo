export interface User {
    id?: string;
    name?: string;
    email?: string;
    groups?: string[];
    status?: number;
    permissions?: string[];
    permissionTags?: { severity: 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast', label: string }[];
}