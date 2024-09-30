const formatDate = (dateString: Date) => {
	const date = new Date(dateString);

	if (isNaN(date.getTime())) {
		throw new Error("유효하지 않은 날짜 형식입니다.");
	}

	// const krDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
	const krDate = new Date(date.getTime());
	const padZero = (num: number) => String(num).padStart(2, "0");

	const year = krDate.getFullYear();
	const month = padZero(krDate.getMonth() + 1);
	const day = padZero(krDate.getDate());
	const hour = padZero(krDate.getHours());
	const minute = padZero(krDate.getMinutes());
	const second = padZero(krDate.getSeconds());

	return { year, month, day, hour, minute, second };
};

export default formatDate;
