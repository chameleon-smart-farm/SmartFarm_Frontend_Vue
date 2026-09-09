<template>
  <!-- 제목 -->
  <div class="mt-3">
    <h2 class="text_align" v-once>센서 리스트</h2>
    <hr v-once>
  </div>

  <!-- 검색/필터 -->
  <div class="row mb-3">
    <div class="col-8">
      <input v-model="searchQuery" type="text" class="form-control" placeholder="센서 검색...">
    </div>
    <div class="col-4">
      <select v-model="filterStatus" class="form-select">
        <option value="">전체</option>
        <option value="1">활성</option>
        <option value="0">비활성</option>
      </select>
    </div>
  </div>

  <!-- 로딩 중일 때 스켈레톤 -->
  <div v-if="loading" class="row list-container">
    <div v-for="n in 6" :key="n" class="col-md-4 col-sm-6 mb-4">
      <div class="skeleton-card">
        <div class="skeleton-title"></div>
        <div class="skeleton-status"></div>
      </div>
    </div>
  </div>

  <!-- 센서 카드 리스트 -->
  <div v-else class="row list-container">
    <div 
      v-for="sensor in filteredSensors" 
      :key="sensor.id" 
      class="col-md-4 col-sm-6 mb-4"
    >
      <div class="sensor-card" @click="goToSensorDetail(sensor)">
        <h4>{{ sensor.user_device_name  }}</h4>
        <p :class="['status', sensor.user_device_activate == 1 ? 'on' : 'off']">
          {{ sensor.user_device_activate == 1 ? '활성' : '비활성' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, computed, onMounted} from 'vue';
import { get_sensor_list, set_access_token } from '@/axios';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    // NavBar 보이기
    store.dispatch('triggerSHOWNAV', true, Boolean);

    // 센서 리스트 (예시 데이터)
    const sensors = ref([]);
    
    // 로딩
    const loading = ref(true);

    // 검색/필터
    const searchQuery = ref('');
    const filterStatus = ref('');

    // 검색/필터된 센서 리스트
    const filteredSensors = computed(() => {
        return sensors.value.filter(s => {
            const matchesSearch = s.user_device_name.includes(searchQuery.value);
            const matchesFilter = 
            filterStatus.value === '' || String(s.user_device_activate) === filterStatus.value;
            return matchesSearch && matchesFilter;
        });
    });

    // 센서 목록 가져오기
    const getSensorList = async () => {
        await get_sensor_list(store.state.house_id)
            .then((response) => {
                sensors.value = response.data;
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
                    getSensorList();
                }else if (e.status === 401){
                    router.push({ name : "Login" })
                }
                else if(e.status >= 400 && e.status < 600){
                    console.log("SensorPage 에러 : " + e.message);
                }else{
                    router.push({ name : "Login" })
                }
            })
        loading.value = false;
    }

    // 컴포넌트 마운트 시 센서 목록 가져오기
    onMounted(() => {
      getSensorList();
    });

    // 센서 상세 페이지로 이동
    const goToSensorDetail = (sensor) => {
      router.push({
        name: "HouseStatusPage",
        query: { 
            name: sensor.user_device_name,
            short_name: sensor.device_type_short_name
        }
      });
    };

    return {
      loading,
      sensors,
      searchQuery,
      filterStatus,
      filteredSensors,
      goToSensorDetail
    };
  }
};
</script>

<style scoped>
.text_align {
  /* text-align: left; */
  font-weight: bold;
  margin: 2px;
  margin-bottom: 6px;
}

/* 최소 높이 */
.list-container {
  min-height: 750px;
}

.sensor-card {
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

.sensor-card:hover {
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
</style>
