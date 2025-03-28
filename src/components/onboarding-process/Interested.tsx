import {
  Button,
  Checkbox,
  css,
  FormControlLabel,
  FormGroup,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { INTERESTS } from 'src/constant/onboarding-lookups';
import { useAttendeeProfile } from '@stores/server/attendee';
interface Props {
  onNext: (interested_list: string[]) => void;
}

const Interested = (props: Props) => {
  const { palette, typo, radius } = useTheme();
  const {
    data: { data },
  } = useAttendeeProfile();
  console.log(data);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div
      css={css`
        margin-top: 40px;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
        `}
      >
        <Typography
          variant="h2"
          css={css`
            color: ${palette.text.primary};
            ${typo.title.l};
          `}
        >
          {data.name} 님! <br />
          지금 정보를 입력하고, <br />
          포인트를 적립하여 <br />
          특별한 혜택을 누려보세요
        </Typography>

        <Typography
          variant="inherit"
          css={css`
            color: ${palette.text.secondary};
            margin: 12px 0px 36px;
            ${typo.body.l}
          `}
        >
          관심 있는 분야를 3개 선택해주세요.
        </Typography>

        <FormGroup row sx={{ gap: '16px', width: '100%', margin: '0px' }}>
          {INTERESTS.map((item) => (
            <FormControlLabel
              key={item.code}
              control={
                <Checkbox
                  checked={selectedItems.includes(item.code.toString())}
                  onChange={() => handleCheckboxChange(item.code.toString())}
                  sx={{
                    color: palette.icon.primary,
                    '& .MuiSvgIcon-root': { fontSize: 16 },
                    '&.Mui-checked': {
                      color: palette.icon.primary,
                    },
                    fontSize: '20px',
                  }}
                  icon={<CheckCircleOutlineIcon color={'inherit'} />}
                  checkedIcon={<CheckCircleIcon color={'inherit'} />}
                />
              }
              label={item.name}
              css={css`
                ${typo.body.m}
                color: ${palette.text.secondary};
                border: 1px solid ${palette.border.secondary};
                border-radius: ${radius.xl};
                padding-left: 2px;
                padding-right: 14px;
                margin: 0;
              `}
            />
          ))}
        </FormGroup>

        <Button
          onClick={() => props.onNext(selectedItems)}
          css={css`
            position: sticky;
            bottom: 0;
            ${typo.sub.l}
            color: ${palette.text.primary};
            background-color: ${palette.background.quinary};
            border: none;
            width: 100%;
            margin-top: 20px;
            border-radius: ${radius.md};
            height: 50px;
          `}
        >
          완료
        </Button>
      </div>
    </div>
  );
};

export default Interested;
