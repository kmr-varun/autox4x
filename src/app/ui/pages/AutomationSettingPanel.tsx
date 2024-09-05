import { selectActions, selectWorkflow } from '@/app/helpers/selectors';
import { Pipeline, Workflow } from '@/app/types/inputType';
import { RootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';
import OptionsDropdown from '../components/Dropdowns/OptionsDropdown';
import PipelineDropdown from '../components/Dropdowns/PipelineDropdown';
import StatusCard from '../components/StatusCard';

interface AutomationSettingPanelProps {
  workflowData: Workflow;
  pipelineData: Pipeline[];
  handleSelect: (selectedOption: string) => void;
}

const AutomationSettingPanel: React.FC<AutomationSettingPanelProps> = ({ workflowData, pipelineData, handleSelect }) => {
  const workflow = useSelector(selectWorkflow);
  const actions = useSelector(selectActions);

  
  const setupCondition = useSelector((state: RootState) => state.setup.setupCondition);
  const setupPipeline = useSelector((state: RootState) => state.setup.setupPipeline);

  return (
    <div className='flex h-full'>
      <div className='flex-1'>



        <div className='mt-8'>
          <span className='text-3xl'>In</span><br />
          <span className='text-xl text-[#848694]'>this</span>
          <div className='py-4'>
            {workflow.entity.id !== '' ? (
              <div className="py-1">
                <StatusCard triggerLabel="Entity" statusLabel={workflow.entity.name} barColor="#BAEDBD" statType={'pipeline'} />
              </div>
            ) : (
              <div className='py-2'>
                <PipelineDropdown pipelines={pipelineData} />
              </div>
            )}
          </div>
        </div>


        {
          setupPipeline &&

          <div className='mt-4'>
            <div>
              <span className='text-3xl'>When</span><br />
              <span className='text-xl text-[#848694]'>this happens</span>
            </div>
            <div className="py-5">
              {workflow.trigger.name !== '' ? (
                <StatusCard triggerLabel="Trigger" statusLabel={workflow.trigger.name} barColor="#95A4FC" statType={'trigger'} />
              ) : (
                <OptionsDropdown
                  title={workflow.trigger.name !== '' ? workflow.trigger.name : 'Add Trigger'}
                  options={workflowData.triggers}
                />
              )}
            </div>
          </div>
        }

        {setupCondition && (
          <div className='mt-4'>
            <span className='text-3xl'>Then</span><br />
            <span className='text-xl text-[#848694]'>do this</span>
            <div className='py-4'>
              <div className='py-1'>
                {
                  actions.length == 0 &&
                  <OptionsDropdown
                    title="Add Action"
                    options={workflowData.actions}
                  />
                }
              </div>

              <div>
                {
                  actions.length > 0 &&
                  <StatusCard triggerLabel="Action" statusLabel={actions[actions.length - 1].name} barColor="#B1E3FF" statType={'action'} />
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutomationSettingPanel;
