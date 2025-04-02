import axios from "axios";

let user_axios = axios.create({
    baseURL : "http://localhost:8080",
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
});

// 회원가입 - 시리얼 번호 확인
export function confirm_serial(data){
    return user_axios.post('/user/serial',data, {
        headers: {
            'Content-Type': 'text/plain', // 시리얼 번호만 문자열로 전송
        }
    });
}

// 회원가입 - 사용자 정보 입력 + 농장 정보 입력
export function sign_up(data){
    return user_axios.post('/user/sign_up', data);
}

// 로그인
export function login(data) {
    return user_axios.post('/login', data);
}

// 로그인 정보 얻어오기
// export function login_info_get(token) {
//     return user_axios.get('/user/getInfo', {
//         headers : {
//             login_token : token
//         }
//     })
// }