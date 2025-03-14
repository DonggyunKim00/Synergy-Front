import { css, FormControl, InputAdornment, useTheme } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState, useRef } from 'react';

interface Props {
  label: string;
  id: string;
  isRequired?: boolean;
  placeholder?: string;
  onChange?: (value: File | null) => void;
}

const FileInputBox = ({
  label,
  id,
  isRequired,
  placeholder,
  onChange,
}: Props) => {
  const { palette, typo, radius } = useTheme();
  const [value, setValue] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (file: File | null) => {
    if (!file) return;
    setValue(file);
    onChange?.(file);
  };

  return (
    <FormControl fullWidth required={isRequired}>
      <span
        css={css`
          ${typo.sub.m}
          color: ${palette.text.primary};
          margin-bottom: 8px;
        `}
      >
        {`${label} ${isRequired ? '*' : ''}`}
      </span>

      {/* MuiFileInput을 직접 클릭 가능하도록 설정 */}
      <MuiFileInput
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        inputRef={fileInputRef}
        css={css`
          width: 100%;
          color: ${palette.text.tertiary};
          background-color: ${palette.background.quaternary};
          cursor: pointer;

          fieldset {
            border: 1px solid ${palette.border.secondary};
            border-radius: ${radius.sm};
            padding: 0;
          }

          .MuiInputAdornment-positionStart {
            display: none;
          }

          label {
            cursor: pointer;
          }

          .MuiInputBase-root {
            padding: 0px 20px;
            width: 100%;
            cursor: pointer;
            .MuiFileInput-placeholder {
              color: ${palette.text.tertiary};
              opacity: 1;
            }
          }
        `}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <AttachFileIcon
                onClick={(e) => {
                  e.preventDefault(); // 기본 이벤트 방지
                  fileInputRef.current?.click(); // input 클릭
                }}
                css={css`
                  transform: rotate(45deg);
                  color: ${palette.icon.primary};
                  cursor: pointer;
                `}
              />
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};

export default FileInputBox;
