import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`;

const Layout = ({ children }) => <Container>{children}</Container>;

export default Layout;
