<template>
  
  <!-- 제목 -->
  <div class="text_align mt-3 mb-5" style="text-align: center;" >
    <h2 v-once >스마트팜 로그인</h2>
    <hr>
  </div>

  <!-- 아이디 -->
  <div class="mb-4" >
    <div class="text_align" ><h3 v-once >아이디</h3></div>
    <div> <input type="text" v-model="user_id" class="form-control" placeholder="아이디"
        v-bind:class="{ 'text_full' : user_id }" > </div>
  </div>

  <!-- 비밀번호 -->
  <div class="mb-4" >
    <div class="text_align" ><h3 v-once >비밀번호</h3></div>
    <div> <input type="password" v-model="user_pwd" class="form-control" placeholder="비밀번호"
        v-bind:class="{ 'text_full' : user_pwd }" > </div>
  </div>

  <!-- 로그인 버튼 -->
  <div class="mb-4 d-grid" >
    <button class="btn btn-dark" @click="userLogin" >로그인</button>
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
        <button class="btn" @click="toSignUp" ><u>회원가입</u></button>
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
import { login, test, get_name } from '@/axios'

export default {

  setup(){
    // store 변수, router 변수
    const store = useStore();
    const router = useRouter();

    // NavBar 가리기
    store.dispatch('triggerSHOWNAV',false, Boolean);

    /**
     * 기존에 유효한 Access Token과 Refresh Token이 있다면 
     * 바로 selectHoust 페이지로 이동
     * @then : 서버에서 200 응답이 온다면 유효한 Access Token이 있다는 것
     * @catch : 401에러와 함께 new_acces_token이 왔다면 유효한 Refresh Token이 있다는 것
     * -> 새로운 Access Token을 발급 받았으므로 selectHouse 페이지로 이동
     * 그 외 오류라면 이동하지 않고 오류 출력
     */

     const tokenTest = async () => {
      await test()
          .then(() => {
            
            console.log("LoginPage : 서버 연결 성공 & 유효한 Access Token")

            router.push({
              name : "SelectHousePage"
            })
          })
          .catch((e) => {
            if( e.response && e.response.status === 401 && e.response.data.new_access_token !=null){
              console.log("LoginPage : 새로운 access_token 발행 : " + e.response.data.new_access_token)

              router.push({
                name : "SelectHousePage"
              })
            }else if(e.response){
              console.log("LoginPage 에러 : " + e.response.data)
            }else{
              console.log("LoginPage 에러 : " + e.message)
            }
          })
    }

    tokenTest();

    // 사용자 아이디, 비밀번호
    const user_id = ref('');
    const user_pwd = ref('');

    // 로그인 실패시 팝업을 띄울 변수
    const ifFalse = ref(false);
    const error_msg = ref('');

    // login
    const userLogin = async () => {

      const data = {
        "user_id" : user_id.value,
        "user_pwd" : user_pwd.value
      }

      await login(data)
        .then( async () => {

          // 사용자 이름 받아오기
          await getName();

          // 농장 선택 페이지 이동
          router.push({
            name : "SelectHousePage"
          })
        })
        .catch((e) => {
          console.log("LoginPage 에러 : " + e.response.data);
          error_msg.value = e.response.data;
          // 로그인 실패시 실패했다는 팝업
          ifFalse.value = true;
        })

    }

    // 사용자 이름 받아오기
    const getName = async () => {
      await get_name()
        .then((response) => {
          store.dispatch('triggerUSERNAME', response.data );
        })
        .catch((e) => {
          if(e.status === 401 && e.response.data.new_access_token !=null){
              console.log("LoginPage : 새로운 access_token 발행 : " + e.response.data.new_access_token)
              getName();
            }else{
              console.log("LoginPage - getName 에러 : " + e.response.data)
            }
        })
    }

    // 회원가입 페이지 이동
    const toSignUp = () => {
      router.push({
        name : "PreSignUpPage"
      })
    }

    // 비밀번호 찾기 페이지 이동
    const toFindPwd = () => {
      router.push({
        name : "FindPwdPage"
      })
    }

    return {
      user_id,
      user_pwd,
      userLogin,
      ifFalse,
      error_msg,
      toFindPwd,
      toSignUp
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