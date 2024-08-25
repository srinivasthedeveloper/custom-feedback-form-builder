import { Button, Flex, Image, Text } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ title = 'USER Feedback', onPublish = () => {}, onSave = () => {} }) => {
  const navigate = useNavigate();
  return (
    <header
      style={{
        padding: '10px',
        borderBottom: '1px solid #e1e1e1',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Flex>
        <Image src="" />
        <Text size="xl" style={{ fontWeight: '500' }}>
          {title}
        </Text>
      </Flex>
      <Flex gap="lg">
        <Button
          onClick={() => {
            onSave();
          }}
        >
          Save
        </Button>
        <Button
          onClick={() => {
            onPublish();
          }}
        >
          Publish
        </Button>
      </Flex>
    </header>
  );
};

export { AdminHeader };
