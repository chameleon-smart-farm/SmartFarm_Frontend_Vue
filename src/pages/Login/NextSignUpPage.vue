<template>

    <!-- 제목 -->
    <div class="text_align mt-3 mb-5"  >
      <div style="display: flex; flex-direction: row; " >
          <button class="btn" @click="toLogin" >←</button>
          <h2 style="margin: 0 auto;" >회원가입</h2>
      </div>
      <hr>
    </div>
  
    <div class="center" >
      <h4>
          고객님의 메일 <br>
          <b>{{ user_email }}로</b> <br><br>
          가입 인증 메일이 전송되었습니다. <br>
          메일을 확인 시 회원가입이 완료됩니다.
      </h4>
    </div>
  
    <!-- 닫기 버튼 -->
    <div class="d-grid" style="position:absolute; bottom:0px; width : 94%" >
      <button class="btn btn-dark" @click="toLogin" >닫기</button>
    </div>
  
</template>

<script>
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

export default {
    setup(){

        // store 변수, router 변수
        const store = useStore();
        const router = useRouter();

        // NavBar 가리기
        store.dispatch('triggerSHOWNAV',false, Boolean);

        // route 사용과 param으로 사용자 이메일 받기
        const route = useRoute();
        const user_email = route.params.user_email;

        console.log(user_email);

        // 로그인 페이지로 이동
        const toLogin = () => {
            router.push({
                name : "Login"
            })
        }

        // 사용자 이메일 인증 API 구현

        return {
            user_email,
            toLogin
        }
    }
}
</script>

<style scoped>

.center {
    margin-top: 30%;
    text-align: left;
}

</style>