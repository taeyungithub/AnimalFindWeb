import React, { useState } from "react";
import { Button, Modal } from "antd";

export default function Checkbox1() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        서약서 보기
      </Button>
      <Modal
        title="서약서"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>내용</div>
      </Modal>
    </>
  );
}
