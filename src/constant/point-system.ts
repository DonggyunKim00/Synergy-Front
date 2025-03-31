import BRONZE_IMG from '@assets/rankicon/bronze.png';
import SILVER_IMG from '@assets/rankicon/silver.png';
import GOLD_IMG from '@assets/rankicon/gold.png';
import PLATINUM_IMG from '@assets/rankicon/platinum.png';

export const POINT_SYSTEM = {
  BRONZE: {
    image: BRONZE_IMG,
    desc: '100P-299P',
    content: [
      '세션 자료 다운로드',
      '컨퍼런스 내 카페 커피 쿠폰 1매',
      '온라인 이력서 첨삭 서비스 1회*',
      '채용 담당자와 온라인 커리어 상담 30분*',
    ],
  },
  SILVER: {
    image: SILVER_IMG,
    desc: '300P-799P',
    content: [
      '+ BRONZE 혜택',
      '다음 IT 컨퍼런스 티켓 10% 할인',
      '네트워킹 라운지 입장권 제공',
      '파트너 기업 온라인 채용 설명회 티켓 1매*',
    ],
  },
  GOLD: {
    image: GOLD_IMG,
    desc: '800P-1,299P',
    content: [
      '+ SILVER 혜택',
      '굿즈 세트(한정판 노트북 스티커, 텀블러 등) 제공',
      '파트너 기업 인턴십 지원 시 서류 전형 가산점*',
      'IT 업계 전문가와의 1시간 1:1 온라인 멘토링 세션*',
    ],
  },
  PLATINUM: {
    image: PLATINUM_IMG,
    desc: 'VIP 전용',
    content: [
      '+ GOLD 혜택',
      'VIP 네트워킹 이벤트 초대장 1매 증정',
      '다음 컨퍼런스 전일권 1매 증정',
      '굿즈 1세트, 커피 쿠폰 1매 추가 제공',
      '프리미엄 세션 참여권 제공',
    ],
  },
};

export const POINT_EARN = [
  { text: '최초 회원가입', point: '50P' },
  { text: '세션 참여 QR 코드 체크인', point: '30P' },
  { text: '세션 Q&A 참여', point: '50P' },
  { text: '부스 방문 QR 코드 체크인', point: '20P' },
  { text: '설문 조사 참여', point: '30P' },
  { text: '컨텐츠 공유', point: '20P' },
  { text: '채용 담당자 미팅', point: '50P' },
];
