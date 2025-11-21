'use client';

import { useEffect } from "react";
import { usePopup } from "../hook/usePopup";

const Popup = () => {
  const { isOpen, content, title, hide } = usePopup();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, hide]);

  if (!isOpen) return null;

  return (
    <div onMouseDown={() => hide()} className="bg-black/40 w-screen h-screen absolute top-0 left-0 flex flex-wrap justify-center items-center z-50">
      <div onMouseDown={(e) => e.stopPropagation()} className="min-w-3/6 min-h-3/6 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
        <div className="border-b border-gray-700 p-4 flex justify-between items-center bg-gray-800">
          <h2 className="text-gray-100 text-2xl font-bold">{title ?? "Ventana"}</h2>
          <button onClick={hide} className="text-gray-400 hover:bg-gray-900 transition-colors px-2 py-1 rounded-lg hover:text-gray-100 cursor-pointer">X</button>
        </div>
        <div className="p-4">
          {content}
        </div>
      </div>
    </div>
  )
}

export default Popup