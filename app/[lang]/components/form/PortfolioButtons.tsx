import classNames from "classnames";
import { PortfolioButtonsProps } from "./type";

export const PortfolioButtons = ({
  handleButtonClick,
  buttonText,
  pictureLength,
  multiple,
  ...props
}: PortfolioButtonsProps) => {
  return (
    multiple &&
    pictureLength && (
      <button
        type="button"
        disabled={
          props.isDisabled ||
          props.errorText === "15 pictures max" ||
          props.noInstanceFile
        }
        className={classNames({
          "shrink-0 text-lg  w-full radius p-1 border-[1px] border-white": true,
          boutonSlideCommon: !props.isDisabled,
          "max-w-[180px] opacity-50":
            props.isDisabled ||
            props.errorText === "15 pictures max" ||
            props.noInstanceFile,
        })}
        onClick={() => handleButtonClick(props)}
      >
        {buttonText}
      </button>
    )
  );
};
