const scanUrl = (req, res) => 
    {
    const { url } = req.body;

    if (!url) 
        {
            return res.status(400).json(
                {
                    error: "URL is required"           
                });
    }

    res.status(200).json({
        url,
        riskScore: 12,
        status: "Safe"
    });
};

module.exports = {
    scanUrl
};