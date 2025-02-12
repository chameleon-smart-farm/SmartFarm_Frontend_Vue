<template>

  <div class="mt-2 mb-4" style="text-align: left;">
    <button class="btn" @click="toLogin" >←</button>
  </div>

  
  <!-- 제목 -->
  <div class="text_align mt-3 mb-5" >
    <h2><span class="text-warning">비밀번호</span> 찾기</h2>
    <hr>
  </div>

  <!-- 아이디 -->
  <div class="mb-4" >
    <div class="text_align" ><h3>아이디</h3></div>
    <div> <input type="text" v-model="user_id" class="form-control" placeholder="아이디"
        v-bind:class="{ 'text_full' : user_id }" > </div>
  </div>

  <!-- 인증방법 선택 -->
  <div>
    <div class="text_align" ><h3>인증</h3></div>
    <div> <input type="text" v-model="user_email" class="form-control" placeholder="이메일 주소 입력"
        v-bind:class="{ 'text_full' : user_email }" > </div>
  </div>

</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {

  setup(){
    // store 변수
    const store = useStore();
    // NavBar 가리기
    store.dispatch('triggerSHOWNAV',false, Boolean);

    //사용자 아이디, 인증방법 선택, 사용자 입력 이메일
    const user_id = ref('');
    // const user_auth = ref('인증 방법');
    const user_email = ref('');

    // 로그인 페이지로 이동
    const router = useRouter();
    const toLogin = () => {
      router.push({
          name : "Login"
      })
    }

    return {
      user_id,
      // user_auth,
      user_email,
      toLogin
    }
  }

}
</script>

<style scoped>

.text_align{
  text-align: left;
  margin: 2px;
  margin-bottom: 6px;
}

.text_full{
  border: 3px solid orange;
  box-shadow: 0 6px 7px rgba(79, 79, 79, 0.2);
}

</style>