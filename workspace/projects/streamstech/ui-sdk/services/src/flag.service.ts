import { Injectable } from '@angular/core';
import { StateController } from './state';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class FlagService extends StateController<FlagState>{
    surveyFormId$ = this.select(state=>state.survey.formId);
    surveyFormDataViw$ = this.select(state=>state.survey.stateName).pipe(map(it=>it===SurveyStateName.formDataViw));
    surveyMapView$ = this.select(state=>state.survey.stateName).pipe(map(it=>it===SurveyStateName.mapView));
    constructor(){
        super({
            survey:{
                formId:'',
                stateName: SurveyStateName.formDataViw
            }
        });
    }
    setSurveyFormId(formId: string): void{
        this.emit({survey:{stateName:this.state.survey.stateName, formId}});
    }
    setSurveyStateName(stateName: SurveyStateName): void{
        this.emit({survey:{formId:this.state.survey.formId, stateName}});
    }
}
export enum SurveyStateName{formDataViw, mapView};
export type Survey={
    formId: string;
    stateName: SurveyStateName;
};
export interface FlagState{
    survey: Survey;
};
