import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import {
	Definition,
	Designer,
	RootEditorContext,
	Properties,
	Uid,
	Step,
	StepEditorContext,
	StepsConfiguration,
	ToolboxConfiguration,
	ValidatorConfiguration
} from 'sequential-workflow-designer';


@Component({
  selector: 'stl-work-flow',
  templateUrl: './work-flow.component.html',
  styleUrls: ['./work-flow.component.scss']
})
export class WorkFlowComponent {
  private designer?: Designer;
	@Output() onWorkFlowReady = new EventEmitter<WorkFlowComponent>();
	public definition: Definition = createDefinition();
	public definitionJSON?: string;
	public selectedStepId: string | null = null;
	public isReadonly = false;
	public isToolboxCollapsed = false;
	public isEditorCollapsed = false;
	public isValid?: boolean;

	public readonly toolboxConfiguration: ToolboxConfiguration = {
		groups: [
      {
        name: 'Steps',
        steps: [createStep('Step'), createIfStep('If'), createLoopStep('loop')]
      }
    ]
	};
	public readonly stepsConfiguration: StepsConfiguration = {
    
    iconUrlProvider: (componentType: string) => {
      return componentType === 'switch' ? './assets/icon-if.svg' :componentType === 'container'?'./assets/icon-loop.svg': './assets/icon-task.svg';
    }
		
	};
	public readonly validatorConfiguration: ValidatorConfiguration = {
		//step: (step: Step) => !!step.name && Number(step.properties['velocity']) >= 0,
		//root: (definition: Definition) => Number(definition.properties['velocity']) >= 0
	};

	public ngOnInit() {
		this.updateDefinitionJSON();
		this.onWorkFlowReady.emit(this);
	}

	public onDesignerReady(designer: Designer) {
		this.designer = designer;
		this.updateIsValid();
		//console.log('designer ready', this.designer);
	}

	public onDefinitionChanged(definition: Definition) {
		this.definition = definition;
		this.updateIsValid();
		this.updateDefinitionJSON();
		//console.log('definition has changed');
	}

	public onSelectedStepIdChanged(stepId: string | null) {
		this.selectedStepId = stepId;
	}

	public onIsToolboxCollapsedChanged(isCollapsed: boolean) {
		this.isToolboxCollapsed = isCollapsed;
	}

	public onIsEditorCollapsedChanged(isCollapsed: boolean) {
		this.isEditorCollapsed = isCollapsed;
	}

	public updateName(step: Step, event: Event, context: StepEditorContext) {
		step.name = (event.target as HTMLInputElement).value;
		context.notifyNameChanged();
	}

	public updateProperty(properties: Properties, name: string, event: Event, context: RootEditorContext | StepEditorContext) {
		properties[name] = (event.target as HTMLInputElement).value;
		context.notifyPropertiesChanged();
	}

	public reloadDefinitionClicked() {
		this.definition = createDefinition();
		this.updateDefinitionJSON();
   
	}

	public toggleReadonlyClicked() {
		this.isReadonly = !this.isReadonly;
	}

	public toggleSelectedStepClicked() {
		if (this.selectedStepId) {
			this.selectedStepId = null;
		} else if (this.definition.sequence.length > 0) {
			this.selectedStepId = this.definition.sequence[0].id;
		}
	}

	public toggleToolboxClicked() {
		this.isToolboxCollapsed = !this.isToolboxCollapsed;
	}

	public toggleEditorClicked() {
		this.isEditorCollapsed = !this.isEditorCollapsed;
	}

	private updateDefinitionJSON() {
		this.definitionJSON = JSON.stringify(this.definition, null, 2);
	}

	private updateIsValid() {
		this.isValid = this.designer?.isValid();
	}
}

function createDefinition(): Definition {
	return {
		properties: {
			description: 'What about this work-flow?'
		},
		sequence: [
			createStep('Do Something')
		],
	};
}

function randomCondition() {
	const a = Math.random() > 0.5 ? 'alfa' : 'beta';
	const b = Math.random() > 0.5 ? '>' : '<';
	const c = Math.round(Math.random() * 100);
	return `${a} ${b} ${c}`;
}

function createLoopStep(name: string, steps?:Step[], properties={}) {
	return {
		id: Uid.next(),
		componentType: 'container',
		type: 'loop',
		name,
    sequence: steps || [],
		properties
	};
}
function createStep(name: string,  properties={}) {
	return {
		id: Uid.next(),
		componentType: 'task',
		type: 'step',
		name,
		properties
	};
}

function createIfStep(name: string, trueSteps?: Step[], falseSteps?: Step[], properties={}) {
	return {
		id: Uid.next(),
		componentType: 'switch',
		type: 'if',
		name,
		properties,
		branches: {
			true: trueSteps || [],
			false: falseSteps || []
		}
	};
}

function createParallelStep(name: string, children?: any[]) {
	return {
		id: Uid.next(),
		componentType: 'switch',
		type: 'parallel',
		name,
		properties: {
			conditions: {
				'Condition A': randomCondition(),
				'Condition B': randomCondition(),
				'Condition C': randomCondition()
			}
		},
		branches: {
			'Condition A': children ? [children[0]] : [],
			'Condition B': children ? [children[1]] : [],
			'Condition C': children ? [children[2]] : []
		}
	};
}

