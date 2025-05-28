import { useEffect, useState } from "react";
import "./AboutTheProjectSection.scss"
import { useTranslation } from 'react-i18next';
import i18n from "i18n";

const AboutTheProjectSection = () => {
  const { t } = useTranslation();

  const [projectInfo, setProjectInfo] = useState<string>(
    t('projectInfo.projectDescription')
  );

  useEffect(() => {
    setProjectInfo(t('projectInfo.projectDescription'));
  }, [i18n.language]);

  const projectAspects = [
    {
      title: t("projectInfo.projectAspects.procedural.title"),
      description: t("projectInfo.projectAspects.procedural.description")
    },
    {
      title: t("projectInfo.projectAspects.crafting.title"),
      description: t("projectInfo.projectAspects.crafting.description")
    },
    {
      title: t("projectInfo.projectAspects.modularSuit.title"),
      description: t("projectInfo.projectAspects.modularSuit.description")
    },
    {
      title: t("projectInfo.projectAspects.genreFusion.title"),
      description: t("projectInfo.projectAspects.genreFusion.description")
    },
    {
      title: t("projectInfo.projectAspects.communityDriven.title"),
      description: t("projectInfo.projectAspects.communityDriven.description")
    },
    {
      title: t("projectInfo.projectAspects.longTerm.title"),
      description: t("projectInfo.projectAspects.longTerm.description")
    }
  ];

  return (
    <div className="AboutTheProjectSection">
      <h3 className="Title">{t('projectInfo.aboutTheProject')}</h3>
      <div className="Content">
        <p className="Genres">
          <span>survival</span> <span>adventure</span> <span>sandbox</span> <span>open world</span> <span>procedural generation</span> <span>crafting</span> <span>building</span> <span>action</span> <span>science fiction</span>
        </p>
        <p className="Description">
          {projectInfo}
        </p>
        <div className="AspectsList">
          {projectAspects && projectAspects.length > 0 && projectAspects.map(aspect => (
            <div className="Aspect">
              <div className="AspectTitle">
                <p>&gt;</p>
                <p>{aspect.title}</p>
              </div>
              <p className="AspectDescription">{aspect.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutTheProjectSection;