import { BiLinkExternal } from "react-icons/bi";

const Announcemenet = () => {
  return (
    <div className="mockup-code">
      <pre data-prefix="1">
        <code>Versi BETA 1.1.0</code>
      </pre>
      <pre data-prefix="2" className="bg-warning text-warning-content ">
        <code>sedang dalam development</code>
      </pre>
      <pre data-prefix="3" className="bg-info">
        <code><a href="https://github.com/deaaprizal/laract9" target="_blank">Source Code <BiLinkExternal className="inline" /></a></code>
      </pre>
    </div>
  );
};

export default Announcemenet;
