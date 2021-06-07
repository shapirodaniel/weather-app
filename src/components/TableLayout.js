import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
	width: 300px;
	margin-left: 1.3em;
	overflow: hidden;
`;

// table layout is formatting container for each swipeable view page
const TableLayout = ({ title, children }) => (
	<Table>
		<tbody>
			<tr
				style={{
					fontSize: '28px',
					color: 'ghostwhite',
				}}
			>
				<td
					colSpan={3}
					style={{
						width: '10px',
						paddingBottom: '.3em',
					}}
				>
					{title}
				</td>
			</tr>
			{children}
		</tbody>
	</Table>
);

export default TableLayout;
