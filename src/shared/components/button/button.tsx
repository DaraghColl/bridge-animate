import { FC, ReactNode } from 'react';

type Variant = 'filled' | 'outlined' | 'ghost';
type Color = 'inherit' | 'accent' | 'dark-primary' | 'light-primary';
type Rounded = '0' | 'sm' | 'md' | 'lg';
type Space = 'none' | 'sm' | 'md' | 'lg';

interface ButtonComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  color: Color;
  rounded?: Rounded;
  space?: Space;
  onClick: () => void;
  children?: ReactNode;
}

const getDynamicClasses = (variant: Variant, color: Color, rounded: Rounded, space: Space) => {
  const filled_text_color_map: Record<Color, string> = {
    inherit: 'text-inherit',
    accent: 'text-white',
    'dark-primary': 'text-white',
    'light-primary': 'text-dark-primary',
  };

  const varient_map: Record<Variant, string> = {
    filled: `${filled_text_color_map[color]} shadow-sm`,
    outlined: `bg-transparent text-${color} shadow-sm`,
    ghost: `bg-transparent border-none text-${color} shadow-none`,
  };

  const color_map: Record<Color, string> = {
    inherit: 'bg-inherit border-2 border-inherit',
    accent: 'bg-accent border-2 border-accent',
    'dark-primary': 'bg-dark-primary border-2 border-dark-primary',
    'light-primary': 'bg-light-primary border-2 border-light-primary',
  };

  const space_map: Record<Space, string> = {
    none: 'px-0 py-0',
    sm: 'px-1.5 py-1',
    md: 'px-3 py-2',
    lg: 'px-4.5 py-3',
  };

  return `${varient_map[variant]} ${color_map[color]} rounded-${rounded} ${space_map[space]}`;
};

const baseClasses = 'flex items-center gap-2 border-2 px-3 py-2 transition-all ease-in-out hover:scale-105 text-sm';

const Button: FC<ButtonComponentProps> = (props) => {
  const { variant = 'filled', color, rounded = 'sm', space = 'md', children, onClick, ...attributes } = props;

  return (
    <button
      type="button"
      className={`${baseClasses} ${getDynamicClasses(variant, color, rounded, space)}`}
      onClick={onClick}
      {...attributes}
    >
      {children}
    </button>
  );
};

export { Button };
