import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const totalScans = history.length;

const highRiskCount = history.filter(
  item => item.status === "High Risk"
).length;

const safeCount = history.filter(
  item => item.status === "Safe"
).length;
const suspiciousCount = history.filter(
  item => item.status === "Suspicious"
).length;

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
      <div
  style={{
    width: "700px",
    margin: "20px auto",
    backgroundColor: "#111827",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #333"
  }}
>
  <h2>📊 Threat Analytics</h2>

  <p>Total Scans: {totalScans}</p>

  <div
    style={{
      backgroundColor: "#222",
      borderRadius: "8px",
      overflow: "hidden",
      marginBottom: "10px"
    }}
  >
    <div
      style={{
        width: `${highRiskCount * 10}%`,
        backgroundColor: "red",
        height: "20px"
      }}
    />
  </div>

  <p>High Risk: {highRiskCount}</p>

  <div
    style={{
      backgroundColor: "#222",
      borderRadius: "8px",
      overflow: "hidden",
      marginBottom: "10px"
    }}
  >
    <div
      style={{
        width: `${suspiciousCount * 10}%`,
        backgroundColor: "orange",
        height: "20px"
      }}
    />
  </div>

  <p>Suspicious: {suspiciousCount}</p>

  <div
    style={{
      backgroundColor: "#222",
      borderRadius: "8px",
      overflow: "hidden"
    }}
  >
    <div
      style={{
        width: `${safeCount * 10}%`,
        backgroundColor: "limegreen",
        height: "20px"
      }}
    />
  </div>

  <p>Safe URLs: {safeCount}</p>
</div>
      <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    margin: "30px auto",
    flexWrap: "wrap",
    width: "100%"
  }}
>
  <div
    style={{
      backgroundColor: "#111827",
      padding: "20px",
      borderRadius: "12px",
      width: "280px",
      textAlign: "center"
    }}
  >
    <h3>Total Scans</h3>
    <h2>{totalScans}</h2>
  </div>

  <div
    style={{
      backgroundColor: "#111827",
      padding: "20px",
      borderRadius: "12px",
      width: "280px",
      textAlign: "center"
    }}
  >
    <h3>High Risk</h3>
    <h2>{highRiskCount}</h2>
  </div>

  <div
    style={{
      backgroundColor: "#111827",
      padding: "20px",
      borderRadius: "12px",
      width: "280px",
      textAlign: "center"
    }}
  >
    <h3>Safe URLs</h3>
    
    <h2>{safeCount}</h2>
  </div>
  <div
  style={{
    backgroundColor: "#111827",
    padding: "20px",
    borderRadius: "12px",
    width: "220px",
    textAlign: "center"
  }}
>
  <h3>Suspicious</h3>
  <h2>{suspiciousCount}</h2>
</div>
</div>
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
<h3>Threat Type</h3>

<p
  style={{
    color: "#00d4ff",
    fontWeight: "bold"
  }}
>
  {result.threatType}
</p>

<h3>Confidence</h3>

<p
  style={{
    color: "#ffd700",
    fontWeight: "bold"
  }}
>
  {result.confidence}%
</p>

<h3>Recommendation</h3>

<p
  style={{
    color: "#ffb347",
    maxWidth: "500px",
    margin: "0 auto"
  }}
>
  {result.recommendation}
</p>
<h3>🧠 Threat Analysis</h3>

<p
  style={{
    maxWidth: "600px",
    margin: "0 auto 20px auto",
    color: "#d1d5db",
    lineHeight: "1.7"
  }}
>
  {result.explanation}
</p>
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