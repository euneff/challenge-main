import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import axios from 'axios'; // Import Axios
import './LoginPage.css';

const host = require('../api');

const LoginPage = ({ onLogin }) => {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleInfo = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prev) => ({ ...prev, [name]: value }));
    };

    const gotoSignup = () => navigate('/signup');

    const loginClick = async (e) => {
        e.preventDefault(); //페이지 새로고침 방지
        try {
            const response = await axios.post(`${host}auth/signin`, loginInfo, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                const res = response.data;
                localStorage.setItem('user', JSON.stringify(res.userId));
                localStorage.setItem('auth-token', res.authToken);

                console.log('현재 로그인된 사용자 ID:', res.userId);

                if (onLogin) onLogin(res.userId);

                window.dispatchEvent(new Event("storage"));

                alert('로그인에 성공하였습니다!');
                navigate('/');
            } else {
                alert('이메일 또는 비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('로그인 중 오류 발생:', error);
            alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <form className="login">
            <div className="loginTitle">로그인</div>
            <input
                className="loginBox"
                type="text"
                placeholder="이메일을 입력해주세요"
                name="email"
                value={loginInfo.email}
                onChange={handleInfo}
                required
            />
            <input
                className="loginBox"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                name="password"
                value={loginInfo.password}
                onChange={handleInfo}
                required
            />
            <div className="checkId">
                <AiOutlineCheckCircle className="checkBtn" />
                <span className="checkIdSave">아이디 저장</span>
            </div>
            <button className="btnLogin" onClick={loginClick}>
                로그인
            </button>
            <button type="button" className="btnSignup" onClick={gotoSignup}>
                회원가입
            </button>
            <div className="memberFind">
                <Link to="/" className="colorWhite margin30">
                    이메일 찾기
                </Link>
                <Link to="/" className="colorWhite">
                    비밀번호 찾기
                </Link>
            </div>
        </form>
    );
};

export default LoginPage;
