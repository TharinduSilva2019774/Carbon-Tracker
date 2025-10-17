import React, { useEffect } from "react";

type PageType = "dashboard" | "activities" | "tips" | "goals" | "badges";

interface KeyboardShortcutsProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
}

export const useKeyboardShortcuts = ({
  setCurrentPage,
}: KeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        return;
      }

      const isModifierPressed = e.ctrlKey || e.metaKey;
      if (!isModifierPressed && e.key !== "Escape") return;

      switch (e.key) {
        case "1":
          e.preventDefault();
          setCurrentPage("dashboard");
          break;
        case "2":
          e.preventDefault();
          setCurrentPage("activities");
          break;
        case "3":
          e.preventDefault();
          setCurrentPage("tips");
          break;
        case "4":
          e.preventDefault();
          setCurrentPage("goals");
          break;
        case "5":
          e.preventDefault();
          setCurrentPage("badges");
          break;
        case "Escape":
          e.preventDefault();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [setCurrentPage]);
};
