<template>
  
    <div class="container" >

        <!-- 사용자 아이콘 -->
        <div class="mt-5 mb-5" style="flex: 3" >
            <img src="https://img.icons8.com/?size=100&id=zxB19VPoVLjK&format=png&color=81D17E" alt="">
        </div>

        <!-- 사용자 이름 -->
        <div class="mb-5" style="flex: 2;" >
            <h4>{{ user_name }} 님의 농장 리스트입니다.</h4>
        </div>
        
        <!-- 농장 리스트 -->
        <div class="card mt-2"
            v-for="h in houses"
            :key = "h.house_id" style="flex: 1;"> 
            <div class="card-body p-2" @click="toMain(h.house_id)" > 
                {{ h.house_name }}
            </div>
        </div>

        

    </div>

</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { get_house_name_list } from '@/axios';

export default {

    setup(){

        // store 변수, router 변수
        const store = useStore();
        const router = useRouter();

        // NavBar 가리기
        store.dispatch('triggerSHOWNAV',false, Boolean);
        // 사용자 이름
        const user_name = ref(store.state.user_name);

        // 농장 리스트
        const houses = ref([{"house_name" : "나만의 농장"},{"house_name" : "고구마 농장"} ]);

        // 농장 목록 가져오기
        const getHouseList = async () => {
            await get_house_name_list(store.state.access_token)
                .then((response) => {
                    houses.value = response.data;
                })
                .catch((e) => {
                    console.log(e.message);
                })
        }
        getHouseList();

        // house_id 설정과 메인 페이지 이동
        const toMain = (house_id) => {

            // house_id 설정
            store.dispatch('triggerHOUSEID',house_id);

            // 메인 페이지 이동
            router.push({
                name : "Main"
            })
        }

        return {
            user_name,
            houses,
            getHouseList,
            toMain
        }

    }

}
</script>

<style scoped>

/* flex 설정 */
.container {
    display: flex;
    flex-direction: column;
    height: 50vh;
}

</style>