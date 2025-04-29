import { useEffect, useRef, useState } from "react";
import "./FAGSection.scss"

interface IFAGsData {
  question: string;
  answer: string;
}

const FAGSection = ({ targetOfScroll }: { targetOfScroll: React.RefObject<HTMLDivElement> }) => {
  const [FAGs, setFAGs] = useState<IFAGsData[]>([
    {
      question: "What is crowdfunding for game development?",
      answer: "Crowdfunding for a game project is a method of raising funds where supporters contribute financially to various stages of development. In return, they receive exclusive rewards and benefits, such as access to beta versions and unique in-game items."
    },
    {
      question: "How can I contribute to the crowdfunding campaign?",
      answer: "To make a contribution, simply register on our platform, select the appropriate funding stage, and choose the amount you wish to invest. Multiple payment options are available for your convenience."
    },
    {
      question: "What kind of rewards will I receive for contributing?",
      answer: "Depending on your contribution tier, you may receive exclusive in-game items, digital currency, early access to game builds, unique characters, and special achievements."
    },
    {
      question: "How will the collected funds be used?",
      answer: "Funds will be allocated toward game development, graphic improvements, content creation, and server infrastructure. We regularly share detailed expenditure reports on our platform."
    },
    {
      question: "Can I get a refund if I change my mind?",
      answer: "Refunds are available within 14 days of making a contribution, provided that the project has not yet been completed."
    },
    {
      question: "What happens if the funding goal is not reached?",
      answer: "If the project fails to meet its funding goal, all contributions will be fully refunded to participants, and the project will either be suspended or canceled."
    }
  ]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleAnswer = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const updateActiveElementHeight = () => {
    if (activeIndex !== null && answerRefs.current[activeIndex]) {
      const activeRef = answerRefs.current[activeIndex];

      if (activeRef) {
        activeRef.style.padding = "0.5em";
        activeRef.style.borderWidth = "0.1em";

        setTimeout(() => {
          const scrollHeight = activeRef.scrollHeight;
          activeRef.style.maxHeight = scrollHeight + "px";
        }, 10);
      }
    }
  };

  useEffect(() => {
    answerRefs.current.forEach((ref, idx) => {
      if (!ref) return;

      if (activeIndex === idx) {
        ref.style.padding = "0.5em";
        ref.style.borderWidth = "0.1em";

        setTimeout(() => {
          const scrollHeight = ref.scrollHeight;
          ref.style.maxHeight = scrollHeight + "px";
        }, 10);
      } else {
        ref.style.maxHeight = "0px";
        ref.style.padding = "0";
        ref.style.borderWidth = "0";
      }
    });
  }, [activeIndex]);

  useEffect(() => {
    updateActiveElementHeight();
  }, [windowWidth]);

  return (
    <div className="FAGSection" ref={targetOfScroll}>
      <h3 className="Title">FAG</h3>
      <div className="Content">
        {FAGs && FAGs.length > 0 ?
          FAGs.map((FAG, index) =>
            <div key={index} className="FAG">
              <div
                className="Question"
                onClick={() => toggleAnswer(index)}
              >
                <p>
                  {FAG.question}
                </p>
                <p style={activeIndex === index ? { transform: "rotate(90deg) translateX(0.15em) translateY(0.15em)", transition: "transform 0.3s ease-out" } : { transition: "transform 0.3s ease-out" }}>&gt;</p>
              </div>
              <p
                className={`Answer${activeIndex === index ? " Answer--active" : ""}`}
                ref={el => (answerRefs.current[index] = el)}
              >
                {FAG.answer}
              </p>
            </div>
          )
          :
          <p>No data</p>
        }
      </div>
    </div>
  )
}

export default FAGSection;