<template>

  <div class="container" >

    <!-- 제목 -->
    <h2 class="page-title">전체 메뉴</h2>
    <hr>

  

  <!-- 메뉴 카드 리스트 -->
  <div class="row">
    <div 
      v-for="menu, id in menus" 
      :key="id" 
      class="col-md-4 col-sm-6 mb-4"
    >
      <div class="card" @click="selectMenu(id)">
        <h4>{{menu.title}}</h4>
        <p style="color: darkgray;" >
          {{menu.body}}
        </p>
      </div>
    </div>
  </div>

  </div>

</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref} from 'vue';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    // NavBar 보이기
    store.dispatch('triggerSHOWNAV', true, Boolean);

    const menus = ref([
      { title : '농장 선택', body : '상태 확인을 진행할 농장을 다시 선택하는 페이지입니다.' },
      { title : '사용자 설정', body : '사용자가 설정해두었던 온도, 습도, CO2, 일사량, 토양 수분, 토양 산성을 확인하고 수정하는 페이지입니다.'},
      { title : 'My Page', body : '사용자 정보와 농장 정보를 확인할 수 있는 페이지입니다.'}
      ]);

    // 메뉴 선택 메서드
    const selectMenu = (select_id) => {
      console.log("menu page - select Id : ", select_id++);

      switch (select_id) {
        case 1:
          router.push({
              name : "SelectHousePage"
          })
          break;
        case 2:
          router.push({
              name : "UserSettingPage"
          })
          break;
        case 3:
          router.push({
              name : "MyPage"
          })
          break;
        default:
          break;
      }

    }

    return {
      menus,
      selectMenu
    }
  } 
}
</script>

<style scoped>
.page-title {
  font-weight: bold;
  margin-top : 1em;
  margin-bottom: 0.5em;
}

/* flex 설정 */
.container {
    display: flex;
    flex-direction: column;
    height: 80vh;
}

.card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 16px;
  text-align: left;
  transition: transform 0.2s;
}

</style>