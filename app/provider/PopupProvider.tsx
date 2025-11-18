'use client';

import { useState } from "react";
import { PopupContext } from "../hook/usePopup";

export const PopupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const [title, setTitle] = useState<string | undefined>(undefined);

  const show = (content: React.ReactNode, title?: string) => {
    setContent(content);
    setTitle(title);
    setOpen(true);
  };
  const hide = () => {
    setOpen(false);
    setContent(null);
    setTitle(undefined);
  };
  const toggle = (content?: React.ReactNode, title?: string) => {
    if (isOpen) hide();
    else show(content ?? null, title);
  };

  return (
    <PopupContext.Provider value={{ isOpen, content, title, show, hide, toggle }}>
      {children}
    </PopupContext.Provider>
  );
};
export default PopupProvider