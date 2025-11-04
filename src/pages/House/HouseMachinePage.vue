<template>
  <!-- 제목 -->
  <div class="text_align mt-3" >
    <h2 v-once >모터 상태</h2>
    <hr v-once >
  </div>

  <!-- 모터 상태 -->
  <div class="detail" style="height: 23vh;" >
    <img v-show="motor_status" src="@/assets/Animation - 1744126697158.gif" alt="" >
    <img v-show="!motor_status" src="@/assets/image.png" weight="150vw" height="150vh" alt="">
  </div>

  <!-- 제목 -->
  <div class="text_align mt-3" >
    <h2 v-once >모터 제어 버튼</h2>
    <hr v-once >
  </div>

  <!-- 모터 on/off 버튼 -->
  <div class="row" style="height: 20vh;" >
    <div class="col-6 d-grid" >
        <button class="btn btn-primary" @click="motorOnOff(true)" >ON</button>
    </div>
    <div class="col-6 d-grid" >
        <button class="btn btn-danger" @click="motorOnOff(false)">OFF</button>
    </div>
  </div>


</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { get_motor_info, post_motor_on_off, set_access_token } from '@/axios';

export default {

  setup(){
    // store 변수, router 변수
    const store = useStore();
    const router = useRouter();

    // NavBar 보이기
    store.dispatch('triggerSHOWNAV',true, Boolean);

    // 모터 상태
    const motor_status = ref(false);

    // 모터 상태 조회 메서드
    const getMotorStatus = async () => {
        await get_motor_info(store.state.house_id)
            .then((response) => {
                motor_status.value = response.data.motor_status;
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
                getMotorStatus();
              }else if(e.status >= 400 && e.status < 600){
                console.log("MainPage 에러 : " + e.message);
              }else{
                router.push({
                    name : "Login"
                })
              }
            })
    }

    getMotorStatus();

    // 모터 on/off 메서드
    const motorOnOff = async (status) => {
        
        const data = {
            "motor_status": status
        }

        await post_motor_on_off(store.state.house_id, data)
            .then(() => {
                getMotorStatus();
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
                motorOnOff();
              }else if(e.status >= 400 && e.status < 600){
                console.log("MainPage 에러 : " + e.message);
              }else{
                router.push({
                    name : "Login"
                })
              }
            })

    }

    return{
        motor_status,
        motorOnOff
    }
  }

}
</script>

<style scoped>

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