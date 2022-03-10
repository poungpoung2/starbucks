/**
 * 검색창 제어
 */
// 검색창 요소(.search) 찾기.
const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");
// 검색창 요소를 클릭하면 실행.
searchEl.addEventListener("click", function () {
    searchInputEl.focus();
});
// 검색창 요소 내부 실제 input 요소에 포커스되면 실행.
searchInputEl.addEventListener("focus", function () {
    searchEl.classList.add("focused");
    searchInputEl.setAttribute("placeholder", "통합검색");
});
// 검색창 요소 내부 실제 input 요소에서 포커스가 해제(블러)되면 실행.
searchInputEl.addEventListener("blur", function () {
    searchEl.classList.remove("focused");
    searchInputEl.setAttribute("placeholder", "");
});

/**
 * 페이지 스크롤에 따른 요소 제어
 */
// 페이지 스크롤에 영향을 받는 요소들을 검색!
const badgeEl = document.querySelector("header .badges");
const toTopEl = document.querySelector("#to-top");
// 페이지에 스크롤 이벤트를 추가!
// 스크롤이 지나치게 자주 발생하는 것을 조절(throttle, 일부러 부하를 줌)
window.addEventListener(
    "scroll",
    _.throttle(function () {
        // 페이지 스크롤 위치가 500px이 넘으면.
        if (window.scrollY > 500) {
            // Badge 요소 숨기기!
            gsap.to(badgeEl, 0.6, {
                opacity: 0,
                display: "none",
            });
            // 상단으로 스크롤 버튼 보이기!
            gsap.to(toTopEl, 0.2, {
                x: 0,
            });

            // 페이지 스크롤 위치가 500px이 넘지 않으면.
        } else {
            // Badge 요소 보이기!
            gsap.to(badgeEl, 0.6, {
                opacity: 1,
                display: "block",
            });
            // 상단으로 스크롤 버튼 숨기기!
            gsap.to(toTopEl, 0.2, {
                x: 100,
            });
        }
    }, 300)
);

toTopEl.addEventListener("click", function () {
    gsap.to(window, 0.7, {
        scrollTo: 0,
    });
});

/**
 * 순서대로 나타나는 기능
 */
// 나타날 요소들(.fade-in) 찾기.
const fadeEls = document.querySelectorAll(".visual .fade-in");
// 나타날 요소들을 하나씩 반복해서 처리!
fadeEls.forEach(function (fadeEl, index) {
    // 각 요소들을 순서대로(delay) 보여지게 함!
    gsap.to(fadeEl, 1, {
        delay: (index + 1) * 0.7,
        opacity: 1,
    });
});

/**
 * 슬라이드 요소 관리
 */
new Swiper(".notice-line .swiper-container", {
    direction: "vertical", // 수직 슬라이드
    autoplay: true, // 자동 재생 여부
    loop: true, // 반복 재생 여부
});

new Swiper(".promotion .swiper-container", {
    slidesPerView: 3, //한번에 보여줄 슬라이드 개수
    spaceBetween: 10, //슬라이드 사이 여백
    centeredSlides: true, //1번 슬라이드가 가운데 보이기
    loop: true, //반복 재생
    autoplay: {
        delay: 5000,
    },
    pagination: {
        el: ".promotion .swiper-pagination", //페이지 번호 요소 선택자
        clickable: true, //사용자의 페이지 번호 요소 제어
    },
    navigation: {
        prevEl: ".promotion .swiper-prev",
        nextEl: ".promotion .swiper-next",
    },
});

new Swiper(".awards .swiper-container", {
    autoplay: true,
    loop: true,
    slidesPerView: 5,
    spaceBetween: 30,
    centeredSlides: true,
    navigation: {
        prevEl: ".awards .swiper-prev",
        nextEl: ".awards .swiper-next",
    },
});

/**
 * Promotion 슬라이드 토글 기능
 */
// 슬라이드 영역 요소 검색!
const promotionEl = document.querySelector(".promotion");
// 슬라이드 영역를 토글하는 버튼 검색!
const promotionToggleBtn = document.querySelector(".toggle-promotion");
// 슬라이드 영역 숨김 여부 기본값!
let isHidePromotion = false;
// 토글 버튼을 클릭하면,
promotionToggleBtn.addEventListener("click", function () {
    // 슬라이드 영역 숨김 여부를 반댓값으로 할당!
    isHidePromotion = !isHidePromotion;
    // 요소를 숨겨야 하면,
    if (isHidePromotion) {
        promotionEl.classList.add("hide");
        // 요소가 보여야 하면,
    } else {
        promotionEl.classList.remove("hide");
    }
});
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}
function floatingObject(selector, delay, size) {
    gsap.to(
        selector, //선택자
        random(1.5, 2.5), //애니메이션 동작 시간
        {
            //옵션
            y: size,
            repeat: -1,
            yoyo: true, //다시 뒤로 재생
            ease: Power1.easeOuteaseOut,
            delay: random(0, delay),
        }
    );
}

floatingObject(".floating1", 1, 15);
floatingObject(".floating2", 0.5, 15);
floatingObject(".floating3", 1.5, 20);

const spyEls = document.querySelectorAll("section.scroll-spy");
spyEls.forEach(function (spyEl) {
    new ScrollMagic.Scene({
        triggerElement: spyEl, //보여짐 여부 감시할 요소를 지정
        triggerHook: 0.8,
    })
        .setClassToggle(spyEl, "show")
        .addTo(new ScrollMagic.Controller());
});

const thisYear = document.querySelector(".this-year");
thisYear.textContent = new Date().getFullYear(); //2022
