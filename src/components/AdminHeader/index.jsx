import { Button, Flex, Image, Text } from '@mantine/core';
import React from 'react';
import HeaderLogo from '../../assets/headerLogo.svg';
import styles from './index.module.css';

const AdminHeader = ({ title = 'USER Feedback', onPublish = null, onSave = null }) => {
  return (
    <header className={styles.adminHeaderContainer}>
      <Flex className={styles.logoContainer}>
        <Image src={HeaderLogo} className={styles.logoImage} />
        <Text size="xl" style={{ fontWeight: '500' }}>
          {title}
        </Text>
      </Flex>
      <Flex gap="lg">
        {onSave ? (
          <Button
            onClick={() => {
              onSave();
            }}
          >
            Save
          </Button>
        ) : null}
        {onPublish ? (
          <Button
            onClick={() => {
              onPublish();
            }}
            color="#2E7D32"
          >
            Publish
          </Button>
        ) : null}
      </Flex>
    </header>
  );
};

export { AdminHeader };
