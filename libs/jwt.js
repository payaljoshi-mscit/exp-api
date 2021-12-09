const jwt=require("jsonwebtoken");
const jwtkey="key1";
const expsec=3000;

const sign=(req,res)=>{
    const token=jwt.sign({uname:"user1"},jwtkey,{algorithm:"HS256",expiresIn:expsec});
    console.log(token);
    res.cookie("token",token,{maxAge:expsec*1000})
    res.send(token)
}

const verify=(req,res,next)=>{

    let token;
    if(req.headers.authorization)
    {
        token=req.headers.authorization.split(" ")[1];
        console.log("Token "+token)
    }
  //authorization: Bearer ergkergh34953859.dsgf345t3fd.dg4tgfdg
    // if(req.cookies.token)
    // {
    //     token=req.cookies.token;
    // }
    else
        res.send("provide token")

    var payload
    try {
      // Parse the JWT string and store the result in `payload`.
      // Note that we are passing the key in this method as well. This method will throw an error
      // if the token is invalid (if it has expired according to the expiry time we set on sign in),
      // or if the signature does not match

      payload = jwt.verify(token, jwtkey)
      console.log("Payload ");
      console.log(payload );
      console.log("PL");
  
      next();
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        // if the error thrown is because the JWT is unauthorized, return a 401 error
        return res.status(401).end("Invalid token")
      }
      // otherwise, return a bad request error
      return res.status(400).end("Bad request")
    }
}
module.exports={sign,verify};