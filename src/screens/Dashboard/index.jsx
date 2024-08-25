import { Button, Card, Flex, Image, Text } from '@mantine/core';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormIcon from '../../assets/formIcon.svg';
import PlusIcon from '../../assets/plusIcon.svg';
import { AdminHeader } from '../../components/AdminHeader';
import { FormNameEditorModal } from '../../components/FormNameEditorModal';
import { useFirestore } from '../../hooks/useFirestore';
import { db } from '../../utils/firebase';
import { urlRoutes } from '../../utils/Routes';
import styles from './index.module.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [isError, setIsError] = useState(false);
  const { getAllDocuments, deleteDocument } = useFirestore('forms');
  const [forms, setForms] = useState([]);

  const getAllForms = async () => {
    const allForms = await getAllDocuments();
    setForms(allForms);
  };

  useEffect(() => {
    getAllForms();
  }, []);

  const storeObject = async (objectData) => {
    try {
      const docRef = await addDoc(collection(db, 'forms'), objectData);
      navigate(urlRoutes.newForm.replace(':id', docRef.id));
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const handleSubmit = async () => {
    if (!formName) {
      setIsError(true);
      return;
    }
    const formData = {
      name: formName,
      createdAt: Timestamp.now(),
    };

    await storeObject(formData);
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`;
  };

  const NewFormCard = () => (
    <Card
      shadow="md"
      padding="md"
      className={styles.formCard}
      style={{ justifyContent: 'center' }}
      onClick={() => {
        setModalOpen(true);
      }}
    >
      <Image src={PlusIcon} className={styles.plusIcon} alt="+" />
      <Text align="center" size="lg" style={{ fontWeight: '500' }}>
        New Form
      </Text>
    </Card>
  );

  const RenderLabel = ({ label, value }) => (
    <Flex className={styles.labelContainer}>
      <Text className={styles.label}>{label}</Text>
      <Text className={styles.value}>{value}</Text>
    </Flex>
  );

  const RenderCards = ({ form }) => (
    <Card shadow="md" className={styles.formCard}>
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
          <Button className={styles.viewBtn}>View Submission</Button>
          <Flex className={styles.buttonContainer}>
            <Button
              className={styles.editBtn}
              onClick={() => {
                const url = urlRoutes.newForm.replace(':id', form.id);
                navigate(url);
              }}
            >
              Edit
            </Button>
            <Button
              className={styles.deleteBtn}
              onClick={() => {
                deleteDocument(form.id);
                getAllForms();
              }}
            >
              Delete
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );

  return (
    <section>
      <AdminHeader />
      <main className={styles.dashboardContainer}>
        <NewFormCard />
        {forms.map((form) => (
          <RenderCards key={form.id} form={form} />
        ))}
        <FormNameEditorModal
          formName={formName}
          setFormName={setFormName}
          isModalOpen={isModalOpen}
          handleSubmit={handleSubmit}
          handleCancel={() => {
            setModalOpen(false);
            setFormName('');
            setIsError(false);
          }}
          isError={isError}
        />
      </main>
    </section>
  );
};
export { Dashboard };
