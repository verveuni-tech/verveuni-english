import { memo } from "react";
import { Card, Tag, Descriptions, Collapse } from "antd";

import "./styles/InfoGrid.css";

const { Panel } = Collapse;

const InfoGrid = () => {
  return (
    <div className="cx-info-grid">
      {/* Primary case context */}
      <Card
        title="Current Case"
        bordered={false}
        className="cx-info-section"
      >
        <div className="cx-tags">
          <Tag color="blue">Billing Issue</Tag>
          <Tag color="red">High Priority</Tag>
          <Tag>Sentiment: Neutral</Tag>
        </div>
      </Card>

      {/* Customer profile */}
  <Card
  title="Customer Profile"
  bordered={false}
  className="cx-info-section"
>
  <Descriptions
    size="small"
    column={1}
    layout="vertical"
  >
    <Descriptions.Item label="Account">
      Premium
    </Descriptions.Item>

    <Descriptions.Item label="Subscription">
      Annual
    </Descriptions.Item>

    <Descriptions.Item label="Location">
      India
    </Descriptions.Item>

    <Descriptions.Item label="Last Login">
      2 days ago
    </Descriptions.Item>
  </Descriptions>
</Card>

      {/* Secondary / historical context */}
      <Collapse ghost>
        <Panel header="Support History" key="1">
          <Descriptions size="small" column={1}>
            <Descriptions.Item label="Open Tickets">
              3
            </Descriptions.Item>
          </Descriptions>
        </Panel>
      </Collapse>
    </div>
  );
};

export default memo(InfoGrid);
