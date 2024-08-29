"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown, Save } from '@carbon/icons-react';
import IconButton from '../../components/Buttons/IconButton';
import { Trigger, WorkflowState } from '@/app/types/workflowTypes';
import { useDispatch } from 'react-redux';
import { setWorkflowDetails } from '@/app/helpers/actions';
import { setTrigger } from '@/app/slices/workflowSlice';

const DateArrives: React.FC = () => {
  const [event, setEvent] = useState<'same-day' | 'before' | 'after'>('same-day');
  const [time, setTime] = useState<string>('08:00');
  const [period, setPeriod] = useState<number | ''>(1); // Allow empty string as a valid state
  const [frequency, setFrequency] = useState<'days' | 'weeks' | 'months'>('days');
  const [date, setDate] = useState<string>('2024-08-15'); // Add state for event date
  const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
  const [isFrequencyDropdownOpen, setIsFrequencyDropdownOpen] = useState(false);

  // Convert 24-hour time format to 12-hour time format with AM/PM
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = ((hours + 11) % 12 + 1);
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Format the text based on user selections
  const getFormattedText = () => {
    const formattedTime = formatTime(time);
    const unitText = frequency === 'days' ? 'day' : frequency === 'weeks' ? 'week' : 'month';
    const amountText = period && period > 1 ? `${period} ${unitText}s` : `1 ${unitText}`;

    if (event === 'same-day') {
      return `Trigger on the same day at ${formattedTime}`;
    } else if (event === 'before') {
      return `Trigger ${amountText} before the date at ${formattedTime}`;
    } else { // 'after'
      return `Trigger ${amountText} after the date at ${formattedTime}`;
    }
  };

  useEffect(() => {
    // Update the formatted text whenever user selections change
    getFormattedText();
  }, [event, time, period, frequency, date]);

  const handleEventChange = (type: 'same-day' | 'before' | 'after') => {
    setEvent(type);
    setIsEventDropdownOpen(false);
  };

  const handleFrequencyChange = (unit: 'days' | 'weeks' | 'months') => {
    setFrequency(unit);
    setIsFrequencyDropdownOpen(false);
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value === '' ? '' : parseInt(value);
    setPeriod(numericValue);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
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
        event,
        time,
        period,
        frequency,
        date
    };
    handleUpdateWorkflow({ name: getFormattedText(), data: data });
  };

  return (
    <div className="relative my-4 max-w text-white">
      <div className="flex flex-col gap-6 mb-6 w-full">
        <div className="relative text-left">
          <div className='flex gap-4'>
            <div className='py-3 px-6 bg-[#35363A] rounded-xl w-max text-center'>Trigger On</div>
            <button
              className="flex items-center justify-between rounded-xl px-8 py-3 w-56 bg-transparent text-sm font-medium text-white focus:outline-none border bg-[#242428] border-[#848694]"
              onClick={() => setIsEventDropdownOpen(!isEventDropdownOpen)}
            >
              {event === 'same-day' ? 'Same Day' : event === 'before' ? 'Before' : 'After'}
              <ChevronDown className="ml-2" />
            </button>
            <input
              type="date"
              id="event-date"
              value={date}
              onChange={handleDateChange}
              className="bg-transparent w-56 border border-[#848694] rounded-lg py-2 px-3 text-white"
            />
          </div>

          {isEventDropdownOpen && (
            <div className="absolute mt-2 w-44 mx-3 rounded-lg z-10 bg-[#242428] max-h-60 overflow-y-auto custom-scrollbar top-full left-0">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {['same-day', 'before', 'after'].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleEventChange(type as 'same-day' | 'before' | 'after')}
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

        <div className="relative text-left w-max">
          <div className="flex flex-1 justify-start gap-4">
            {event !== 'same-day' && (
              <div className='flex flex-1 gap-4'>
                <input
                  type="number"
                  id="trigger-period"
                  value={period === '' ? '' : period}
                  onChange={handlePeriodChange}
                  className="flex-0 bg-transparent border border-[#848694] rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
                <div className="relative text-left">
                  <button
                    onClick={() => setIsFrequencyDropdownOpen(!isFrequencyDropdownOpen)}
                    className="flex-1 flex items-center justify-between w-44 rounded-xl px-6 py-3 bg-transparent text-sm font-medium text-white focus:outline-none border bg-[#242428] border-[#848694]"
                  >
                    {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                    <ChevronDown className="ml-2" />
                  </button>

                  {isFrequencyDropdownOpen && (
                    <div className="origin-center absolute mt-4 w-full rounded-lg z-10 bg-[#242428] max-h-60 overflow-y-auto custom-scrollbar">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {['days', 'weeks', 'months'].map((unit) => (
                          <button
                            key={unit}
                            onClick={() => handleFrequencyChange(unit as 'days' | 'weeks' | 'months')}
                            className="w-full text-left px-6 py-4 text-white border-b-[1px] border-[#39393A] text-sm hover:bg-[#19191B]"
                            role="menuitem"
                          >
                            {unit.charAt(0).toUpperCase() + unit.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="flex items-center w-48 gap-4">
              <label htmlFor="trigger-time" className="text-sm font-medium">At:</label>
              <input
                type="time"
                id="trigger-time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex-1 bg-transparent border border-[#848694] rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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

export default DateArrives;
