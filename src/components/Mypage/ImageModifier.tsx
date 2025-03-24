import { ButtonBase, css, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useRef, useState } from 'react';

const ImageModifier = () => {
  const { palette } = useTheme();
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 선택 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // 선택된 이미지를 상태에 저장
    }
  };

  return (
    <div
      css={css`
        display: flex;
        position: relative;
        aspect-ratio: 1;
        width: 100px;
      `}
    >
      <img
        src={'#'}
        alt="picture1"
        css={css`
          aspect-ratio: 1;
          width: 100%;
          height: 100%;
          border-radius: 100%;
          object-fit: cover;
          background-color: black;
        `}
      />
      {/* 파일 선택 버튼 */}
      <ButtonBase
        css={css`
          padding: 5px;
          background-color: ${palette.icon.primary};
          border-radius: 100%;
          position: absolute;
          bottom: 0;
          right: 0;
        `}
        onClick={() => fileInputRef.current?.click()} // 버튼 클릭 시 input 클릭 이벤트 실행
      >
        <EditIcon
          css={css`
            width: 14.7px;
            height: 14.7px;
            color: ${palette.icon.tertiary};
          `}
        />
      </ButtonBase>

      {/* 숨겨진 파일 입력 요소 */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }} // 화면에서 보이지 않게 숨김
      />
    </div>
  );
};

export default ImageModifier;
