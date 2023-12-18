import { CustomButtonProps } from "@/types/buttonTypes";
import Image from "next/image";

const CustomButton = ({
  title,
  containerStyles,
  handleClick,
  btnType,
  textStyles,
  rightIcon,
  leftIcon,
  iconAlt,
  isDisabled,
  onMouseEnter,
  onMouseLeave,
  iconWidth,
  iconHeight,
}: CustomButtonProps) => {

  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      type={btnType}
      disabled={isDisabled}
      onClick={handleClick}
      className={`${containerStyles}`}
    >
      {leftIcon && (
        <Image width={iconWidth ? iconWidth : '24'} height={iconHeight ? iconHeight : '24'} className={iconWidth ? `!min-w-[${iconWidth}] w-[${iconWidth}]` : '!min-w-[24px] w-[24px]'} src={`${leftIcon}`} alt={`${iconAlt}`} />
      )}
      <span className={`${textStyles}`}>{title}</span>
      {rightIcon && (
        <Image width={iconWidth ? iconWidth : '24'} height={iconHeight ? iconHeight : '24'} className={iconWidth ? `!min-w-[${iconWidth}] w-[${iconWidth}]` : '!min-w-[24px] w-[24px]'} src={`${rightIcon}`} alt={`${iconAlt}`} />
      )}
    </button>
  );
};

export default CustomButton;
