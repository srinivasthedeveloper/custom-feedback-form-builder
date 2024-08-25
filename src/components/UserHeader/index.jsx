import { Box, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import { urlRoutes } from '../../utils/Routes';
import { UserFormModal } from '../UserFormModal';

const UserHeader = () => {
  return (
    <nav>
      <Flex align="center" justify="center" gap="md">
        <Box>
          <Link to={urlRoutes.userDashboard}>Home</Link>
        </Box>
        <Box>
          <Link to={urlRoutes.userAbout}>About</Link>
        </Box>
        <Box>
          <Link to={urlRoutes.userProject}>Project</Link>
        </Box>
      </Flex>
      <UserFormModal />
    </nav>
  );
};

export { UserHeader };
