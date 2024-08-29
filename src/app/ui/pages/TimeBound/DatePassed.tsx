"use client";
import React, { useState } from 'react';
import { ChevronDown, Save } from '@carbon/icons-react';
import IconButton from '../../components/Buttons/IconButton'; // Ensure this is the correct path
import { Trigger, WorkflowState } from '@/app/types/workflowTypes';
import { setWorkflowDetails } from '@/app/helpers/actions';
import { useDispatch } from 'react-redux';
import { setTrigger } from '@/app/slices/workflowSlice';

const DatePassed: React.FC = () => {
  const [frequency, setFrequency] = useState<'days' | 'weeks' | 'months'>('days');
  const [date, setDate] = useState<string>('2024-01-01'); // Static date for now
  const [period, setPeriod] = useState<string>('1');
  const [isFrequencyOpen, setIsFrequencyOpen] = useState(false);
  const [isTimeUnitOpen, setIsTimeUnitOpen] = useState(false);

  const handleFrequencyChange = (selectedFrequency: 'days' | 'weeks' | 'months') => {
    setFrequency(selectedFrequency);
    setIsFrequencyOpen(false);
  };


  const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty value to clear the input
    if (value === '' || !isNaN(Number(value))) {
      setPeriod(value);
    }
  };

  const dispatch = useDispatch();

  // Determine the frequency description
  const frequencyDescription = frequency === 'days'
    ? 'Every Day'
    : frequency === 'weeks'
      ? 'Every Week'
      : 'Every Month';

  const getFormattedText = () => {
    return frequencyDescription + ', if Date has Passed in Last ' + period + ' ' + frequency;
  };


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
      period,
      frequency,
      date
    };
    handleUpdateWorkflow({ name: getFormattedText(), data: data });
  };


  return (
    <div className="relative my-4 max-w text-white">
      <div className="flex flex-col gap-6 mb-6 w-full">
        <h1 className="text-lg font-bold mb-4">

        </h1>

        <div className="relative text-left">
          <div className='flex gap-4'>
            <input
              type="date"
              id="static-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-transparent w-56 border border-[#848694] rounded-lg py-2 px-3 text-white"
            />
          </div>
        </div>

        <div className="relative text-left w-max">
          <div className="flex flex-1 justify-start gap-4">
            <div className='py-3 px-6 bg-[#35363A] rounded-xl w-max text-center'>Every Day If Date Has Passed in Last</div>
            <div className='flex flex-1 gap-4'>
              <input
                type="text"
                id="period"
                value={period}
                onChange={handlePeriodChange}
                className="flex-0 bg-transparent border border-[#848694] rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
              />
              <div className="relative text-left">
              <button
              className="flex items-center justify-between rounded-xl px-8 py-3 w-56 bg-transparent text-sm font-medium text-white focus:outline-none border bg-[#242428] border-[#848694]"
              onClick={() => setIsFrequencyOpen(!isFrequencyOpen)}
            >
              {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
              <ChevronDown className="ml-2" />
            </button>

            {isFrequencyOpen && (
              <div className="absolute mt-2 w-44 mx-3 rounded-lg z-10 bg-[#242428] max-h-60 overflow-y-auto custom-scrollbar top-full left-0">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {['day', 'week', 'month'].map((freq) => (
                    <button
                      key={freq}
                      onClick={() => handleFrequencyChange(freq as 'days' | 'weeks' | 'months')}
                      className="w-full text-left px-6 py-4 text-white border-b-[1px] border-[#39393A] text-sm hover:bg-[#19191B]"
                      role="menuitem"
                    >
                      {freq.charAt(0).toUpperCase() + freq.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <IconButton label="Save" Icon={Save} onClick={handleSave} isSave={false} />
        </div>
      </div>
    </div>
  );
};

export default DatePassed;
