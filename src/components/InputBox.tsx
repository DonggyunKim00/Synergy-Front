import { css, FormControl, Input, useTheme } from '@mui/material';

interface Props {
  label: string;
  id: string;
  isRequired?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const InputBox = ({ label, id, isRequired, placeholder, onChange }: Props) => {
  const { palette, typo, radius } = useTheme();

  return (
    <FormControl required={isRequired}>
      <span
        css={css`
          ${typo.sub.m}
          color: ${palette.text.primary};
          margin-bottom: 8px;
        `}
      >
        {`${label} ${isRequired ? '*' : ''}`}
      </span>
      <Input
        disableUnderline
        id={id}
        placeholder={placeholder || ''}
        onChange={(e) => onChange?.(e.target.value)}
        css={css`
          border: 1px solid ${palette.border.secondary};
          border-radius: ${radius.sm};
          padding: 11px 20px 10px;
          background-color: ${palette.background.quaternary};
        `}
      />
    </FormControl>
  );
};

export default InputBox;
