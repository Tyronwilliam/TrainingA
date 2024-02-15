import classNames from "classnames";
import { CTAListProps } from "../type";

export const CtaList = ({
  cle,
  value,
  handleClick,
  current,
  customStyle,
  handleFilter,
  handlePhysioQuery,
  onlyMapKey,
  onlyObjectKey,
}: CTAListProps) => {
  const validation = Array.isArray(current)
    ? !current?.includes(onlyObjectKey ? onlyObjectKey : (value as string))
    : onlyObjectKey
    ? onlyObjectKey !== current
    : current !== cle;

  return (
    <button
      key={cle}
      className="uppercase whitespace-nowrap w-fit"
      onClick={() => {
        handleClick(cle);
        handleFilter && handleFilter(cle);
        if (onlyMapKey) {
          handlePhysioQuery && handlePhysioQuery(value as string, onlyMapKey);
        } else if (onlyObjectKey) {
          handlePhysioQuery && handlePhysioQuery(onlyObjectKey, cle);
        } else {
          handlePhysioQuery && handlePhysioQuery(value as string, cle);
        }
      }}
    >
      <li
        className={classNames({
          [`${`font-medium ${customStyle}`}`]: true,
          "opacity-50 ": validation,
        })}
      >
        {value as React.ReactNode}
      </li>
    </button>
  );
};
