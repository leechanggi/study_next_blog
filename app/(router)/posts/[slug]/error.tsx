'use client';

import React from 'react';

const Error = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	React.useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div>
			<h2>요청한 게시물이 없습니다.</h2>
		</div>
	);
};

export default Error;
