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
import { sessionSchema } from '@utils/schemas/adminpopup-schema';
import ErrorPopover from '@components/ErrorPopover';
import { useSessionStore } from '@stores/client/useSessionStore';

interface AddSessionProps {
  open: boolean;
  onClose: () => void;
  mode?: 'add' | 'edit';
  initialData?: any;
}

const AddSession = ({
  open,
  onClose,
  mode = 'add',
  initialData,
}: AddSessionProps) => {
  const theme = useTheme();
  const { palette, typo } = theme;

  const [title, setTitle] = useState('');
  const [presenter, setPresenter] = useState('');
  const [presenterRole, setPresenterRole] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [sessionDescription, setSessionDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [maxCapacity, setMaxCapacity] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const setSessionRegistered = useSessionStore(
    (state) => state.setSessionRegistered,
  );

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setTitle(initialData.title || '');
      setPresenter(initialData.presenter || '');
      setPresenterRole(initialData.presenterRole || '');
      setDate(initialData.date || '');
      setStartTime(initialData.startTime || '');
      setEndTime(initialData.endTime || '');
      setSessionDescription(initialData.sessionDescription || '');
      setImageFile(initialData.imageFile || null);
      setMaxCapacity(initialData.maxCapacity || '');
    } else {
      // add 모드일 때 초기화
      setTitle('');
      setPresenter('');
      setPresenterRole('');
      setDate('');
      setStartTime('');
      setEndTime('');
      setSessionDescription('');
      setImageFile(null);
      setMaxCapacity('');
    }
  }, [open, mode, initialData]);

  const capacityOptions = [
    { code: '150', name: '150명' },
    { code: '200', name: '200명' },
    { code: '250', name: '250명' },
  ];

  const handleSubmit = () => {
    const result = sessionSchema.safeParse({
      title,
      presenter,
      presenterRole,
      date,
      startTime,
      endTime,
      sessionDescription,
      imageFile,
      maxCapacity,
    });

    if (!result.success) {
      const firstError =
        result.error.errors[0]?.message || '입력값을 다시 확인해 주세요.';
      setFormError(firstError);
      return;
    }

    if (mode === 'edit') {
      console.log('수정 완료', result.data);
    } else {
      console.log('등록 완료', result.data);
      setSessionRegistered(true);
    }

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
        {mode === 'edit' ? '세션 수정' : '세션 등록'}
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
          label="제목"
          id="title"
          isRequired
          value={title}
          onChange={setTitle}
          placeholder="세션 제목을 입력해 주세요."
        />
        <InputBox
          label="발표자"
          id="presenter"
          isRequired
          value={presenter}
          onChange={setPresenter}
          placeholder="발표자 성함을 입력해 주세요."
        />
        <InputBox
          label="발표자의 직책"
          id="presenterRole"
          isRequired
          value={presenterRole}
          onChange={setPresenterRole}
          placeholder="발표자의 직책을 입력해 주세요."
        />
        <InputBox
          label="진행일"
          id="date"
          isRequired
          value={date}
          onChange={setDate}
          placeholder="진행 날짜를 입력해 주세요."
        />
        <InputBox
          label="시작 시간"
          id="startTime"
          isRequired
          value={startTime}
          onChange={setStartTime}
          placeholder="시작 시간을 입력해 주세요."
        />
        <InputBox
          label="종료 시간"
          id="endTime"
          isRequired
          value={endTime}
          onChange={setEndTime}
          placeholder="종료 시간을 입력해 주세요."
        />
        <TextareaBox
          label="세션 설명"
          id="sessionDescription"
          isRequired
          max_length={150}
          value={sessionDescription}
          onChange={setSessionDescription}
          placeholder="세션 설명을 입력해 주세요."
        />
        <FileInputBox
          label="이미지"
          id="imageFile"
          placeholder="필요한 이미지를 첨부해 주세요."
          onChange={setImageFile}
        />
        <SelectBox
          id="maxCapacity"
          label="최대 수용 인원"
          isRequired
          placeholder="선택"
          items={capacityOptions}
          value={maxCapacity}
          onChange={setMaxCapacity}
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

export default AddSession;
