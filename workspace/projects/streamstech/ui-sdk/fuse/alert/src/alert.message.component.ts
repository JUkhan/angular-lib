import { Component, Inject, OnInit} from '@angular/core';
import { FuseAlertModule } from './alert.module'

import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'app-alert-message',
    standalone: true,
    imports: [FuseAlertModule],
    template: `
            <fuse-alert [type]="data.type">
                <span fuseAlertTitle>{{data.messageTitle}}</span>
                {{data.messageBody}}
            </fuse-alert>
  `
})
export class AlertMessageComponent implements OnInit {

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

    ngOnInit(): void {
    }

}