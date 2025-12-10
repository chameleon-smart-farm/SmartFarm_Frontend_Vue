<template>
  

    <!-- 제목 -->
    <div class="text_align mt-3 mb-5"  >
      <div style="display: flex; flex-direction: row; " >
          <button class="btn" @click="toSelectHouse" >←</button>
          <h2 v-once style="margin: 0 auto;" >농장 추가</h2>
      </div>
      <hr>
    </div>

    <!-- 농장 이름 -->
    <div class="mb-4" >
      <div class="text_align" ><h3 v-once >농장 이름</h3></div>
      <div> <input type="text" v-model="house_name" class="form-control" placeholder="농장 이름"
          v-bind:class="{ 'text_full' : house_name }" > </div>
    </div>

    <!-- 농장 작물 -->
    <div class="mb-4" >
      <div class="text_align" ><h3 v-once >농장 작물</h3></div>
      <div> <input type="text" v-model="house_crop" class="form-control" placeholder="농장 작물"
          v-bind:class="{ 'text_full' : house_crop }" > </div>
    </div>

    <!-- 농장 추가 실패 팝업 -->
    <div class="alert_class grid">
      <div v-if="ifFalse" class="alert alert-danger flex_item_center" >
        {{ error_msg }}
      </div>
    </div>
  
    <!-- 농장 추가 버튼 -->
    <div class="mb-4 d-grid" >
      <button class="btn btn-dark" @click="addHouse" >농장 추가</button>
    </div>
  
</template>
  
<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { add_house, set_access_token } from '@/axios'

export default {

    setup(){
        
        // store 변수, router 변수
        const store = useStore();
        const router = useRouter();

        // NavBar 가리기
        store.dispatch('triggerSHOWNAV',false, Boolean);

        // 농장 선택 페이지로 이동
        const toSelectHouse = () => {
            router.push({
                name : "SelectHousePage"
            })
        }

        // route 사용과 param으로 농장 아이디 받기
        const route = useRoute();
        const house_id = route.params.house_id;

        // 농장 이름, 농장 작물
        const house_name = ref('');
        const house_crop = ref('');

        // 농장 추가 실패시 팝업을 띄울 변수
        const ifFalse = ref(false);
        const error_msg = ref('');

        // 농장 추가 요청
        const addHouse = async () => {

          const data = {
            "house_id": house_id,
            "house_crop": house_crop.value,
            "house_name": house_name.value
          }

          // 성공이라면 농장 선택 페이지로 이동, 실패라면 실패 팝업
          await add_house(data)
            .then(() => {
                router.push({
                    name : "SelectHousePage"
                })
            })
            .catch((e) => {
                ifFalse.value = true;
                error_msg.value = e.message;

                /**
                 * 토큰 만료 오류
                 * 401 에러와 함께 새로운 토큰이 왔다면 기존의 access_token 값에 덮어 씌우고 다시 메서드 요청
                 * 400 ~ 599 에러라면 에러 메시지 출력
                 * 다른 오류라면 login 페이지로 이동
                 */
                if(e.status === 401 && e.response.data.new_access_token !=null){
                    set_access_token(e.response.data.new_access_token);
                    addHouse();
                }else if(e.status >= 400 && e.status < 600){
                    console.log("AddHousePage 에러 : " + e.message);
                }else{
                    router.push({
                        name : "Login"
                    })
                }
            })
        }

        return{
            toSelectHouse,
            house_name,
            house_crop,
            addHouse,
            ifFalse,
            error_msg
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
  
  /* 텍스트 작성시 테두리 변경 */
  .text_full{
    border: 3px solid orange;
    box-shadow: 0 6px 7px rgba(79, 79, 79, 0.2);
  }
  
  
</style>