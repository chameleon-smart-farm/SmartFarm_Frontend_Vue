<template>
  <div class="container">
    <!-- 제목 -->
    <h2 class="page-title">사용자 설정</h2>
    <hr>

    <div class="list-container" > <!-- 최소 높이 설정 -->

    <!-- 조회 모드 -->
    <div v-if="!editMode" class="row">
      <div class="col-6 mb-4" v-for="item in settings" :key="item.key">
        <div class="setting-card h-100">
          <h5>{{ item.icon }} {{ item.label }}</h5>
          <p class="value-text mt-5">{{ item.value }} {{ item.unit }}</p>
        </div>
      </div>
    </div>

    <!-- 수정 모드 -->
    <div v-else class="row">
      <div class="col-6 mb-4" v-for="item in settings" :key="item.key">
        <div class="setting-card">
          <h5>{{ item.icon }} {{ item.label }}</h5>
          <!-- 슬라이더 또는 입력 필드 -->
          <input 
            type="range" 
            v-model="item.value" 
            min="0" 
            max="999" 
            class="form-range"
          >
          <div class="d-flex align-items-center">
            <button 
              @click="item.value = Math.max(item.min ?? 0, item.value - 1)" 
              class="btn btn-outline-secondary"
            >-</button>

            <input 
              type="number" 
              v-model.number="item.value" 
              :min="item.min ?? 0" 
              :max="item.max ?? 999" 
              class="form-control mx-2"
            >

            <button 
              @click="item.value = Math.min(item.max ?? 999, item.value + 1)" 
              class="btn btn-outline-secondary"
            >+</button>
          </div>
          <p class="value-text">{{ item.value }} {{ item.unit }}</p>
        </div>
      </div>
    </div>

    <!-- 버튼 -->
    <div class="text-center mt-4 mb-2">
      <button v-if="!editMode" class="btn btn-warning btn-lg" @click="startEdit">수정</button>
      <div v-else>
        <button class="btn btn-primary btn-lg me-2" @click="saveSettings">저장</button>
        <button class="btn btn-outline-secondary btn-lg" @click="cancelEdit">취소</button>
      </div>
    </div>

    </div> 
    <!-- 최소 높이 설정 -->

  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { get_user_setting_info, post_user_setting, set_access_token } from '@/axios';

export default {
  setup() {

    // store 변수, router 변수
    const store = useStore();
    const router = useRouter();

    // NavBar 보이기
    store.dispatch('triggerSHOWNAV', true, Boolean);

    // 수정 모드
    const editMode = ref(false);

    // 사용자 설정 항목들
    const settings = ref([
      { key: 'user_tem', label: '온도', icon: '🌡️', value: 999, unit: '℃', type: 'range', min: 15, max: 35 },
      { key: 'user_hum', label: '습도', icon: '💧', value: 99, unit: '%', type: 'range', min: 0, max: 100 },
      { key: 'user_co2', label: 'CO2', icon: '🌬️', value: 99, unit: 'ppm', type: 'number' },
      { key: 'user_solar', label: '일사량', icon: '☀️', value: 99, unit: 'W/m²', type: 'number' },
      { key: 'user_soil', label: '토양 수분', icon: '🌱', value: 99, unit: '%', type: 'range', min: 0, max: 100 },
      { key: 'user_ph', label: '토양 산성', icon: '🧪', value: 99, unit: 'pH', type: 'number' }
    ]);

    // 값 가져오기
    const getUserSetting = async () => {

        for(const s of settings.value ){
            await get_user_setting_info(s.key, store.state.house_id)
                .then((response) => {
                    s.value = response.data.value;
                    console.log( s.key + " : " + response.data.value)
                })
                .catch(async (e) => {
            
                    /**
                     * 토큰 만료 오류
                     * 401 에러와 함께 새로운 토큰이 왔다면 기존의 access_token 값에 덮어 씌우고 다시 메서드 요청
                     * 400 ~ 599 에러라면 에러 메시지 출력
                     * 다른 오류라면 login 페이지로 이동
                     */
                    if(e.status === 401 && e.response.data.new_access_token !=null){
                        set_access_token(e.response.data.new_access_token);
                        // 오류가 발생한 항목만 재호출
                        const retryResponse = await get_user_setting_info(s.key, store.state.house_id);
                        s.value = retryResponse.data.value;
                        console.log( "re_" + s.key + " : " + retryResponse.data.value)
                    }else if (e.status === 401){
                        router.push({
                            name : "Login"
                        })
                    }
                    else if(e.status >= 400 && e.status < 600){
                        console.log("MainPage 에러 : " + e);
                    }else{
                        router.push({
                            name : "Login"
                        })
                    }
                })
        }


    };

    getUserSetting();

    // 원래 값 저장용
    let originalSettings = [];

    const startEdit = () => {
      // 수정 모드 시작 시 현재 값을 복사해둠
      originalSettings = JSON.parse(JSON.stringify(settings.value));
      editMode.value = true;
    };

    // 설정 수정
    const saveSettings = async () => {

      for(const s of settings.value ){

        const data = { "value" : s.value };

        await post_user_setting(store.state.house_id, s.key, data)
          .then(() => {
              editMode.value = false;
          })
          .catch((e) => {
      
              /**
               * 토큰 만료 오류
               * 401 에러와 함께 새로운 토큰이 왔다면 기존의 access_token 값에 덮어 씌우고 다시 메서드 요청
               * 400 ~ 599 에러라면 에러 메시지 출력
               * 다른 오류라면 login 페이지로 이동
               */
              if(e.status === 401 && e.response.data.new_access_token !=null){
                  set_access_token(e.response.data.new_access_token);
                  getUserSetting();
              }else if (e.status === 401){
                  router.push({
                      name : "Login"
                  })
              }
              else if(e.status >= 400 && e.status < 600){
                  console.log("MainPage 에러 : " + e);
              }else{
                  router.push({
                      name : "Login"
                  })
              }
          })

      }

      getUserSetting();
      
    };

    const cancelEdit = () => {
      // 원래 값으로 되돌리기
      settings.value = JSON.parse(JSON.stringify(originalSettings));
      editMode.value = false;
    };

    return {
      editMode,
      settings,
      startEdit,
      saveSettings,
      cancelEdit
    };
  }
};
</script>

<style scoped>

.page-title {
  font-weight: bold;
  margin-top : 0.5em;
  margin-bottom: 0.5em;
}

/* 최소 높이 */
.list-container {
  /* min-height: 45em; */
  /* border: 1px solid red; */
}

.setting-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 16px;
  text-align: center;
  transition: transform 0.2s;
}
.setting-card:hover {
  transform: translateY(-4px);
}

.setting-card h5 {
  margin-bottom: 12px;
  font-weight: bold;
}

.value-text {
  margin-top: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #4caf50;
}

.form-range {
  accent-color: #4caf50;
}
</style>
