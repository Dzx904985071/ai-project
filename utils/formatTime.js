export function formatTime(time, type = 6) {
	const date = new Date(time)
	const year = date.getFullYear()
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const day = date.getDate().toString().padStart(2, '0')
	const hour = date.getHours().toString().padStart(2, '0')
	const minute = date.getMinutes().toString().padStart(2, '0')
	const second = date.getSeconds().toString().padStart(2, '0')
	
	// 精确年份
	if(type === 1){
		return `${year}`
	}
	// 精确月份
	else if(type === 2){
		return `${year}-${month}`
	}
	// 精确日期
	else if(type === 3){
		
		return `${year}-${month}-${day}`
	}
	// 精确小时
	else if(type === 4){
		return `${year}-${month}-${day} ${hour}`
	}
	// 精确分钟
	else if(type === 5){
		return `${year}-${month}-${day} ${hour}:${minute}`
	}
	// 精确秒
	else if(type === 6){
		return `${year}-${month}-${day} ${hour}:${minute}:${second}`
	}
}
