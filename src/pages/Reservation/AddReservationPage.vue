<template>

    <!-- 제목 -->
    <div class="text_align mt-3" >
        <h2 v-once >모터 예약 추가</h2>
        <hr v-once >
    </div> 


    <!-- 예약 추가 -->
    <div class="detail" style="flex: 1;">
        
        <!-- 시간 -->
        <div class="row atr" >
            <div class="col-5" >
                <h5 v-once class="mt-1" >시간</h5>
            </div>
            <div class="col-6">
                <input class="form-control" type="time" v-model="input_time" >
            </div>
        </div>
        <!-- 요일 -->
        <div class="row atr" >
            <div class="col-5" >
                <h5 v-once class="mt-1" >요일</h5>
            </div>
            <div class="col-6">
                <select class="form-select"  v-model="input_day">
                    <option value="0">일요일</option>
                    <option value="1">월요일</option>
                    <option value="2">화요일</option>
                    <option value="3">수요일</option>
                    <option value="4">목요일</option>
                    <option value="5">금요일</option>
                    <option value="6">토요일</option>
                </select>
            </div>
        </div>

        <button class="btn btn-primary mt-2 mb-2" @click="postReservation">제출</button>
    </div>


</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { post_reservation, set_access_token } from '@/axios';

export default {

  setup(){

    // store 변수, router 변수
    const store = useStore();
    const router = useRouter();

    // NavBar 보이기
    store.dispatch('triggerSHOWNAV',true, Boolean);

    // 사용자 입력 시간, 분, 요일
    const input_time = ref();
    const input_day = ref();

    // 사용자 예약 입력
    const postReservation = async () => {

        const [hour, minute] = input_time.value.split(':');

        const data = {
            "reservation_hour": hour,
            "reservation_min": minute,
            "reservation_day": input_day.value
        }

        await post_reservation(store.state.house_id, data)
            .then(() => {
                router.push({
                    name : "ListReservationPage"
                })
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
                    post_reservation();
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
        input_time,
        input_day,
        postReservation
    }
  }

}
</script>

<style scoped>

/* 왼쪽 정렬 */
.text_align{
  text-align: left;
}

/* 영역 그림자 */
.detail{
  box-shadow: 0 6px 7px rgba(79, 79, 79, 0.2);
  margin: 1%;
}

/* 속성 간격 */
.atr{
  height: 6vh;
  margin: 4%;
}

</style>