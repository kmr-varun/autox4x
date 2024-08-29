export interface Condition {
    columnId: string;
    columnName: string;
    columnType: string;
    fromValue: string;
    toValue: string;
    operator: string;
    operatorString: string;
    multi: boolean;
    conditionType: string;
  }
  
  export interface ActionData {
    name: string;
    type: string;
    value: any[];
  }
  
  export interface Actions {
    id: string;
    name: string;
    operation: string;
    setup: boolean;
    data: any;
  }

  export interface TriggerData {
    event?: string;
    time: string;
    period: number;
    frequency: string;
    date?: string;
  }

  export interface Trigger {
    id: string;
    name: string;
    type: string;
    data?: TriggerData;
  }

  export interface Entity {
    id: string;
    name: string;
  }

  export interface UserData {
    orgId: string;
    userId: string;
  }
  
  export interface WorkflowState {
    id: string;
    name: string;
    desc: string;
    type: string;
    string: string;
    trigger: Trigger;
    entity: Entity;
    conditions: Condition[];
    actions: Actions[];
    userData: UserData;
  }
  