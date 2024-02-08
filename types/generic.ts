export interface ItemProps {
  label: string;
  link: string;
}
export interface LinkItemProps {
  linkItem: ItemProps;
}
export interface ListProps {
  items: LinkItemProps["linkItem"][];
  resourceName: string;
  itemComponent: React.ComponentType<LinkItemProps>;
  liStyle: string;
  gap: string;
}
