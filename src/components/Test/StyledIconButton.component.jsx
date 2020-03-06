import React from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

const NewIconButton = styled(IconButton)`
	background-color: #d32f2f;
	color: #fff;
	box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
		0px 5px 8px 0px rgba(0, 0, 0, 0.14),
		0px 1px 14px 0px rgba(0, 0, 0, 0.12);
	&:hover {
		background-color: #c62828;
	}
`;

export default function StyledIconButton({ children }) {
	return <NewIconButton>{children}</NewIconButton>;
}
