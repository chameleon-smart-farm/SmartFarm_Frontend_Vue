import axios from "axios";

let user_axios = axios.create({
    // baseURL : "https://localhost:8080",
    // baseURL : "http://3.37.160.235:8080",
    baseURL : "https://back.moduleup.cloud:8080",
    withCredentials : true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
});

let access_token = "";
console.log("axios.js : " + access_token)

export function set_access_token(set_access_token){
    access_token = set_access_token;
}

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
export async function login(data) {
    await user_axios.post('/login', data)
        .then((response) => {
            access_token = response.data.access_token;
        })
}

// 사용자 이름 받아오기
export function get_name() {

    return user_axios.get('/get_name', {
        headers : {
            "Authorization" : "Bearer " + access_token
        }
    })
}

// 토큰 테스트
export function test() {
    return user_axios.get('/test', {
        headers : {
            "Authorization" : "Bearer " + access_token
        }
    })
}

// 농장 목록 가져오기
export function get_house_name_list() {
    return user_axios.get('/house/name_list', {
        headers : {
            "Authorization" : "Bearer " + access_token
        }
    })
}

// 농장 기상청 데이터 가져오기
export function get_weather_info(house_id){
    return user_axios.get('/house/get_weather_info/' + house_id, {
        headers : {
            "Authorization" : "Bearer " + access_token
        }
    })
}

// 예약 정보 리스트 가져오기
export function get_reservation_list(house_id) {
    return user_axios.get('/reservation/list/' + house_id, {
        headers : {
            "Authorization" : "Bearer " + access_token
        }
    })
}

// 예약 정보 입력하기
export function post_reservation(house_id, data) {
    return user_axios.post('/reservation/insert/' + house_id, data,  {
        headers : {
            "Authorization" : "Bearer " + access_token
        }
    })
}

// 사용자 정보 받아오기
export function get_user_info() {
    return user_axios.get('/user/info',  {
        headers : {
            "Authorization" : "Bearer " + access_token
        }
    })
}

// 사용자 정보 수정
export function put_user_info(data) {
    return user_axios.put('/user/update', data, {
        headers : {
            "Authorization" : "Bearer " + access_token
        }
    })
}

// 농장 정보 조회
export function get_house_info() {
    return user_axios.get('/house/info',  {
        headers : {
            "Authorization" : "Bearer " + access_token
        }
    })
}

// 농장 정보 수정
export function put_house_info(data) {
    return user_axios.put('/house/update', data, {
        headers : {
            "Authorization" : "Bearer " + access_token
        }
    })
}

// 온도 데이터 조회 : PLC 온도, 기상청 온도, 3시간 평균 온도 리스트 받아오기
export function get_house_tem_info(house_id) {
    return user_axios.get('/house_status/tem_info/' + house_id,  {
        headers : {
            "Authorization" : "Bearer " + access_token
        }
    })
}

// 모터 상태 조회 메서드
export function get_motor_info(house_id) {
    return user_axios.get('/house_machine/motor/status/' + house_id,  {
        headers : {
            "Authorization" : "Bearer " + access_token
        }
    })
}

// 모터 on/off 메서드
export function post_motor_on_off(house_id, data) {
    return user_axios.post('/house_machine/motor/on_off/' + house_id, data,  {
        headers : {
            "Authorization" : "Bearer " + access_token
        }
    })
}