import { css, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface Props {
  id: string;
  label: string;
  items: { value: string | number; text: string }[];
  value: string | number | null;
  onChange: (value: string | number) => void;
  disabled?: boolean;
}

const SelectBox = ({ id, label, items, value, onChange, disabled }: Props) => {
  return (
    <FormControl
      fullWidth
      disabled={disabled}
      css={css`
        width: 370px;
      `}
    >
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
