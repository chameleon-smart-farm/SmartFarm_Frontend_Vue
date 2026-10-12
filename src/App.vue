<template>

  <!-- 네비바 -->
  <nav class="navbar fixed-bottom navbar-light bg-light" v-show="nav_show">
    <div class="container-fluid">
      <ul class="navbar-nav d-flex flex-row justify-content-center">
        <li class="nav-item" @click.prevent="selectMenu(1)">
          <a class="nav-link" :class="{ active: select_id === 1 }" href="#">
            <i class="bi bi-house"></i><br>홈
          </a>
        </li>
        <li class="nav-item" @click.prevent="selectMenu(2)">
          <a class="nav-link" :class="{ active: select_id === 2 }" href="#">
            <i class="bi bi-thermometer-half"></i><br>센서
          </a>
        </li>
        <li class="nav-item" @click.prevent="selectMenu(3)">
          <a class="nav-link" :class="{ active: select_id === 3 }" href="#">
            <i class="bi bi-cpu"></i><br>기기
          </a>
        </li>
        <li class="nav-item" @click.prevent="selectMenu(4)">
          <a class="nav-link" :class="{ active: select_id === 4 }" href="#">
            <i class="bi bi-grid"></i><br>전체
          </a>
        </li>
      </ul>
    </div>
  </nav>



  <!-- isClick 값이 true일 때 배경의 투명도를 50%로 하는 스타일 적용 -->
  <div class="start-container" >
  <div class="app-container">
    <div class="page" >
      <router-view/>
    </div>
  </div>
  </div>

  <!-- 로딩 스피너 -->
  <SpinnerBar :loading="loading_status"></SpinnerBar>   

</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import SpinnerBar from './components/SpinnerBar.vue';
import { useRouter } from 'vue-router';
import { ref} from 'vue';

export default {
  name: 'App',
  components: {SpinnerBar,},
  setup() {

    // store 변수, router 변수
    const store = useStore();
    const router = useRouter();

    // NavBar 보여주기 여부
    const nav_show = computed(() => store.state.show_nav);

    // loading 여부
    const loading_status = computed(() => store.state.loading);

    // 선택된 메뉴
    const select_id = ref(1);
    
    // 메뉴 선택 메서드
    const selectMenu = (id) => {
      console.log("navbar-select Id : ", id);

      select_id.value = id;

      switch (id) {
        case 1:
          router.push({
              name : "Main"
          })
          break;
        case 2:
          router.push({
              name : "ListHouseStatusPage"
          })
          break;
        case 3:
          router.push({
              name : "ListHouseMachinePage"
          })
          break;
        case 4:
          router.push({
              name : "Menu"
          })
          break;
        default:
          break;
      }

    }

    return {
      selectMenu,
      loading_status,
      nav_show,
      select_id
    }
  }
};
</script>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap'); */

@import "bootstrap-icons/font/bootstrap-icons.css";

/* #app {
  font-family: "Gowun Dodum", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

/* 프리텐다드 폰트 */
#app {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Regular.woff2') format('woff2');
    font-weight: 400;
    text-align: center;
    font-display: swap;
}

/* list 형태 제거 */
.sidebar_ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* 네비바 내부 요소 */
li {
  margin: 8%;
  margin-top: 1%;
  /* border: 1px solid red; */
}

/* */
.navbar {
  height: 5em;
}

/* 네비바 요소 균등 배치 */
.navbar-nav {
  width: 100%;
  justify-content: space-around; /* 항목들을 균등하게 배치 */
}

 /* 애니메이션 속도 조정 */
#navbarToggleExternalContent {
  transition: all 0.1s ease;
}

/* 배경 투명도 */
.opacity-50 {
  background-color: rgba(255, 255, 255, 0.5); /* 배경색과 투명도 설정 */
}

/* 화면 중앙 정렬 */
.start-container {
  /* min-height: calc(100vh - 56px);             */
  display: flex;
  align-items: center;           
  justify-content: center;       
  box-sizing: border-box;
  /* border: 1px solid red; */
}

/* 네비바가 고정(fixed)이고 높이가 56px이면, 그만큼 빼서 중앙 계산 */
.navbar-fixed + .viewport {
  min-height: calc(100vh - 56px);
}

/* width 전체를 사용하게끔 변경 */
.app-container {
  width: 98%;                   
  /* max-width: 767px;               */
  box-sizing: border-box;
}

/* 페이지 내부 가로 100% 유지 */
.page {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
}

</style>
