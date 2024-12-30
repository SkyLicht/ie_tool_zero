"use client";
import React, { useState, useRef, useEffect, ReactNode } from "react";

interface DropListProps {
  open?: boolean; // External control of dropdown visibility
  onChange?: (isOpen: boolean) => void; // Callback for dropdown state changes
  children: ReactNode;
}

export const DropList = ({ open, onChange, children }: DropListProps) => {
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : isOpenInternal;

  const toggleDropdown = () => {
    if (isControlled) {
      onChange?.(!isOpen);
    } else {
      setIsOpenInternal((prev) => !prev);
    }
  };

  const closeDropdown = () => {
    if (isControlled) {
      onChange?.(false);
    } else {
      setIsOpenInternal(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative inline-block text-left w-full"
      ref={dropdownRef}
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (target.closest("[data-trigger]")) {
          toggleDropdown();
        }
      }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DropListContent) {
          return React.cloneElement(child, { isOpen });
        }
        return child;
      })}
    </div>
  );
};

interface DropListTriggerProps {
  children: ReactNode;
}

export const DropListTrigger = ({ children }: DropListTriggerProps) => {
  return <div data-trigger>{children}</div>;
};

interface DropListContentProps {
  isOpen: boolean;
  children: ReactNode;
}

export const DropListContent = ({ isOpen, children }: DropListContentProps) => {
  return isOpen ? (
    <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu" aria-orientation="vertical">
        {children}
      </div>
    </div>
  ) : null;
};

interface Item {
  key: string;
  value: string;
}

interface DropListItemProps<T extends Item> {
  item: T;
  onSelect: () => void;
}

export const DropListItem = <T extends Item>({
  item,
  onSelect,
}: DropListItemProps<T>) => {
  return (
    <button
      type="button"
      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      onClick={onSelect}
    >
      {item.value}
    </button>
  );
};
