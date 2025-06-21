import "./DefinitionUnitSubcomponent.scss";

const SingleDefUnit = ({ defUnit }: { defUnit: string }) => {
  const RenderDefUnit = () => {
    switch (defUnit) {
      case "Weapon":
        return (
          <img src={require('@images/ObjectTypeWeapon.png')} />
        );

      case "Short range":
        return (
          <img src={require('@images/ObjectSubclassShortRange.png')} />
        );
      default:
        return (
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/ahpZtIAAAAASUVORK5CYII=" />
        );
    }
  };

  return (
    <div className="defUnitContainer">
      {defUnit ?
        <>
          <RenderDefUnit />
          <p>{defUnit}</p>
        </>
        :
        <p>Missing...</p>
      }
    </div>
  );
};

const SinglePropUnit = ({ propUnits }: { propUnits: Record<string, string>[] }) => {

  const RenderPropUnit = ({ propUnit }: { propUnit: Record<string, string> }) => {
    const key = Object.keys(propUnit)[0];

    switch (key) {
      case "Health":
        return (
          <img src={require('@images/HealthPropertyIcon.png')} />
        );
      case "Durability":
        return (
          <img src={require('@images/ToughnessPropertyIcon.png')} />
        );

      default:
        return (
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/ahpZtIAAAAASUVORK5CYII=" />
        );
    }
  };

  return (
    <>
      {propUnits && propUnits.map((propUnit: Record<string, string>, index) => (
        <div key={index} className="defUnitContainer">
          <div className="defPropUnit">
            {Object.entries(propUnit).length === 1 ? (
              <>
                <div className="propTitle">
                  <RenderPropUnit propUnit={propUnit} />
                  <p>{typeof Object.keys(propUnit)[0] === 'string' ? Object.keys(propUnit)[0] : "Missing..."}</p>
                </div>
                <div className="propValue">
                  <p>{typeof Object.values(propUnit)[0] === 'string' || typeof Object.values(propUnit)[0] === 'number'
                    ? Object.values(propUnit)[0]
                    : "Missing.."}</p>
                </div>
              </>
            ) : (
              <p>Missing...</p>
            )}
          </div>
        </div>))
      }
    </>
  );
};


export {
  SingleDefUnit,
  SinglePropUnit,
};