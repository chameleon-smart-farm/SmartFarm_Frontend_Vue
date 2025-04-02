<template>
  

    <!-- 제목 -->
    <div class="text_align mt-3 mb-5"  >
      <div style="display: flex; flex-direction: row; " >
          <button class="btn" @click="toLogin" >←</button>
          <h2 style="margin: 0 auto;" >회원가입</h2>
      </div>
      <hr>
    </div>
  
    <!-- 이름 -->
    <div class="mb-4" >
      <div class="text_align" ><h3>이름</h3></div>
      <div> <input type="text" v-model="user_name" class="form-control" placeholder="이름"
          v-bind:class="{ 'text_full' : user_name }" > </div>
    </div>
  
    <!-- 아이디 -->
    <div class="mb-4" >
      <div class="text_align" ><h3>아이디</h3></div>
      <div> <input type="text" v-model="user_id" class="form-control" placeholder="아이디"
          v-bind:class="{ 'text_full' : user_id }" > </div>
    </div>
  
    <!-- 이메일 -->
    <div class="mb-4" >
      <div class="text_align" ><h3>이메일</h3></div>
      <div> <input type="text" v-model="user_email" class="form-control" placeholder="이메일"
          v-bind:class="{ 'text_full' : user_email }" > </div>
    </div>
  
    <!-- 비밀번호 -->
    <div class="mb-4" >
      <div class="text_align" ><h3>비밀번호</h3></div>
      <div> <input type="password" v-model="user_pwd" class="form-control" placeholder="비밀번호"
          v-bind:class="{ 'text_full' : user_pwd }" > </div>
    </div>
  
    <!-- 비밀번호 확인 -->
    <div class="mb-4" >
      <div class="text_align" ><h3>비밀번호 확인</h3></div>
      <div> <input type="password" v-model="user_pwd_chk" class="form-control" placeholder="비밀번호 확인"
          v-bind:class="{ 'text_full' : user_pwd_chk }" > </div>
    </div>
  
    <!-- 다음 버튼 -->
    <div class="mb-4 d-grid" >
      <button class="btn btn-dark" @click="toNextSignUp" >다음</button>
    </div>
  
</template>
  
<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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

        // 사용자 이름, 아이디, 비밀번호, 비밀번호 확인
        const user_name = ref('');
        const user_id = ref('');
        const user_email = ref('');
        const user_pwd = ref('');
        const user_pwd_chk = ref('');

        // 다음 페이지로 이동
        const toNextSignUp = () => {
            router.push({
                name : "NextSignUpPage",
                params: { user_email: user_email.value }
            })
        }

        return{
            toLogin,
            user_name,
            user_id,
            user_email,
            user_pwd,
            user_pwd_chk,
            toNextSignUp
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