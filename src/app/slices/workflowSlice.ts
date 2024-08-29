import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkflowState, Condition, Actions, Trigger, Entity } from '../types/workflowTypes'; // Adjust the path as necessary

const initialState: WorkflowState = {
  id: '',
  name: '',
  desc: '',
  type: '',
  string: '',
  trigger: {
    id: '',
    name: '',
    type: ''
  },
  entity: {
    id: '',
    name: ''
  },
  conditions: [],
  actions: [],
  userData: {
    orgId: 'moreyeahs',
    userId: 'varunkumar'
  }
};

// Create the slice
const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    // Reducer to update workflow details
    setWorkflowDetails(state, action: PayloadAction<Partial<WorkflowState>>) {
      return {
        ...state,
        ...action.payload
      };
    },
    // Reducer to set conditions
    setConditions(state, action: PayloadAction<Condition[]>) {
      state.conditions = action.payload;
    },
    // Reducer to set actions
    setActions(state, action: PayloadAction<Actions[]>) {
      state.actions = action.payload;
    },
    // Reducer to update a specific field in a condition
    updateConditionField(state, action: PayloadAction<{ index: number; field: Partial<Condition> }>) {
      const { index, field } = action.payload;
      if (state.conditions[index]) {
        state.conditions[index] = { ...state.conditions[index], ...field };
      }
    },
    // Reducer to update a specific field in an action
    updateActionField(state, action: PayloadAction<{ index: number; field: Partial<Actions> }>) {
      const { index, field } = action.payload;
      if (state.actions[index]) {
        state.actions[index] = { ...state.actions[index], ...field };
      }
    },
    // Reducer to add a new condition
    addCondition(state, action: PayloadAction<Condition>) {
      state.conditions.push(action.payload);
    },
    // Reducer to add a new action
    addAction(state, action: PayloadAction<Actions>) {
      state.actions.push(action.payload);
    },
    // Reducer to remove a condition by index
    removeCondition(state, action: PayloadAction<number>) {
      state.conditions.splice(action.payload, 1);
    },
    // Reducer to remove an action by index
    removeAction(state, action: PayloadAction<number>) {
      state.actions.splice(action.payload, 1);
    },
    // Reducer to clear all conditions
    clearConditions(state) {
      state.conditions = [];
    },
    // Reducer to clear all actions
    clearActions(state) {
      state.actions = [];
    },
    // Reducer to partially update the trigger
    setTrigger(state, action: PayloadAction<Partial<Trigger>>) {
      state.trigger = {
        ...state.trigger,
        ...action.payload
      };
    },
    // Reducer to set the entity
    setEntity(state, action: PayloadAction<Entity>) {
      state.entity = action.payload;
    },
    // Reducer to clear the entire workflow state
    clearWorkflowState(state) {
      return initialState;
    }
  }
});

// Export actions
export const {
  setWorkflowDetails,
  setConditions,
  setActions,
  updateConditionField,
  updateActionField,
  addCondition,
  addAction,
  removeCondition,
  removeAction,
  clearConditions,
  clearActions,
  setTrigger,
  setEntity,
  clearWorkflowState
} = workflowSlice.actions;

// Export reducer
export default workflowSlice.reducer;
