import { Card, Image, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import PlusIcon from '../assets/plusIcon.svg';
import { urlRoutes } from '../utils/Routes';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <section>
      <header style={{ padding: '10px', boxShadow: '0px 1px 10px #888' }}>
        <Image src="" />
        <Text size="xl" style={{ fontWeight: '500' }}>
          USER Feedback
        </Text>
      </header>
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
            navigate(urlRoutes.newForm);
          }}
        >
          <Image src={PlusIcon} style={{ aspectRatio: '1', width: '40px' }} alt="+" />
          <Text align="center" size="lg" style={{ fontWeight: '500' }}>
            New Form
          </Text>
        </Card>
      </main>
    </section>
  );
};
export { Dashboard };
