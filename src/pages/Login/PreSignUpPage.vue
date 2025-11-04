<template>

  <!-- 제목 -->
  <div class="text_align mt-3 mb-5"  >
      <div style="display: flex; flex-direction: row; " >
          <button class="btn" @click="toLogin" >←</button>
          <h2 v-once style="margin: 0 auto;" >회원가입</h2>
      </div>
      <hr>
  </div>

  <!-- 시리얼 번호 -->
  <div class="mb-4" >
    <div class="text_align" ><h3 v-once >시리얼 번호</h3></div>
    <div> <input type="text" v-model="serial_num" class="form-control" placeholder="시리얼 번호"
        v-bind:class="{ 'text_full' : serial_num }" > </div>
  </div>

  <!-- 다음 버튼 -->
  <div class="mb-4 d-grid" >
      <button class="btn btn-dark" @click="toSignUp" >다음</button>
  </div>

  <!-- 회원가입 실패 팝업 -->
  <div class="alert_class grid">
    <div v-if="ifFalse" class="alert alert-danger flex_item_center" >
      {{ error_msg }}
    </div>
  </div>


</template>


<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { confirm_serial } from '@/axios'

export default {

    setup(){

        // store 변수, router 변수
        const store = useStore();
        const router = useRouter();

        // NavBar 가리기
        store.dispatch('triggerSHOWNAV',false, Boolean);

        // 로그인 페이지로 이동
        const toLogin = () => {
            router.push({
                name : "Login"
            })
        }

        // 회원가입 실패시 팝업을 띄울 변수
        const ifFalse = ref(false);
        const error_msg = ref('');

        // 시리얼 번호
        const serial_num = ref("");

        // 회원가입 페이지로 이동
        const toSignUp = async () => {

            // 검증을 통과한다면 이동, 실패한다면 팝업문
            await confirm_serial(serial_num.value)
                .then((response) => {
                    console.log("PreSignUpPage - house_id : " + response.data);

                    router.push({
                        name : "SignUpPage",
                        params : { house_id : response.data}
                    })
                })
                .catch((e) => {
                    ifFalse.value = true;
                    error_msg.value = e.message;
                })
        }

        return {
            serial_num,
            toSignUp,
            ifFalse,
            error_msg,
            toLogin
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