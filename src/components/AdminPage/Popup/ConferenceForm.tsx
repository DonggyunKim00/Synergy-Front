import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  css,
  useTheme,
} from '@mui/material';
import InputBox from '@components/InputBox';
import SelectBox from '@components/SelectBox';
import { conferenceSchema } from '@utils/schemas/adminpopup-schema';
import ErrorPopover from '@components/ErrorPopover';
import { createConference } from '@api/conference-controller/createConference';

interface ConferenceFormProps {
  mode: 'add' | 'edit';
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: {
    name: string;
    host: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    place: string;
    location: string;
    conferenceType: string;
  };
}

const ConferenceForm = ({
  mode,
  open,
  onClose,
  onSubmit,
  initialData,
}: ConferenceFormProps) => {
  const theme = useTheme();
  const { palette, typo } = theme;

  // State 초기화
  const [name, setName] = useState('');
  const [host, setHost] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [place, setPlace] = useState('');
  const [location, setLocation] = useState('');
  const [conferenceType, setConferenceType] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // 수정 모드 시 초기값 세팅
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setName(initialData.name);
      setHost(initialData.host);
      setStartDate(initialData.startDate);
      setStartTime(initialData.startTime);
      setEndDate(initialData.endDate);
      setEndTime(initialData.endTime);
      setPlace(initialData.place);
      setLocation(initialData.location);
      setConferenceType(initialData.conferenceType);
    } else {
      // 추가 모드 시 초기화
      setName('');
      setHost('');
      setStartDate('');
      setStartTime('');
      setEndDate('');
      setEndTime('');
      setPlace('');
      setLocation('');
      setConferenceType('');
    }
  }, [mode, initialData, open]);

  const locationTypeOptions = [
    { code: '그랜드볼룸', name: '그랜드볼룸' },
    { code: '아셈볼룸', name: '아셈볼룸' },
    { code: 'THE PLATZ', name: 'THE PLATZ' },
    { code: '오디토리움', name: '오디토리움' },
  ];

  const conferenceTypeOptions = [
    { code: 'IT', name: 'IT' },
    { code: '무역', name: '무역' },
    { code: '산업', name: '산업' },
  ];

  const handleSubmit = async () => {
    const result = conferenceSchema.safeParse({
      name,
      host,
      startDate,
      startTime,
      endDate,
      endTime,
      place,
      location,
      conferenceType,
    });

    if (!result.success) {
      const firstError =
        result.error.errors[0]?.message || '입력값을 다시 확인해 주세요.';
      setFormError(firstError);
      return;
    }

    try{
      const response = await createConference(result.data);
      onSubmit(result.data);
      alert('컨퍼런스가 성공적으로 등록되었습니다.');
    } catch(error){
      setFormError('컨퍼런스 등록 중 오류가 발생했습니다.');
    }
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
          maxWidth: { xs: '90%', sm: '400px' },
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
          padding: 24px;
        `}
      >
        {mode === 'add' ? '컨퍼런스 등록' : '컨퍼런스 수정'}
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
          label="컨퍼런스 명"
          id="name"
          isRequired
          placeholder="컨퍼런스 명을 입력해 주세요."
          value={name}
          onChange={setName}
        />
        <InputBox
          label="컨퍼런스 주최자"
          id="host"
          isRequired
          placeholder="주최자를 입력해 주세요."
          value={host}
          onChange={setHost}
        />
        <InputBox
          label="시작일"
          id="startDate"
          isRequired
          placeholder="컨퍼런스 시작 날짜를 입력해 주세요."
          value={startDate}
          onChange={setStartDate}
        />
        <InputBox
          label="시작 시간"
          id="startTime"
          isRequired
          placeholder="컨퍼런스 시작 시간을 입력해 주세요."
          value={startTime}
          onChange={setStartTime}
        />
        <InputBox
          label="종료일"
          id="endDate"
          isRequired
          placeholder="컨퍼런스 종료 날짜를 입력해 주세요."
          value={endDate}
          onChange={setEndDate}
        />
        <InputBox
          label="종료 시간"
          id="endTime"
          isRequired
          placeholder="컨퍼런스 종료 시간을 입력해 주세요."
          value={endTime}
          onChange={setEndTime}
        />
        <InputBox
          label="컨퍼런스 장소"
          id="place"
          isRequired
          placeholder="장소를 입력해 주세요."
          value={place}
          onChange={setPlace}
        />
        <SelectBox
          id="locationType"
          label="컨퍼런스 위치"
          isRequired
          placeholder="선택"
          items={locationTypeOptions}
          value={location}
          onChange={setLocation}
        />
        <SelectBox
          id="conferenceType"
          label="컨퍼런스 유형"
          isRequired
          placeholder="선택"
          items={conferenceTypeOptions}
          value={conferenceType}
          onChange={setConferenceType}
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

export default ConferenceForm;
