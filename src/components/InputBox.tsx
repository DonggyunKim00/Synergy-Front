import { css, FormControl, OutlinedInput, useTheme } from '@mui/material';
import { HTMLInputTypeAttribute } from 'react';

interface Props {
  label: string;
  id: string;
  isRequired?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  type?: HTMLInputTypeAttribute;
  bgColor?: string;
  fullWidth?: boolean;
  padding?: string;
  margin?: string;
}

const InputBox = ({
  label,
  id,
  isRequired,
  placeholder,
  onChange,
  value = '',
  type = 'text',
  bgColor,
  fullWidth,
  padding,
  margin,
}: Props) => {
  const { palette, typo, radius } = useTheme();

  return (
    <FormControl required={isRequired} fullWidth={fullWidth}>
      <span
        css={css`
          ${typo.sub.m}
          color: ${palette.text.primary};
          margin-bottom: 8px;
        `}
      >
        {`${label} ${isRequired ? '*' : ''}`}
      </span>
      <OutlinedInput
        id={id}
        placeholder={placeholder || ''}
        type={type}
        defaultValue={value}
        onChange={(e) => onChange?.(e.target.value)}
        css={css`
          margin: ${margin ?? ''};
          color: ${palette.text.primary};
          border-radius: ${radius.sm};
          background-color: ${bgColor ?? palette.background.quaternary};
          input {
            padding: ${padding ?? '15px 20px'};
            &::placeholder {
              color: ${palette.text.tertiary};
              opacity: 1;
            }
          }
          fieldset {
            border: 1px solid ${palette.border.secondary};
            padding: 0;
          }
          &.Mui-focused .MuiOutlinedInput-notchedOutline {
            border-color: ${palette.border.focused};
          }
        `}
      />
    </FormControl>
  );
};

export default InputBox;
