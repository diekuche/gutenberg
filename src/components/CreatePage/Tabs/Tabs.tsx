import React from "react";
import styles from "./Tabs.module.css";
import classNames from "classnames";

export interface Tab {
  id: string | number;
  label: string | number;
}

export interface TabsProps {
  className?: string;
  selectedId: string | number;
  tabs: Tab[];
  onClick?: (id: string | number) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  className,
  selectedId,
  tabs,
  onClick,
}) => {
  return (
    <div className={classNames(styles.tabs, className)}>
      {tabs &&
        tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => {
              if (onClick) {
                return onClick(tab.id);
              }
            }}
          >
            <div
              className={classNames(styles.tabLabel, {
                [styles.tabLabel]: tab.id === selectedId,
                [styles.tabLabel__selected]: tab.id !== selectedId,
              })}
            >
              {tab.label}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Tabs;
