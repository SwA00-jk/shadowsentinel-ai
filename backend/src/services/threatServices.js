const suspiciousKeywords = [
  "login",
  "verify",
  "update",
  "secure",
  "bank",
  "account",
  "wallet",
  "crypto",
  "gift"
];

const checkThreatIndicators = (url) => {
  let score = 0;
  let indicators = [];

  suspiciousKeywords.forEach((keyword) => {
    if (url.toLowerCase().includes(keyword)) {
      score += 10;
      indicators.push(keyword);
    }
  });

  let threatType = "Safe Website";
  let confidence = 20;
  let recommendation =
    "No major threats detected.";

  if (score >= 40) {
    threatType = "Phishing Website";
    confidence = 95;
    recommendation =
      "Do NOT enter passwords or personal information.";
  } else if (score >= 20) {
    threatType = "Suspicious Website";
    confidence = 70;
    recommendation =
      "Proceed carefully and verify legitimacy.";
  }

  return {
    score,
    indicators,
    threatType,
    confidence,
    recommendation
  };
};

module.exports = {
  checkThreatIndicators
};