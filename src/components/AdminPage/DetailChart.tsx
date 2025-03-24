import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme, css } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';
import { useEffect } from 'react';

const MAX_PARTICIPANT = 250;

const DetailChart = () => {
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
      }}
    >
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
        `}
        xAxis={[
          {
            scaleType: 'band',
            dataKey: 'name',
            valueFormatter,
            tickPlacement: 'middle',
            tickLabelStyle: {
              ...typo.body.s,
              color: palette.text.primary,
            },
          },
        ]}
        yAxis={[
          {
            tickNumber: 5,
            tickLabelStyle: {
              ...typo.body.s,
              color: palette.text.primary,
            },
          },
        ]}
        series={[
          {
            dataKey: 'value',
            highlightScope: {
              highlight: 'none',
            },
          },
        ]}
        width={520}
        height={200}
        borderRadius={4}
        tooltip={{ trigger: 'item' }}
        slots={{
          itemContent: (props) => (
            <CustomItemTooltipContent {...props} dataset={dataset} />
          ),
        }}
        margin={{ top: 30, left: 35, right: 10 }}
      />
    </Box>
  );
};

export default DetailChart;

const CustomItemTooltipContent = ({ ...props }) => {
  const { palette, typo, radius } = useTheme();
  console.log(props);
  const { name, value } = props.dataset[props.itemData.dataIndex];

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
        {name}
      </p>
      <p>참여: {value}명</p>
      <p>비율: {Math.ceil((value / MAX_PARTICIPANT) * 100)}%</p>
    </Paper>
  );
};

const dataset = [
  {
    name: '데이터 분석',
    value: 205,
  },
  {
    name: 'AI',
    value: 50,
  },
  {
    name: '디자인',
    value: 47,
  },
  {
    name: '클라우드',
    value: 54,
  },
  {
    name: 'DevOps',
    value: 57,
  },
  {
    name: '소프트웨어 개발',
    value: 57,
  },
  {
    name: '기획/운영',
    value: 59,
  },
  {
    name: '기타',
    value: 103,
  },
];

export function valueFormatter(value: string | null) {
  return `${value?.split(' ').join('\n')}`;
}
