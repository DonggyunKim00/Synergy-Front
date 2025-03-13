import { css, FormControl, InputBase, useTheme } from '@mui/material';
import { useState } from 'react';

interface Props {
  label: string;
  id: string;
  isRequired: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  max_length: number;
}

const TextareaBox = ({
  label,
  id,
  isRequired,
  onChange,
  placeholder,
  max_length,
}: Props) => {
  const { typo, palette } = useTheme();
  const [text, setText] = useState('');

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
      <InputBase
        id={id}
        multiline
        inputProps={{ maxLength: max_length }}
        rows={5}
        required={isRequired}
        onChange={handleChange}
        placeholder={placeholder || ''}
        css={css`
          border: 1px solid ${palette.border.secondary};
          border-radius: 10px;
          padding: 15px 20px;
          background-color: ${palette.background.quaternary};
        `}
        sx={{
          '& ::-webkit-scrollbar': {
            width: '5px',
          },
          '& ::-webkit-scrollbar-track': {
            background: palette.background.quaternary,
          },
          '& ::-webkit-scrollbar-thumb': {
            backgroundColor: palette.background.secondary,
          },
          '& ::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
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
