import React, { useState } from "react";
import { Input, Space, Button, Drawer, Divider, Row, Popconfirm } from "antd";

import { baseUrl } from "../../utils.js";

const ViewTicket = (props) => {
  const [visible, setVisible] = useState(false);
  const [issue, setIssue] = useState(props.ticket.issue);
  const [note, setNote] = useState(props.ticket.note);

  const { TextArea } = Input;

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  console.log(props);

  const complete = async (record) => {
    const id = record;
    await fetch(`${baseUrl}/api/v1/tickets/complete/${id}`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((res) => res.json());
  };

  return (
    <div>
      <Button
        type="text"
        size="small"
        key={0}
        onClick={() => {
          showDrawer();
        }}
      >
        View Ticket
      </Button>
      <Drawer width={640} placement="right" onClose={onClose} visible={visible}>
        <h2>Client: {props.ticket.client.name}</h2>
        <Space size="middle">
          <Button>Transfer</Button>
          <Popconfirm
            title="Are you sure you want to complete?"
            onConfirm={() => {
              complete(props.ticket._id);
            }}
          >
            <Button>Complete</Button>
          </Popconfirm>
        </Space>
        <Divider />
        <Row>
          <Space>
            <h4>Issue status : {props.ticket.status}</h4>
            <Divider type="vertical" />
            <h4 style={{ marginLeft: 75 }}>
              Engineer assigned : {props.ticket.assignedto.name}
            </h4>
          </Space>
        </Row>
        <Row>
          <TextArea
            rows={6}
            defaultValue={props.ticket.issue}
            style={{ width: "45%" }}
            placeholder="Issue goes here ..."
            onChange={(e) => setIssue(e.target.value)}
          />
          <TextArea
            defaultValue={props.ticket.note}
            style={{ width: "45%", float: "right", marginLeft: 25 }}
            placeholder="Job notes goes here ..."
            onChange={(e) => setNote(e.target.value)}
          />
        </Row>
        <Divider />
        <h4>Contact Details</h4>
        <h5>
          Contact Name:{" "}
          <Input defaultValue={props.ticket.name} style={{ width: 250 }} />
        </h5>
        <h5>
          Email:{" "}
          <Input defaultValue={props.ticket.email} style={{ width: 250 }} />
        </h5>
        <h5>
          Number:{" "}
          <Input defaultValue={props.ticket.number} style={{ width: 250 }} />
        </h5>
        <Divider />
        <h5>Time </h5>
      </Drawer>
    </div>
  );
};

export default ViewTicket;