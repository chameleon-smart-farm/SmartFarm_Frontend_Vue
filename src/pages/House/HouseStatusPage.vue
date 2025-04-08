<template>

  <div class="container" >

    <!-- 제목 -->
    <div class="text_align mt-3" >
      <h2>온도</h2>
      <hr>
    </div>

    <!-- 온도 표 -->
    <div class="detail" >
      <table class="mt-2 table table-hover border-gray" >
        <thead style="position: sticky; top: 0; z-index: 1;">
          <tr>
            <th>현재 온도</th>
            <th>기상청 예보 온도</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ plc_tem }}</td>
            <td>{{ weather_tem }}</td>
          </tr>
        </tbody>
      </table>
    </div>


    <!-- 3시간 평균 온도 리스트 제목 -->
    <div class="text_align mt-3" >
        <h4>3시간 평균 온도</h4>
    </div>

    <!-- 3시간 평균 온도 리스트 -->
    <div class="detail" >
      <table class="mt-2 table table-hover border-gray" >
        <thead style="position: sticky; top: 0; z-index: 1;">
          <tr>
            <th>시간</th>
            <th>평균 온도</th>
          </tr>
        </thead>
        <tbody>
          <!-- 평균 온도 리스트 -->
          <tr v-for="tem in tem_avg_list" :key="tem.tem_avg_id" >
            <td>{{ tem.tem_avg_fin_time }}:00</td>
            <td>{{ tem.tem_avg_data / 10 }}</td>
          </tr>
        </tbody>
      </table>
    </div> <!-- 3시간 평균 온도 리스트 끝 -->

  </div>
  
  

</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { get_house_tem_info } from '@/axios';

export default {

  setup() {
    // store 변수, router 변수
    const store = useStore();
    const router = useRouter();

    // NavBar 보이기
    store.dispatch('triggerSHOWNAV',true, Boolean);

    // PLC 온도, 기상청 온도, 3시간 평균 온도 리스트
    const plc_tem = ref(16);
    const weather_tem = ref(17);
    const tem_avg_list = ref([]);

    // PLC 온도, 기상청 온도, 3시간 평균 온도 리스트 받아오기
    const getTemAvhList = async () => {
      await get_house_tem_info(store.state.access_token, store.state.house_id)
        .then((response) => {

          plc_tem.value = response.data.tem_data;
          weather_tem.value = response.data.weather_tem;
          tem_avg_list.value = response.data.avg_list;

        })
        .catch((e) => {
          // 토큰 만료 오류 - 로그인 페이지로 이동
          if(e.status === 401){
              router.push({
                  name : "Login"
              })
          }
        })
    }

    getTemAvhList();

    return{
      tem_avg_list,
      plc_tem,
      weather_tem
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

</style>