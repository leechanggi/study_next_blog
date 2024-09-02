import React from 'react';
import { AdminAside } from '@/components';

const AdminLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<>
			<AdminAside />
			<section>{children}</section>
		</>
	);
};

export default AdminLayout;
