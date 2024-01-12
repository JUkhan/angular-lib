import { Component, Input } from '@angular/core';
import { ConstantService } from '@streamstech/ui-sdk/constants';
import { FuseConfirmationService } from '@streamstech/ui-sdk/fuse/services';
import { Action, dispatch } from '@streamstech/ui-sdk/services';

@Component({
    selector: 'grid-actions',
    styles: [`
        .mat-icon {
            font-size: 20px;
            cursor: pointer;
            padding: 2px 5px;
            margin-right: 3px;
            height: 30px;
            width: 30px;
        }
        .mat-icon:hover{
            background-color: #ffffff;
            border-radius: 50%;
        }
    `],
    template: `
    <mat-icon *ngIf="params?.hasEditPermission" (click)="editRowData()" matTooltip="edit">edit</mat-icon>
    <mat-icon *ngIf="params?.hasDeletePermission" (click)="deleteRowData()" matTooltip="delete">delete</mat-icon>
    <ng-container *ngIf="!suppressCustomButtons">
        <ng-container  *ngFor="let btn of params?.customButtons">
            <mat-icon  (click)="customActionHandler(btn)" [matTooltip]="btn.tooltip">{{btn.icon}}</mat-icon>
        </ng-container>
    </ng-container>
    <ng-container *ngIf="params.buttonTemplate" [ngTemplateOutlet]="params.buttonTemplate" [ngTemplateOutletContext]="{data:params.data}"></ng-container>
  `,
})
export class ActionComponent {
    @Input() suppressCustomButtons=false;
    public params?: any;
    constructor(
        private _fuseConfirmationService: FuseConfirmationService,
        private constant: ConstantService
        ){}
    agInit(params: any): void {
        this.params = params;
    }
    customActionHandler(btnInfo: {actionName: string}): void{
        dispatch(new CustomAction(btnInfo.actionName, this.params?.data));
        console.log(btnInfo.actionName, this.params?.data);
    }
    editRowData(): void {
        if (this.params?.crudEdit) {
            this.params?.crudEdit(this.params?.data);
        }
    }
    deleteRowData(): void {
        if (this.params?.crudDelete) {
            this._fuseConfirmationService.open({
                title: ConstantService.Message.DELETE_SUCCESSFUL_TITLE,
                message: ConstantService.Message.DELETE_SUCCESSFUL_MESSAGE,
                // message: `Are you sure you want to delete this ${this.row.model}?`,
                icon: {
                    show: true,
                    name: 'heroicons_outline:exclamation',
                    color: 'warn',
                },
                actions: {
                    confirm: {
                        show: true,
                        label: 'Yes',
                        color: 'warn',
                    },
                    cancel: {
                        show: true,
                        label: 'No',
                    },
                },
                dismissible: true,
            }).afterClosed().subscribe((result) =>{
                if (result === 'confirmed'){
                     this.params?.crudDelete(this.params?.data);
                }
            });
        }
    }
}

export class EditAction<T extends object> implements Action{
    constructor(public type: any, public data: T){}
}
export class DeleteAction<T extends object> implements Action{
    constructor(public type: any, public data: T){}
}
export class CustomAction<T extends object> implements Action{
    constructor(public type: any, public data: T){}
}
