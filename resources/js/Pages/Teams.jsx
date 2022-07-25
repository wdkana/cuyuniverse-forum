import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Guest from "@/Layouts/Guest";
import { useEffect, useState } from "react";

export default function TeamsPage(props) {
  const [githubData, setData] = useState([]);

  useEffect(() => {
    const fetchpairs = async () => {
      const result = await axios.get("https://api.github.com/repos/deaaprizal/laract9/contributors?");
      setData(result.data);
    };
    fetchpairs();
  }, []);

  return (
    <Guest auth={props.auth.user}>
      <Head title={props.title} />
      <div className="min-h-screen">
        <div className="text-center pt-6">
          <h1 className="font-bold text-lg dark:text-white">✨ {props.title} ✨</h1>
          <p className="text-sm dark:text-white">{props.description}</p>
        </div>
        <div className="flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-strech pt-6 px-4 gap-6">
          {githubData.map((item, index) => {
            return (
              <a href={item.html_url} key={index} target="_blank">
                <div className="card w-72 card-side dark:bg-blue-600 dark:text-white shadow-lg dark:shadow-slate-900" key={index}>
                  <img src={item.avatar_url} alt="" className="rounded-full h-16 w-16 ml-4 mt-3 align-middle"></img>
                  <div className="card-body">
                    <h2 className="card-title">{item.login.length > 14 ? item.login.slice(0, 14) + "..." : item.login}</h2>
                  </div>
                </div>
              </a>
            );
          }, this)}
        </div>
      </div>
    </Guest>
  );
}
