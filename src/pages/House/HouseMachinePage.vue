<template>
  <!-- 제목 -->
  <div class="text_align mt-3">
    <h2 v-once>{{ machine_name }} 상태</h2>
    <hr v-once>
  </div>

  <!-- 로딩 중일 때 스켈레톤 -->
  <div v-if="loading" class="card status-card">
    <div class="card-body text-center">
      <div class="skeleton-icon"></div>
      <div class="skeleton-text"></div>
    </div>
  </div>

  <!-- 기기 상태 -->
  <div v-else class="card status-card">
    <div class="card-body text-center">
      <img 
        v-show="machine_status" 
        src="@/assets/Animation - 1744126697158.gif" 
        alt="작동 중" 
        class="status-icon"
      >
      <img 
        v-show="!machine_status" 
        src="@/assets/image.png" 
        alt="대기 중" 
        class="status-icon"
      >
      <p class="status-text" :class="machine_status ? 'on' : 'off'">
        {{ machine_status ? '작동 중' : '대기 중' }}
      </p>
    </div>
  </div>

  <!-- 제어 버튼 -->
  <div class="text_align mt-4">
    <h2 v-once>{{ machine_name }} 제어</h2>
    <hr v-once>
  </div>

  <!-- 기기 on/off 버튼 -->
  <div class="row control-buttons">
    <div class="col-6 d-grid">
      <button 
        class="btn btn-success btn-lg" 
        @click="machineOnOff(1)" 
        :disabled="machine_status"
      >
        ON
      </button>
    </div>
    <div class="col-6 d-grid">
      <button 
        class="btn btn-danger btn-lg" 
        @click="machineOnOff(0)" 
        :disabled="!machine_status"
      >
        OFF
      </button>
    </div>
  </div>


</template>

<script>
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import { get_machine_info, post_machine_on_off, set_access_token } from '@/axios';

export default {

  setup(){
    // store 변수, router 변수, route 변수
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    // 기기 이름, 기기 kind
    const machine_name = route.query.name;
    const machine_short_name = route.query.short_name;

    // 로딩
    const loading = ref(true);

    // NavBar 보이기
    store.dispatch('triggerSHOWNAV',true, Boolean);

    // 기기 상태
    const machine_status = ref(false);

    // 기기 상태 조회 메서드
    const getMachineStatus = async () => {
        await get_machine_info(machine_short_name, store.state.house_id)
            .then((response) => {
                machine_status.value = response.data.value;
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
                getMachineStatus();
              }else if(e.status >= 400 && e.status < 600){
                console.log("MainPage 에러 : " + e.message);
              }else{
                router.push({
                    name : "Login"
                })
              }
            })

        loading.value = false;
    }

    getMachineStatus();

    // 기기 ON/OFF 제어
    const machineOnOff = async (status) => {

      const data = { "value" : status };

      await post_machine_on_off(store.state.house_id ,machine_short_name, data)
        .then(() => {
          getMachineStatus();
        })
        .catch((e) => {
          if (e.status === 401 && e.response.data.new_access_token != null) {
            set_access_token(e.response.data.new_access_token);
            machineOnOff(status);
          } else if (e.status >= 400 && e.status < 600) {
            console.log("DeviceList 에러 : " + e.message);
          } else {
            router.push({ name: "Login" });
          }
        });
    };

    return{
        loading,
        machine_name,
        machine_status,
        machineOnOff
    }
  }

}
</script>

<style scoped>

.text_align {
  text-align: left;
  margin: 2px;
  margin-bottom: 6px;
}

.card.status-card {
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  border-radius: 12px;
  margin: 1% 0;
}

.status-icon {
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
  transition: opacity 0.3s ease-in-out;
}

.status-text {
  font-size: 1.2rem;
  font-weight: bold;
}
.status-text.on {
  color: green;
}
.status-text.off {
  color: red;
}

.control-buttons button {
  height: 60px;
  font-size: 1.2rem;
  font-weight: bold;
}
.control-buttons button:hover {
  opacity: 0.9;
}

/* 스켈레톤 UI */
.skeleton-icon {
  width: 120px;
  height: 120px;
  background: #ddd;
  border-radius: 8px;
  margin: 0 auto 10px;
  animation: pulse 1.5s infinite;
}
.skeleton-text {
  width: 80px;
  height: 20px;
  background: #ddd;
  border-radius: 4px;
  margin: 0 auto;
  animation: pulse 1.5s infinite;
}
@keyframes pulse {
  0% { background-color: #f0f0f0; }
  50% { background-color: #e0e0e0; }
  100% { background-color: #f0f0f0; }
}

</style>