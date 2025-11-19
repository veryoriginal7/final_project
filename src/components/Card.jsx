import { useState } from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

const Card = ({ id, title, picture, created_at, upvotes, totalprice }) => {
  const [count, setCount] = useState(upvotes || 0);

  const handleUpvote = async () => {
    const newCount = count + 1;
    setCount(newCount);

    // Update upvotes in Supabase
    const { error } = await supabase
      .from('builds')
      .update({ upvotes: newCount })
      .eq('id', id);

    if (error) console.error(error);
  };

  return (
    <div className="Card">
      {/* Link to build detail page */}
      <Link to={`/build/${id}`} className="card-link">
        <h2 className="title">{title}</h2>
        <p className="created-at">Created at: {created_at}</p>
        <p className="total">total cost : {totalprice}</p>
        {picture && (
          <img
            className="picture"
            src={picture.startsWith("http") ? picture : picture}
            alt="Build"
            style={{ width: "200px", height: "auto", marginBottom: "10px" }}
          />
        )}
        <p>Upvotes: {count}</p>
      </Link>

      <button className="upvote-button" onClick={handleUpvote}>
        Upvote
      </button>

      <Link to={`/edit/${id}`}>
        <button className="edit-button">Edit</button>
      </Link>
    </div>
  );
};

export default Card;
