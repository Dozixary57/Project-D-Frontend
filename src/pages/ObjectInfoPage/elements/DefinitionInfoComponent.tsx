import "./DefinitionInfoComponent.scss";
import { SingleDefUnit, SinglePropUnit } from "./DefinitionUnitSubcomponent";
import { useTranslation } from 'react-i18next';

interface IDefinitionInfo {
  Type: string;
  Subclass: string;
  Characteristics: Record<string, string>[];
}

const DefinitionInfoComponent = ({ defData }: { defData: IDefinitionInfo }) => {
  const { t } = useTranslation();

  return (
    <div className="definitionData">
      <div className="objectDefUnit">
        <h3>{t('objectInfo.sections.type')}</h3>
        <SingleDefUnit defUnit={defData?.Type} />
      </div>

      <div className="objectDefUnit">
        <h3>{t('objectInfo.sections.class')}</h3>
        <SingleDefUnit defUnit={defData?.Subclass} />
      </div>

      <div className="objectDefUnit">
        <h3>{t('objectInfo.sections.characteristics')}</h3>
        <SinglePropUnit propUnits={defData?.Characteristics} />
      </div>
    </div>
  );
};

export default DefinitionInfoComponent;