import axios from "axios";

let user_axios = axios.create({
    baseURL : "http://localhost:8080/",
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
});

// 사용예시 - 일반 로그인
// export function login(data) {
//     return user_axios.post('/user/login', data);
// }

// 로그인 정보 얻어오기
// export function login_info_get(token) {
//     return user_axios.get('/user/getInfo', {
//         headers : {
//             login_token : token
//         }
//     })
// }