import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import 'antd/dist/antd.min.css';
import {AddParticipantView} from "./AddParticipantView";

export const ParticipantsListView = ({ data }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const columns = [
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
            width: '30%',
        },
        {
            title: 'Participant Type',
            dataIndex: 'participantType',
            key: 'participantType',
            width: '20%',
        },
        {
            title: 'Participant Address',
            dataIndex: 'participantAddress',
            key: 'participantAddress',
            width: '50%',
        },
    ];

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>Add participant</Button>
            <Modal title="Add participant" visible={isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
                <AddParticipantView handleAdd={handleOk} handleCancel={handleCancel}/>
            </Modal>
            <br/><br/>
            <Table columns={columns} dataSource={data} />
        </>
    );
};
