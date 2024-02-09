import { ListProps } from "@/types/generic";
import React from "react";

export default function List({
  items,
  resourceName,
  itemComponent: ItemComponent,
  liStyle,
  gap,

  ...props
}: ListProps) {
  return (
    <ul
      className={`flex items-center justify-center flex-col  mb-4 md:flex-row   md:justify-normal md:mb-0 ${gap}`}
    >
      {items.map((item, i: number) => {
        const itemProps = {
          linkItem: item,
          [resourceName]: item,
          ...props,
        };
        return (
          <li key={i} className={liStyle}>
            {/* Spread the itemProps object */}
            <ItemComponent {...itemProps} />{" "}
          </li>
        );
      })}
    </ul>
  );
}
