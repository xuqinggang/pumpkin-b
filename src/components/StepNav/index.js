import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.less';

const StepNavItem = ({ status, step }) => {
    const clsPrefix = 'c-step-nav--item';
    const cls = classNames(clsPrefix, {
        [`${clsPrefix}__${status}`]: true,
    });
    return (
        <div className={cls}>
            <div className={`${clsPrefix}-indicator`}>{step.value}</div>
            <span className={`${clsPrefix}-text`} >{step.text}</span>
        </div>
    );
};

StepNavItem.propTypes = {
    status: PropTypes.oneOf('ready', 'incomplete', 'complete'),
    step: PropTypes.shape({
        value: PropTypes.number,
        text: PropTypes.string,
    }),
};
StepNavItem.defaultProps = {
    status: 'ready',
    step: {
        value: 1,
        text: '',
    },
};

const cpItemStatus = (curStep, itemStep) => {
    if (curStep === itemStep) {
        return 'ready';
    }
    if (curStep < itemStep) {
        return 'incomplete';
    }
    if (curStep > itemStep) {
        return 'complete';
    }
};

const StepNav = ({ steps, curStep }) => (
    <div className="c-step-nav">
        {
            steps.map((item, index) => (
                <div style={{ display: 'inline-block' }}>
                    <StepNavItem
                        status={cpItemStatus(curStep, index + 1)}
                        step={{ text: item, value: index + 1 }}
                    />
                    {
                        index + 1 === steps.length ? null :
                        <i className={classNames('c-step-nav--bar', {
                            'c-step-nav--bar__active': index <= curStep - 1,
                        })}
                        />
                    }
                </div>
            ))
        }
    </div>
);

StepNav.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.string),
    curStep: PropTypes.number,
};

StepNav.defaultProps = {
    steps: [''],
    curStep: 1,
};

export default StepNav;
