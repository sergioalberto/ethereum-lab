import React, {useState} from 'react';
import { Form, Input, Button, Select, Space, Spin, message } from 'antd'; // https://ant.design/components/overview/
import 'antd/dist/antd.min.css';
import {ethers} from "ethers";
import contract from "../../contracts/supplyChain.json";

const abi = contract.abi;

const { Option } = Select;

const layout = {
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 14,
    },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
};

export const AddParticipantView = ({handleAdd, handleCancel}) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Values to send: " + values);
        addParticipantToBlockchain(values);
    };

    const addParticipantToBlockchain = async (data) => {
        try {
            const { ethereum } = window;
            console.log(data);
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const chainId = (await provider.getNetwork()).chainId;
                console.info(`Chain id = ${chainId}`);
                const contractAddress = contract.networks[chainId].address;

                const signer = provider.getSigner();
                const supplyChain = new ethers.Contract(contractAddress, abi, signer);

                // Create new Participant
                const participantTxn = await supplyChain.functions.addParticipant(data.username,
                    data.password, data.address, data.participantType);

                console.log("Mining... please wait");
                setLoading(true);
                await participantTxn.wait();

                setLoading(false);
                message.warn(`Mined, see transaction hash: ${participantTxn.hash}`);
                handleAdd();
            } else {
                console.log("Ethereum object does not exist.");
            }
        } catch (err) {
            console.log(err);
        }
    };

    // eslint-disable-next-line no-unused-vars
    const onReset = () => {
        form.resetFields();
    };

    return (
        <>
            <Spin tip="Mining... please wait" spinning={loading}>
                <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item
                        name="username"
                        label="User name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="participantType"
                        label="Participant Type"
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                        >
                            <Option value="Manufacturer">Manufacturer</Option>
                            <Option value="Supplier">Supplier</Option>
                            <Option value="Consumer">Consumer</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
                        <Space>
                            <Button type="primary" htmlType="Add">
                                Add
                            </Button>

                            <Button htmlType="button" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Spin>
        </>
    );
}
