function textTyping(){
    console.log("수정했다에요");
    /* I'm a <- 한번만 타이핑 해줄 텍스트 효과 */
    const text = document.querySelector(".text");
    // div 태그 선택
    let mainText = "I'm a "; //length=6;
    // 텍스트 변수에 담아줌
    let mainIndex = 0;
    // 메인텍스트의 증가하는 n번째 순번값 가져오기 위한 변수

    /* 텍스트가 나타났다 지워지는 출력하기 위한 자동실행 함수 */
    let backAutoTyping; // 변수 생성 후 값을 할당하지 않았음

    /* 메인텍스트 출력하기 위한 자동실행 함수 */
    let fronAutoTyping = setInterval(function(){
        //.2초가 지나면
        text.innerText += mainText[mainIndex];
        //선택한 div에 mainIndex번째 mainText를 더해줌
        mainIndex++; // mainIndex 순번값 1 증가
        if(mainIndex >= mainText.length){ 
            //글자 타이핑이 전부 끝났을 때(메인텍스트 길이와 순번값이 같거나 커질때)
            clearInterval(fronAutoTyping); 
            // fronAutoTyping 종료

            /* 뒷 글자 출력을 위한 태그 생성(자식요소) */
            let child = document.createElement("span");
            child.setAttribute("class", "child");
            // <span class="child"></span> 생성됨
            text.append(child);
            // prepend 쓰면 frontText 앞에 span태그가 생성됨
            /* 앞 글자 타이핑 종료 후 뒷 글자 출력을 위한 자동 실행 */
            backAutoTyping = setInterval(function(){
                // 함수 호출 구간
                typing();
            },200);
        }
    },200);

    // 출력될 텍스트 배열
    let backTextList = ["Publisher", "Web Designer", "Front end", "Back end"];

    // BackTextList[순번값] subIndex
    let subIndex = 0;
    // BackTextList[n]의 글자데이터를 한 글자씩 가져오기 위한 순번값 backIndex
    let backIndex = 0;
    // 뒤에서부터 한 글자씩 지워지는 효과를 위한 순번값 maxIndex
    let maxIndex = 0;

    /* frontText 뒷 글자 출력을 위한 함수 선언 구간 */
    function typing(){
    // 생성된 span 태그 안에 글자를 한 글자씩 타이핑하기 위한 기능 구현
        const subText= document.querySelector(".text .child");
        // 함수 안에서 아까 만든 span 태그 선택

        /* 배열 안에 있는 한 단어의 한 글자씩 출력하기 위한 조건문 */
        if(backIndex < backTextList[subIndex].length){
            // backIndex가 backTextList의 [subIndex]번째 글자의 길이보다 작습니까?
            subText.innerText += backTextList[subIndex].charAt(backIndex);
            // backTextList[subIndex]의 글자를 0번째 글자부터 한 글자씩 넣어주세요(배열 안의 문자열의 한 글자씩을 span 태그에 출력 후)
            backIndex++; // backIndex 순번값 1 증가
            /* 배열 안에 있는 문자열(한 문장)출력이 끝났을 때 조건 설정 */ 
            if(backIndex >= backTextList[subIndex].length){
            /* 일정 시간 동안 멈췄다가 텍스트를 거꾸로 한 글자씩 지우는 기능 수행 */
                maxIndex = backTextList[subIndex].length;
                // 한 문장의 글자 갯수값을 변수에 할당
                stopAndStart(); /* 중복 구간 함수로 정리 */
            }
        }
        // backIndex가 해당 단어의 길이와 같거나 커지면 else if 구간 실행
        /* 배열 안에 있는 한 단어의 한 글자씩 제거하기 위한 조건문 */
        else if(maxIndex >= 0){
        // backIndex가 해당 단어의 길이와 같거나 커졌을 때, maxindex가 0과 같거나 크다면
            subText.innerText = backTextList[subIndex].substring(0,maxIndex);
            // 바뀌어서 보여줄 텍스트 출력 (+= 쓰면 이상하게 나옴)
            // 배열 안에 있는 한 문장의 글자를 하나씩 제외하면서 화면에 출력
            // if문에서 maxIndex = backTextList[subIndex].length로 대입해놨었음
            maxIndex--; // maxIndex 순번값 1 감소

            if(maxIndex < 0){ 
            // 더이상 출력할 글자가 없을 때(한 문장의 글자 제거가 전부 끝나면)
                backIndex = 0; 
                //다음 문장의 첫 번째 글자에서부터 출력하기 위해 문장당 글자 갯수를 위한 변수를 0으로 초기화
                
                if(subIndex == backTextList.length -1){
                // 증가시킨 subIndex가 문장배열길이-1 (3)과 같다면
                    subIndex = 0; //subIndex를 0으로 되돌려서 무한실행시킴
                }
                else{
                // 증가시킨 subIndex가 문장배열길이-1 과 다르다면 (0,1,2)
                    subIndex++; 
                    //다음 순번의 문장을 출력하기 위해 subindex 숫자값 1 증가
                }
                stopAndStart(); /* 중복 구간 함수로 정리 */
            }
        }  
    }

    /* 텍스트 타이핑 작성/제거 끝나고 3초 딜레이 후 재실행 함수 */
    function stopAndStart(){
        clearInterval(backAutoTyping);
        // typing 실행하는 구간인 backAutoTyping 멈춤
        setTimeout(function(){
            // 3초 뒤에 자동실행 다시 시작
            backAutoTyping = setInterval(function(){
                typing(); /* typing 다시 불러와서 실행하는데,
                지워지는 구간인 else if 구간 실행하게 함 */
            },200);
        },3000);
    }
}