// const date = new Date(); //현재 날짜 객체 만들기
// const date2 = new Date(2023, 10, 2); //지정 날짜 객체 만들기

// console.log(date);
// console.log(date2);

// // 년, 달, 일, 요일 가져오기

// const viewYear = date.getFullYear(); // 년도 가져오기
// const viewMonth = date.getMonth(); // 달 가져오기
// const viewDate = date.getDate(); // 일 가져오기
// const viewDay = date.getDay(); // 요일 가져오기

// console.log(viewYear); // 2023
// console.log(viewMonth); // 0  -> 0~11 숫자 반환 <<< 중요
// console.log(viewDate); // 5 -> 1~31 숫자 반환
// console.log(viewDay); // 4 -> 1~7 숫자 반환 1(월) 2(화) 3(수) 4(목) ...

// // 지난 달 마지막 날짜와 요일 & 이번 달 마지막 날짜와 요일


// //이전 달 마지막 날짜 가져오기
// const prevLast = new Date(viewYear, viewMonth, 0);
// const prevDate = prevLast.getDate();
// const prevDay = prevLast.getDay(); // 토요일(6)

// //한번 찍어봅시다! 
// console.log(prevLast) // -> 저번 달 마지막 날짜
// console.log(prevDate) // -> 31
// console.log(prevDay) // -> 6

// //이번 달 마지막 날짜 가져오기
// const thisLast = new Date(viewYear, viewMonth+1, 0);
// const thisDate = thisLast.getDate();
// const thisDay = thisLast.getDay();

// //한번 찍어봅시다! 
// console.log(thisLast) // -> 이번 달 마지막 날짜로 나옴
// console.log(thisDate) // -> 31
// console.log(thisDay) // -> 2 (요일)

// const prevDates = []; // [26, 27, 28, 29, 30, 31]
// const thisDates = [...Array(thisDate + 1).keys()].slice(1); // [1, 2, 3,  .... 31]
// const nextDates = []; // [1, ... 4]




// // ... 

// // Array() 

// // thisDate + 1 = 31 + 1 = 32
// // Array(32).keys()
// // [undefined, undefined, undefined ... ].keys()
// // [[0, 1, 2, 3, 4, ... 31]]
// // [...Array(thisDate + 1).keys()] = [0, 1, 2, 3, 4, 5, 6, ... 31]
// // [...Array(thisDate + 1).keys()].slice(1) = [1, 2, 3, 4, 5, 6, ... 31]

// // (1) ...
// // (2) Array()
// // (3) keys()
// // (4) slice()


// // [1, 2, 3, 4, 5, 6, ... 31]


// //이전 달 날짜 배열 채우기
// //저번 달이 목요일 경우! -> 목요일 4, prev = 31
// if (prevDay !== 6) { // 전 달 마지막 요일이 토요일이면, 전 달 날짜 배열이 필요 없음 
//     for(let i=0; i < prevDay+1; i++) {
//         //for (let i=0, i<4+1; i++)
//         prevDates.unshift(prevDate - i);
//         // 31-0, 31-1, 31-2, 31-3, 31-4
//         // 31,    30,   29,    28,  27
//         // [31]
//         // [30, 31]
//         // [29, 30, 31]
//         // [28, 29, 30, 31]
        
//     }
// }

// //=> [27, 28, 29, 30, 31]


// //다음 달 날짜 배열 채우기
// for(let i=1; i < 7-thisDay; i++) {
//     //for(let i=1; i < 5 ; i++)
//     nextDates.push(i);
//     // 1, 2, 3, 4
//     // [1]
//     // [1,2]
//     // [1,2,3]
//     // [1,2,3,4]
// }
// // => [1,2,3,4]


// // const prevDates = []; // =>  []
// // const thisDates = [...Array(thisDate + 1).keys()].slice(1); // => [1, 2, 3,  .... 31]
// // const nextDates = []; // => [1,2,3, 4]

// // ***
// // unshift()
// // push()

// // arr = [3,4,5,6]
// // [0,1,2]
// // arr.unshift(2)
// // arr.unshift(1)
// // arr.unshift(0)

// // [0,1,2,3,4,5,6]

// // arr.push(7)
// // arr.push(8)
// // arr.push(9)

// //날짜 그리기

