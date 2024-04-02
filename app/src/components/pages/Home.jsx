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
  Spin,
  Affix,
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
  const [priorities, setPriorities] = useState([]);
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [taskId, setTaskId] = useState(0);
  const [priority, setPriority] = useState(0);
  const [top, setTop] = useState(0);
  const [form] = Form.useForm();
  const navigation = useNavigate();

  const getAllTask = () => {
    axios
      .get("/tasks")
      .then((res) => {
        let tab = [];
        res.data
          .sort((a, b) => a.priority_id - b.priority_id)
          .map((p) =>
            tab.push({
              id: p.id,
              title: p.title,
              status: p.status,
              priority_id: p.priority_id,
              priority_name: p.priority_name,
            })
          );
        setTask(tab);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status == 403) {
          localStorage.removeItem("token");
          return navigation("/");
        }
      });
  };

  const getAllPriorities = () => {
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
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status == 403) {
          localStorage.removeItem("token");
          return navigation("/");
        }
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      return navigation("/");
    }
    setLoading(true);
    getAllTask();
    getAllPriorities();
  }, []);

  const onChange = (value) => {
    setPriority(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onFinish = (values) => {
    setLoading(true);
    if (taskId) {
      axios
        .put(`/tasks/${taskId}`, {
          title: values.title,
          priority_id: priority,
        })
        .then((res) => {
          getAllTask();
          onCancelUpdate();
        })
        .catch((err) => {
          if (err.response.status == 403) {
            localStorage.removeItem("token");
            return navigation("/");
          }
        });
    } else {
      axios
        .post("/tasks", {
          title: values.title,
          priority_id: values.priority_id,
        })
        .then((res) => {
          getAllTask();
          form.setFieldValue("title", null);
          form.setFieldValue("priority_id", null);
        })
        .catch((err) => {
          if (err.response.status == 403) {
            localStorage.removeItem("token");
            return navigation("/");
          }
        });
    }
  };

  const onUpdate = (title, priority_id, priority_name, id) => {
    form.setFieldValue("title", title);
    form.setFieldValue("priority_id", {
      value: priority_id.toString(),
      label: priority_name,
    });
    setTaskId(id);
    setPriority(priority_id);
  };

  const onCancelUpdate = () => {
    form.setFieldValue("title", null);
    form.setFieldValue("priority_id", null);
    setTaskId(0);
    setPriority(0);
  };

  const deleteTask = (id) => {
    axios
      .delete(`/tasks/${id}`)
      .then((res) => {
        getAllTask();
      })
      .catch((err) => {
        if (err.response.status == 403) {
          localStorage.removeItem("token");
          return navigation("/");
        }
      });
  };

  const doneTask = (id) => {
    axios
      .put(`/tasks/done/${id}`)
      .then((res) => {
        getAllTask();
      })
      .catch((err) => {
        if (err.response.status == 403) {
          localStorage.removeItem("token");
          return navigation("/");
        }
      });
  };

  return (
    <Flex
      gap="center"
      vertical
      style={{ height: "100vh" }}
    >
      <Affix offsetTop={top}>
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
            <Text style={{ color: "white" }}>Welcome to M2aTodo</Text>
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
                form={form}
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
                  <Input
                    placeholder="Title of the task"
                    prefix={<ProfileOutlined />}
                  />
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
                    placeholder="Select priority of the task"
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
                  {taskId ? (
                    <>
                      <Button
                        type="default"
                        htmlType="submit"
                        className="login-form-button"
                        style={{
                          width: "100%",
                          backgroundColor: "green",
                          color: "white",
                        }}
                      >
                        <SaveOutlined /> Update task
                      </Button>
                      <Button
                        type="default"
                        htmlType="submit"
                        className="login-form-button"
                        style={{ width: "100%", marginTop: "10px" }}
                        onClick={() => onCancelUpdate()}
                      >
                        <SaveOutlined /> Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      style={{ width: "100%" }}
                    >
                      <SaveOutlined /> Add new task
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Affix>
      <Row style={{ marginTop: "20px" }}>
        <Col offset={4}>
          <Title level={4} style={{ marginBottom: "20px" }}>
            Task list
          </Title>
        </Col>
      </Row>
      <Spin tip="Loading" size="small" spinning={loading}>
        <Row>
          <Col offset={4} md={16}>
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={task}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <a key="list-loadmore-edit">
                      <CheckSquareOutlined onClick={() => doneTask(item.id)} />
                    </a>,
                    <a key="list-loadmore-edit" style={{ color: "green" }}>
                      <EditOutlined
                        onClick={() =>
                          onUpdate(
                            item.title,
                            item.priority_id,
                            item.priority_name,
                            item.id
                          )
                        }
                      />
                    </a>,
                    <a key="list-loadmore-more" style={{ color: "red" }}>
                      <DeleteOutlined onClick={() => deleteTask(item.id)} />
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
                      title={
                        <Text
                          type="secondary"
                          style={
                            item.status === "Done"
                              ? { textDecoration: "line-through" }
                              : null
                          }
                        >
                          {item.title}
                        </Text>
                      }
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
      </Spin>
    </Flex>
  );
};

export default Home;
