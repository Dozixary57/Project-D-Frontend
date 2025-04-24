import { Link } from "react-router-dom";
import "./ProjectContentSection.scss"

const ProjectContentSection = () => {
  return (
    <div className="ProjectContentSection">
      <div className="ContentDescription">
        <div>
          <img src={require('@images/objects/ThumbnailObjectIcon.png')} />
          <div>
            <h4>Explore the world and adapt</h4>
            <p>Venture through diverse zones and adjust to their unique challenges — every region demands a tailored strategy.</p>
          </div>
        </div>
        <div>
          <img src={require('@images/objects/ThumbnailObjectIcon.png')} />
          <div>
            <h4>Gather resources for survival</h4>
            <p>Scan your surroundings, collect valuable materials and rare components — these form the backbone of crafting, construction, and upgrades.</p>
          </div>
        </div>
        <div>
          <img src={require('@images/objects/ThumbnailObjectIcon.png')} />
          <div>
            <h4>Develop and utilize technologies</h4>
            <p>Invent tools, gadgets, and essential items that assist you in both surviving and pushing further into the unknown.</p>
          </div>
        </div>
        <div>
          <img src={require('@images/objects/ThumbnailObjectIcon.png')} />
          <div>
            <h4>Experiment with suit modules</h4>
            <p>Mix and enhance different modules to create your own unique playstyle — from agile scouts to combat engineers.</p>
          </div>
        </div>
        <div>
          <img src={require('@images/objects/ThumbnailObjectIcon.png')} />
          <div>
            <h4>Uncover abandoned structures</h4>
            <p>Delve into ancient complexes and reveal their secrets, but proceed with caution — not everything inside welcomes visitors.</p>
          </div>
        </div>
        <div>
          <img src={require('@images/objects/ThumbnailObjectIcon.png')} />
          <div>
            <h4>Build without boundaries</h4>
            <p>Design bases, platforms, workshops, and entire settlements. Your imagination is the ultimate tool.</p>
          </div>
        </div>
        <div>
          <img src={require('@images/objects/ThumbnailObjectIcon.png')} />
          <div>
            <h4>Survive and find your way home</h4>
            <p>Manage resources carefully, avoid lurking threats, and uncover the path that leads off the planet, one step at a time.</p>
          </div>
        </div>
        <div>
          <Link to="/Content">
            <div>
              <h4>And so much more</h4>
              <p>Discover deeper insights into the world, its inhabitants, and many other survival elements by diving into the details.</p>
            </div>
            <button>
              <img src={require('@images/NextIcon.png')} />
            </button>
          </Link>
        </div>
      </div>

      {/* Background */}
      <div className="MountainElement" />
    </div>
  )
}

export default ProjectContentSection;