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
        className="boutonSlideCommon"
        onClick={() => handleButtonClick(props)}
      >
        {buttonText}
      </button>
    )
  );
};
