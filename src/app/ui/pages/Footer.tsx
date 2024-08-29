'use client';
import { selectActions, selectConditions, selectWorkflow } from '@/app/helpers/selectors';
import { AppDispatch } from '@/store';
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Buttons/Button';
import { workflowData } from './AutomationPage';

const Footer = () => {
    const dispatch = useDispatch<AppDispatch>();
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

    const updateData = async () => {
        const data = {
            ...workflow,
            conditions: conditions,
            actions: actions,
        };

        console.log(data);
        try {
            const response = await fetch('http://192.168.84.229:3500/workflow/66c5c2f7c0a6dd4f6ec00efb', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            alert('Update successful!');
            console.log('Update successful:', result);
        } catch (error) {
            if (error instanceof Error) {
                alert('Error updating data: ' + error.message);
            } else {
                alert('Unknown error occurred');
            }
            console.error('Error updating data:', error);
        }
    };

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
                onClick={sendData}
            />
            <Button
                text="Update"
                variant="secondary"
                onClick={updateData}
            />
        </div>
    );
};

export default Footer;
