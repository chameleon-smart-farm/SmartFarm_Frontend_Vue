<template>

  <div class="container" >

    <!-- 제목 -->
    <div class="text_align mt-3" >
      <h2 v-once >{{sensor_name}}</h2>
      <hr v-once >
    </div>

    <!-- 온도 표 -->
    <div class="detail" >
      <table class="mt-2 table table-hover border-gray" >
        <thead style="position: sticky; top: 0; z-index: 1;">
          <tr v-once >
            <th v-once >현재 상태</th>
            <th v-once >기상청 예보</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="2">
              <div class="skeleton-text"></div>
            </td>
          </tr>
          <tr v-else>
            <td>{{ sensor_data }}</td>
            <!-- <td>{{ weather_tem }}</td> -->
          </tr>
        </tbody>
      </table>
    </div>


    <!-- 3시간 평균 데이터 리스트 제목 -->
    <div class="text_align mt-3" >
        <h4 v-once >3시간 평균 {{sensor_name }}</h4>
    </div>

    <!-- 3시간 평균 데이터 리스트 -->
    <div class="detail" >
      <table class="mt-2 table table-hover border-gray" >
        <thead style="position: sticky; top: 0; z-index: 1;">
          <tr v-once >
            <th v-once >시간</th>
            <th v-once >평균 {{sensor_name }}</th>
          </tr>
        </thead>
        <tbody>
          <!-- 평균 데이터 리스트 -->
          <tr v-if="loading">
            <td colspan="2">
              <div class="skeleton-text"></div>
              <div class="skeleton-text"></div>
            </td>
          </tr>
          <!-- <tr v-else v-for="tem in tem_avg_list" :key="tem.tem_avg_id" >
            <td>{{ tem.tem_avg_fin_time }}:00</td>
            <td>{{ tem.tem_avg_data / 10 }}</td>
          </tr> -->
        </tbody>
      </table>
    </div> <!-- 3시간 평균 온도 리스트 끝 -->

  </div>
  
  

</template>

<script>
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import { get_sensor_info, set_access_token } from '@/axios';

export default {

  setup() {
    // store 변수, router 변수, route 변수
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    // 센서 이름, 센서 종류
    const sensor_name = route.query.name;
    const sensor_short_name = route.query.short_name;

    // 로딩
    const loading = ref(true);

    // NavBar 보이기
    store.dispatch('triggerSHOWNAV',true, Boolean);

    // 센서 데이터
    const sensor_data = ref(10);

    // 센서 데이터 조회 메서드
    const getSensorStatus = async () => {
        await get_sensor_info(sensor_short_name, store.state.house_id)
            .then((response) => {
                sensor_data.value = response.data.dou_value;
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
                getSensorStatus();
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

    getSensorStatus();

    return{
      loading,
      sensor_name,
      sensor_data
    }
  }

}
</script>

<style scoped >

/* flex 설정 */
.container {
    display: flex;
    flex-direction: column;
    height: 70vh;
}

/* 제목 고정 */
.list-container {
  min-height: 750px;
}

/* 왼쪽 정렬 */
.text_align{
  text-align: left;
  margin: 2px;
  margin-bottom: 6px;
}

/* 영역 그림자 */
.detail{
  box-shadow: 0 6px 7px rgba(79, 79, 79, 0.2);
  margin: 1%;
}

.skeleton-text, .skeleton-icon {
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-text {
  width: 100%;
  height: 20px;
  margin: 6px 0;
  border-radius: 4px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

</style>