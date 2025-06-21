import { useEffect, useRef, useState } from "react";
import "./FAGSection.scss"
import { useTranslation } from "react-i18next";

const FAGSection = ({ targetOfScroll }: { targetOfScroll: React.RefObject<HTMLDivElement> }) => {
  const { t } = useTranslation();

  const FAGs = [
    {
      question: t('faq.q1.title'),
      answer: t('faq.q1.answer')
    },
    {
      question: t('faq.q2.title'),
      answer: t('faq.q2.answer')
    },
    {
      question: t('faq.q3.title'),
      answer: t('faq.q3.answer')
    },
    {
      question: t('faq.q4.title'),
      answer: t('faq.q4.answer')
    },
    {
      question: t('faq.q5.title'),
      answer: t('faq.q5.answer')
    },
    {
      question: t('faq.q6.title'),
      answer: t('faq.q6.answer')
    }
  ];

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