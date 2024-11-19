import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import host from "../../api";

const Money = () => {
    const navigate = useNavigate();
    const postsPerPage = 10;

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('auth-token');


    useEffect(() => {
        const fetchMoney = async () => {
            try {
                const response = await axios.get(`${host}challenge/list`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    }
                });
                setPosts(response.data.result);
            } catch (error) {
                console.error("Error fetching challenges:", error);
            }
        };

        fetchMoney();
    }, [currentPage]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleCardClick = (challengeId) => {
        navigate(`/adminpage/minfo/${challengeId}`);
        console.log(challengeId);
    };

    return (
        <div className="board-container">
            <h1>보상금 지급 대기</h1>
            {loading ? (
                <div>로딩 중...</div>
            ) : (
                <>
                    <table>
                        <div className="f">
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>챌린지</th>
                                    <th>확인</th>
                                </tr>
                            </thead>
                        </div>
                        <tbody>
                            {posts.map((post, index) => (
                                <tr>
                                    <td>{(currentPage - 1) * postsPerPage + index + 1}</td>
                                    <td>{post.description}</td>
                                    <td>
                                        <button
                                                onClick={() => handleCardClick(post.challengeId)}>
                                            확인
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        {[...Array(totalPages).keys()].map(num => (
                            <button
                                key={num}
                                onClick={() => paginate(num + 1)}
                                className={currentPage === num + 1 ? 'active' : ''}
                            >
                                {num + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Money;