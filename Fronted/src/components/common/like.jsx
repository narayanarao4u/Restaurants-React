const LikeHeart = (props) => {
  let classLike = "fa fa-heart";
  if (!props.like) classLike += "-o";

  return (
    <div>
      <i
        onClick={props.onClick}
        className={classLike}
        aria-hidden="true"
        style={{ cursor: "pointer" }}
      ></i>
    </div>
  );
};

export default LikeHeart;
