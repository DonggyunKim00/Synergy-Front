import { css, FormControl, Input, InputLabel } from '@mui/material';

interface Props {
  label: string;
  id: string;
  isRequired: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const InputBox = ({ label, id, isRequired, placeholder, onChange }: Props) => {
  return (
    <FormControl
      required={isRequired}
      css={css`
        border: 1px solid #ddd;
        padding: 10px;
        border-radius: 10px;
      `}
    >
      <InputLabel>{label}</InputLabel>
      <Input
        id={id}
        placeholder={placeholder || ''}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </FormControl>
  );
};

export default InputBox;
