import {createStore} from 'vuex'

export default createStore({

    // 
    state : {
        example : true,
        user_email : "example@naver.com",
        show_nav : true
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
        SHOWNAV(state, payload) {
            state.show_nav = payload;
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
        triggerSHOWNAV({commit}, show) {
            commit('SHOWNAV', show);
        }
    }
})

// 사용 예시
// store에 있는 액션을 실행해서 공유상태값을 반영
// store.dispatch('triggerToast', message, type);
