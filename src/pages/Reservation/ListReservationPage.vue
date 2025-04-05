<template>
  
  <div class="row" >

    <!-- 제목 -->
    <div class="col-8" >
        <div class="text_align mt-3" >
           <h2>모터 예약 리스트</h2>
        </div> 
    </div>

    <!-- 추가 버튼 -->
    <div class="col-4" >
        <button class="btn btn-primary mt-2" @click="toAddReser">예약 추가</button>
    </div>

  </div>

  <hr>

  <!-- 예약 리스트 표 -->
  <div class="detail" >
      <table class="mt-2 table table-hover border-gray" >
        <thead style="position: sticky; top: 0; z-index: 1;">
          <tr>
            <th>예약 ID</th>
            <th>시간</th>
            <th>분</th>
            <th>요일</th>
          </tr>
        </thead>
        <tbody>
          <!-- 예약 리스트 -->
          <tr v-for="r in reservation_list" :key="r.reservation_id" >
            <td>{{ r.reservation_id }}</td>
            <td>{{ r.reservation_hour }}</td>
            <td>{{ r.reservation_min }}</td>
            <td>{{ r.reservation_day }}</td>
          </tr>
        </tbody>
      </table>
  </div>  <!-- 예약 리스트 표 끝 -->


</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { get_reservation_list } from '@/axios';

export default {

  setup(){

    // store 변수, router 변수
    const store = useStore();
    const router = useRouter();

    // NavBar 보이기
    store.dispatch('triggerSHOWNAV',true, Boolean);

    // 예약 리스트
    const reservation_list = ref([]);

    // 예약 리스트 받아오기
    const getReserList = async () => {
        await get_reservation_list(store.state.access_token, store.state.house_id)
            .then((response) => {
                reservation_list.value = response.data;
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

    getReserList();

    // 예약 추가 페이지로 이동
    const toAddReser = () => {
        router.push({
            name : "AddReservationPage"
        })
    }

    return{
        reservation_list,
        toAddReser
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

</style>