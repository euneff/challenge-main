import React, { useState, useEffect } from 'react';
import './Capproval.css';
import host from "../../api";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Capproval = () => {
    const [challengeList, setChallengeList] = useState([]);
    const token = localStorage.getItem('auth-token');

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const response = await axios.get(`${host}admin/challengeauth/list`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    }
                });
                setChallengeList(response.data.result);
                console.log(challengeList);
            } catch (error) {
                console.error("도전 목록을 가져오는 중 오류 발생:", error);
            }
        };
        fetchChallenge();
    }, [token]);

    return (
        <div className="admin-section">
            <h2>챌린지 인증글 대기 리스트</h2>
                <>
            {/*<div className="courses-grid">
                {challengeList.map((challenge) => (
                    <div
                        key={challenge.id}
                        className="course-card"
                        onClick={() => handleCardClick(challenge.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="course-badge">
                            <span>{challenge.nickname}</span>
                        </div>
                        <h3 className="course-title">{challenge.contents || '도전 제목 없음'}</h3>
                        <div className="course-dates">
                            <p>작성일: {challenge.createdAt}</p>
                        </div>
                        <p className="course-description">도전!</p>
                    </div>
                ))}
            </div> */}

            {/* 도전 선택 시 사용자 목록 및 승인/거부 기능 표시 */}
            
            {/*{selectedCourse && (
                <div className="course-users">
                    <h3>{selectedCourse.contents} - 사용자 목록</h3>
                    <ul>
                        {courseUsers.map((user) => (
                            <li key={user.id}>
                                <p>{user.name}</p>
                                <div>
                                    {user.progress.map((step) => (
                                        <div key={step.step}>
                                            <p>
                                                단계 {step.step}: {step.status}
                                            </p>
                                            {step.status === 'pending' && (
                                                <button onClick={() => handleApproveStep(user.id, step)}>
                                                    {step.step}단계 승인
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                
            )}
            */}

            <table className = "post-table">
                <div className="f">
                    <thead>
                        <tr>
                            <th className="description">챌린지명 </th>
                            <th className="ninkname">성공자</th>
                            <th className="stepsId">단계</th>
                        </tr>
                    </thead>
                </div>
                <tbody>
                    {challengeList.map((challengeList)=>(
                        <tr>
                            <td>{challengeList.description}</td>
                            <td>{challengeList.stepsId}</td>
                            <td>{challengeList.nickname}</td>
                            <td>
                                <button>확인</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </>
        </div>
    );
};

export default Capproval;
