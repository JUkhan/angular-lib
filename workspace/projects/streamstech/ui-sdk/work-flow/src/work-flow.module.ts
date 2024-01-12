import { NgModule } from '@angular/core';
import { SequentialWorkflowDesignerModule } from 'sequential-workflow-designer-angular';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { WorkFlowComponent } from './work-flow.component';

@NgModule({
    declarations: [
        WorkFlowComponent
    ],
    imports     : [
        CommonModule,
        SequentialWorkflowDesignerModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports     : [
        WorkFlowComponent
    ]
})
export class WorkFlowModule
{
    
}
