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
      <div className="mb-20 min-h-screen lg:mb-0">
        <div className="pt-6 text-center">
          <h1 className="text-lg font-bold dark:text-white" data-aos="zoom-in" data-aos-duration="1500">
            ✨ {props.description} ✨
          </h1>
          <a
            href={props.repo_link}
            className="btn btn-link btn-sm dark:text-white"
            data-aos="zoom-in"
            data-aos-duration="3500">
            Repository Link
          </a>
        </div>
        <div className="lg:items-strech flex flex-col items-center justify-center gap-6 py-6 px-4 lg:flex-row lg:flex-wrap">
          {/* {githubData.filter(item => item.id != 103190281).map((item, index) => {
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
        ) : null} */}
          {githubData
            .filter(item => item.id != 103190281)
            .map((item, index) => {
              return (
                <a href={item.html_url} key={index} target="_blank" data-aos="flip-right" data-aos-duration="1500">
                  <div className="all-card transition duration-200 ease-in-out lg:hover:-translate-y-1 lg:hover:scale-110">
                    {item.contributions > 10 ? (
                      <div
                        className="card card-side w-72 bg-gradient-to-r from-yellow-300 to-amber-600 font-semibold text-black shadow-lg brightness-150 dark:shadow-slate-900 lg:hover:from-amber-600 lg:hover:to-yellow-300"
                        key={index}>
                        <img
                          src={item.avatar_url}
                          alt=""
                          className="ml-4 mt-3 h-16 w-16 rounded-full align-middle"></img>
                        <div className="card-body">
                          <h3 className="card-title">
                            {item.login.length > 14 ? item.login.slice(0, 14) + "..." : item.login}
                          </h3>
                          <p className="card-text">{item.contributions} contributions</p>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="card card-side w-72 shadow-lg dark:bg-blue-600 dark:text-white dark:shadow-slate-900"
                        key={index}>
                        <img
                          src={item.avatar_url}
                          alt=""
                          className="ml-4 mt-3 h-16 w-16 rounded-full align-middle"></img>
                        <div className="card-body">
                          <h3 className="card-title">
                            {item.login.length > 14 ? item.login.slice(0, 14) + "..." : item.login}
                          </h3>
                        </div>
                      </div>
                    )}
                  </div>
                </a>
              );
            }, this)}
        </div>
        {err ? (
          <div className="pt-6 text-center">
            <p className="text-sm dark:text-white">{err}</p>
          </div>
        ) : null}
      </div>
    </Guest>
  );
}
