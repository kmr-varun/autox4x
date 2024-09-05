import React, { useState } from 'react';
import { Save, ChevronDown } from '@carbon/icons-react'; // Adjust import path as needed
import IconButton from '../../components/Buttons/IconButton';
import Email from '../../components/ActionTemplates/Email';



const ActionSettings: React.FC = () => {


  return (
    <div className='p-1'>
      {/* <div className='text-xl text-[#848694] my-4'>Action Settings</div>
      <div className='text-3xl text-white my-2'>Send a Email</div> */}
        <Email />
      
    </div>
  );
};

export default ActionSettings;
