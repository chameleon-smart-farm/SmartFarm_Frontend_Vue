<template>
  <!-- 제목 -->
  <div class="text_align mt-3">
    <h2 v-once>기기 리스트</h2>
    <hr v-once>
  </div>

  <!-- 검색/필터 -->
  <div class="row mb-3">
    <div class="col-8">
      <input v-model="searchQuery" type="text" class="form-control" placeholder="기기 검색...">
    </div>
    <div class="col-4">
      <select v-model="filterStatus" class="form-select">
        <option value="">전체</option>
        <option value="true">존재</option>
        <option value="false">미존재</option>
      </select>
    </div>
  </div>

  <!-- 로딩 중일 때 스켈레톤 -->
  <div v-if="loading" class="row">
    <div v-for="n in 6" :key="n" class="col-md-4 col-sm-6 mb-4">
      <div class="skeleton-card">
        <div class="skeleton-title"></div>
        <div class="skeleton-status"></div>
      </div>
    </div>
  </div>

  <!-- 기기 카드 리스트 -->
  <div v-else class="row">
    <div 
      v-for="device in filteredDevices" 
      :key="device.id" 
      class="col-md-4 col-sm-6 mb-4"
    >
      <div class="device-card" @click="goToDeviceControl(device)">
        <h4>{{ device.user_device_name }}</h4>
        <p :class="['status', device.user_device_activate == 1 ? 'on' : 'off']">
          {{ device.user_device_activate == 1 ? '존재' : '미존재' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, computed, onMounted} from 'vue';
import { get_machine_list, set_access_token } from '@/axios';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    // NavBar 보이기
    store.dispatch('triggerSHOWNAV', true, Boolean);

    // 기기 리스트 (예시 데이터)
    const devices = ref();
    
    // 로딩
    const loading = ref(true);

    // 검색/필터
    const searchQuery = ref('');
    const filterStatus = ref('');

    const filteredDevices = computed(() => {
        return devices.value.filter(d => {
            const matchesSearch = d.user_device_name.includes(searchQuery.value);
            const matchesFilter = 
            filterStatus.value === '' || String(d.user_device_activate) === filterStatus.value;
            return matchesSearch && matchesFilter;
        });
    });

    // 기기 목록 가져오기
    const getMachineList = async () => {

        await get_machine_list(store.state.house_id)
            .then((response) => {
                devices.value = response.data;
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
                    getMachineList();
                }else if (e.status === 401){
                    router.push({
                        name : "Login"
                    })
                }
                else if(e.status >= 400 && e.status < 600){
                    console.log("MainPage 에러 : " + e.message);
                }else{
                    router.push({
                        name : "Login"
                    })
                }
            })

        loading.value = false;
    }

    // getMachineList();
    onMounted(() => {
      getMachineList();
    });

    // 기기 조작 페이지로 이동
    const goToDeviceControl = (device) => {
      router.push({
        name: "HouseMachinePage",
        query: { 
            name: device.user_device_name,
            short_name: device.device_type_short_name
        }
      });
    };

    return {
      loading,
      devices,
      searchQuery,
      filterStatus,
      filteredDevices,
      goToDeviceControl
    };
  }
};
</script>

<style scoped>
.text_align {
  text-align: left;
  margin: 2px;
  margin-bottom: 6px;
}

.device-card {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  transition: transform 0.2s;
  background: #fff;
  height: 200px;       /* 카드 높이 고정 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.device-card:hover {
  transform: translateY(-4px);
}

/* 스켈레톤 카드 */
.skeleton-card {
  background: #f0f0f0;
  border-radius: 12px;
  padding: 16px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: pulse 1.5s infinite;
}
.skeleton-title {
  width: 70%;
  height: 20px;
  background: #ddd;
  border-radius: 4px;
  margin: 10px auto;
}
.skeleton-status {
  width: 40%;
  height: 15px;
  background: #ddd;
  border-radius: 4px;
  margin: 10px auto;
}
@keyframes pulse {
  0% { background-color: #f0f0f0; }
  50% { background-color: #e0e0e0; }
  100% { background-color: #f0f0f0; }
}

.status {
  font-weight: bold;
  margin: 8px 0;
}
.status.on {
  color: green;
}
.status.off {
  color: red;
}
.btn-group {
  display: flex;
  justify-content: space-around;
}
</style>
