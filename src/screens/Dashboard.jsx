import { Button, Card, Flex, Image, Modal, Text, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlusIcon from '../assets/plusIcon.svg';
import { AdminHeader } from '../components/AdminHeader';
import { urlRoutes } from '../utils/Routes';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <section>
      <AdminHeader />
      <main style={{ padding: '30px' }}>
        <Card
          shadow="md"
          padding="md"
          style={{
            width: '200px',
            aspectRatio: '1.2/1.5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            flexDirection: 'column',
            cursor: 'pointer',
          }}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <Image src={PlusIcon} style={{ aspectRatio: '1', width: '40px' }} alt="+" />
          <Text align="center" size="lg" style={{ fontWeight: '500' }}>
            New Form
          </Text>
        </Card>
        <Modal centered opened={isModalOpen} title="Create Feedback Form">
          <div>
            <TextInput placeholder="Enter Form Name" />
            <Flex>
              <Button
                variant="transparent"
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="transparent"
                onClick={() => {
                  navigate(urlRoutes.newForm);
                }}
              >
                Create
              </Button>
            </Flex>
          </div>
        </Modal>
      </main>
    </section>
  );
};
export { Dashboard };
