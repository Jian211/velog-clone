

export const showReleseDate = (released_at:string) => {
    const date = new Date(released_at);
    const getDate = getPeriodDiff(released_at)
    let result = `${getDate}일`;
    if(7 < getDate) {
        result = `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일`
    }
    else if(2 === getDate) {
       result = "어제" 
    }  
    else if(1 === getDate) {
        result = "오늘"
    }
    else {
        result = `${getDate}일전`
    }
    return result
}

export const getPeriodDiff = (d1 :string, period = 1) => {
    const before = new Date(d1).getTime();
    const now = new Date().getTime();
    return Math.floor(Math.abs((now - before) / (1000 * 60 * 60 * 24 * period)));
}