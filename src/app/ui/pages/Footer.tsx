'use client';
import { selectActions, selectConditions, selectWorkflow } from '@/app/helpers/selectors';
import { AppDispatch } from '@/store';
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Buttons/Button';
import { workflowData } from './AutomationPage';
import { setSaveWorkflow } from '@/app/slices/setupSlice';

const Footer = () => {
    const dispatch = useDispatch();
    const workflow = useSelector(selectWorkflow);
    const conditions = useSelector(selectConditions);
    const actions = useSelector(selectActions);

    const sendData = async () => {
        const data = {
            ...workflow,
            conditions: conditions,
            actions: actions,
        };

        console.log(data);
        try {
            const response = await fetch('http://192.168.1.19:4500/workflow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            alert('Save successful!');
            console.log('Save successful:', result);
        } catch (error) {
            if (error instanceof Error) {
                alert('Error saving data: ' + error.message);
            } else {
                alert('Unknown error occurred');
            }
            console.error('Error saving data:', error);
        }
    };



    const handleSave = () => {
        dispatch(setSaveWorkflow(true));
    }

    return (
        <div className='space-x-4 absolute right-10 my-2 mx-8'>
            <Button
                text="Cancel"
                variant="primary"
                onClick={() => console.log('Cancel clicked')}
            />
            <Button
                text="Save"
                variant="primary"
                onClick={handleSave}
            />
            
        </div>
    );
};

export default Footer;
