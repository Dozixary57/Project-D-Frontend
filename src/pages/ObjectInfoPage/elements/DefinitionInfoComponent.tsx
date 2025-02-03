import "./DefinitionInfoComponent.scss";
import { SingleDefUnit, SinglePropUnit } from "./DefinitionUnitSubcomponent";

interface IDefinitionInfo {
  Type: string;
  Subclass: string;
  Characteristics: Record<string, string>[];
}

const DefinitionInfoComponent = ({ defData }: { defData: IDefinitionInfo }) => {

  return (
    <div className="definitionData">
      <div className="objectDefUnit">
        <h3>Type</h3>
        <SingleDefUnit defUnit={defData?.Type} />
      </div>

      <div className="objectDefUnit">
        <h3>Class</h3>
        <SingleDefUnit defUnit={defData?.Subclass} />
      </div>

      <div className="objectDefUnit">
        <h3>Properties</h3>
        <SinglePropUnit propUnits={defData?.Characteristics} />
      </div>

      {/* <div>
        <div>
          <img src={require(('@images/HealthPropertyIcon.png'))} />
        </div>
        <p>Health</p>
        <p>20000</p>
      </div>
      <div>
        <div>
          <img src={require(('@images/HealthPropertyIcon.png'))} />
        </div>
        <p>HealthHealth</p>
        <p>20000</p>
      </div> */}
    </div>
  );
};

export default DefinitionInfoComponent;