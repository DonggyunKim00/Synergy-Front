import { useFunnel } from '@use-funnel/react-router-dom';
import {
  MoreInfo,
  SelectInterested,
  SelectWork,
} from '../../types/funnel/onboarding.type';
import Interested from '@components/onboarding-process/Interested';
import { css, useTheme } from '@mui/material';
import Work from '@components/onboarding-process/Work';
import Info from '@components/onboarding-process/Info';
import {
  InterestedSchema,
  WorkSchema,
  MoreInfoSchema,
} from '@utils/schemas/onboarding-schema';
import { useState } from 'react';
import ErrorPopover from '@components/ErrorPopover';
import DefaultHeader from '@components/headers/DefaultHeader';
import BackHeader from '@components/headers/BackHeader';
import { useFormStore } from '@stores/client/useFormStore';
import { useOnboardingPatch } from '@stores/server/attendee';
import { useNavigate } from 'react-router-dom';

const OnBoarding = () => {
  const { palette } = useTheme();
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
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSetError = (newError: string) => {
    setError('');
    setTimeout(() => setError(newError), 50);
  };

  const { setForm, initForm, form } = useFormStore();
  const { basicMutation, detailMutation } = useOnboardingPatch();

  return (
    <>
      {funnel.step === 'info' ? (
        <BackHeader
          backgroundColor={palette.background.tertiary}
          onClick={() => funnel.history.back()}
        />
      ) : (
        <DefaultHeader backgroundColor={palette.background.tertiary} />
      )}

      <div
        css={css`
          flex: 1;
          height: 100%;
          padding: 0px 16px 16px;
          overflow-y: auto;
          &::-webkit-scrollbar {
            display: none;
          }
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
                setForm('interested_list', interested_list);
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
                basicMutation.mutate({ form });

                if (work.employeement_agree === 'no') {
                  initForm();
                  navigate('/mypage');
                } else {
                  history.push('info', (prev) => ({ ...prev, work }));
                }
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

                if (!result.success)
                  return handleSetError(result.error.errors[0].message);

                setError(null);
                setForm('info', info);
                detailMutation.mutate({ form });
                initForm();
                navigate('/mypage');
              }}
            />
          )}
        />

        {/* 에러 메시지 UI */}
        <ErrorPopover error={error} />
      </div>
    </>
  );
};

export default OnBoarding;
