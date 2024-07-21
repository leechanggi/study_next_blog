const formatDate = (dateString: string) => {
	// 입력된 날짜 문자열을 Date 객체로 변환
	const date = new Date(dateString);

	// 유효하지 않은 날짜 처리
	if (isNaN(date.getTime())) {
		throw new Error('유효하지 않은 날짜 형식입니다.');
	}

	// 한국 표준시(KST)로 시간대 조정
	const krDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

	// 연도, 월, 일, 시, 분, 초 추출
	const year = krDate.getFullYear();
	const month = krDate.getMonth() + 1; // 월은 0부터 시작하므로 +1
	const day = krDate.getDate();
	const hour = krDate.getHours();
	const minute = krDate.getMinutes();
	const second = krDate.getSeconds();

	// "year", "month", "day", "hour", "minute", "second" 형식의 배열로 반환
	return { year, month, day, hour, minute, second };
};

export default formatDate;
