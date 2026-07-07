import React from "react";

const login = () => {
  return (
    <div className="h-screen w-screen flex">
      <div className="flex-1 bg-amber-300 bg-[url('/login.jpeg')] bg-">

      </div>
      <div className="flex-1 bg-[#fbc604] flex justify-center items-center">
        <div className="w-[90%] h-[90%] flex flex-col gap-4 justify-center items-center">
          <h1 className="text-zinc-800 text-9xl uppercase font-mono tracking-tight font-bold">Login</h1>

          <form className="flex flex-col gap-3 w-[80%]">
            <label htmlFor="email" className="text-zinc-800 text-2xl font-sans tracking-tight font-bold">Enter email</label>

            <input type="text" placeholder="  abc@example.com" className="bg-amber-100 opacity-50 text-gray-700 rounded-full h-12"/>

            <label htmlFor="password" className="text-zinc-800 text-2xl font-sans tracking-tight font-bold">Enter passowrd</label>

            <input type="text" placeholder="&nbsp;&nbsp;******" className="bg-amber-100 opacity-50 text-gray-700 rounded-full h-12"/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default login;
