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
            <div class="card-body p-2" @click="toMain" > 
                {{ h.house_name }}
            </div>
        </div>

        

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
        // 사용자 이름
        const user_name = ref(store.state.user_name);

        // 농장 객체, 농장 리스트
        // const house = ref("");
        const houses = ref([{"house_name" : "나만의 농장"},{"house_name" : "고구마 농장"} ]);

        // 농장 목록 가져오기
        const getHouseList = () => {

        }
        getHouseList();

        // 메인 페이지 이동
        const toMain = () => {
            router.push({
                name : "Main"
            })
        }

        return {
            user_name,
            // house,
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