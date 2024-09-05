import React, { useState, forwardRef, useImperativeHandle } from "react";
import { CheckmarkFilled, ErrorFilled, InformationFilled, HelpFilled, Close, Checkmark, Help, Information, CheckmarkOutline, MisuseOutline } from "@carbon/icons-react";
import "./Toaster.css";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "enquiry";
}

export interface ToasterRef {
  addToast: (message: string, type: "success" | "error" | "info" | "enquiry") => void;
}

const Toaster = forwardRef<ToasterRef>((_, ref) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useImperativeHandle(ref, () => ({
    addToast: (message: string, type: "success" | "error" | "info" | "enquiry") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 3000);
    }
  }));

  const getToastStyles = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return { bg: "bg-[#D1FAE5]", text: "text-[#059691]" };
      case "error":
        return { bg: "bg-[#FFE4E6]", text: "text-[#E11D48]" };
      case "info":
        return { bg: "bg-[#E0E7FF]", text: "text-[#5D5FEF]" };
      case "enquiry":
        return { bg: "bg-[#FEF3C7]", text: "text-[#E0902D]" };
      default:
        return { bg: "", text: "" };
    }
  };

  const getIcon = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return <CheckmarkOutline size={24} className="mr-3" />;
      case "error":
        return <MisuseOutline size={24} className="mr-3" />;
      case "info":
        return <Information size={24} className="mr-3" />;
      case "enquiry":
        return <Help size={24} className="mr-3" />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Toast container */}
      <div className="fixed top-5 right-5 space-y-3 z-50">
        {toasts.map((toast) => {
          const { bg, text } = getToastStyles(toast.type);
          return (
            <div
              key={toast.id}
              className={`toast-item ${bg} ${text} px-4 py-3 rounded-md shadow-md flex items-center justify-between transform transition-all duration-500 ease-in-out`}
            >
              <div className="flex items-center">
                {getIcon(toast.type)}
                <span>{toast.message}</span>
              </div>
              <button
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="ml-4"
              >
                <Close size={24} className={`cursor-pointer ${text}`} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Toaster;
