import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import NotificationAlert from "../Default/NotificationAlert";

const IntegrationCLI = ({ token, props, secret, cli }) => {
  const [isCLIRequest, setIsCLIRequest] = useState(false);
  const [isCLIGuide, setIsCLIGuide] = useState(false);

  const requestActivatingCLI = request => {
    setIsCLIRequest(false);
    return Inertia.put("/dashboard/integration/cuy-cli", { isActive: request, token: token });
  };

  return (
    <div>
      {isCLIRequest ? activatingCLI(requestActivatingCLI, cli) : ""}
      {isCLIGuide ? cuyCLIGuide(setIsCLIGuide) : ""}
      {props.flash && <NotificationAlert message={props.flash.message} />}
      <div className="card bg-base-100 p-6 shadow-xl dark:bg-slate-700 lg:card-side">
        <figure>
          <div className="mockup-code max-w-md bg-secondary text-secondary-content">
            <pre data-prefix="1">
              <code>cuy login dea</code>
            </pre>
            <pre data-prefix="2">
              <code>authenticating..</code>
            </pre>
            <pre data-prefix="3" className="bg-warning text-warning-content">
              <code>cuycli activated</code>
            </pre>
          </div>
        </figure>
        <div className="card-body">
          <div className="flex justify-end">
            <label className="btn btn-link" htmlFor="cliGuide" onClick={() => setIsCLIGuide(true)}>
              panduan penggunaan
            </label>
          </div>
          <div className="pb-4">
            <h2 className="card-title">Aktivasi CUY-CLI</h2>
            <p>Lakukan aktifitas lewat terminal kesayangan anda.</p>
            {cli ? (
              <pre className="mb-4 pt-2">
                kode rahasia: <code className="underline">{secret}</code>
              </pre>
            ) : null}
          </div>
          <div className="card-actions justify-end">
            <label className="btn btn-primary" htmlFor={cli ? "cliOff" : "cliOn"} onClick={() => setIsCLIRequest(true)}>
              {cli ? "Matikan" : "Aktifkan"}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

const activatingCLI = (requestActivatingCLI, cli) => {
  return (
    <div className="text-black">
      <input type="checkbox" id={cli ? "cliOff" : "cliOn"} className="modal-toggle" />
      <label htmlFor={cli ? "cliOff" : "cliOn"} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor={cli ? "cliOff" : "cliOn"}>
          <h3 className="text-lg font-bold">Anda akan {cli ? "mematikan" : "mengaktifkan"} integrasi CUYCLI</h3>
          {!cli && (
            <div>
              <p className="py-4">
                CUYCLI adalah command line tools untuk memudahkan anda melakukan aktifitas tanpa perlu membuka website
                cuyuniverse.
              </p>
              <p className="pb-4">Semua kegiatan dilakukan via terminal desktop anda secara langsung.</p>
            </div>
          )}
          <div className="flex justify-end">
            <button className="btn btn-primary" onClick={() => requestActivatingCLI(!cli)}>
              {cli ? "Ya, Matikan" : "Ya, Aktifkan"}
            </button>
          </div>
        </label>
      </label>
    </div>
  );
};

const cuyCLIGuide = setIsCLIGuide => {
  return (
    <div className="text-black">
      <input type="checkbox" id="cliGuide" className="modal-toggle" />
      <label htmlFor="cliGuide" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="cliGuide">
          <h3 className="text-lg font-bold">CUYCLI - cuyuniverse command line tools</h3>
          <div>
            <p className="py-4">Integrated CMDer for cuyuniverse platform</p>
          </div>
          <div className="flex justify-end">
            <button className="btn btn-primary" onClick={() => setIsCLIGuide(false)}>
              MENGERTI
            </button>
          </div>
        </label>
      </label>
    </div>
  );
};

export default IntegrationCLI;
