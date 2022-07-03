const date = new Date(); //현재 날짜 객체 만들기
const date2 = new Date(2022, 7, 1); //지정 날짜 객체 만들기

// 한번 찍어봅시다!
console.log(date) // -> 오늘 날짜 출력 ex) 7월 7일
console.log(date2); // -> 지정 날짜 출력  8월 1일

const viewYear = date.getFullYear();
const viewMonth = date.getMonth();
const viewDate = date.getDate();
const viewDay = date.getDay();

//querySelector을 통해서 class에 연결 -> 버튼 위에 오늘 날짜 작성됨
document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;


//이전 달 마지막 날짜 가져오기
const prevLast = new Date(viewYear, viewMonth, 0);
const prevDate = prevLast.getDate();
const prevDay = prevLast.getDay();

//한번 찍어봅시다! 
console.log(prevLast) // -> 전 달 마지막 날짜로 나옴
console.log(prevDate) // -> 30
console.log(prevDay) // -> 4 (=목요일)

//이번 달 마지막 날짜 가져오기
const thisLast = new Date(viewYear, viewMonth+1, 0);
const thisDate = thisLast.getDate();
const thisDay = thisLast.getDay();

//한번 찍어봅시다! 
console.log(thisLast) // -> 이번 달 마지막 날짜로 나옴
console.log(thisDate) // -> 31
console.log(thisDay) // -> 0 (=일요일)

//전체 달력에 필요한 날짜들을 만들어 주기 위한 배열
//지난 달과 다음 달 날짜는 상황에 따라 달라지기 때문에 빈 배열 
const prevDates = [];
const thisDates = [...Array(thisDate + 1).keys()].slice(1);
const nextDates = [];

// ... : 전개구문 (spread syntax) 배열이나 객체를 펼쳐 새로운 배열이나 객체 생성
// Array(n) : 길이가 n인 배열 생성 (요소들은 모두 undefined)
// keys() : 배열의 인덱스를 키로 가지는 객체를 만드는 메소드
// slice() : 배열에서 일정 부분을 잘라 새로운 배열을 만드는 메소드

// 그렇다면 해당 순서대로 이해해볼까요?
// 7월은 31일이므로 thisDate는 31이고, +1 했으므로 n = 32
// 'Array()'를 통해 길이가 32인 배열 생성
// '배열의 요소들은 현재 undefined 값. 
// 'keys()' 메소드를 통해 0부터 31까지 Array Iterator가 생성됨 (배열에서 인덱스를 keys를 가져오기 때문!)
// '...' 전개구문을 통해서 0부터 31까지의 요소 값을 가진 배열 생성
// 'slice' 메소드를 통해 제일 앞에 있는 0을 없앤 새로운 배열 생성

//이제 이전 달의 dates와 다음 달의 dates를 채워봅시다 !
//일주일을 넘지 않으므로 getDate를 통해 가져온 '요일'로 계산해줄거에요!

//이전 달의 마지막 요일이 토요일(6)이라면 굳이 그릴 필요가 없기 때문에 if문을 써줍니다.
//prevDay가 무슨 요일이었죠? 이전 달 6월은 마지막 요일이 목요일, 즉 5입니다.
//26(일), 27(월), 28(화), 29(수), 30(목) 을 집어넣어줘야 합니다. 
//*주의 : (마지막 요일 + 1)로 집어 넣어야 마지막 요일까지 들어가집니다!
//unshift() : 배열 앞쪽으로 넣는 메소드입니다
//차례대로 그러면 [30-4=26 >>> 30-3=27 >> 30-2=28 >>> 30-1 >>> 30-0]
if (prevDay !== 6) {
    for (let i=0; i<prevDay+1; i++){
        prevDates.unshift(prevDate - i);
    }
}

//1일부터 넣어줌
//thisDay가 뭐라고 했죠? 이번 달 마지막 날짜! -> 7월은 일요일 7
//push는 뒤에서 부터 채워넣는 메소드
for(let i=1; i <7-thisDay; i++){
    nextDates.push(i);
}

// !! 날짜 데이터를 html로 그려넣기
//concat() : 메서드를 통해 세 배열 합치기
// 이전 달 dates + 현재 달 dates + 다음 달 dates
// ex) dates = [26 27 28 29 30 1 2 3  ... 29 30 31 1 2 3 4 5 6]
const dates = prevDates.concat(thisDates, nextDates);

