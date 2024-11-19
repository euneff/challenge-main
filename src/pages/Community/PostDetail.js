import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostDetail.css';
import host from "../../api";
import heart1 from '../../assets/heart1.png';
import heart2 from '../../assets/heart2.png';

const PostDetail = ({ userName }) => {
    const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
    const [likedComments, setLikedComments] = useState([]);
    const { id } = useParams();
    const [post, setPost] = useState({
        nickName: '',
        pid: '',
        title: '',
        content: '',
        votes: '',
        views: '',
        createdAt: '',
        updatedAt: ''
    });
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('auth-token');
    const storedUser = JSON.parse(localStorage.getItem('user'));

     // 좋아요 상태 토글 함수
     {/*const toggleLike = () => {
        setIsLiked(!isLiked);
    }; */}

    const toggleLike = (commentId) => {
        if (likedComments.includes(commentId)) {
            // 이미 좋아요를 누른 상태라면 해제
            setLikedComments(likedComments.filter((id) => id !== commentId));
        } else {
            // 좋아요 추가
            setLikedComments([...likedComments, commentId]);
        }
    };

    useEffect(() => {
        console.log(storedUser);
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${host}community/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                setPost(response.data.result[0]);
            } catch (error) {
                console.error("Error fetching post details:", error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await axios.get(`${host}comment/${id}`,{
                    headers: {
                        'Content-Type': 'application/json',
                    }
                    });
                const mappedComments = response.data.result.map(res => ({
                    commentId: res.commentId,
                    nickName: res.nickName,
                    content: res.content,
                    createdAt: res.createdAt,
                    votes: res.votes,
                    userId: res.userId,
                }));
                setComments(mappedComments);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        const togglePostLike = async () => {
            try {
                await axios.post(`${host}like/${post.votes}`, {}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    }
                });
                setIsLiked(!isLiked);
            } catch (error) {
                console.error("Error toggling like:", error);
            }
        };

        fetchPost();
        fetchComments();
    }, [id]);

    //댓글 추가 기능
    const handleAddComment = async () => {
        if (!newComment.trim()) return alert("댓글 내용을 입력해주세요.");

        try {
            const response = await axios.post(`${host}comment/`,
                {
                    content: newComment,
                    postId: id,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    }
                }
            );
            <button onClick={handleAddComment} className="add-comment-button">댓글 추가</button>
            setComments([ ...comments,response.data]);
            setNewComment('');
            window.location.reload()
        } catch (error) {
            alert("댓글 추가에 실패했습니다.");
        }
    };

    //댓글 삭제 기능
    const handleDeleteComment = async (commentId) => {
        if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
            try {
                await axios.delete(`${host}comment/${commentId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    }
                });
                setComments(comments.filter(comment => comment.commentId !== commentId));
                alert("댓글이 삭제되었습니다.");
            } catch (error) {
                console.log(comments.commentId);
                console.error("Error deleting comment:", error);
                alert("댓글 삭제에 실패했습니다.");
            }
        }
    };

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = async () => {
        if (window.confirm("정말로 이 글을 삭제하시겠습니까?")) {
            try {
                await axios.delete(`${host}community/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    }
                });
                alert("글이 삭제되었습니다.");
                navigate('/community');
            } catch (error) {
                console.error("Error deleting post:", error);
                alert("글 삭제에 실패했습니다.");
            }
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (!post.title) return <p>Loading...</p>;

    return (
        <div className="post-detail-container">
        <div className="post-header">
                <div className="post-header-row">
                    <span className="pp">제목</span>
                    <span className="post-title">{post.title}</span>
                </div>
                <div className="post-header-row">
                    <span className="pp">작성자</span>
                    <span className="post-ninkName">{post.nickName}</span>
                </div>
                <div className="post-header-row">
                    <span className="pp">작성일</span>
                    <span className="post-date">{post.createdAt}</span>
                </div>
            </div>

            <div className="post-content">
                <p>{post.content}</p>
            </div>


            <div className="button-group">
                <button onClick={handleEdit} className="edit-button">수정</button>
                <button onClick={handleDelete} className="delete-button">삭제</button>
            </div>


        {/*댓글입력*/}
        <div className="comment-section">
            <h3>댓글 {comments.length}개</h3>
            <div className="comment-input-container">
            <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="댓글 입력하기"
                        className="comment-input"
            />
            <button onClick={handleAddComment} className="add-comment-button">댓글 추가</button>
            
            </div>
        </div>

        <ul className="comment-list">
            {/*{comments.map(comment => (
                <li key={comment.commentId} className="comment-item">
                    <p>작성자: {comment.nickName}</p>
                    <p>{comment.content}</p>
                    <p>추천수: {comment.votes}</p>
                    <p>작성일: {comment.createdAt}</p>
                    <button onClick={() => handleDeleteComment(comment.commentId)} className="delete-comment-button">
                        댓글 삭제
                    </button>
                </li>
            ))} */}

        {comments.map((comment) => (
            <li key={comment.commentId} className="comment-item">
                <div className="comment-header">
                    <div className="comment-info">
                        <span className="comment-nickName">{comment.nickName}</span>
                        <span className="comment-date">{comment.createdAt}</span>
                    </div>
                </div>
                <div ClassName="flex">
                    <div className="comment-body">
                        <p className="comment-content">{comment.content}</p>
                    </div>
                    <div className="comment-actions">
                        {/* 좋아요 버튼 */}
                        <button
                            className="like-button"
                            onClick={() => toggleLike(comment.commentId)}
                        >
                            <img
                                src={likedComments.includes(comment.commentId) ? heart1 : heart2}
                                alt="like"
                                className="like-icon"
                            />
                        </button>
                        {storedUser?.userId === comment.userId && (
                            <button
                                onClick={() => handleDeleteComment(comment.commentId)}
                                className="delete-comment-button"
                            >
                                삭제
                            </button>
                        )}
                    </div>
                </div>
            </li>
    ))}
        </ul>

        <button onClick={handleBack} className="back-button">목록</button>
    </div>
    );
};

export default PostDetail;
