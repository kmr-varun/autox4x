import { createAction } from '@reduxjs/toolkit';
import { Condition, Actions, WorkflowState } from '../types/workflowTypes'; 

// Action creators for workflow details
export const setWorkflowDetails = createAction<Partial<WorkflowState>>('workflow/setWorkflowDetails');

// Action creators for conditions
export const setConditions = createAction<Condition[]>('workflow/setConditions');
export const addCondition = createAction<Condition>('workflow/addCondition');
export const updateConditionField = createAction<{ index: number; field: Partial<Condition> }>('workflow/updateConditionField');

// Action creators for actions
export const setActions = createAction<Actions[]>('workflow/setActions');
export const addAction = createAction<Actions>('workflow/addAction');
export const updateActionField = createAction<{ index: number; field: Partial<Actions> }>('workflow/updateActionField');
