import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './ChallengeDetail.css';
import host from "../../api";
import Review from "../Review";

const ChallengeDetail = () => {
    const { challengeId } = useParams();
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("");
    const navigate = useNavigate();
    const [isAuthor, setIsAuthor] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('auth-token');

    const [challenge, setChallenge] = useState({
        id: '',
        userId: '',
        views: '',
        votes: '',
        createdAt: '',
        description: '',
        endDate: '',
        maxHead: '',
        participationFee: '',
        startDate: '',
        totalStep: '',
    });

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const response = await axios.get(`${host}challenge/${challengeId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    },
                });
                setChallenge(response.data.result[0]);

                if (storedUser === response.data.result[0].userId) {
                    setIsAuthor(true);
                }
            } catch (error) {
                console.error("Error fetching challenge details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChallenge();
    }, [challengeId]);

    const handleDelete = async () => {
        if (window.confirm("정말로 이 도전을 삭제하시겠습니까?")) {
            try {
                await axios.delete(`${host}challenge/${challengeId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    }
                });
                navigate('/challenge');
                alert("도전이 삭제되었습니다.");
            } catch (error) {
                console.error("Error deleting challenge:", error);
                alert("도전 삭제에 실패했습니다.");
            }
        }
    };

    const handleEnroll = async () => {
        if (!storedUser) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            await axios.post(`${host}challenge/join`, {
                challengeId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                }
            });
            alert("도전에 성공적으로 신청되었습니다.");
            setIsEnrolled(true);
        } catch (error) {
            console.error("Error enrolling in challenge:", error);
            alert("이미 신청한 도전입니다.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!challenge) return <p>해당 도전을 찾을 수 없습니다.</p>;

    return (
        <>
            <div className={styles.challengeDetail}>
                <h2>{challenge.description}</h2>
                <p><strong>{challenge.status === 0
                    ? "참여비"
                    : "보상금"}</strong> {challenge.status === 0
                    ? `${challenge.participationFee ? challenge.participationFee.toLocaleString() : "0"}원`
                    : `${challenge.reward ? challenge.reward.toLocaleString() : "보증금 없음"}원`}</p>
                <p><strong>참여 인원:</strong> {challenge.maxHead}</p>
                <p><strong>진행 상태:</strong> {status}</p>
                <p><strong>도전 기간:</strong> {challenge.startDate} - {challenge.endDate}</p>
                <p><strong>현재 단계:</strong> {challenge.totalStep}</p>
                <div className={styles.buttonGroup}>
                    {isAuthor && (
                        <>
                            <button onClick={handleDelete} className={styles.deleteButton}>삭제</button>
                            <button onClick={() => navigate(`/editchallenge/${challenge.id}`)} className={styles.editButton}>수정</button>
                        </>
                    )}
                    <button onClick={handleEnroll} className={styles.enrollButton} disabled={isEnrolled}>
                        {isEnrolled ? "신청 완료" : "신청"}
                    </button>
                </div>
            </div>
            <div className={styles.challengeReview}>
                <Review challengeId={challengeId} />
            </div>
        </>
    );
};

export default ChallengeDetail;
