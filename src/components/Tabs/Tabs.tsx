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
            className={classNames(
              tab.id === selectedId ? styles.tab : styles.tab__selected,
              {}
            )}
            key={tab.id}
            onClick={() => {
              if (onClick) {
                return onClick(tab.id);
              }
            }}
          >
            <div
              className={classNames(
                tab.id === selectedId
                  ? styles.tabLabel
                  : styles.tabLabel__selected,
                {}
              )}
            >
              {tab.label}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Tabs;
