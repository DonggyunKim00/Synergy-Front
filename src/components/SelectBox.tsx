import { css, FormControl, MenuItem, Select, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
interface Props {
  id: string;
  label: string;
  items: { value: string | number; text: string }[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
}

const SelectBox = ({
  id,
  label,
  items,
  value,
  onChange,
  disabled,
  isRequired,
  placeholder,
}: Props) => {
  const { palette, typo, radius } = useTheme();

  return (
    <FormControl
      fullWidth
      disabled={disabled}
      sx={{
        '& .MuiSelect-root.Mui-disabled': {
          backgroundColor: palette.opacity.opa200,
          opacity: 0.5,
        },
      }}
    >
      <span
        css={css`
          ${typo.sub.m}
          color: ${palette.text.primary};
          opacity: ${disabled && 0.4};
          margin-bottom: 8px;
        `}
      >
        {`${label} ${isRequired ? '*' : ''}`}
      </span>
      <Select
        displayEmpty
        labelId={`${id}-label`}
        id={id}
        value={value}
        renderValue={(v) => (v ? value : placeholder)}
        onChange={(e) => onChange(e.target.value)}
        css={css`
          padding-left: 10px;
          border-radius: ${radius.sm};
          border: 1px solid ${palette.border.secondary};
          color: ${palette.text.tertiary};
          background-color: ${palette.background.quaternary};
        `}
        sx={{
          '.MuiSvgIcon-root ': {
            fill: 'white !important',
          },
        }}
        IconComponent={(props) => (
          <KeyboardArrowDownIcon
            css={css`
              margin-right: 15px;
            `}
            color={palette.icon.primary}
            {...props}
          />
        )}
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
