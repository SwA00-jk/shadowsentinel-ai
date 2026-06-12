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
  
    return {
      score,
      indicators
    };
  };
  
  module.exports = {
    checkThreatIndicators
  };
  