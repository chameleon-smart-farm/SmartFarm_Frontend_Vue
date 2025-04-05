<template>
  <div class="container" >

    <!-- 사용자 정보 제목 -->
    <div class="row" >
        <!-- 제목 -->
        <div class="col-6" >
            <div class="text_align mt-3" >
                <h4>사용자 정보</h4>
            </div>
        </div>
        <!-- 수정 -->
        <div class="col-6" >
            <button class="btn btn-warning mt-2" v-if="!isMidifyUser" @click="toModifyUser">수정</button>
            <button class="btn btn-warning mt-2" v-if="isMidifyUser" @click="modifyUser">수정완료</button>
        </div>
    </div>

    <!-- 사용자 정보 -->
    <div class="detail" style="flex: 1;" v-if="!isMidifyUser" >
        
        <!-- 사용자 이름 -->
        <div class="row atr" >
            <div class="col-5" >
                이름
            </div>
            <div class="col-6">
                {{ user_name }}
            </div>
        </div>
        <!-- 관심 작물 -->
        <div class="row atr" >
            <div class="col-5" >
                관심 작물
            </div>
            <div class="col-6">
                {{ user_faw_crop }}
            </div>
        </div>
        <!-- 아이디 -->
        <div class="row atr" >
            <div class="col-5" >
                아이디
            </div>
            <div class="col-6">
                {{ user_id }}
            </div>
        </div>
    </div>

    <!-- 사용자 정보 수정 -->
    <div class="detail" style="flex: 1;" v-if="isMidifyUser" >
        
        <!-- 사용자 이름 -->
        <div class="row atr" >
            <div class="col-5" >
                이름
            </div>
            <div class="col-6">
                <input type="text" v-model="modi_user_name" class="form-control" >
            </div>
        </div>
        <!-- 관심 작물 -->
        <div class="row atr" >
            <div class="col-5" >
                관심 작물
            </div>
            <div class="col-6">
                <input type="text" v-model="modi_user_faw_crop" class="form-control" >
            </div>
        </div>
        <!-- 아이디 -->
        <div class="row atr" >
            <div class="col-5" >
                아이디
            </div>
            <div class="col-6">
                {{ user_id }}
            </div>
        </div>
    </div>

    <!-- 농장 정보 제목 -->
    <div class="row" >
        <!-- 제목 -->
        <div class="col-6" >
            <div class="text_align mt-3" >
                <h4>농장 정보</h4>
            </div>
        </div>
        
    </div>

    <!-- 농장 정보 -->
    <div style="flex: 1;" >
        
        <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-inner detail">

                <!-- 농장 반복문 -->
                <div v-for="house in house_list" 
                 :key="house.house_id" 
                 class="carousel-item" 
                 :class="{ active: house.house_id === 1 }">

                    <!-- 수정 -->
                    <div class="mt-2 d-flex justify-content-end" style="margin-right: 15%; margin-bottom: 10%;" >
                        <button class="btn btn-warning mt-2"  v-if="!isMidifyHouse" @click="toModifyHouse">수정</button>
                        <button class="btn btn-warning mt-2"  v-if="isMidifyHouse" @click="modifyHouse(house.house_id)">수정완료</button>
                    </div>

                    <!-- 농장 이름 -->
                    <div class="row atr" >
                        <div class="col-5" >
                            농장 이름
                        </div>
                        <div class="col-6">
                            <div v-if="!isMidifyHouse" > {{ house.house_name }} </div>
                            <div v-if="isMidifyHouse" > <input type="text" v-model="house_name" class="form-control" > </div>
                        </div>
                    </div>
                    <!-- 키우는 작물 -->
                    <div class="row atr" >
                        <div class="col-5" >
                            키우는 작물
                        </div>
                        <div class="col-6">
                            <div v-if="!isMidifyHouse" > {{ house.house_crop }} </div>
                            <div v-if="isMidifyHouse" > <input type="text" v-model="house_crop" class="form-control" > </div>
                        </div>
                    </div>
                    <!-- 주소 -->
                    <div class="row atr" >
                        <div class="col-5" >
                            주소
                        </div>
                        <div class="col-6">
                            {{ house.house_add }}
                        </div>
                    </div> <!-- 주소 끝 -->
                </div> <!-- 농장 반복문 끝 -->
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden" >Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

    </div>

    <!-- 농장 정보 수정 -->


  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { get_user_info, put_user_info,
    get_house_info, put_house_info } from '@/axios';

export default {

    setup(){
        // store 변수, router 변수
        const store = useStore();
        const router = useRouter();

        // NavBar 보이기
        store.dispatch('triggerSHOWNAV',true, Boolean);

        // 사용자 정보 - 이름, 관심 작물, 아이디
        const user_name = ref(store.state.user_name);
        const user_faw_crop = ref("관심 작물");
        const user_id = ref("아이디");

        // 사용자 정보 얻어오기
        const getUserInfo = async () => {
            await get_user_info(store.state.access_token)
                .then((response) => {
                    user_name.value = response.data.user_name;
                    user_faw_crop.value = response.data.faw_crop;
                    user_id.value = response.data.user_id;
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

        getUserInfo();

        // 사용자 정보 수정 여부
        const isMidifyUser = ref(false);

        // 사용자 정보 수정 변수
        const modi_user_name = ref(user_name);
        const modi_user_faw_crop = ref(user_faw_crop.value);

        // 사용자 정보 수정 틀로 변경
        const toModifyUser = () => {
            isMidifyUser.value = true;
        }

        // 사용자 정보 수정
        const modifyUser = async () => {
            
            const data = {
                "user_name": modi_user_name.value,
                "user_id": user_id.value,
                "faw_crop": modi_user_faw_crop.value
            }

            await put_user_info(store.state.access_token, data)
                .then(() => {
                    isMidifyUser.value = false;
                    getUserInfo();
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

        // 농장 리스트
        const house_list = ref([]);

        // 사용자의 농장 리스트 얻어오기
        const getHouseList = async () => {
            await get_house_info(store.state.access_token)
                .then((response) => {
                    house_list.value = response.data;
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

        getHouseList();

        // 농장 정보 수정 여부
        const isMidifyHouse = ref(false);

        // 농장 정보 수정 변수
        const house_name = ref("");
        const house_crop = ref("");

        // 농장 정보 수정 틀로 변경
        const toModifyHouse = () => {
            isMidifyHouse.value = true;
        }

        // 농장 정보 수정
        const modifyHouse = async (house_id) => {

            const data = {
                "house_id": house_id,
                "house_crop": house_crop.value,
                "house_name": house_name.value
            }

            await put_house_info(store.state.access_token, data)
                .then(() => {
                    isMidifyHouse.value = false;
                    getHouseList();
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

        return {
            isMidifyUser,
            toModifyUser,
            modifyUser,
            modi_user_name,
            modi_user_faw_crop,
            isMidifyHouse,
            toModifyHouse,
            modifyHouse,
            user_name,
            user_faw_crop,
            user_id,
            house_list,
            house_name,
            house_crop
        }
    }

}
</script>

<style scoped>

/* flex 설정 */
.container {
    display: flex;
    flex-direction: column;
    height: 70vh;
}

/* 왼쪽 정렬 */
.text_align{
  text-align: left;
  margin: 2px;
  margin-bottom: 6px;
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