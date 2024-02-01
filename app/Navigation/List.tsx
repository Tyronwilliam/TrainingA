import { ListProps } from "@/types/generic";
import React from "react";

export default function List({
  items,
  resourceName,
  itemComponent: ItemComponent,
  ...props
}: ListProps) {
  return (
    <ul className="flex items-center justify-center flex-col gap-2 mb-4 md:flex-row  md:gap-9 md:justify-normal md:mb-0">
      {items.map((item, i: number) => {
        const itemProps = {
          linkItem: item,
          [resourceName]: item,
          ...props,
        };
        return (
          <li key={i} className="text-lg text-center md:text-xl uppercase">
            {/* Spread the itemProps object */}
            <ItemComponent {...itemProps} />{" "}
          </li>
        );
      })}
    </ul>
  );
}
