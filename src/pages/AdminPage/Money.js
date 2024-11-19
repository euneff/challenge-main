import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Minfo from "./Minfo";

// 가상 API 함수
const fetchPostsFromAPI = (currentPage, postsPerPage) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const dummyPosts = Array.from({ length: 50 }, (_, index) => ({
                id: index + 1,
                title: `게시글 제목 ${index + 1}`,
                author: `작성자 ${index + 1}`,
                views: Math.floor(Math.random() * 100),
                votes: Math.floor(Math.random() * 10),
            }));

            const indexOfLastPost = currentPage * postsPerPage;
            const indexOfFirstPost = indexOfLastPost - postsPerPage;

            resolve({
                posts: dummyPosts.slice(indexOfFirstPost, indexOfLastPost),
                totalPages: Math.ceil(dummyPosts.length / postsPerPage),
            });
        }, 500); // 500ms 지연
    });
};

const Money = () => {
    const navigate = useNavigate();
    const postsPerPage = 10; // 페이지당 게시글 수

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시글 데이터

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const data = await fetchPostsFromAPI(currentPage, postsPerPage);
                setPosts(data.posts);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("가상 API에서 데이터를 가져오는 중 오류 발생:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [currentPage]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // 확인 버튼 클릭 핸들러
    const handleOpenModal = (post) => {
        console.log("모달 열기 호출됨", post); // 디버깅 로그
        setSelectedPost(post); // 선택된 게시글 데이터 설정
        setIsModalOpen(true); // 모달 열기
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // 모달 닫기
        setSelectedPost(null); // 선택된 데이터 초기화
    };

    return (
        <div className="board-container">
            <h1>보상금 지급 대기</h1>
            {loading ? (
                <div className="loading-message">로딩 중...</div>
            ) : (
                <>
                    <table className="post-table">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>챌린지</th>
                                <th>확인</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.length > 0 ? (
                                posts.map((post, index) => (
                                    <tr key={post.id} className="post-row">
                                        <td>{(currentPage - 1) * postsPerPage + index + 1}</td>
                                        <td>{post.title}</td>
                                        <td>
                                            {/* 모달 열기 버튼 */}
                                            {/*<button onClick={() => handleOpenModal(post)}>확인</button>*/}
                                            <button onClick={() =>navigate('/adminpage/minfo')}>확인</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="no-posts-message">현재 게시된 글이 없습니다.</td>
                                </tr>
                            )}
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

            {/* 모달 */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={handleCloseModal}>닫기</button>
                        <Minfo post={selectedPost} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Money;
