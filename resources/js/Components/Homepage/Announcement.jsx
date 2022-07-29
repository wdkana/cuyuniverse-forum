import {BiLinkExternal} from "react-icons/bi";

const Announcemenet = () => {
  return (
    <div className="mockup-code bg-primary">
      <pre data-prefix="1" className="text-primary-content">
        <code>CU.V:1.0.7</code>
      </pre>
      <pre data-prefix="2" className="text-primary-content">
        <code>masih dalam development</code>
      </pre>
      <pre data-prefix="3" className="bg-warning text-warning-content">
        <code>
          <a href="https://github.com/deaaprizal/laract9" target="_blank">
            Source Code <BiLinkExternal className="inline" />
          </a>
        </code>
      </pre>
    </div>
  );
};

export default Announcemenet;
