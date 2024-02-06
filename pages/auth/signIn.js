import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

function SignInPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [loginSucces, setLoginSuccess] = useState("");
  const [borderColor,setBorderColor] = useState('border-gray-400')

  const router = useRouter();

  function loginUiHandler(e) {
    e.preventDefault();
    setIsLogin((state) => !state);
  }

  const nameRef = useRef();
  const surnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function submitHandler(e) {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (!isLogin) {
      // Login değil ise yeni kullanıcı oluştur / *Created Succesfully*
      const enteredName = nameRef.current.value;
      const enteredSurname = surnameRef.current.value;

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: enteredName,
          surname: enteredSurname,
          email: enteredEmail,
          password: enteredPassword,
        }),
      });
      const data = await response.json();
      setLoginError(data.message);
      setTimeout(() => {
        setLoginError("");
      }, 3000);
    }
    if (isLogin) {
      //  Login için database den bilgileri kontrol et / *Created Succesfully
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      if (result.ok) {
        setLoginSuccess("Login is succesfully, redirect to Homepage...");
        setBorderColor('border-green-500');
        setLoginError("");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        setLoginError(result.error);
        setBorderColor('border-red-500');
        setTimeout(() => {
          setLoginError("");
        }, 3000);
      }
    }
  }

  return (
    <div className="  flex w-full h-screen justify-center bg-slate-200 ">
      <form
        onSubmit={submitHandler}
        className={` border-t-8  mt-14 bg-white ${borderColor}  shadow-md  rounded-md  w-2/6 h-4/6  px-10 flex flex-col items-center justify-around  `}
      >
        <span className="bg-red-500 w-full text-xl text-center  font-semibold rounded-xl text-white animate-pulse">
          {loginError}
        </span>
        <span className="bg-green-500 w-full text-xl text-center  font-semibold rounded-xl text-white animate-bounce">
          {loginSucces}
        </span>

        {!isLogin && (
          <div className=" w-full">
            <input
              ref={nameRef}
              className="w-full h-14 p-4 border shadow-md "
              id="name"
              type="name"
              name="name"
              placeholder="Name"
            />
          </div>
        )}
        {!isLogin && (
          <div className=" w-full">
            <input
              ref={surnameRef}
              className="w-full h-14 p-4 border shadow-md "
              id="surname"
              type="surname"
              name="surname"
              placeholder="Surname"
            />
          </div>
        )}
        <div className=" w-full">
          <input
            ref={emailRef}
            className="w-full h-14 p-4 border shadow-md "
            id="email"
            type="email"
            name="email"
            placeholder="E-Mail"
          />
        </div>
        <div className=" w-full">
          <input
            ref={passwordRef}
            className="w-full h-14 p-4 border shadow-md"
            id="password"
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className=" w-full  ">
          <button className="w-full h-14 bg-sky-500 text-white text-2xl rounded-xl hover:bg-sky-600">
            {isLogin ? "Login" : "Signin"}
          </button>
        </div>
        <div className=" w-3/5 ">
          <button
            onClick={loginUiHandler}
            className="w-full h-14 bg-green-500 text-white text-xl rounded-xl  hover:bg-green-600"
          >
            {isLogin ? "Create new account" : "Login to existing account"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignInPage;
