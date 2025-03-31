import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme, css } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';
import { useEffect } from 'react';

const MAX_PARTICIPANT = 250;

interface Props {
  dataset: any[];
}
const DetailChart = ({ dataset }: Props) => {
  const { palette, typo } = useTheme();

  useEffect(() => {
    const bars = document.querySelectorAll('.MuiBarElement-root');
    bars.forEach((bar, index) => {
      bar.setAttribute('data-index', String(index));
    });
  }, []);

  return (
    <Box
      css={{
        width: '100%',
        overflowX: 'auto',
        height: '230px',
      }}
    >
      {dataset.length ? (
        <BarChart
          dataset={dataset}
          css={css`
            color: ${palette.text.primary};
            .MuiChartsAxis-directionY .MuiChartsAxis-tickLabel {
              transform: translateX(-5px);
            }

            .MuiChartsAxis-directionX .MuiChartsAxis-tickLabel {
              transform: translateY(5px);
            }

            .MuiBarElement-root {
              fill: ${palette.graph.default} !important;
            }

            .MuiBarElement-root[data-index]:hover {
              fill: ${palette.graph.hovered} !important;
            }
            .MuiChartsAxis-bottom {
              position: relative;
              z-index: 100;
            }
          `}
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'tech',
              tickPlacement: 'middle',
              valueFormatter: (value) => value.replace(/(.{6})/g, '$1\n'),
              tickLabelStyle: {
                ...typo.body.s,
                color: palette.text.primary,
              },
            },
          ]}
          yAxis={[
            {
              min: 0,
              max: Math.min(
                250,
                Math.ceil(
                  Math.max(...dataset.map((d) => d.attendeeCount)) / 5,
                ) * 5,
              ),
              tickNumber: 5,
              valueFormatter: (value) => Math.floor(value).toString(),
              tickLabelStyle: {
                ...typo.body.s,
                color: palette.text.primary,
              },
            },
          ]}
          series={[
            {
              dataKey: 'attendeeCount',
              highlightScope: {
                highlight: 'none',
              },
            },
          ]}
          width={520}
          height={230}
          borderRadius={4}
          tooltip={{ trigger: 'item' }}
          slots={{
            itemContent: (props) => (
              <CustomItemTooltipContent {...props} dataset={dataset} />
            ),
          }}
          margin={{ top: 30, left: 35, right: 10, bottom: 60 }}
        />
      ) : (
        <div
          css={css`
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          집계된 정보가 없습니다.
        </div>
      )}
    </Box>
  );
};

export default DetailChart;

const CustomItemTooltipContent = ({ ...props }) => {
  const { palette, typo, radius } = useTheme();
  console.log(props);
  const { tech, attendeeCount } = props.dataset[props.itemData.dataIndex];

  return (
    <Paper
      css={{
        ...typo.body.s,
        color: palette.text.secondary,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '10px',
        backgroundColor: palette.background.quaternary,
        borderRadius: radius.md,
        border: `1px solid ${palette.border.secondary}`,
      }}
    >
      <p
        css={{
          display: 'flex',
          justifyContent: 'center',
          fontWeight: 'bold',
          color: palette.text.primary,
        }}
      >
        {tech}
      </p>
      <p>참여: {attendeeCount}명</p>
      <p>비율: {Math.ceil((attendeeCount / MAX_PARTICIPANT) * 100)}%</p>
    </Paper>
  );
};
