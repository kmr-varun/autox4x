import React from 'react';
import { CloseFilled } from '@carbon/icons-react';
import { useDispatch } from 'react-redux';
import { clearActions, clearConditions, clearWorkflowState, setEntity, setTrigger } from '@/app/slices/workflowSlice';
import { clearSetupState, setSetupAction, setSetupCondition, setSetupPipeline, setSetupTrigger } from '@/app/slices/setupSlice';
import { Entity, Trigger, WorkflowState } from '@/app/types/workflowTypes';
import { setWorkflowDetails } from '@/app/helpers/actions';

interface StatusCardProps {
  triggerLabel: string;
  statusLabel: string;
  barColor: string;
  statType: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ triggerLabel, statusLabel, barColor, statType }) => {
  const dispatch = useDispatch();

  const handleTrigger = () => {
    const updateTrigger: Trigger = {
      id: '',
      name: '',
      type: ''
    };

    dispatch(setTrigger(updateTrigger));
  }


  const handleClear = (statType: string) => {

    switch (statType) {
      case 'pipeline':
        dispatch(clearWorkflowState());
        dispatch(clearSetupState());
        break;
      case 'trigger':
        dispatch(setSetupTrigger(false));
        dispatch(setSetupCondition(false));
        handleTrigger();
        dispatch(clearConditions());
        dispatch(clearActions());
        break;
      case 'action':
        dispatch(setSetupAction(false));
      default:
        console.log("Error");
        break;
    }
  };
  return (
    <div className='bg-[#242428] rounded-xl w-full border-[#848694] border-[1px]'>
      <div className='flex flex-row py-2 px-4 gap-4 items-center'>
        <div className='w-1.5 h-16 rounded-s' style={{ backgroundColor: barColor }}></div>
        <div className='flex-1 py-2'>
          <div className='text-sm text-[#848694]'>{triggerLabel}</div>
          <div className='text-lg'>{statusLabel}</div>
        </div>
        <button className='p-2' onClick={() => handleClear(statType)}>
          <CloseFilled className='w-6 h-6 text-[#848694]' />
        </button>
      </div>
    </div>
  );
};

export default StatusCard;
