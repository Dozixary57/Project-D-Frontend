import "./AuthorialInfoComponent.scss";

// interface IDefinitionInfo {
//   Type: string;
//   Subclass: string;
//   Characteristics: Record<string, string>[];
// }

const AuthorialInfoComponent = ({ data }: { data: any }) => {

  return (
    <div className="authorialInfo">
      <p className="authorUsername">
        by AuthorName
      </p>
    </div>
  );
};

export default AuthorialInfoComponent;