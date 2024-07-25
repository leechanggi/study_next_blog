'use client';

import { useEffect } from 'react';

const Error = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div>
			<h2>요청한 게시물이 없습니다.</h2>
			<button onClick={() => reset()}>Try again</button>
		</div>
	);
};

export default Error;
