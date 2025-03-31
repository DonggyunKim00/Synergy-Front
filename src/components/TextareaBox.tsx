import { css, FormControl, OutlinedInput, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

interface Props {
  label: string;
  id: string;
  isRequired: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  max_length: number;
  value?: string;
}

const TextareaBox = ({
  label,
  id,
  isRequired,
  onChange,
  placeholder,
  max_length,
  value = '',
}: Props) => {
  const { typo, palette } = useTheme();
  const [text, setText] = useState('');

  useEffect(() => {
    if (value.length) {
      setText(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    onChange?.(e.target.value);
  };
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
      <OutlinedInput
        id={id}
        multiline
        inputProps={{ maxLength: max_length }}
        rows={5}
        required={isRequired}
        defaultValue={value}
        onChange={handleChange}
        placeholder={placeholder || ''}
        css={css`
          border-radius: 10px;
          padding: 15px 20px;
          background-color: ${palette.background.quaternary};
          color: ${palette.text.primary};
          fieldset {
            border: 1px solid ${palette.border.secondary};
            padding: 0;
          }

          .MuiInputBase-input {
            &::placeholder {
              color: ${palette.text.tertiary};
              opacity: 1;
            }
          }

          &.Mui-focused .MuiOutlinedInput-notchedOutline {
            border-color: ${palette.border.focused};
          }

          & ::-webkit-scrollbar-track {
            background: ${palette.background.quaternary};
          }
        `}
      />
      <span
        css={css`
          display: flex;
          justify-content: flex-end;
          margin-top: 4px;
          font-size: 10px;
          color: ${palette.text.secondary};
        `}
      >
        {text.length}/{max_length}
      </span>
    </FormControl>
  );
};

export default TextareaBox;
