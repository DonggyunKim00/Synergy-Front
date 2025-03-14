import { css, FormControl, MenuItem, Select, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type SelectBoxProps<T extends boolean> = {
  id: string;
  label: string;
  items: { value: string | number; text: string }[];
  value: T extends true ? string[] : string; // 조건부 타입
  onChange: (value: T extends true ? string[] : string) => void;
  disabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  multiple?: T;
};

// 제네릭 <T extends boolean>을 사용하여 multiple에 따라 타입이 결정되도록 설정
const SelectBox = <T extends boolean = false>({
  id,
  label,
  items,
  value,
  onChange,
  disabled,
  isRequired,
  placeholder,
  multiple,
}: SelectBoxProps<T>) => {
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
        multiple={multiple}
        labelId={`${id}-label`}
        id={id}
        value={value}
        renderValue={(selected) => {
          if (!selected || (Array.isArray(selected) && selected.length === 0)) {
            return placeholder;
          }
          return Array.isArray(selected)
            ? selected
                .map((v) => items.find((item) => item.value === v)?.text || v)
                .join(', ')
            : items.find((item) => item.value === selected)?.text || selected;
        }}
        onChange={(e) => {
          const selectedValues = multiple
            ? (e.target.value as string[]) // multiple이 true이면 배열로 변환
            : (e.target.value as string); // multiple이 false이면 string으로 설정
          onChange(selectedValues as any);
        }}
        css={css`
          color: ${value ? palette.text.primary : palette.text.tertiary};
          border-radius: ${radius.sm};
          background-color: ${palette.background.quaternary};
          fieldset {
            border: 1px solid ${palette.border.secondary};
            padding: 0;
          }
          .MuiSelect-select {
            padding: 15px 20px;
          }
          .MuiSvgIcon-root {
            fill: ${palette.icon.primary} !important;
          }
        `}
        IconComponent={(props) => (
          <KeyboardArrowDownIcon
            css={css`
              margin-right: 6px;
            `}
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
