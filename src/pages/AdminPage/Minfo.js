const Minfo = ({ post }) => {
  if (!post) return null;

  return (
      <div>
          <h2>{post.title}</h2>
          <p>작성자: {post.author}</p>
          <p>조회수: {post.views}</p>
          <p>투표수: {post.votes}</p>
      </div>
  );
};

export default Minfo;