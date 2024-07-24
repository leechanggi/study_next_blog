const formatDate = (dateString: Date) => {
	const date = new Date(dateString);

	if (isNaN(date.getTime())) {
		throw new Error('유효하지 않은 날짜 형식입니다.');
	}

	const krDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

	const year = krDate.getFullYear();
	const month = krDate.getMonth() + 1;
	const day = krDate.getDate();
	const hour = krDate.getHours();
	const minute = krDate.getMinutes();
	const second = krDate.getSeconds();

	return { year, month, day, hour, minute, second };
};

export default formatDate;
