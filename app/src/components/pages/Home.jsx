import { useEffect, useState } from "react";
import axios from "../../axios";
import "./Login.css";
import {
  Row,
  Flex,
  Typography,
  Col,
  Button,
  Card,
  Input,
  List,
  Skeleton,
  Avatar,
  Select,
  Form,
} from "antd";
import {
  ProfileOutlined,
  LogoutOutlined,
  SaveOutlined,
  CheckSquareOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Home = () => {
  const [list, setList] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      return navigation("/");
    }

    setList([
      { name: "Niget", picture: "" },
      { name: "Mali", picture: "" },
      { name: "Niget", picture: "" },
    ]);

    // Load priorities
    axios
      .get("/priorities")
      .then((res) => {
        let tab = [];
        res.data.map((p) =>
          tab.push({
            value: p.id.toString(),
            label: p.name,
          })
        );
        setPriorities(tab);
      })
      .catch((err) => {
        console.error("Error:", err.message);
      });

    setLoading(true);
    // Load Task
    axios
      .get("/tasks")
      .then((res) => {
        let tab = [];
        res.data.map((p) =>
          tab.push({
            id: p.id,
            title: p.title,
            status: p.status,
            priority_id: p.priority_id,
          })
        );
        setTask(tab);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err.message);
      });
  }, []);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onFinish = (values) => {
    axios
      .post("/tasks", {title: values.title, priority_id: values.priority_id})
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error:", err.message);
      });
    console.log(values);
  };

  return (
    <Flex
      gap="center"
      //   align="center"
      //   justify="center"
      vertical
      style={{ height: "100vh" }}
    >
      <Row style={{ height: "80px", backgroundColor: "black" }}>
        <Col md={4} offset={4}>
          <Title level={3} style={{ color: "white" }}>
            <ProfileOutlined /> M2aTodo
          </Title>
        </Col>
        <Col
          md={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Welcome Abdoulaye Mohamed</Text>
        </Col>
        <Col
          md={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            danger
            onClick={() => {
              localStorage.removeItem("token");
              return navigation("/");
            }}
          >
            <LogoutOutlined /> Log Out
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col offset={4} md={16}>
          <Card
            style={{
              width: "100%",
            }}
          >
            <Form
              name="normal_login"
              className="login-form"
              onFinish={onFinish}
            >
              <Form.Item
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input task name!",
                  },
                ]}
              >
                <Input placeholder="large size" prefix={<ProfileOutlined />} />
              </Form.Item>
              <Form.Item
                name="priority_id"
                rules={[
                  {
                    required: true,
                    message: "Please select priority!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  style={{
                    width: "100%",
                  }}
                  options={priorities}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ width: "100%" }}
                >
                  <SaveOutlined /> Add new task
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col offset={4}>
          <Title level={4} style={{ marginBottom: "20px" }}>
            Task list
          </Title>
        </Col>
      </Row>
      <Row>
        <Col offset={4} md={16}>
          <List
            className="demo-loadmore-list"
            // loading={initLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={task}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a key="list-loadmore-edit">
                    <CheckSquareOutlined />
                  </a>,
                  <a key="list-loadmore-edit" style={{ color: "green" }}>
                    <EditOutlined />
                  </a>,
                  <a key="list-loadmore-more" style={{ color: "red" }}>
                    <DeleteOutlined />
                  </a>,
                ]}
              >
                <Skeleton avatar title={false} loading={loading} active>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={"test"}
                        style={{
                          backgroundColor:
                            item.priority_id === 1
                              ? "red"
                              : item.priority_id === 2
                              ? "yellow"
                              : item.priority_id === 3
                              ? "green"
                              : "gray",
                        }}
                      />
                    }
                    title={<Text type="secondary">{item.title}</Text>}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Flex>
  );
};

export default Home;
