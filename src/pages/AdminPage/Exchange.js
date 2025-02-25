import React, { useState, useEffect } from "react";
import './Exchange.css';
import axios from "axios";
import host from "../../api";

const Exchange = () => {
    const [withdrawals, setWithdrawals] = useState([]);
    const token = localStorage.getItem("auth-token");

    // 백엔드에서 환전 대기 리스트 가져오기
    useEffect(() => {
        const fetchWithdrawals = async () => {
            try {
                const response = await axios.get(`${host}admin/pointOut`, {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                });
                setWithdrawals(response.data.result);
            } catch (error) {
                console.error("환전 대기 리스트를 가져오는 중 오류 발생:", error);
            }
        };

        fetchWithdrawals();
    }, [token]);

    const handleApprove = async (id) => {
        try {
            await axios.put(
                `${host}admin/pointOut`,
                {
                    pointId: id,
                    isAccepted: 1,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                }
            );
            alert(`환전 요청 ${id}가 승인되었습니다.`);
            setWithdrawals(withdrawals.filter((withdrawal) => withdrawal.id !== id)); // 승인된 항목 제거
        } catch (error) {
            console.error("환전 요청 승인 중 오류 발생:", error);
        }
    };

    // 환전 거부
    const handleReject = async (id) => {
        try {
            await axios.put(
                `${host}admin/pointOut`,
                {
                    pointId: id,
                    isAccepted: 2,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                }
            );
            alert(`환전 요청 ${id}가 거부되었습니다.`);
            setWithdrawals(withdrawals.filter((withdrawal) => withdrawal.id !== id)); // 거부된 항목 제거
        } catch (error) {
            console.error("환전 요청 거부 중 오류 발생:", error);
        }
    };

    return (
        <div className="admin-section">
            <h2>환전 대기 리스트</h2>
            <ul>
                {withdrawals.map((withdrawal) => (
                    <li key={withdrawal.id} className="withdrawal-item">
                        <div>
                            <p>
                                <strong>사용자:</strong> {withdrawal.nickName}
                            </p>
                            <p>
                                <strong>요청 날짜:</strong> {withdrawal.createdAt}
                            </p>
                            <p>
                                <strong>환전 포인트:</strong> {withdrawal.amount} P
                            </p>
                        </div>
                        <div className="action-buttons">
                            <button
                                className="approve-button"
                                onClick={() => handleApprove(withdrawal.id)}
                            >
                                승인
                            </button>
                            <button
                                className="reject-button"
                                onClick={() => handleReject(withdrawal.id)}
                            >
                                거부
                            </button>
                        </div>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Exchange;