//forEach() : 전체 요소를 돌면서 html 코드로 데이터를 수정
dates.forEach((date, i) => {
    dates[i] = `<div class="date">${date}</div>`;
});

//확인해보기! 엥 아무것도 없네? 우리가 위에 한 것은 그려넣은 것 X
//dates 배열을 수정해준 것.
//dates [<div class="date">26</div>, <div class="date">27</div> ... ]
//이렇게 배열을 수정해줬으니 이제 html에 찍어내줍시다!

//dates 클래스 영역에 dates 배열에, join 메서드를 호출한 결과를, 그려넣음
//join('')을 해주는 이유 중간에 "," 값이 들어가짐
document.querySelector('.dates').innerHTML = dates.join('');

//만들고 개발자 도구로 확인!
//확인해보면 <div class="date">26</div> .... <div class="date">6</div> 생성되어있음


//~~~~~~~~~~~함수로 정리하기~~~~~~~~~~~

//Date 객체 생성
let date = new Date();

const makeCalendar = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    //캘린더 년도 달 채우기
    document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

    //이전 달 마지막 날짜 가져오기
    const prevLast = new Date(viewYear, viewMonth, 0);
    const prevDate = prevLast.getDate();
    const prevDay = prevLast.getDay();

    //이번 달 마지막 날짜 가져오기
    const thisLast = new Date(viewYear, viewMonth+1, 0);
    const thisDate = thisLast.getDate();
    const thisDay = thisLast.getDay();

    //전체 달력에 필요한 날짜들을 만들어 주기 위한 배열
    const prevDates = [];
    const thisDates = [...Array(thisDate + 1).keys()].slice(1);
    const nextDates = [];

    //prevDates 계산
    if (prevDay !== 6) {
        for (let i=0; i<prevDay+1; i++){
            prevDates.unshift(prevDate - i);
        }
    }

    //nextDates 계산
    for(let i=1; i <7-thisDay; i++){
        nextDates.push(i);
    }

    //Dates 합치기
    const dates = prevDates.concat(thisDates, nextDates);

    dates.forEach((date, i) => {
        dates[i] = `<div class="date">${date}</div>`;
    });

    //Dates 그리기
    document.querySelector('.dates').innerHTML = dates.join('');
}

//바로 함수 실행하여 이번 달 함수 그리기
makeCalendar()

//이전 달 그리기
const prevMonth = () => {
    date.setMonth(date.getMonth() - 1);
    makeCalendar();
}
  
//다음 달 그리기
const nextMonth = () => {
    date.setMonth(date.getMonth() + 1);
    makeCalendar();
}

//현재 달 그리기
const curMonth = () => {
    date = new Date();
    makeCalendar();
}

// Dates 정리
const firstDateIndex = dates.indexOf(1);
const lastDateIndex = dates.lastIndexOf(thisDate);

dates.forEach((date, i) => {
    //삼항연산자
    const condition = i >= firstDateIndex && i < lastDateIndex + 1 
                    ? 'this' //true일 경우
                    : 'other'; // flase일 경우

    //삼항연산자와 같은 표현
    if (i >= firstDateIndex && i < lastDateIndex + 1) {
        condition = 'this';
    } else {
        condition = 'other';
    }

  dates[i] = `<div class="date"><span class="${condition}">${date}</span></div>`;
})

//오늘 날짜 체크하기 
const today = new Date();
// 이번 년도의 달을 보고 있는 것이 아니면 보여줄 필요가 없으므로 if로 나타냄
// 지금 보고있는 캘린더의 viewMonth와 viewYear가 today 데이터와 같은지 비교
if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    // 같다면, this라는 클래스를 가진 태그를 찾아내서 반복문을 돌려줌
    for (let date of document.querySelectorAll('.this')) {
        // 단항 연산자를 통해 숫자로 변경한 뒤, 오늘 날짜와 비교
        if (+date.innerText === today.getDate()) {     
            //해당 태그에 today라는 클래스를 추가
            date.classList.add('today');
            //오늘 날짜를 찾으면 그 이후는 찾을 필요가 없기 때문에 break
            break;
        }
    }
}