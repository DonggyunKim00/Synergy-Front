import { css, FormControl, MenuItem, Select, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type SelectBoxProps<T extends boolean> = {
  id: string;
  label: string;
  items: { code: number | string; name: string }[];
  value: T extends true ? string[] : string;
  onChange: (value: T extends true ? string[] : string) => void;
  disabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  multiple?: T;
};

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
    <FormControl fullWidth disabled={disabled}>
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
        value={multiple ? (Array.isArray(value) ? value : []) : value}
        renderValue={(selected) => {
          if (!selected || (Array.isArray(selected) && selected.length === 0)) {
            return placeholder;
          }

          return Array.isArray(selected)
            ? selected
                .map(
                  (v) =>
                    items.find((item) => item.code.toString() === v.toString())
                      ?.name || v,
                )
                .join(', ')
            : items.find((item) => item.code.toString() === selected)?.name ||
                selected;
        }}
        onChange={(e) => {
          if (multiple) {
            const selectedValues = (e.target.value as string[]).map(String);

            if (selectedValues.length > 3) {
              alert('최대 3개까지 선택 가능합니다.');
              return;
            }

            onChange(selectedValues as any);
          } else {
            onChange(String(e.target.value) as any);
          }
        }}
        IconComponent={KeyboardArrowDownIcon}
        MenuProps={{
          PaperProps: {
            sx: menuPaperSx({ palette, typo }),
          },
        }}
        css={css`
          color: ${value ? palette.text.primary : palette.text.tertiary};
          border-radius: ${radius.sm};
          background-color: ${disabled
            ? palette.opacity.opa100
            : palette.background.quaternary};
          fieldset {
            border: 1px solid ${palette.border.secondary};
            padding: 0;
          }
          fieldset:disabled {
            border: 1px solid ${palette.border.primary};
          }
          .MuiSelect-select {
            padding: 15px 20px;
          }
          .MuiSvgIcon-root {
            fill: ${disabled ? '#00000061' : palette.icon.primary} !important;
            margin-right: 6px;
          }
          &.Mui-focused .MuiOutlinedInput-notchedOutline {
            border-color: ${palette.border.focused};
          }
          .MuiMenu-list {
            border-radius: 8px;
            padding: 0;
          }
          .MuiPaper-root {
            border-radius: 8px;
          }
        `}
      >
        {items.map((item) => (
          <MenuItem key={item.code.toString()} value={item.code.toString()}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;

const menuPaperSx = (theme: any) => ({
  backgroundColor: theme.palette.background.primary,
  borderRadius: '8px',
  boxShadow:
    '0px 12px 24px 0px rgba(23, 23, 23, 0.30), 0px 4px 4px 0px rgba(23, 23, 23, 0.12)',
  mt: '4px',
  border: `1px solid ${theme.palette.border.primary}`,
  maxHeight: '350px',
  '&::-webkit-scrollbar-track': {
    background: theme.palette.background.quaternary,
  },
  '& .MuiList-root': {
    padding: 0,
  },
  '& .MuiMenuItem-root': {
    ...theme.typo.body.l,
    padding: '14px 16px',
    fontSize: '14px',
    color: theme.palette.text.tertiary,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    '&.Mui-selected': {
      backgroundColor: theme.palette.background.secondary,
    },
    '&:hover': {
      backgroundColor: theme.palette.background.quaternary,
    },
    '&:first-of-type': {
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
    },
    '&:last-of-type': {
      borderBottomLeftRadius: '4px',
      borderBottomRightRadius: '4px',
      borderBottom: 'none',
    },
  },
});
