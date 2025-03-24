<template>
  
  <!-- 제목 -->
  <div class="text_align mt-3 mb-5" style="text-align: center;" >
    <h2>스마트팜 로그인</h2>
    <hr>
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

  <!-- 로그인 버튼 -->
  <div class="mb-4 d-grid" >
    <button class="btn btn-dark" @click="login" >로그인</button>
  </div>

  <!-- 로그인 실패 팝업 -->
  <div class="alert_class grid">
    <div v-if="ifFalse" class="alert alert-danger flex_item_center" >
      {{ error_msg }}
    </div>
  </div>

  <!-- 회원가입, 비밀번호 찾기 페이지 이동-->
  <div class="mb-4">
    <div class="row">
      <div class="col-6" style="display: flex; justify-content: flex-start;">
        <button class="btn"><u>회원가입</u></button>
      </div>
      <div class="col-6" style="display: flex; justify-content: flex-end;">
        <button class="btn" @click="toFindPwd" ><u>비밀번호 찾기</u></button>
      </div>
    </div>
  </div>


  

</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from "axios";

export default {

  setup(){
    // store 변수, router 변수
    const store = useStore();
    const router = useRouter();

    // NavBar 가리기
    store.dispatch('triggerSHOWNAV',false, Boolean);

    // 사용자 아이디, 비밀번호
    const user_id = ref('');
    const user_pwd = ref('');

    // 로그인 실패시 팝업을 띄울 변수
    const ifFalse = ref(false);
    const error_msg = ref('');

    // login
    const login = async () => {

      // const data = {
      //   user_id : user_id,
      //   user_pwd : user_pwd
      // }

      axios({
        method : "get",
        url : `http://localhost:3000/user?user_id=${user_id.value}`
      })
      .then((response) => {
        console.log(response.data);

        // 농장 선택 페이지 이동
        router.push({
          name : "SelectHousePage"
        })
      })
      .catch((e) => {
        console.log(e.message);
        error_msg.value = e.message;
        // 로그인 실패시 실패했다는 팝업
        ifFalse.value = true;
      })

    }
    // 회원가입 페이지 이동

    // 비밀번호 찾기 페이지 이동
    const toFindPwd = () => {
      router.push({
        name : "FindPwdPage"
      })
    }

    return {
      user_id,
      user_pwd,
      login,
      ifFalse,
      error_msg,
      toFindPwd
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

/* 경고창 */
/* .alert_class {
  display: flex;
  justify-content: center;
  align-items: center;
} */

</style>