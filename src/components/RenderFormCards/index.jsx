import { Button, Card, Flex, Image, Text } from '@mantine/core';
import FormIcon from '../../assets/formIcon.svg';
import { formatDate } from '../../utils/date';
import styles from './index.module.css';

const RenderLabel = ({ label, value }) => (
  <Flex className={styles.labelContainer}>
    <Text className={styles.label}>{label}</Text>
    <Text className={styles.value}>{value}</Text>
  </Flex>
);

const RenderFormCards = ({ form, handleDelete, handleView, handleEdit }) => {
  return (
    <Card shadow="md" className={styles.renderFormCardContainer}>
      <Flex className={styles.formCardHeader}>
        <Image src={FormIcon} />
      </Flex>
      <Flex direction="column" className={styles.formBody}>
        <Text className={styles.title}>{form.name}</Text>
        <Flex direction="column">
          <RenderLabel label="Submitted" value="0" />
          <RenderLabel label="Viewed" value="0" />
          <RenderLabel label="Date Published" value={formatDate(form.createdAt.toDate())} />
        </Flex>
        <Flex direction="column" gap="10px">
          <Button className={styles.viewBtn} onClick={() => handleView(form.id)}>
            View Submission
          </Button>
          <Flex className={styles.buttonContainer}>
            <Button className={styles.editBtn} onClick={() => handleEdit(form.id)}>
              Edit
            </Button>
            <Button className={styles.deleteBtn} onClick={() => handleDelete(form.id)}>
              Delete
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export { RenderFormCards };
