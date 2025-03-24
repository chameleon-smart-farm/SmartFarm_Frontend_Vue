<template>
  
  <div class="container" >

    <!-- 온도, 풍속 영역 -->
    <div class="row mt-5" style="flex: 1;" >

      <!-- 온도 -->
      <div class="col-5 card-box" style="background: #FFA07A;" >
        <div>
          <h4>온도</h4>
          <h1>{{ temperature }}</h1>
        </div>
      </div>

      <!-- 풍속 -->
      <div class="col-5 card-box" style="background: #FFE4B5;" >
        <h4>풍속</h4>
        <h1>{{ wind_speed }}</h1>
      </div>

    </div>

    <!-- 날씨, 습도 영역 -->
    <div class="row mt-2" style="flex: 1;" >

      <!-- 날씨 -->
      <div class="col-5 card-box" style="background: #F0E68C;" >
        <h4>날씨</h4>
        <h1>{{ weather }}</h1>
      </div>

      <!-- 습도 -->
      <div class="col-5 card-box" style="background: #66CDAA;" >
        <h4>습도</h4>
        <h1>{{ humidity }}</h1>
      </div>

    </div>

    <div class="mt-3" style="flex : 1;" >
      TBD
    </div>

  </div>

</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {

  setup() {

    // store 변수
    const store = useStore();

    // NavBar 보이기
    store.dispatch('triggerSHOWNAV',true, Boolean);

    // 온도, 풍속, 날씨, 습도 
    const temperature = ref(18);
    const wind_speed = ref(18);
    const weather = ref("비");
    const humidity = ref(18);

    // 농장의 기상청 정보를 받아옴
    const getWeatherInfo = () => {

    }

    return {
      temperature,
      wind_speed,
      weather,
      humidity,
      getWeatherInfo
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
  padding: 10%;
  border-radius: 12px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* 왼쪽 정렬 */
h4{
  text-align: left;
  margin: 2px;
  margin-bottom: 25%;
}

/* 폰트 2.3배 크게 설정 */
h1{
  font-weight: bold;
  font-size : 2.3rem;
}

</style>