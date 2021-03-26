import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	height: 92vh;
	padding: 3rem;
	overflow: ${(props) => (props.imgOpen ? 'hidden' : 'auto')};
`;
