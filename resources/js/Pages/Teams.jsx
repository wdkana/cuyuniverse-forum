import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Guest from "@/Layouts/Guest";
import { useEffect, useState } from "react";

export default function TeamsPage(props) {
    const [githubData, setData] = useState([]);

    useEffect(() => {
        const fetchpairs = async () => {
            try {
                const result = await axios.get("https://api.github.com/repos/deaaprizal/laract9/contributors?");

                setData(result.data);
            } catch (error) {
                throw error;
            }
        };

        fetchpairs();
    }, []);

    return (
        <Guest auth={props.auth.user}>
            <Head title={props.title} />
            <div className="min-h-screen">
                <div className="text-center pt-6">
                    <h1 className="font-bold text-lg">✨ {props.title} ✨</h1>
                    <p className="text-sm">{props.description}</p>
                </div>
                <div className="flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-strech pt-6 px-4 gap-6">
                    {githubData.map((item, index) => {
                        return (
                            <a href={item.html_url} key={index} target="_blank">
                                <div className="card card-side bg-blue-100 shadow-xl" key={index}>
                                    <img
                                        src={item.avatar_url}
                                        alt="Movie"
                                        className="rounded-full h-16 w-16 ml-4 mt-3 align-middle"
                                    ></img>
                                    <div className="card-body">
                                        <h2 className="card-title">{item.login}</h2>
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
