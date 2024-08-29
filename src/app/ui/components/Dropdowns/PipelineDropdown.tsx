"use client";
import React, { useState } from "react";
import { Add } from "@carbon/icons-react";
import "./customScrollbar.css"; // Import custom scrollbar styles

import { useDispatch, useSelector } from "react-redux";
import { selectWorkflow } from "@/app/helpers/selectors";
import { setEntity, setWorkflowDetails } from "@/app/slices/workflowSlice";
import { Entity, WorkflowState } from "@/app/types/workflowTypes";
import { setSetupPipeline } from "@/app/slices/setupSlice";

interface PipelineDropdownProps {
  pipelines: any[];
}

const PipelineDropdown: React.FC<PipelineDropdownProps> = ({ pipelines }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const workflow = useSelector(selectWorkflow);

  const handleUpdateEntity = (option: any) => {
    const updatedDetails: Entity= {
      id: option.id,
      name: option.name
    };
    setIsOpen(false);
    dispatch(setSetupPipeline(true));
    dispatch(setEntity(updatedDetails));
  };
  return (
    <div className="relative text-left">
      <button
        className="flex items-center justify-center w-full rounded-xl px-8 py-3 bg-[#19191B] text-sm font-medium text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Add size={30} className="mr-2" />
        {workflow.entity.name || "Pipeline"}
      </button>

      {isOpen && (
        <div className="origin-center absolute mt-4 w-full rounded-lg z-10 shadow-lg bg-[#242428] max-h-60 overflow-y-auto custom-scrollbar">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {pipelines.map((pipeline) => (
              <button
                key={pipeline.id}
                onClick={() => handleUpdateEntity(pipeline)}
                className="w-full text-left px-6 py-4 text-white border-b-[1px] border-[#39393A] text-sm hover:bg-[#19191B]"
                role="menuitem"
              >
                {pipeline.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PipelineDropdown;


