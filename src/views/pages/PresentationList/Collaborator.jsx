import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';


const Collaborator = ({ member, deleteMember }) => {
	const { fullName, email } = member;
	return (
		<div className="member d-flex justify-space-between align-center px-4">
			<div>{fullName}</div>
			<button className="icon" onClick={() => deleteMember(email)}>
				<DeleteOutlined />
			</button>
		</div >
	);
};

export default Collaborator;
