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

    <!-- 관심 작물 -->
    <div class="mb-4" >
      <div class="text_align" ><h3>관심 작물</h3></div>
      <div> <input type="text" v-model="user_faw_crop" class="form-control" placeholder="관심 작물"
          v-bind:class="{ 'text_full' : user_faw_crop }" > </div>
    </div>

    <!-- 농장 이름 -->
    <div class="mb-4" >
      <div class="text_align" ><h3>농장 이름</h3></div>
      <div> <input type="text" v-model="house_name" class="form-control" placeholder="농장 이름"
          v-bind:class="{ 'text_full' : house_name }" > </div>
    </div>

    <!-- 농장 작물 -->
    <div class="mb-4" >
      <div class="text_align" ><h3>농장 작물</h3></div>
      <div> <input type="text" v-model="house_crop" class="form-control" placeholder="농장 작물"
          v-bind:class="{ 'text_full' : house_crop }" > </div>
    </div>

    <!-- 회원가입 실패 팝업 -->
    <div class="alert_class grid">
      <div v-if="ifFalse" class="alert alert-danger flex_item_center" >
        {{ error_msg }}
      </div>
    </div>
  
    <!-- 회원 가입 버튼 -->
    <div class="mb-4 d-grid" >
      <button class="btn btn-dark" @click="signUp" >회원 가입</button>
    </div>
  
</template>
  
<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { sign_up } from '@/axios'

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

        // route 사용과 param으로 사용자 이메일 받기
        const route = useRoute();
        const house_id = route.params.house_id;

        // 사용자 이름, 아이디, 비밀번호, 비밀번호 확인, 관심 작물
        const user_name = ref('');
        const user_id = ref('');
        const user_pwd = ref('');
        const user_pwd_chk = ref('');
        const user_faw_crop = ref('');

        // 농장 이름, 농장 작물
        const house_name = ref('');
        const house_crop = ref('');

        // 회원가입 실패시 팝업을 띄울 변수
        const ifFalse = ref(false);
        const error_msg = ref('');

        // 회원가입 요청
        const signUp = async () => {

          const data = {
            "house_id": house_id,
            "house_crop": house_crop.value,
            "house_name": house_name.value,
            "user_name": user_name.value,
            "user_id": user_id.value,
            "user_pwd": user_pwd.value,
            "faw_crop": user_faw_crop.value
          }

          // 성공이라면 로그인 페이지로 이동, 실패라면 실패 팝업
          await sign_up(data)
            .then(() => {
                router.push({
                    name : "Login"
                })
            })
            .catch((e) => {
                ifFalse.value = true;
                error_msg.value = e.message;
            })
        }

        return{
            toLogin,
            user_name,
            user_id,
            user_faw_crop,
            user_pwd,
            user_pwd_chk,
            house_name,
            house_crop,
            signUp,
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