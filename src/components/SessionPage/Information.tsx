import React from 'react';
import { css, styled, Typography, useTheme } from '@mui/material';

const Information = () => {
  const { palette, typo } = useTheme();

  return (
    <div>
      <Typography
        variant="body1"
        color={palette.text.primary}
        css={css`
          ${typo.sub.s}
        `}
      >
        10:30-11:30
      </Typography>
      <Typography
        variant="h1"
        color={palette.text.primary}
        css={css`
          ${typo.title.m}
        `}
      >
        디지털 시대의 리더십과 팀 빌딩
      </Typography>
      <Typography
        variant="body1"
        color={palette.text.secondary}
        css={css`
          ${typo.sub.xs}
          margin: 4px 0px;
        `}
      >
        이종현, FlowLink HR 팀 총괄
      </Typography>
      <Typography
        variant="body1"
        color={palette.text.tertiary}
        css={css`
          ${typo.body.s}
        `}
      >
        1시간
      </Typography>
      <StyledImage src="" />
      <p
        css={css`
          ${typo.body.m}
          color: ${palette.text.primary};
        `}
      >
        빠르게 변화하는 디지털 환경 속에서 효과적인 리더십과 팀 빌딩 전략은
        기업의 성장을 결정짓는 핵심 요소입니다. 이번 세션에서는 IT 기업의 HR
        총괄이 디지털 시대에 필요한 리더십과 조직 운영 방식의 변화를 조망하고,
        유능한 팀을 구축하고 유지하는 전략을 공유합니다.
      </p>
    </div>
  );
};

export default Information;

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.primary,
  height: '187px',
  margin: '12px 0px 20px',
}));
