<template>

  <!-- 네비바 -->
  <div class="collapse" id="navbarToggleExternalContent">
    <div class="bg-orange mb-0" style="position: absolute; left: 0; top: 56px; width: 220px; z-index: 1000;" >
      <!-- <h5 class="text-black h4">Collapsed content</h5>
      <span class="text-muted">Toggleable via the navbar brand.</span> -->

      <div class="sidebar" >
        <!-- 사이드바 내용 -->
        <ul class="sidebar_ul" >
            <li @click="selectMenu(1)">홈</li>
            <li @click="selectMenu(2)">농장 상태 확인</li>
            <li @click="selectMenu(3)">농장 기기 확인</li>
            <li @click="selectMenu(4)">스케줄링 예약</li>
            <li @click="selectMenu(5)">농장 선택</li>
            <li @click="selectMenu(6)">MyPage</li>
        </ul>

      </div>

    </div>
  </div>
  <nav class="navbar mb-0" style="background-color: #93C572;" v-show="nav_show" >
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation"
          @click="clickMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>

  <!-- isClick 값이 true일 때 배경의 투명도를 50%로 하는 스타일 적용 -->
  <div class="container" v-bind:class = "{ 'opacity-50' : isClick }"
    @click="isClick ? clickMenu() : null" >
    <router-view/>
  </div>

</template>

<script>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  components: {},
  setup() {

    // store 변수, router 변수
    const store = useStore();
    const router = useRouter();
    // 전역 변수인 user_email값 호출
    const user_email = store.state.user_email;
    // NavBar 보여주기 여부
    const nav_show = computed(() => store.state.show_nav);

    
    // 메뉴 선택 메서드
    const selectMenu = (select_id) => {
      console.log("select Id : ", select_id);

      switch (select_id) {
        case 1:
          router.push({
              name : "Main"
          })
          clickMenu();  // 다시 메뉴바 닫기
          break;
        case 2:
          router.push({
              name : "HouseStatusPage"
          })
          clickMenu();  // 다시 메뉴바 닫기
          break;
        case 3:
          router.push({
              name : "HouseMachinePage"
          })
          clickMenu();  // 다시 메뉴바 닫기
          break;
        case 4:
          router.push({
              name : "ListReservationPage"
          })
          clickMenu();  // 다시 메뉴바 닫기
          break;
        case 5:
          router.push({
              name : "SelectHousePage"
          })
          clickMenu();  // 다시 메뉴바 닫기
          break;
        case 6:
          router.push({
              name : "MyPage"
          })
          clickMenu();  // 다시 메뉴바 닫기
          break;
        default:
          break;
      }

    }

    // 네비바 선택에 따라 분기 설정
    // isClick - true일 때 : 메뉴바가 열린 상태 + 배경 투명도 + 배경 누르면 메뉴 닫히게
    // isClick - false일 떼 : 메뉴바가 닫힌 상태 
    const isClick = ref(false);
    const clickMenu = () => {

      if(isClick.value){
        console.log("현재 메뉴바가 열린 상태입니다. 이제 배경울 누르면 메뉴바가 사라질 것입니다.")
        
        // Bootstrap의 collapse 기능을 사용하여 메뉴를 닫음
        const navbar = document.getElementById('navbarToggleExternalContent');
        $(navbar).collapse('hide');
      }

      // isClick의 값 변경
      isClick.value = !isClick.value;
      console.log(isClick.value + "상태입니다.")
    } 
    

    return {
      selectMenu,
      user_email,
      clickMenu,
      isClick,
      nav_show
    }
  }
};
</script>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap'); */

#app {
  font-family: "Gowun Dodum", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* list 형태 제거 */
.sidebar_ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* sidebar 메뉴 설정 */
li {
  background-color : #ffffff;
  color: rgb(0, 0, 0);
  border: 1px, solid, black;
  font-weight: bold;
  text-align: left;
  padding : 12px;
  /* margin-right: 50px; */
}

 /* 애니메이션 속도 조정 */
#navbarToggleExternalContent {
  transition: all 0.1s ease;
}

/* 배경 투명도 */
.opacity-50 {
  background-color: rgba(255, 255, 255, 0.5); /* 배경색과 투명도 설정 */
}
</style>
