import React from 'react';
import { Tabs, Layout } from 'antd';
import 'antd/dist/antd.min.css';
import {ParticipantsListView} from "./participants/ParticipantsListView";

const { TabPane } = Tabs;
const { Content } = Layout;

function callback(key) {
    console.log(key);
}

export const Main = () => {
    return (
        <Layout>
            <Content style={{ padding: '0 20px', background: "white" }}>
                <Tabs onChange={callback} type="card">
                    <TabPane tab="Participants" key="1">
                        <ParticipantsListView/>
                    </TabPane>
                    <TabPane tab="Products" key="2">
                        Content of whole products
                    </TabPane>
                    <TabPane tab="Tracking" key="3">
                        Content of the products' tracking
                    </TabPane>
                </Tabs>
            </Content>
        </Layout>
    )
}
