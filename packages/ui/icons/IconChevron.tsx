type IconChevronProps = {
  size: number;
  className?: string;
};

export const IconChevron = ({ size, className }: IconChevronProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={`${size}px`}
    height={`${size}px`}
    className={className}
  >
    <path
      fill="currentColor"
      d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
    />
  </svg>
);

export default IconChevron;
