import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createHero } from "../../services/heroesService";
import {
  Flex,
  Form,
  Input,
  Select,
  Space,
  Button,
  notification,
  Drawer,
} from "antd";
import { Hero } from "../../interfaces/IHero";
import { useState } from "react";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 18 }
};

const NewHero = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const createHeroMutation = useMutation({
    mutationFn: createHero,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getHeroes"] });
    },
  });

  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values: Hero) => {
    try {
      setIsSubmitting(true);
      const res = await createHeroMutation.mutateAsync(values);
      if (res?.errors) {
        throw new Error();
      } else {
        api.success({
          message: "Hero Created Successfully!",
          placement: "topRight",
        });
        setTimeout(() => navigate("/heroes"), 2000);
      }
    } catch (error) {
      api.error({
        message: "Hero Existed!",
        placement: "topRight",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Drawer width={750} open={true} getContainer={false} closable={false}>
        {contextHolder}
        <Flex
          vertical={true}
          justify="center"
          align="center"
          style={{ height: "100%", width: "100%" }}
        >
          <h1>New Hero</h1>
          <Form
            form={form}
            onFinish={onFinish}
            {...formItemLayout}
            style={{ width: 600 }}
            autoComplete="off"
            disabled={isSubmitting}
          >
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input type="string" max={"20"} />
            </Form.Item>
            <Form.Item name="class" label="Class" rules={[{ required: true }]}>
              <Select placeholder="Choose the hero's class" allowClear>
                <Option value="warrior">Warrior</Option>
                <Option value="maskman">Maskman</Option>
                <Option value="mage">Mage</Option>
              </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Space>
                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                  Save
                </Button>
                <Button type="default" onClick={() => navigate("/heroes")}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Flex>
      </Drawer>
    </>
  );
};

export default NewHero;
