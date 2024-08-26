import { Card, Image, Text } from '@mantine/core';
import PlusIcon from '../../assets/plusIcon.svg';
import styles from './index.module.css';
const NewFormCard = ({ handleClick }) => (
  <Card shadow="md" padding="md" className={styles.newFormCard} onClick={handleClick}>
    <Image src={PlusIcon} className={styles.formPlusIcon} alt="+" />
    <Text align="center" size="lg" style={{ fontWeight: '500' }}>
      New Form
    </Text>
  </Card>
);

export { NewFormCard };
