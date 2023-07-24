import classNames from "classnames";
import styles from "./Tabs.module.css";

export interface Tab<TABKEY = string | number> {
  key: TABKEY;
  label: string | number;
}

export interface TabsProps<TabKey = string | number> {
  className?: string;
  selectedId: TabKey;
  tabs: Tab<TabKey>[];
  onSelect?: (id: TabKey) => void;
}

export function Tabs<TABKEY = string | number>({
  className,
  selectedId,
  tabs,
  onSelect,
}: TabsProps<TABKEY>) {
  return (
    <div className={classNames(styles.tabs, className)}>
      {tabs
        && tabs.map((tab) => (
          <div
            key={`${tab.key}`}
            onClick={() => {
              if (onSelect) {
                onSelect(tab.key);
              }
            }}
          >
            <div
              className={classNames(styles.tabLabel, {
                [styles.tabLabel]: tab.key === selectedId,
                [styles.tabLabel__selected]: tab.key !== selectedId,
              })}
            >
              {tab.label}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Tabs;
