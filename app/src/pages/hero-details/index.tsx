import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateHero, getHero, deleteHero } from "../../services/heroesService";
import {
  Flex,
  Form,
  Input,
  Select,
  Space,
  Button,
  notification,
  Popconfirm,
} from "antd";
import { UpdateHero, HeroResponse } from "../../interfaces/IHero";
const { Option } = Select;

const Context = React.createContext({ name: "Default" });

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

const HeroDetails = () => {
  const navigate = useNavigate();
  const [canWrite] = useState(parseInt(window.yayHeroes.canWrite));
  const { id } = useParams();

  const queryClient = useQueryClient();
  const hero = useQuery({
    queryKey: ["getHero"],
    queryFn: async () => await getHero(parseInt(id!)),
  });

  const [api, contextHolder] = notification.useNotification();

  const updateHeroMutation = useMutation<
    HeroResponse,
    unknown,
    { id: number; hero_body: UpdateHero }
  >({
    mutationFn: ({ id, hero_body }) => updateHero(id, hero_body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getHeroes"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteHero,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listHero"] });
      navigate("/heroes");
    },
  });

  const [form] = Form.useForm();

  const onFinish = async (value: UpdateHero) => {
    try {
      const res = await updateHeroMutation.mutateAsync({
        id: parseInt(id!),
        hero_body: value,
      });
      if (res?.errors) {
        throw new Error();
      } else {
        api.success({
          message: "Hero Updated Successfully!",
          placement: "topRight",
        });
        navigate("/heroes");
      }
    } catch (error) {
      api.error({
        message: "Hero does not exist!",
        placement: "topRight",
      });
    }
    form.resetFields();
  };

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  if (canWrite) {
    if (hero?.isLoading) {
      return (
        <Flex justify="center" wrap="wrap" gap="large">
          <h2>LOADING...</h2>
        </Flex>
      );
    }
    return (
      <>
        <Context.Provider value={contextValue}>
          {contextHolder}
          <Flex
            vertical={true}
            justify="center"
            align="center"
            style={{ height: "100%", width: "100%" }}
          >
            <h1>Edit Hero</h1>
            <Form
              initialValues={{
                name: hero?.data?.name,
                class: hero?.data?.class,
              }}
              form={form}
              onFinish={onFinish}
              {...formItemLayout}
              style={{ width: 600 }}
              variant="filled"
              disabled={hero?.isLoading}
            >
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="class"
                label="Class"
                rules={[{ required: true }]}
              >
                <Select placeholder="Choose the hero's class" allowClear>
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
                  <Popconfirm
                    placement="left"
                    title="Are you sure to delete this Hero?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => {
                      return deleteMutation.mutateAsync(parseInt(id!));
                    }}
                  >
                    <Button type="primary" danger>
                      Delete
                    </Button>
                  </Popconfirm>
                  <Button
                    type="default"
                    htmlType="button"
                    onClick={() => navigate("/heroes")}
                  >
                    Cancel
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Flex>
        </Context.Provider>
      </>
    );
  } else {
    return (
      <>
        <Flex justify="center" wrap="wrap" gap="large">
          <h2>Sorry! You cannot edit data.</h2>
        </Flex>
      </>
    );
  }
};

export default HeroDetails;
