const date = new Date(); //현재 날짜 객체 만들기
const date2 = new Date(2022, 8, 1); //지정 날짜 객체 만들기

// 한번 찍어봅시다!
console.log(date) // -> 오늘 날짜 출력 ex) 7월 7일
console.log(date2);

const viewYear = date.getFullYear();
const viewMonth = date.getMonth();
const viewDate = date.getDate();
const viewDay = date.getDay();

// 한번 찍어봅시다!
console.log(viewYear); // -> 2022년
console.log(viewMonth); // -> 6월로 출력 왜? 0부터 시작하기 때문 +1 해줘야 현재 달로 나옴 !
console.log(viewDate); // 7일
console.log(viewDay); // 4 -> 목요일

//querySelector을 통해서 class에 연결 -> 버튼 위에 오늘 날짜 작성됨
document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;


//이전 달 마지막 날짜 가져오기
const prevLast = new Date(viewYear, viewMonth, 0);
const prevDate = prevLast.getDate();
const prevDay = prevLast.getDay();

//한번 찍어봅시다! 
console.log(prevLast) // -> 전 달 마지막 날짜로 나옴
console.log(prevDate) // -> 30
console.log(prevDay) // -> 4 : 목요일


//이번 달 마지막 날까 가져오기
const thisLast = new Date(viewYear, viewMonth+1, 0);
const thisDate = thisLast.getDate();
const thisDay = thisLast.getDay();

//한번 찍어봅시다! 
console.log(thisLast) // -> 이번 달 마지막 날짜로 나옴
console.log(thisDate) // -> 31
console.log(thisDay) // -> 7 : 일요일

//전체 달력에 필요한 날짜들을 만들어 주기 위한 배열
//지난 달과 다음 달 날짜는 상황에 따라 달라지기 때문에 빈 배열 
const prevDates = [];
const thisDates = [...Array(thisDate + 1).keys()].slice(1);
const nextDates = [];

//keys() : 
//slice() : 배열에서 일정 부분을 잘라 새로운 배열을 만드는 프로토타입


if (prevDay !== 6) {
    for (let i=0; i< prevDate; i++){
        prevDates.unshift(prevDate - i);
    }
}

for(let i=1; i <7 -thisDay; i++){
    nextDates.push(i);
}

//날짜 데이터를 html로 그려넣기
//concat 메서드를 통해 세 배열 합치기
const dates = prevDates.concat(thisDates, nextDates);

//forEach 메서드로 전체 요소를 돌면서 html 코드로 데이터를 수정
dates.forEach((date, i) => {
    dates[i] = `<div class="date">${date}</div>`;
});

//dates 클래스 영역에 dates 배열에, join 메서드를 호출한 결과를, 그려넣음
document.querySelector('.dates').innerHTML = dates.join('');