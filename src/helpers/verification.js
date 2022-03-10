const createVerificationCode = () => {
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += Math.floor(Math.random() * 10).toString();
    }
    return code;
  };
  
  export const getVerificationCode = async phoneNumber => {
    let verificationCode = createVerificationCode();
    return fetch(
      `https://api.smsglobal.com/http-api.php?action=sendsms&user=5rmp6dji&password=y2dNQtOh&from=Vigory&to=${phoneNumber}&text=Your verification code is ${verificationCode}`,
    ).then(response => {
      if (response.ok) {
        return verificationCode;
      } else {
        console.log(response);
        return false;
      }
    });
  };