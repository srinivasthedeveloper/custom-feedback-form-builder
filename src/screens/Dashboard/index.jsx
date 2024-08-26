import { LoadingOverlay } from '@mantine/core';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminHeader } from '../../components/AdminHeader';
import { FormNameEditorModal } from '../../components/FormNameEditorModal';
import { NewFormCard } from '../../components/NewFormCard';
import { RenderFormCards } from '../../components/RenderFormCards';
import { useFirestore } from '../../hooks/useFirestore';
import { db } from '../../utils/firebase';
import { urlRoutes } from '../../utils/Routes';
import styles from './index.module.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [isError, setIsError] = useState(false);
  const { getAllDocuments, deleteDocument, loading } = useFirestore('forms');
  const [forms, setForms] = useState([]);

  const getAllForms = async () => {
    const allForms = await getAllDocuments();
    setForms(allForms);
  };

  const handleView = (formId) => {
    const url = urlRoutes.formDetails.replace(':id', formId);
    navigate(url);
  };

  const handleEdit = (formId) => {
    const url = urlRoutes.newForm.replace(':id', formId);
    navigate(url);
  };

  const handleDelete = (formId) => {
    deleteDocument(formId);
    getAllForms();
  };

  const handleCreate = () => {
    setModalOpen(true);
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

  if (loading) {
    return <LoadingOverlay visible />;
  }

  return (
    <section>
      <AdminHeader />
      <main className={styles.dashboardContainer}>
        <NewFormCard handleClick={handleCreate} />
        {forms.map((form) => (
          <RenderFormCards
            key={form.id}
            form={form}
            handleView={handleView}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
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
