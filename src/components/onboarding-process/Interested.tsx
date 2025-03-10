import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  css,
} from '@mui/material';
import { useState } from 'react';
import { checkboxItems } from 'src/constant/onboarding';

interface Props {
  onNext: (interested_list: string[]) => void;
}

const Interested = (props: Props) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <>
      <Typography variant="h1">
        김지원 님! <br />
        지금 정보를 입력하고, <br />
        포인트를 적립하여 <br />
        특별한 혜택을 누려보세요
      </Typography>

      <Typography
        variant="inherit"
        sx={{ color: 'gray', margin: '18px 0px 47px ' }}
      >
        관심 있는 분야를 선택해주세요.
      </Typography>

      <FormGroup
        row
        sx={{ columnGap: '20px', rowGap: '13px', maxWidth: '326px' }}
      >
        {checkboxItems.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 16 },
                  fontSize: '20px',
                }}
              />
            }
            label={item.label}
            sx={{
              margin: 0,
              border: '1px solid #ddd',
              borderRadius: '20px',
              paddingRight: '13px',
            }}
          />
        ))}
      </FormGroup>

      <Button
        onClick={() => props.onNext(selectedItems)}
        sx={{
          width: '100%',
          backgroundColor: '#ddd',
          marginTop: '100px',
        }}
      >
        다음
      </Button>
    </>
  );
};

export default Interested;
