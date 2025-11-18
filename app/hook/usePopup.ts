'use client';

import { createContext, useContext } from "react";

type PopupState = {
  isOpen: boolean;
  content: React.ReactNode | null;
  title?: string;
  show: (content: React.ReactNode, title?: string) => void;
  hide: () => void;
  toggle: (content?: React.ReactNode, title?: string) => void;
};

export const PopupContext = createContext<PopupState | undefined>(undefined);

export const usePopup = () => {
  const ctx = useContext(PopupContext);
  if (!ctx) throw new Error("usePopup must be used within PopupProvider");
  return ctx;
};