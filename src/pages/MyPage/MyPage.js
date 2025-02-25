import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import './MyPage.css';
import axios from 'axios';
import host from "../../api";

function Mypage({ onLogout }) {
    const [showRecentlyViewed, setShowRecentlyViewed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const userId = JSON.parse(localStorage.getItem('user'));

    const handleDeleteProfile = async (e) => {
        e.preventDefault();
        console.log("Deleting user with ID:", userId);
        const token = localStorage.getItem('auth-token');

        if (!userId) {
            alert("유효한 사용자 정보가 없습니다.");
            return;
        }

        if (window.confirm('가입된 회원 정보가 모두 삭제됩니다. 탈퇴 후 같은 계정으로 재가입 시 기존에 가지고 있던 포인트는 복원되지 않습니다. 회원 탈퇴를 진행하시겠습니까?')) {
            try {
                const response = await axios.delete(`${host}auth/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    }
                });

                if (response.status === 200) {
                    localStorage.removeItem('user');
                    localStorage.removeItem('auth-token');
                    onLogout(false); // handleLogout 호출 시 alert 표시 안 함
                    alert('그동안 이용해주셔서 감사합니다.');
                    navigate('/');
                } else {
                    console.error("회원탈퇴 실패:", response.status);
                    alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
                }
            } catch (err) {
                console.error("회원탈퇴 중 오류 발생:", err);
                alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    // 중첩 라우트 경로에 있을 때 MyPage 콘텐츠 숨기기
    const isSubRoute = location.pathname !== '/mypage';

    if (isSubRoute) {
        return <Outlet />;
    }

    return (
        <div className="mypage">
            <div className="grayWrapper">
                <div className="grayLeft">
                    <p>
                        안녕하세요
                        <br />
                        오늘도 <span className="textBrown">도전 </span> 하는 당신 <br />정말 멋지네요.
                    </p>
                </div>
                <div className="grayRight">
                    <div className="grayRightTop">
                        <div className="grayRightTopFirst">
                            <span>포인트 적립 </span>
                            <Link className="linkStyle" to="#">
                                0원
                            </Link>
                        </div>
                        <div className="grayRightTopSecond">
                            <span>포인트 충전 / 환전</span>
                            <div>
                                <button className="pointbutton" onClick={() => navigate('/mypage/pointrecharge')}>충전하기</button>
                                <button onClick={() => navigate('/mypage/pointexchange')}>환전하기</button>
                            </div>
                        </div>
                    </div>
                    <div className="grayRightThird">
                        <p>성공한 도전 내역</p>
                        <Link className="linkStyle" to="#">
                            0개
                        </Link>
                    </div>
                </div>
            </div>
            <div className="whiteWrapper">
                <div className="whiteInner">
                    <div className="whiteLeft">
                        <p className="title">마이페이지</p>
                        <div className="boxList">
                            <button onClick={()=>navigate('/mypage/myinfo')}>내 정보</button>
                            <button onClick={() => setShowRecentlyViewed(!showRecentlyViewed)}>최근 본 도전</button>
                            <button>성공한 챌린지 내역</button>
                            <button onClick={() => navigate('/mypage/mypoint')}>포인트 관리</button>
                            <button onClick={() => navigate('/mypage/helpCenter')}>1:1 문의</button>
                            <button onClick={handleDeleteProfile}>회원탈퇴</button>
                        </div>
                    </div>
                    <div className="whiteRight">
                        <div className="orderStatus">
                            <p>
                                도전 현황<span>(현재 내가 신청한 진행 중인 도전)</span>
                            </p>
                            <Link to="/completedchallenges">
                                <button className="link-button">지난 도전</button>
                            </Link>
                        </div>
                        <div className="inProgressChallenges">
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mypage;
