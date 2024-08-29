"use client";
import React, { useState } from 'react';
import { ChevronDown, Save } from '@carbon/icons-react';
import IconButton from '../../components/Buttons/IconButton';
import { useDispatch } from 'react-redux';
import { Trigger, WorkflowState } from '@/app/types/workflowTypes';
import { setWorkflowDetails } from '@/app/helpers/actions';
import { setTrigger } from '@/app/slices/workflowSlice';

const TimeInterval: React.FC = () => {
  const [frequency, setFrequency] = useState<'minutes' | 'hours' | 'days' | 'weeks' | 'months'>('days');
  const [period, setPeriod] = useState<number | ''>(1);
  const [time, setTime] = useState<string>('08:00');
  const [isTriggerTypeOpen, setIsTriggerTypeOpen] = useState(false);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = ((hours + 11) % 12 + 1);
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const getFormattedText = () => {
    const formattedTime = formatTime(time);
    const unitText = frequency === 'days' ? 'day' : frequency === 'weeks' ? 'week' : 'month';
    const amountText = period && period > 1 ? `${period} ${unitText}s` : `1 ${unitText}`;

    return `Every ${amountText} at ${formattedTime}`;
  };

  const handleTriggerTypeChange = (selectedTriggerType: 'days' | 'weeks' | 'months') => {
    setFrequency(selectedTriggerType);
    setIsTriggerTypeOpen(false);
  };

  const dispatch = useDispatch();

  const handleUpdateWorkflow = (option: any) => {
    const updateString: Partial<WorkflowState> = {
      string: option.name
    };

    const updateTriggerData: Partial<Trigger> = {
      data: option.data,
    };
    dispatch(setWorkflowDetails(updateString));
    dispatch(setTrigger(updateTriggerData));
  };

  const handleSave = (option: Partial<WorkflowState>) => {
    const data = {
      frequency,
        time,
        period
    };
    handleUpdateWorkflow({ name: getFormattedText(), data: data });
  };



  const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setPeriod(''); // Allow empty input
    } else {
      const numberValue = parseInt(value, 10);
      setPeriod(isNaN(numberValue) ? '' : numberValue);
    }
  };

  return (
    <div className="relative bg-[#242428] max-w text-white">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div className="py-3 px-6 bg-[#35363A] rounded-xl w-32 text-center">
            Every
          </div>
          <input
            type="number"
            id="period"
            value={period === '' ? '' : period}
            onChange={handlePeriodChange}
            className="bg-transparent border border-[#848694] rounded-lg py-2 px-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
            min="1"
            placeholder="1"
          />
          <div className="relative text-left">
            <button
              className="flex items-center justify-between rounded-xl px-8 py-3 w-56 bg-transparent text-sm font-medium text-white focus:outline-none border bg-[#35363A] border-[#848694]"
              onClick={() => setIsTriggerTypeOpen(!isTriggerTypeOpen)}
            >
              {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
              <ChevronDown className="ml-2" />
            </button>
            {isTriggerTypeOpen && (
              <div className="origin-center absolute mt-2 w-56 rounded-lg z-10 bg-[#242428] max-h-60 overflow-y-auto custom-scrollbar">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {['days', 'weeks', 'months'].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleTriggerTypeChange(type as 'days' | 'weeks' | 'months')}
                      className="w-full text-left px-6 py-4 text-white border-b-[1px] border-[#39393A] text-sm hover:bg-[#19191B]"
                      role="menuitem"
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="time" className="text-sm font-medium">At: </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-transparent border border-[#848694] rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <IconButton label="Save" Icon={Save} onClick={handleSave} isSave={false} />
        </div>
      </div>
    </div>
  );
};

export default TimeInterval;
