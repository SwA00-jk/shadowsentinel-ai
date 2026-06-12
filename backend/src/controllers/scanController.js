const { checkThreatIndicators } = require("../services/threatServices");
const scanUrl = (req, res) =>
    
     {
    const { url } = req.body;
  
    if (!url) 
        {
      return res.status(400).json({
        error: "URL is required"
      });
    }
  
    let riskScore = 0;
  
    // HTTPS Check
    if (!url.startsWith("https://")) 
        {
      riskScore += 30;
    }
  
    // Suspicious Keywords
    const threatData = checkThreatIndicators(url);

    riskScore += threatData.score;

    // Long URL Check
    if (url.length > 50) 
        {
      riskScore += 10;
    }
  
    // Too Many Hyphens
    const hyphenCount = (url.match(/-/g) || []).length;
  
    if (hyphenCount > 2) 
        {
      riskScore += 10;
    }
  
    // Determine Status
    let status = "Safe";
  
    if (riskScore >= 50) 
        {
      status = "High Risk";
    } 
    else if (riskScore >= 20) 
        {
      status = "Suspicious";
    }
  
    res.status(200).json({
        url,
        riskScore,
        status,
        threatIndicators: threatData.indicators
    });
  };
  
  module.exports = 
  {
    scanUrl
  };