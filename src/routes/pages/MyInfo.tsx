import BackHeader from '@components/headers/BackHeader';
import BasicInformation from '@components/MyInfoPage/BasicInformation';
import OtherInformation from '@components/MyInfoPage/OtherInformation';
import { Box, styled, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const json = {
  data: {
    basic: {
      name: '김지원',
      jobName: '백엔드 개발자',
      experience: '2년 이하',
      image: 'https://placehold.co/130x160/png',
    },
    others: {
      education: '4년제 대학 졸업',
      ageGroup: '20-24세 이하',
      techStacks:
        'Java, AWS, Spring Boot, MySQL, Docker, JPA, github-actions, SonarQube, Redis, junit5, Mockito, Git',
      desiredWorkRegion: '서울,경기',
      selfIntroduction:
        '저는 최신 기술을 배우고 IT 업계에서 성장하기 위해 다양한 컨퍼런스와 개발 프로젝트에 참여해왔습니다. 컴퓨터공학 전공자로서 웹 애플리케이션 개발과 데이터베이스 설계 경험이 있으며, 협업과 문제 해결 역량을 갖추고 있습니다. 여러 해커톤과 오픈소스 프로젝트에 참여하며 실무 감각을 익혔고, 컨퍼런스를 통해 업계 트렌드를 학습하며 네트워킹을 적극적으로 활용해왔습니다. 앞으로 데이터 분석과 AI 기술을 활용하여 가치 있는 서비스를 개발하고, 변화하는 환경 속에서 끊임없이 성장하는 개발자가 되고 싶습니다. 이번 기회를 통해 실무 경험을 쌓으며, IT 업계에서 더욱 발전할 수 있도록 최선을 다하겠습니다.',
      information: 'lorem',
      workplaceSelectionFactors: 'lorem',
      preferredCorporateCultures: 'lorem',
    },
  },
};

const MyInfo = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <BackHeader
        backgroundColor={palette.background.tertiary}
        onClick={() => navigate(-1)}
      />
      <Container>
        <BasicInformation {...json.data.basic} />
        <OtherInformation {...json.data.others} />
      </Container>
    </>
  );
};

export default MyInfo;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 16px 16px',
  backgroundColor: theme.palette.background.tertiary,
  height: '100%',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));
