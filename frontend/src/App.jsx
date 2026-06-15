import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    const response = await fetch(
      "http://localhost:3001/api/history"
    );

    const data = await response.json();

    setHistory(data);
  };

  const scanUrl = async () => {
    const response = await fetch(
      "http://localhost:3001/api/scan-url",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      }
    );

    const data = await response.json();

    setResult(data);

    loadHistory();
  };

  return (
    
    <div>
      <h1>🛡️ ShadowSentinel AI</h1>

      <input
        type="text"
        placeholder="Enter URL to scan"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={scanUrl}>
        Scan URL
      </button>

      {result && (
        <div
        style={{
          width: "500px",
          margin: "20px auto",
          border: "1px solid #444",
          borderRadius: "12px",
          padding: "20px",
          backgroundColor: "#111827"
        }}
      >
  

<h2
  style={{
    border: "1px solid #444",
    padding: "15px",
    borderRadius: "10px"
  }}
>
  Scan Result
</h2>

<div>
  <p>
    Risk Score: {result.riskScore}
  </p>

  <div
    style={{
      width: "100%",
      backgroundColor: "#222",
      borderRadius: "10px",
      overflow: "hidden",
      marginTop: "10px"
    }}
  >
    <div
      style={{
        width: `${result.riskScore}%`,
        height: "20px",
        backgroundColor:
          result.riskScore >= 70
            ? "red"
            : result.riskScore >= 40
            ? "orange"
            : "limegreen"
      }}
    />
  </div>
</div>

<div
  style={{
    display: "inline-block",
    marginTop: "15px",
    padding: "10px 20px",
    borderRadius: "999px",
    backgroundColor:
      result.status === "High Risk"
        ? "#7f1d1d"
        : result.status === "Suspicious"
        ? "#78350f"
        : "#14532d",
    color: "white",
    fontWeight: "bold",
    fontSize: "20px"
  }}
>
  {result.status}
</div>

    <h3>Threat Indicators</h3>

    <ul
  style={{
    listStyle: "none",
    padding: 0
  }}
>
  {result.threatIndicators.map((indicator, index) => (
    <li key={index}>
      ⚠ {indicator}
    </li>
  ))}
</ul>

  </div>
)}
{history.length > 0 && (
  <div
    style={{
      width: "700px",
      margin: "30px auto",
      border: "1px solid #444",
      borderRadius: "12px",
      padding: "20px",
      backgroundColor: "#111827"
    }}
  >
    <h2>📜 Scan History</h2>

    {history.map((item, index) => (
      <div
        key={index}
        style={{
          borderBottom: "1px solid #333",
          padding: "10px"
        }}
      >
        <p><strong>URL:</strong> {item.url}</p>
        <p><strong>Risk:</strong> {item.risk_score}</p>
        <p><strong>Status:</strong> {item.status}</p>
        <p>
  <strong>Scanned:</strong>{" "}
  {new Date(item.scanned_at).toLocaleString()}
</p>
      </div>
    ))}
  </div>
)}
    </div>
  );
}

export default App;