// //Dates 라는 배열로 모두 합치기
// const dates = prevDates.concat(thisDates, nextDates);
// // => [] + [1, ~ 31] + [1, ~ 4]
// // => [1, ... 31, 1 ... 4]


// // div로 감싸서 배열에 넣기
// dates.forach((date, i) => {
//     dates[i] = `<div class="date"> ${date} </div>`; 
// });

// => [<div class="date"><span class="this"> 1 </span></div>, 
// <div class="date"> 2 </div>, 
// <div class="date"> 3 </div>,
// <div class="date"> 4 </div>, 
// <div class="date"> 5 </div>, 
// <div class="date"> 6 </div>, 
// <div class="date"> 7 </div>, 
// <div class="date"> 8 </div>, 
// ...
// <div class="date"> 31 </div>, 
// <div class="date"> <span class="other"> 1 </span></div>, 
// <div class="date"> 1 </div>,
// ...
// <div class="date"> 4 </div>
// ]

// // html dates 그리기
// document.querySelector('.dates').innerHTML = dates.join('');


//캘린더 만드는 함수 만들기

//const date = new Date();

// ~~~~~~~~~~~~~~~~실제 캘린더 js 코드~~~~~~~~~~~~~~~~~~~~~~~
let date = new Date();

const makeCalendar = () => {
    // 캘린더에 보이는 년도와 달을 보여주기 위해
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    //캘린더 년도 달 채우기
    document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth+1}월 ` // 2023년 1월

    //이전 달 마지막 날짜 가져오기
    const prevLast = new Date(viewYear, viewMonth, 0);
    const prevDate = prevLast.getDate();
    const prevDay = prevLast.getDay(); // 토요일(6)

    //이번 달 마지막 날짜 가져오기
    const thisLast = new Date(viewYear, viewMonth+1, 0);
    const thisDate = thisLast.getDate();
    const thisDay = thisLast.getDay();

    //전체 달력에 필요한 날짜들을 만들어주기
    const prevDates = [];
    const thisDates = [...Array(thisDate + 1).keys()].slice(1);
    const nextDates = [];

    //이전 달 날짜 배열 채우기
    if (prevDay !== 6) { // 전 달 마지막 요일이 토요일이면, 전 달 날짜 배열이 필요 없음 
        for(let i=0; i < prevDay+1; i++) {
            prevDates.unshift(prevDate - i);
        }
    }
    //다음 달 날짜 배열 채우기
    for(let i=1; i < 7-thisDay; i++) {
        nextDates.push(i);
    }

    //Dates 라는 배열로 모두 합치기
    const dates = prevDates.concat(thisDates, nextDates);

    // div로 감싸서 배열에 넣기
    dates.forach((date, i) => {
        dates[i] = `<div class="date"> ${date} </div>`; 
    });

    // html dates 그리기
    document.querySelector('.dates').innerHTML = dates.join('');

    // 오늘 날짜 표시
    const today = new Date();
    if (viewMonth === today.getMonth && viewYear === today.getFullYear()) {
        for (let date of document.querySelectorAll('.this')) {
            if (+date.innerText === today.getDate()) {
                date.classList.add('today');
                break;
            }
        }
    }

    // 현재 달 첫번째 시작일의 인덱스, 마지막 일의 인덱스
    const firstDateIndex = dates.indexOf(1); //0
    const lastDateIndex = dates.lastInexOf(thisDate); // ?


    dates.forach((date, i) => {
        //삼항연산자 [조건문] ? [참일 때 실행] : [거짓일 때 실행]
        // if (조건문) {참일 때 실행} else {거짓일 때 실행}
        const condition = i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other'; 

        dates[i] = `<div class="date"> ${date} </div>`
        dates[i] = `<div class="date"><span class="${condition}">${date}</span><div>`
    });
}

//함수 실행
makeCalendar();

//이전 달 그리는 함수
const prevMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    makeCalendar();
}

//다음 달 그리는 함수
const nextMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    makeCalendar();
}

//현재 달 그리는 함수
const curMonth = () => {
    date = new Date();
    makeCalendar();
}


// ***
// indexOf -> 첫번째 요소 인덱스
// lastInexOf -> 마지막 요소 인덱스
// 삼항연산자 -> 조건문 ? 참 : 거짓
// *** 