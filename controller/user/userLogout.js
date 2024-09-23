async function userLogout(req, res) {
    try {
        res.clearCookie("token")

        res.json({
            message: "Logout Successfully",
            error: false,
            success: true,
            data: []
        })
    } catch {
        res.status(500).json({
            message: err.message || "Internal Err",
            error: true,
            success: false,
        });
    }
}

module.exports = userLogout