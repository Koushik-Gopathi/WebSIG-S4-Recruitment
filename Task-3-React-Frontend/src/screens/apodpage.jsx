import React, { useEffect, useState } from "react";
import "./apodpage.css";

function Apodpage() {
  const api_key = "cwzjPPzckYF8hX1hBkEarHZ7EhV4Z0feYniFGMg3";

  const [data, setData] = useState(null);
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const todayStr = new Date().toISOString().slice(0, 10);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);

  const changeDate = (days) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + days);
    setCurrentDate(d.toISOString().slice(0, 10));
  };

  useEffect(() => {
    const fetchURL = async () => {
      try {
        setLoading(true);
        setImgLoaded(false);
        setError(null);

        const url = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${currentDate}`;
        const res = await fetch(url);
        const json = await res.json();

        if (!res.ok || json.error) {
          const msg =
            json?.error?.message || "No Data Available for this Date";
          throw new Error(msg);
        }

        setData(json);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setData(null);
        setLoading(false);
        setImgLoaded(false);
      }
    };

    fetchURL();
  }, [currentDate]);

  if (error) {
    return (
      <div className="error-box">
        <p>⚠ {error}</p>
        <button onClick={() => changeDate(-1)}>Go Back</button>
      </div>
    );
  }

  if (loading || !data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="title">
        <h1>{data.title}</h1>
      </div>

      <div className="date">
        <h2>{data.date}</h2>
      </div>

      <div className="nav">
        <button onClick={() => changeDate(-1)}>⬅ Prev</button>

        <button
          onClick={() => changeDate(1)}
          disabled={currentDate >= todayStr}
        >
          Next ➡
        </button>
      </div>

      <div className="media">
        <img
          src={data.hdurl || data.url}
          alt={data.title}
          style={{ width: "100%" }}
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      <div className="description">
        <p>{data.explanation}</p>
      </div>

      <div className="footer">
        <p>{data.copyright || "© NASA APOD"}</p>
      </div>
    </div>
  );
}

export default Apodpage;
