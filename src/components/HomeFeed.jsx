import { useState, useEffect } from "react";
import { supabase } from "../client";
import Card from "./card";
import './HomeFeed.css';

export default function HomeFeed() {
  const [builds, setBuilds] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("created_at"); // or 'upvotes'
  const [order, setOrder] = useState("desc"); // descending by default

  const fetchBuilds = async () => {
    let query = supabase
      .from("builds")
      .select("*")
      .order(sortBy, { ascending: order === "asc" });

    if (search) {
      query = query.ilike("title", `%${search}%`); // case-insensitive search
    }

    const { data, error } = await query;
    if (error) console.error(error);
    else setBuilds(data);
  };

  useEffect(() => {
    fetchBuilds();
  }, [search, sortBy, order]);

  return (
    <div>
      <h2>Home Feed</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="created_at">Sort by Date</option>
          <option value="upvotes">Sort by Upvotes</option>
        </select>

        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <div className="feed">
        {builds.map((build) => (
          <Card
            key={build.id}
            id={build.id}
            title={build.title}
            picture={build.picture}
            created_at={build.created_at}
            upvotes={build.upvotes}
          />
        ))}
      </div>
    </div>
  );
}
