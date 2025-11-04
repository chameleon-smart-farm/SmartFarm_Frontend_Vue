<template>
  
  <div class="container" >

    <!-- 온도, 풍속, 습도 영역 -->
    <div class="row mt-5" style="flex: 1;" >

      <!-- 온도 -->
      <div class="col-3 card-box" style="background: #FFA07A;" >
        <div>
          <h4 v-once >온도</h4> <hr>
          <h1>{{ temperature }}</h1>
        </div>
      </div>

      <!-- 풍속 -->
      <div class="col-3 card-box" style="background: #FFE4B5;" >
        <h4 v-once >풍속</h4> <hr>
        <h1>{{ wind_speed }}</h1>
      </div>

      <!-- 습도 -->
      <div class="col-3 card-box" style="background: #66CDAA;" >
        <h4 v-once >습도</h4> <hr>
        <h1>{{ humidity }}</h1>
      </div>

    </div>

    <!-- 하늘 상태, 강수 상태 영역 -->
    <div class="row mt-2" style="flex: 1;" >

      <!-- 하늘 상태 -->
      <div class="col-5 card-box" style="background: #F0E68C;" >
        <h4 v-once >하늘</h4> <hr>
        <h1>{{ weather_status }}</h1>
      </div>

      <!-- 강수 상태 -->
      <div class="col-5 card-box" style="background: #F0E68C;" >
        <h4 v-once >강수</h4> <hr>
        <h1>{{ weather_preci }}</h1>
      </div>

    </div>

    <div class="mt-3" style="flex : 1;" >
      TBD
    </div>

  </div>

</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { get_weather_info, set_access_token } from '@/axios';

export default {

  setup() {

    // store 변수, router 변수
    const store = useStore();
    const router = useRouter();

    // NavBar 보이기
    store.dispatch('triggerSHOWNAV',true, Boolean);

    // 온도, 풍속, 하늘 상태, 강우 상태, 습도 
    const temperature = ref(18);
    const wind_speed = ref(18);
    const weather_status = ref("비");
    const weather_preci = ref('비');
    const humidity = ref(18);

    // 농장의 기상청 정보를 받아옴
    const getWeatherInfo = async () => {
      await get_weather_info(store.state.house_id)
          .then((response) => {
            temperature.value = response.data.weather_tem;
            wind_speed.value = response.data.weather_wind;
            weather_status.value = response.data.weather_status;
            weather_preci.value = response.data.weather_preci;
            humidity.value = response.data.weather_hum;
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
              getWeatherInfo();
            }else if(e.status >= 400 && e.status < 600){
              console.log("MainPage 에러 : " + e.message);
            }else{
              router.push({
                  name : "Login"
              })
            }
          })
    }

    getWeatherInfo();

    return {
      temperature,
      wind_speed,
      weather_status,
      weather_preci,
      humidity
    }

  }

}
</script>

<style scoped>

/* flex 설정 */
.container {
    display: flex;
    flex-direction: column;
    height: 95vh;
}

/* 각 영역 표시 - 배경색은 각각 설정 */
.card-box {
  margin: 4%;
  padding: 4%;
  border-radius: 12px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* 가운데 정렬 */
h4{
  text-align: center;
  margin: 2px;
  font-weight: bold;
}

/* 폰트 2.3배 크게 설정 */
h1{
  /* font-weight: bold; */
  font-size : 2.3rem;
}

</style>