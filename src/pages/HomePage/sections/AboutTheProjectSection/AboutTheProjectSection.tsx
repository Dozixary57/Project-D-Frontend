import { useState } from "react";
import "./AboutTheProjectSection.scss"
import { title } from "process";


const AboutTheProjectSection = () => {
  const [projectInfo, setProjectInfo] = useState<string>(
    "The project is a crowdfunding-driven voxel-based open-world video game, where each playthrough generates a distinct environment thanks to procedural generation. Players explore diverse locations, gather resources, craft items, build structures, and upgrade a modular suit, tailoring their gameplay experience. The game seamlessly blends survival, creativity, and combat mechanics. Through crowdfunding, the community plays an active role in shaping the game — from voting on features to submitting suggestions — making the project a dynamic, collaborative venture between developers and players."
  );

  const [projectAspects, setProjectAspects] = useState<{ title: string, description: string }[]>([
    {
      title: "Procedurally Generated Voxel World",
      description: "Every new session unfolds within a unique setting featuring randomly crafted terrains, biomes, and structures. The voxel system enables players to reshape and reconstruct the environment freely."
    },
    {
      title: "Open Crafting and Building",
      description: "A flexible crafting and construction system allows players to combine resources and create anything — from simple shelters to intricate machinery — without relying on predefined templates."
    },
    {
      title: "Modular Suit Enhancements",
      description: "Unlockable modules grant access to expanded capabilities such as enhanced defense, special abilities, increased inventory space, and access to previously unreachable zones."
    },
    {
      title: "Genre Fusion in an Open World",
      description: "Survival, exploration, construction, and combat elements are harmoniously integrated into a dynamic setting filled with weather systems, threats, and hidden opportunities."
    },
    {
      title: "Community-Driven Development",
      description: "Players actively contribute to the project’s evolution by submitting ideas, voting on new features, and gaining early access to updates, helping shape the direction of development."
    },
    {
      title: "Long-Term Support and Evolution",
      description: "Regular updates will introduce new content, expand gameplay systems, and incorporate community feedback, ensuring the game continues to grow and evolve over time."
    }
  ]);

  return (
    <div className="AboutTheProjectSection">
      <h3 className="Title">About the Project D</h3>
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