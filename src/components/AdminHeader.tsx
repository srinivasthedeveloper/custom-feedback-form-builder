import { Button, Flex, Image, Text } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
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
          USER Feedback
        </Text>
      </Flex>
      <Flex gap="lg">
        <Button>Save</Button>
        <Button
          onClick={() => {
            navigate('/form/1');
          }}
        >
          Publish
        </Button>
      </Flex>
    </header>
  );
};

export { AdminHeader };
