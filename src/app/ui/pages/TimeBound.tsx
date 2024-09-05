"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown, Save } from '@carbon/icons-react';
import IconButton from '../components/Buttons/IconButton';
import { Trigger, WorkflowState } from '@/app/types/workflowTypes';
import { useDispatch } from 'react-redux';
import { setWorkflowDetails } from '@/app/helpers/actions';
import { setTrigger } from '@/app/slices/workflowSlice';

// Define the props for TimeBound component
interface TimeBoundProps {
    timeType: string;
}

const TimeBound: React.FC<TimeBoundProps> = ({ timeType }) => {
    // State variables
    const [event, setEvent] = useState<'same-day' | 'before' | 'after'>('same-day');
    const [time, setTime] = useState<string>('08:00');
    const [period, setPeriod] = useState<number | ''>(1);
    const [frequency, setFrequency] = useState<'days' | 'weeks' | 'months'>('days');
    const [date, setDate] = useState<string>(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Add leading zero for months
        const day = String(today.getDate()).padStart(2, '0'); // Add leading zero for days
        return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
    });
    const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
    const [isFrequencyDropdownOpen, setIsFrequencyDropdownOpen] = useState(false);

    // Map items (constant arrays)
    const eventTypes = ['same-day', 'before', 'after'] as const;
    const frequencyUnits = ['days', 'weeks', 'months'] as const;

    // Convert 24-hour time format to 12-hour time format with AM/PM
    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    };

    // Format the text based on user selections
    const getFormattedText = () => {
        const formattedTime = formatTime(time);
        const unitText = frequency.slice(0, -1);
        const amountText = period && period > 1 ? `${period} ${frequency}` : `1 ${unitText}`;

        if (timeType == 'datearrives') {
            if (event === 'same-day') {
                return `Trigger on the same day at ${formattedTime}`;
            } else if (event === 'before') {
                return `Trigger ${amountText} before the date at ${formattedTime}`;
            } else { // 'after'
                return `Trigger ${amountText} after the date at ${formattedTime}`;
            }
        }
        else if (timeType == 'datepassed') {
            return `Every Day If Date has passed in Last ${amountText} at ${formattedTime}`
        }
        else {
            return `Every ${amountText} at ${formattedTime}`;
        }
    };

    const dispatch = useDispatch();

    const handleUpdateWorkflow = (option: any) => {
        const updateString: Partial<WorkflowState> = { string: option.name };
        const updateTriggerData: Partial<Trigger> = { data: option.data };
        dispatch(setWorkflowDetails(updateString));
        dispatch(setTrigger(updateTriggerData));
    };

    const handleSave = () => {
        const data = { event, time, period, frequency, date };
        handleUpdateWorkflow({ name: getFormattedText(), data });
    };

    // Run handleSave every time the state changes
    useEffect(() => {
        handleSave();
    }, [event, time, period, frequency, date]);

    const handleEventChange = (type: typeof eventTypes[number]) => {
        setEvent(type);
        setIsEventDropdownOpen(false);
    };

    const handleFrequencyChange = (unit: typeof frequencyUnits[number]) => {
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

    return (
        <div className="relative my-4 max-w text-white">
            <div className="flex flex-col gap-6 mb-6 w-full">
                <div className="relative text-left">
                    <div className="flex gap-4">
                        <div className="py-3 px-6 bg-[#35363A] rounded-xl w-max text-center">{timeType == 'datearrives' ? 'Trigger On' : timeType == 'datepassed' ? 'Every Day If Date Has Passed in Last' : 'Every'}</div>

                        {timeType === 'datearrives' && (
                            <div className="relative">
                                <button
                                    className="flex items-center justify-between rounded-xl px-8 py-3 w-56 bg-transparent text-sm font-medium text-white focus:outline-none border bg-[#242428] border-[#848694]"
                                    onClick={() => setIsEventDropdownOpen(!isEventDropdownOpen)}
                                >
                                    {event.charAt(0).toUpperCase() + event.slice(1)}
                                    <ChevronDown className="ml-2" />
                                </button>
                                {isEventDropdownOpen && (
                                    <div className="origin-center absolute mt-2 w-full rounded-lg z-10 bg-[#242428] max-h-60 overflow-y-auto custom-scrollbar top-full left-0">
                                        {eventTypes.map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => handleEventChange(type)}
                                                className="w-full text-left px-6 py-4 text-white border-b-[1px] border-[#39393A] text-sm hover:bg-[#19191B]"
                                            >
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {timeType !== 'timeinterval' && (
                            <input
                                type="date"
                                value={date}
                                onChange={handleDateChange}
                                className="bg-transparent w-56 border border-[#848694] rounded-lg py-2 px-3 text-white"
                            />
                        )}
                    </div>
                </div>

                <div className="relative flex gap-4 text-left w-max">
                    <div>
                        {(event !== 'same-day' || timeType !== 'datearrives') && (
                            <div className="flex gap-4">
                                <input
                                    type="number"
                                    value={period === '' ? '' : period}
                                    onChange={handlePeriodChange}
                                    className="bg-transparent border border-[#848694] rounded-lg py-2 px-3 text-white focus:outline-none"
                                    min="1"
                                />
                                <div>
                                    <button
                                        onClick={() => setIsFrequencyDropdownOpen(!isFrequencyDropdownOpen)}
                                        className="flex items-center justify-between w-44 rounded-xl px-6 py-3 bg-transparent text-sm font-medium text-white border bg-[#242428] border-[#848694]"
                                    >
                                        {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                                        <ChevronDown className="ml-2" />
                                    </button>

                                    {isFrequencyDropdownOpen && (
                                        <div className="absolute mt-4 w-44 rounded-lg z-10 bg-[#242428] max-h-60 overflow-y-auto custom-scrollbar">
                                            {frequencyUnits.map((unit) => (
                                                <button
                                                    key={unit}
                                                    onClick={() => handleFrequencyChange(unit)}
                                                    className="w-full text-left px-6 py-4 text-white border-b-[1px] border-[#39393A] text-sm hover:bg-[#19191B]"
                                                >
                                                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                            </div>
                        )}
                    </div>
                    <div className="flex items-center w-48 gap-4">
                        <label htmlFor="trigger-time" className="text-sm font-medium">At:</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="bg-transparent border border-[#848694] rounded-lg py-2 px-3 text-white"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeBound;
