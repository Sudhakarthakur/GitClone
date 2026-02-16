import React, { useEffect, useState } from "react";
// import Repository from "../../../../backend/model/repoModel";
import styles from "./Dashboard.module.css";
import Navbar from "../Navbar";

function Dashboard() {
  const [repositories, setRepositories] = useState([]);
  const [searchQurey, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const res = await fetch(`http://localhost:3000/repo/user/${userId}`);
        const data = await res.json();
        setRepositories(Array.isArray(data) ? data : []);
        console.log(data);
      } catch (err) {
        console.log("error fetching repositories", err);
        setRepositories([]);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const res = await fetch(`http://localhost:3000/repo/all`);
        const data = await res.json();
        // setSuggestedRepositories(Array.isArray(data) ? data : []);
        setSuggestedRepositories(data);
        console.log(data);
      } catch (err) {
        console.log("error fetching repositories", err);
        setSuggestedRepositories([]);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQurey === "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) => {
        repo.name.toLowerCase().includes(searchQurey.toLowerCase());
      });
      setSearchResults(filteredRepo);
    }
  }, [searchQurey, repositories]);

  return (
    <>
      {" "}
      <Navbar />
      <section className={styles.container}>
        <aside>
          <h3>Suggested Repositories</h3>
          {suggestedRepositories.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            );
          })}
        </aside>
        <main>
          <h3>your Repositories</h3>
          <div className="search">
            <input
              type="text"
              value={searchQurey}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchResults.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            );
          })}
        </main>

        <aside>
          <h3>suggest event</h3>
          <ul>
            <li>
              <p>hello event</p>
            </li>
            <li>
              <p>ai event</p>
            </li>
            <li>
              <p>java event</p>
            </li>
            <li>
              <p>react event </p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
}

export default Dashboard;
