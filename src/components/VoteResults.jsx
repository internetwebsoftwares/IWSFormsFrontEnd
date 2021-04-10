import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingIcon from "./LoadingIcon";
import Page from "./Page";

function VoteResults() {
  const id = window.location.pathname.split("/")[1];
  const [formName, setFormName] = useState("...");
  const [votes, setVotes] = useState({});
  const [maxVotes, setMaxVotes] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [winner, setWinner] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchVote() {
      try {
        const response = await axios.get(`/vote/${id}/results`, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
          },
        });
        setFormName(response.data.formName);
        setVotes(response.data.votes);
        setCandidates(Object.keys(response.data.votes));
        setMaxVotes(response.data.winnerObj.mostVotes);
        setWinner(response.data.winnerObj.winner);
        setTotalVotes(() => {
          let votes = Object.values(response.data.votes);
          let total = 0;
          for (let item of votes) {
            total += item;
          }
          return total;
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchVote();
  }, []);

  if (isLoading) {
    return <LoadingIcon />;
  }

  return (
    <Page title="Vote results">
      <div className="container mt-5 bg-white p-3 shadow-sm">
        <h3>
          {" "}
          {formName} {" | "} <span className="text-muted">Results</span>{" "}
        </h3>
        <hr />
        <p className="text-muted">
          <b className="text-dark">{winner}</b> has most votes with :{" "}
          <b className="text-dark">{maxVotes}</b> votes out of{" "}
          <b className="text-dark">{totalVotes}</b> .
        </p>
        <table className="table table-bordered text-center table-striped">
          <thead className="bg-primary shadow-sm">
            <tr className="text-light">
              <th>Candidates</th>
              <th>votes</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => {
              return (
                <tr key={index}>
                  <td>
                    <b>{candidate}</b>
                  </td>
                  <td>
                    <b>{votes[candidate]}</b>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Page>
  );
}

export default VoteResults;
