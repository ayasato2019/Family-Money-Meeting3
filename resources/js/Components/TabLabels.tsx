import PropTypes from 'prop-types';
import { useState } from 'react';

interface Tab {
    label: string;
    content: React.ReactNode;
}

export default function Tabs({ tabs }: { tabs: Tab[] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="tabs">
            <div className="tab-labels max-h-10" style={{ display: 'flex', justifyContent: 'space-around' }}>
                {tabs.map((tab, index) => (
                    <label key={index}
                    className={`cursor-pointer p-2 border text-center break-keep whitespace-nowrap ${activeIndex === index ? 'border-t-4 border-b-1 border-r-1 border-l-1 border-primary' : 'border-t-4 border-b-1 border-r-0 border-l-0 border-gray'}`}
                    style={{
                        width: `${100 / tabs.length}%`, // 要素数に基づいて幅を調整
                    }}>
                        <input
                            type="radio"
                            name="tabs"
                            style={{ display: 'none' }}
                            checked={activeIndex === index}
                            onChange={() => setActiveIndex(index)}
                        />
                        {tab.label}
                    </label>
                ))}
            </div>
            <div className="tab-content" style={{ marginTop: '20px' }}>
                {tabs[activeIndex]?.content}
            </div>
        </div>
    );
};

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            content: PropTypes.node.isRequired,
        })
    ).isRequired,
};
