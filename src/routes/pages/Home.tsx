import { css } from '@emotion/react';

const Home = () => {
	return <div css={testbox}>test</div>;
};

const testbox = css`
	background-color: black;
	color: white;
	width: 100px;
	height: 100px;
`;

export default Home;
