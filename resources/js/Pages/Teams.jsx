import React from "react";
import {Head} from "@inertiajs/inertia-react";
import Guest from "@/Layouts/Guest";
import {useEffect, useState} from "react";

export default function TeamsPage(props) {
  const [githubData, setData] = useState([]);
  const [err, setErr] = useState(null);

  const fetchpairs = async () => {
    await axios
      .get("https://api.github.com/repos/deaaprizal/laract9/contributors?")
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        setErr(err.message);
      });
  };

  useEffect(() => {
    fetchpairs();
  }, []);
  return (
    <Guest auth={props.auth.user}>
      <Head title={props.title} />
      <div className="min-h-screen mb-20 lg:mb-0">
        <div className="text-center pt-6">
          <h1 className="font-bold text-lg dark:text-white" data-aos="zoom-in" data-aos-duration="1500">✨ {props.description} ✨</h1>
          <a href={props.repo_link} className="btn btn-link btn-sm dark:text-white" data-aos="zoom-in" data-aos-duration="3500">Repository Link</a>
        </div>
        <div className="flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-strech py-6 px-4 gap-6">
          {githubData.filter(item => item.id != 103190281).map((item, index) => {
            return (
              <a href={item.html_url} key={index} target="_blank" data-aos="flip-right" data-aos-duration="1500">
                <div className="card w-72 card-side dark:bg-blue-600 dark:text-white shadow-lg dark:shadow-slate-900" key={index}>
                  <img src={item.avatar_url} alt="" className="rounded-full h-16 w-16 ml-4 mt-3 align-middle"></img>
                  <div className="card-body">
                    <h3 className="card-title">{item.login.length > 14 ? item.login.slice(0, 14) + "..." : item.login}</h3>
                  </div>
                </a>
              );
            }, this)}
        </div>
        {err ? (
          <div className="text-center pt-6">
            <p className="text-sm dark:text-white">{err}</p>
          </div>
        ) : null}
      </div>
    </Guest>
  );
}
