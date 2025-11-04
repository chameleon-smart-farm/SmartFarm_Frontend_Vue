import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    plugins: [
        createPersistedState() // vuex-persistedstate 플러그인 사용
    ],
    state : {
        user_name : "example",
        show_nav : true,
        house_id : 1
    },
    
    // 위의 state 변수들을 변경시키는 함수
    mutations : {
        MESSAGE(state, payload) {
            // state : 위의 영역 / payload : 변경될 값
            state.example = payload;
        },
        USEREMAIL(state, payload) {
            state.user_email = payload;
        },
        USERNAME(state, payload){
            state.user_name = payload;
        },
        SHOWNAV(state, payload) {
            state.show_nav = payload;
        },
        HOUSEID(state, payload){
            state.house_id = payload;
        }
    },

    // commit을 통해 mutation을 실행한 후 변경된 값을 반영한다.
    // 다른 component에서 actions를 실행한다.
    actions : {
        triggerExample({commit}, message){
            commit('MESSAGE', message);
        },
        triggerUSEREMAIL({commit}, email) {
            commit('USEREMAIL', email);
        },
        triggerUSERNAME({commit}, name) {
            commit('USERNAME', name);
        },
        triggerSHOWNAV({commit}, show) {
            commit('SHOWNAV', show);
        },
        triggerHOUSEID({commit}, house_id){
            commit('HOUSEID', house_id);
        }
    }
})

// 사용 예시
// store에 있는 액션을 실행해서 공유상태값을 반영
// store.dispatch('triggerToast', message, type);
