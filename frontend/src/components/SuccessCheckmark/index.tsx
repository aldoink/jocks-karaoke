import React from "react";
import "./index.scss";

export const SuccessCheckmark: React.FC = () => {
    return <div data-testid="success-checkmark" className="success-checkmark">
        <div className="check-icon">
            <span className="icon-line line-tip" />
            <span className="icon-line line-long" />
            <div className="icon-circle" />
            <div className="icon-fix" />
        </div>
    </div>
}