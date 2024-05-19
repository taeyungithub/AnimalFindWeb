import React, { useState } from "react";
import { Button, Modal } from "antd";

export default function Checkbox2() {
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
        프로필보기
      </Button>
      <Modal
        title="서약서 보기"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>닉네임 : 2</div>
      </Modal>
    </>
  );
}
