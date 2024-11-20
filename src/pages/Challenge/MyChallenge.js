import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MyChallenge.css';
import host from "../../api";

const MyChallenges = () => {
    const [myChallenges, setMyChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('auth-token');

    useEffect(() => {
        const fetchMyChallenges = async () => {
            try {
                const response = await axios.get(`${host}challenge/user`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    }
                });

                setMyChallenges(response.data.result);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching enrolled challenges:", error);
                alert("신청한 도전을 불러오는 데 실패했습니다.");
            }
        };
        fetchMyChallenges();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="my-challenges">
            <h2>내가 신청한 도전</h2>
            {myChallenges.length === 0 ? (
                <p>신청한 도전이 없습니다.</p>
            ) : (
                <ul>
                    {/*{myChallenges.map(challenge => (
                        <li key={challenge.id}>
                            <Link to={`/challenge/${challenge.challengeId}`}>
                                <h3>{challenge.description}</h3>
                                <p>상태: {challenge.status}</p>
                                <p>진행 단계: {challenge.currentStep} / {challenge.totalStep}</p>
                                <p>참여 인원: {challenge.userCount} / {challenge.maxHead}</p>
                                <p>예상 보상: {challenge.rewardAssume}</p>
                            </Link>
                        </li>
                    ))} */}

                    {myChallenges.map(challenge => (
                        <li key={challenge.id}>
                            <div className="timeline"></div>
                            <div className="progress-circle">
                                <span className="progress-text">63%</span>
                            </div>
                            <div className="challenge-info">
                            <Link to={(`/course/${challenge.id}`)}>
                                 <h3>{challenge.description}</h3>
                            </Link>

                                <p className="status">상태: {challenge.status} 원</p>
                                <p className="currentStep">진행단계 : {challenge.currentStep} 원</p>
                                <p className="userCount">참여인원: {challenge.userCount} 원</p>
                                <p className="rewardAssume">예상 보상금: {challenge.rewardAssume} 원</p>
                            </div>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyChallenges;
