async function userLogout(req, res) {
    try {
        const tokenOption = {
            httpOnly : true,
            secure : true,
            sameSite : 'None'
           }
        res.clearCookie("token",tokenOption)

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