import React, { useEffect, useState } from 'react';
import AutomationSettingPanel from './AutomationSettingPanel';
import TriggerSettings from './TriggerSettings';
import { InputData, Pipeline, Workflow } from '@/app/types/inputType';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import * as data from '../../data.json';

import Footer from './Footer';
import { pipelineData } from '@/apiService';
import Email from './Email';
import ActionSettings from './ActionSettings';

export const workflowData: InputData = data;
const workflows: Workflow = workflowData.workflow;

const handleSelect = (option: string) => {
  console.log('Selected:', option);
};

const AutomationPage: React.FC = () => {

  const pipelines:Pipeline[]  = pipelineData;

  const setupTrigger = useSelector((state: RootState) => state.setup.setupTrigger);
  const setupCondition = useSelector((state: RootState) => state.setup.setupCondition);
  const selectActions = useSelector((state: RootState) => state.workflow.actions);


  return (
    <div className='w-screen h-screen bg-black text-white'>
      <div className='h-[92%] flex flex-row p-4 gap-4'>
        <div className='basis-1/4 bg-[#0B0B0C] rounded-[12px] border-solid border-[1px] border-[#242428] flex flex-col p-8'>
          <AutomationSettingPanel
            workflowData={workflows}
            pipelineData={pipelines || []} 
            handleSelect={handleSelect}
          />
        </div>

        <div className='basis-3/4 bg-[#242428] rounded-[12px] h-full flex flex-1 items-center justify-center'>
          <div id='main' className='w-full p-10'>
            {setupTrigger && !setupCondition &&
              <TriggerSettings dropdownOptions={pipelines} handleSelect={handleSelect} />
            }

            {
              setupCondition && selectActions.length > 0 &&
              <ActionSettings />
            }
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AutomationPage;
