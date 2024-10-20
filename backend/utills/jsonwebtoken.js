export const jsonWebToken = async (user, statusCode, message, res) => {

    const accessToken = await user.generateJwtToken();

    return res.status(statusCode).cookie("accessToken", accessToken, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000),
        httpOnly: true
    },
    ).json({
        success: true,
        data: user,
        message,
        accessToken
    })

}