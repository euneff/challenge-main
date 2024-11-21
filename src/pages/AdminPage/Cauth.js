import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import host from "../../api";
import styles from "./Minfo.module.css"; 

const Cauth = () => {
  const location = useLocation();
  const [posts, setPosts] = useState({});
  const [participants, setParticipants] = useState([]);
  const { id } = useParams();
  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    const fetchChallengeData = async () => {
      try {
        const response = await axios.get(`${host}challenge/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        setPosts(response.data.result[0]);
        setParticipants(response.data.result[0].participants || []);
      } catch (error) {
        console.error("Error fetching challenge data:", error);
      }
    };

    fetchChallengeData();
  }, [id, token]);

  return (
    <div className={styles["minfo-container"]}>
      {/* 챌린지 정보 */}
      <div className={styles["challenge-info"]}>
        <h2>챌린지 인증 대기 리스트</h2>
        <p>챌린지: {posts.description}</p>
        <p>도전자: {posts.userId}</p>
      </div>

      {/* 등록 명단 */}
      <div className={styles["participants-container"]}>
        <h3>성공자 명단</h3>
        <ul>
          {participants.length > 0 ? (
            participants.map((participant, index) => (
              <li key={index}>{index + 1}. {participant.name}</li>
            ))
          ) : (
            <li>성공자가 없습니다.</li>
          )}
        </ul>
      </div>

      {/* 버튼 */}
      <div className={styles["button-container"]}>
        <button className={styles["pay-button"]}>승인</button>
        <button className={styles["reject-button"]}>거부</button>
      </div>
    </div>
  );
};

export default Cauth;