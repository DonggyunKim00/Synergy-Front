import { TextField } from '@mui/material';

interface Props {
  label: string;
  id: string;
  isRequired: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const TextareaBox = ({ label, id, isRequired, onChange }: Props) => {
  return (
    <TextField
      id={id}
      label={label}
      multiline
      rows={5}
      required={isRequired}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
};

export default TextareaBox;
