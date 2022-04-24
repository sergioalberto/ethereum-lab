import React, {useCallback, useEffect, useState} from 'react';
import 'antd/dist/antd.min.css';
import { Table, Button, Modal, Spin, Input, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { AddParticipantView } from "./AddParticipantView";
import {ethers} from "ethers";
import contract from "../../contracts/supplyChain.json";

const abi = contract.abi;

export const ParticipantsListView = ({ data }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [participants, setParticipants] = useState(null);
    const [state, setState] = useState({
        searchText: '',
        searchedColumn: '',
    });
    let searchInput;

    const transformParticipantsObjects = (participantsObjects) => {
        const numParticipants = participantsObjects[0].length;
        let participants = []

        for (let index = 0; index < numParticipants; index ++) {
            const participant = {
                key: index,
                userName: participantsObjects[0][index][0],
                participantType: participantsObjects[0][index][2],
                participantAddress: participantsObjects[0][index][3],
            }
            participants.push(participant);
        }

        return participants;
    }

    const fetchParticipants = useCallback(async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const chainId = (await provider.getNetwork()).chainId;
                console.info(`Chain id = ${chainId}`);
                const contractAddress = contract.networks[chainId].address;

                const signer = provider.getSigner();
                const supplyChain = new ethers.Contract(contractAddress, abi, signer);

                const participants = await supplyChain.functions.getAllParticipants();
                setParticipants(transformParticipantsObjects(participants));
            } else {
                console.log("Ethereum object does not exist.");
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect( () => {
        fetchParticipants();
    }, [fetchParticipants]);

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: text =>
            state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    const handleReset = clearFilters => {
        clearFilters();
        setState({searchText: ''});
    };

    const columns = [
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
            width: '30%',
            ...getColumnSearchProps('userName'),
            sorter: (a, b) => a.userName.length - b.userName.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Participant Type',
            dataIndex: 'participantType',
            key: 'participantType',
            width: '20%',
            filters: [
                {
                    text: 'Manufacturer',
                    value: 'Manufacturer',
                },
                {
                    text: 'Supplier',
                    value: 'Supplier',
                },
                {
                    text: 'Consumer',
                    value: 'Consumer',
                },
            ],
            onFilter: (value, record) => record.participantType.indexOf(value) === 0,
        },
        {
            title: 'Participant Address',
            dataIndex: 'participantAddress',
            key: 'participantAddress',
            width: '50%',
            ...getColumnSearchProps('participantAddress'),
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

    if (participants || data) {
        return (
            <>
                <Button type="primary" onClick={showModal}>Add participant</Button>
                <Modal title="Add participant" visible={isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
                    <AddParticipantView handleAdd={handleOk} handleCancel={handleCancel}/>
                </Modal>
                <br/><br/>
                <Table columns={columns} dataSource={data ? data: participants} />
            </>
        );
    }

    return (
        <>
            <Spin/>
        </>
    );
};
