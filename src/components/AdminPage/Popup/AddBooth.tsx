import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  css,
  useTheme,
} from '@mui/material';
import InputBox from '@components/InputBox';
import SelectBox from '@components/SelectBox';
import TextareaBox from '@components/TextareaBox';
import FileInputBox from '@components/FileInputBox';
import { boothSchema } from '@utils/schemas/adminpopup-schema';
import ErrorPopover from '@components/ErrorPopover';
import { useBoothStore } from '@stores/client/useBoothStore';
import { useCreateBooth, useModifyBooth } from '@stores/server/booth';

interface AddBoothProps {
  open: boolean;
  onClose: () => void;
  mode?: 'add' | 'edit';
  initialData?: any;
}

const AddBooth = ({
  open,
  onClose,
  mode = 'add',
  initialData,
}: AddBoothProps) => {
  const theme = useTheme();
  const { palette, typo } = theme;

  const [companyName, setCompanyName] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [progressDate, setProgressDate] = useState('');
  const [boothLocation, setBoothLocation] = useState('');
  const [boothNumber, setBoothNumber] = useState('');
  const [boothDescription, setBoothDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const { mutate: createMutate } = useCreateBooth();
  const { mutate: modifyMutate } = useModifyBooth();

  const locationOptions = [
    { code: 'A HALL', name: 'A HALL' },
    { code: 'B HALL', name: 'B HALL' },
    { code: 'C HALL', name: 'C HALL' },
  ];

  useEffect(() => {
    if (open) {
      setFormError(null); // 다이얼로그 열릴 때 에러 초기화
    }

    if (mode === 'edit' && initialData) {
      setCompanyName(initialData.companyName || '');
      setCompanyType(initialData.companyType || '');
      setProgressDate(initialData.progressDate || '');
      setBoothLocation(initialData.boothLocation || '');
      setBoothNumber(initialData.boothNumber || '');
      setBoothDescription(initialData.boothDescription || '');
      setImageFile(initialData.imageFile || '');
    } else {
      setCompanyName('');
      setCompanyType('');
      setProgressDate('');
      setBoothLocation('');
      setBoothNumber('');
      setBoothDescription('');
      setImageFile(null);
    }
  }, [open, mode, initialData]);

  const handleSubmit = async () => {
    const result = boothSchema.safeParse({
      companyName,
      companyType,
      progressDate,
      boothLocation,
      boothNumber,
      boothDescription,
      imageFile,
    });

    if (!result.success) {
      const firstError =
        result.error.errors[0]?.message || '입력값을 다시 확인해 주세요.';
      setFormError(firstError);
      return;
    }

    const boothReqDtoBlob = new Blob(
      [
        JSON.stringify({
          companyName,
          companyType,
          progressDate,
          boothLocation,
          boothNumber,
          boothDescription,
        }),
      ],
      { type: 'application/json' },
    );

    const formData = new FormData();
    const requestKey = mode === 'add' ? 'requestDto' : 'request';
    formData.append(requestKey, boothReqDtoBlob);
    if (imageFile) formData.append('imageFile', imageFile);

    if (mode === 'add') createMutate(formData);
    else modifyMutate({ boothId: initialData.boothId, formData });

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: '18px',
          maxWidth: { xs: '90%', sm: '400px', md: '400px' },
          margin: { xs: 2, sm: 3 },
        },
      }}
    >
      <DialogTitle
        css={css`
          font-size: 20px;
          font-weight: bold;
          color: ${palette.text.primary};
          background-color: ${palette.background.tertiary};
          padding-bottom: 10px;
          padding-top: 24px;
          padding-left: 24px;
        `}
      >
        {mode === 'add' ? '부스 등록' : '부스 수정'}
      </DialogTitle>
      <DialogContent
        css={css`
          display: flex;
          flex-direction: column;
          gap: 20px;
          background-color: ${palette.background.tertiary};
          padding: 24px;
        `}
      >
        <InputBox
          label="기업 이름"
          id="companyName"
          isRequired
          placeholder="기업 이름을 입력해 주세요."
          value={companyName}
          onChange={setCompanyName}
        />

        <InputBox
          label="기업 유형"
          id="companyType"
          isRequired
          placeholder="기업 유형을 입력해 주세요."
          value={companyType}
          onChange={setCompanyType}
        />

        <InputBox
          label="진행일"
          id="date"
          isRequired
          value={progressDate}
          onChange={setProgressDate}
          placeholder="진행 날짜를 입력해 주세요."
        />

        <SelectBox
          id="boothLocation"
          label="부스 장소"
          isRequired
          placeholder="선택"
          items={locationOptions}
          value={boothLocation}
          onChange={setBoothLocation}
        />

        <InputBox
          label="부스 번호"
          id="boothNumber"
          isRequired
          placeholder="상세 번호를 입력해 주세요."
          value={boothNumber}
          onChange={setBoothNumber}
        />

        <TextareaBox
          label="부스 설명"
          id="boothDescription"
          isRequired
          placeholder="부스 설명을 입력해 주세요."
          max_length={200}
          value={boothDescription}
          onChange={setBoothDescription}
        />

        <FileInputBox
          label="이미지"
          id="imageFile"
          placeholder="필요한 이미지를 첨부해 주세요."
          onChange={setImageFile}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          css={css`
            background-color: ${palette.background.quinary};
            font-family: ${typo.fontFamily.Pretendard};
            color: ${palette.text.primary};
            border-radius: 12px;
            padding: 12px 20px;
            font-weight: bold;
            font-size: 16px;
            border: none;
          `}
        >
          {mode === 'add' ? '등록하기' : '완료'}
        </Button>
      </DialogContent>
      <ErrorPopover error={formError} />
    </Dialog>
  );
};

export default AddBooth;
