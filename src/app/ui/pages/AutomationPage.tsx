import React, { useEffect, useRef, useState } from 'react';
import AutomationSettingPanel from './AutomationSettingPanel';
import TriggerSettings from './settings/TriggerSettings';
import { InputData, Pipeline, Workflow } from '@/app/types/inputType';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import * as data from '../../data.json';

import Footer from './Footer';
import { pipelineData } from '@/apiService';
import Email from '../components/ActionTemplates/Email';
import ActionSettings from './settings/ActionSettings';
import AutomationPopup from '../components/AutomationPopup';
import { setSaveWorkflow } from '@/app/slices/setupSlice';
import { Trigger, WorkflowState } from '@/app/types/workflowTypes';
import { setWorkflowDetails } from '@/app/slices/workflowSlice';
import Toaster, { ToasterRef } from '../components/Toaster/Toaster';
import Popup from '../components/PopUp';

export const workflowData: InputData = data;
const workflows: Workflow = workflowData.workflow;

const handleSelect = (option: string) => {
  console.log('Selected:', option);
};

const AutomationPage: React.FC = () => {

  const pipelines:Pipeline[]  = pipelineData;
  const dispatch = useDispatch();

  const [isPopupVisible, setPopupVisible] = useState(false);
  const handleButtonClick = () => {
    setPopupVisible(false); // Close the popup after clicking the button
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const setupTrigger = useSelector((state: RootState) => state.setup.setupTrigger);
  const setupCondition = useSelector((state: RootState) => state.setup.setupCondition);
  const selectActions = useSelector((state: RootState) => state.workflow.actions);
  const saveWorkflow = useSelector((state: RootState) => state.setup.saveWorkflow);

  const toasterRef = useRef<ToasterRef>(null);

  const handleDiscard = () => {
    dispatch(setSaveWorkflow(false));
  }

  const handleWorkflowSave = (option: any) => {
    const updatedDetails: Partial<WorkflowState> = {
      name: option.name,
      desc: option.desc
    };
    dispatch(setWorkflowDetails(updatedDetails));
    toasterRef?.current?.addToast("Your Automation has been successful saved", "success");
    setPopupVisible(true);
  }


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
          <div id='main' className='w-full p-4'>
            {setupTrigger && !setupCondition &&
              <TriggerSettings dropdownOptions={pipelines} handleSelect={handleSelect} />
            }

            {
              setupCondition && selectActions.length > 0 && !selectActions[selectActions.length -1].setup &&
              <ActionSettings />
            }
            
          </div>
          {
              saveWorkflow &&
              <AutomationPopup onSave={handleWorkflowSave} onDiscard={handleDiscard} />
            }
            <Toaster />
        </div>
        <Toaster ref={toasterRef} />

        {isPopupVisible && (
        <Popup
          heading="Successfully Created!"
          subHeading="Your Automation has been saved & Applied."
          buttonText="Done"
          onButtonClick={handleClosePopup}
          
        />
      )}
      </div>
      <Footer />
    </div>
  );
};

export default AutomationPage;










