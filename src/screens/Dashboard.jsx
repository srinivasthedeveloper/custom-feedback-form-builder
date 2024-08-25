import { Button, Card, Flex, Image, Modal, Text, TextInput } from '@mantine/core';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlusIcon from '../assets/plusIcon.svg';
import { AdminHeader } from '../components/AdminHeader';
import { useFirestore } from '../hooks/useFirestore';
import { db } from '../utils/firebase';
import { urlRoutes } from '../utils/Routes';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const { getAllDocuments } = useFirestore('forms');
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
    const formData = {
      name: formName,
      createdAt: Timestamp.now(),
    };

    await storeObject(formData);
  };

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
        {forms.map((form) => (
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
              const url = urlRoutes.newForm.replace(':id', form.id);
              navigate(url);
            }}
          >
            <Text align="center" size="lg" style={{ fontWeight: '500' }}>
              {form.name}
            </Text>
          </Card>
        ))}
        <Modal centered opened={isModalOpen} withCloseButton={false} title="Create Feedback Form">
          <div>
            <TextInput
              placeholder="Enter Form Name"
              value={formName}
              onChange={(e) => {
                setFormName(e.target.value);
              }}
            />
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
                  // navigate(urlRoutes.newForm);
                  handleSubmit();
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
