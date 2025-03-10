import { useFunnel } from '@use-funnel/react-router-dom';
import {
  MoreInfo,
  SelectInterested,
  SelectWork,
} from '../../types/funnel/onboarding.type';
import Interested from '@components/onboarding-process/Interested';
import { css } from '@emotion/react';
import Work from '@components/onboarding-process/Work';
import Info from '@components/onboarding-process/Info';
import {
  InterestedSchema,
  WorkSchema,
  MoreInfoSchema,
} from '@utils/schemas/onboarding-schema';
import { useState } from 'react';
import ErrorPopover from '@components/ErrorPopover';

const OnBoarding = () => {
  const funnel = useFunnel<{
    interested: SelectInterested;
    work: SelectWork;
    info: MoreInfo;
  }>({
    id: 'onboarding-funnel',
    initial: {
      step: 'interested',
      context: {},
    },
  });

  const [error, setError] = useState<string | null>(null);

  const handleSetError = (newError: string) => {
    setError('');
    setTimeout(() => setError(newError), 50);
  };

  console.log(error);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin: auto 0;
      `}
    >
      <funnel.Render
        interested={({ history }) => (
          <Interested
            onNext={(interested_list) => {
              const result = InterestedSchema.safeParse({ interested_list });

              if (!result.success)
                return handleSetError(
                  result.error.format().interested_list?._errors[0] || '',
                );

              setError(null);
              history.push('work', { interested_list });
            }}
          />
        )}
        work={({ context, history }) => (
          <Work
            onNext={(work) => {
              const result = WorkSchema.safeParse({
                interested_list: context.interested_list,
                work,
              });

              if (!result.success) {
                const workErrors = result.error.format().work;
                const firstError =
                  workErrors?._errors?.[0] ||
                  workErrors?.parent?._errors?.[0] ||
                  workErrors?.child?._errors?.[0] ||
                  workErrors?.employeement_agree?._errors?.[0] ||
                  workErrors?.private_agree?._errors?.[0] ||
                  '알 수 없는 오류가 발생했습니다.';

                return handleSetError(firstError);
              }

              setError(null);

              if (work.employeement_agree === 'yes')
                return history.push('info', (prev) => ({ ...prev, work }));

              console.log(context.interested_list, work);
            }}
          />
        )}
        info={({ context }) => (
          <Info
            {...context}
            onSubmit={(info) => {
              const result = MoreInfoSchema.safeParse({
                interested_list: context.interested_list,
                work: context.work,
                info,
              });

              if (!result.success) {
                handleSetError(result.error.errors[0].message);
                return;
              }

              setError(null);
              console.log('최종 데이터:', { ...context, info }); // 최종 데이터 확인
            }}
          />
        )}
      />

      {/* 에러 메시지 UI */}
      <ErrorPopover error={error} />
    </div>
  );
};

export default OnBoarding;
