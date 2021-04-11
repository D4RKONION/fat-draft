import './VersusPartial.scss';

type VersusPartialProps = {
  name: string;
  type: "user" | "opponent";
  draftLog: string[];
}

const VersusPartial = ({name, type, draftLog}: VersusPartialProps) => 
  <div className="versusPlayer">
    <h2><span className={type}>{name}</span></h2>
    {draftLog.map((log, index) => 
      log.startsWith(type === "user" ? "[usr]" : "[opp]") && log.substring(6, 12) === "banned" && index > draftLog.length - 7 
        ? <p>{index + 1}: <s>{log.substring(13)}</s></p>
      : log.startsWith(type === "user" ? "[usr]" : "[opp]") && log.substring(6, 12) === "picked" && index > draftLog.length - 7 
        ? <p>{index + 1}: {log.substring(13)}</p>
      : null
    )}
  </div>


export default VersusPartial;