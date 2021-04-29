async function logout(req, res) {
  try {
    res.cookie("token", "", {
      expires: new Date(),
      httpOnly: true,
      credentials: true,
      secure: true,
    });
    // res.cookie("token", "", {
    //   expires: new Date(),
    //   httpOnly: true,
    //   credentials: true,
    // });

    res.json({
      success: true,
      message: "You are successfully logged out!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong!",
    });
  }
}

module.exports = logout;
