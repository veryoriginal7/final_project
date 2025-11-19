import { useState } from 'react';
import './Card.css';
import more from './more.png';
import { Link } from 'react-router-dom';

const Card = ({ id, title, picture, created_at, notes, totalprice }) => {
        
  const [count, setCount] = useState(0);
  const updateCount = () => setCount(c => c + 1);

  return (
    <div className="Card">
      {/* Link to detail page */}
      <Link to={`/build/${id}`}>
        <h2 className="title">Name: {title}</h2>
        <h3 className="create">Created at {created_at}</h3>
        <h3 className="notes">Notes: {notes}</h3>
        <h3 className="totalprice">Total Price: ${totalprice}</h3>
        <img className="picture" alt="build pic" src={picture} />
      </Link>

      {/* Link to edit page */}
      <Link to={`/edit/${id}`}>
        <button className="deleteButton">edit</button>
      </Link>

    </div>
  );
};

export default Card;
