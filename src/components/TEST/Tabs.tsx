import React, { useState } from 'react';
import './Tabs.scss';

type TabProps = {
    title: string;
    content: string;
};

const Tab: React.FC<TabProps> = ({ title, content }) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
};

const Tabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
        { title: 'Вкладка 1', content: 'Содержимое вкладки 1' },
        { title: 'Вкладка 2', content: 'Содержимое вкладки 2' },
        { title: 'Вкладка 3', content: 'Содержимое вкладки 3' },
        // добавьте больше вкладок по мере необходимости
    ];

    return (
        <div>
            <div className="tab-list">
                {tabs.map((tab, index) => (
                    <button key={index} className={`tab-button ${activeTab === index ? 'active' : ''}`} onClick={() => setActiveTab(index)}>
                        {tab.title}
                    </button>
                ))}
            </div>
            <Tab title={tabs[activeTab].title} content={tabs[activeTab].content} />
        </div>
    );
};

export default Tabs;