import React, { useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createHero } from "../../services/heroesService";
import { Flex, Form, Input, Select, Space, Button, notification } from "antd";
import { Hero } from "../../interfaces/IHero";
const { Option } = Select;

const Context = React.createContext({ name: 'Default' });

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const NewHero = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const createHeroMutation = useMutation({
    mutationFn: createHero,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getHeroes"] });
    },
  });

  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values: Hero) => {
    try {
      const res = await createHeroMutation.mutateAsync(values);
      if (res?.errors) {
        throw new Error();
      } else {
        api.success({
          message: 'Hero Created Successfully!',
          placement: 'topRight',
        });
        navigate('/heroes');
      }
    } catch (error) {
      api.error({
        message: 'Hero Existed!',
        placement: 'topRight',
      });
    }
    form.resetFields();
  };

  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  return (
    <>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <Flex vertical={true} justify="center" align="center" style={{ height: "100%", width: "100%" }}>
          <h1>New Hero</h1>
          <Form form={form} onFinish={onFinish} {...formItemLayout} style={{ width: 600 }} variant="filled">
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input type="string" max={"1"} />
            </Form.Item>
            <Form.Item name="class" label="Class" rules={[{ required: true }]}>
              <Select
                placeholder="Choose the hero's class"
                allowClear
              >
                <Option value="warrior">Warrior</Option>
                <Option value="maskman">Maskman</Option>
                <Option value="mage">Mage</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button type="default" onClick={() => navigate('/heroes')}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Flex>
      </Context.Provider>
    </>
  )
};

export default NewHero;