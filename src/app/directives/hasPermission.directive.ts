import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '@/services/permission.service';

@Directive({
    selector: '[ifHasPermission]',
    standalone: true
})
export class HasPermissionDirective implements OnInit {
    @Input('ifHasPermission') permissions: string | string[] = '';

    constructor(
        private permissionService: PermissionService,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ){}

    ngOnInit() {
        const permissionsArray = Array.isArray(this.permissions) ? this.permissions : [this.permissions];

        if(this.permissionService.hasAnyPermission(permissionsArray)){
            this.viewContainer.createEmbeddedView(this.templateRef)
        }
    }
}