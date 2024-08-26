import {
  Button,
  Flex,
  Image,
  InputLabel,
  LoadingOverlay,
  Modal,
  Radio,
  Rating,
  SegmentedControl,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import AngryFilled from '../../assets/angryFilled.svg';
import AngryOutlined from '../../assets/angryOutline.svg';
import duhFilled from '../../assets/duhFilled.svg';
import duhOutlined from '../../assets/duhOutline.svg';
import happyFilled from '../../assets/happyFilled.svg';
import happyOutlined from '../../assets/happyOutline.svg';
import sadFilled from '../../assets/sadFilled.svg';
import sadOutlined from '../../assets/sadOutline.svg';
import smileFilled from '../../assets/smileFilled.svg';
import smileOutlined from '../../assets/smileOutline.svg';
import { useFirestore } from '../../hooks/useFirestore';

const UserFormModal = () => {
  const { getAllDocuments, loading: formLoading } = useFirestore('forms');
  const { addDocument, loading: responseLoading } = useFirestore('forms-responses');
  const [fields, setFields] = useState([]);
  const [validationSchema, setValidationSchema] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [formDetails, setFormDetails] = useState({});
  const [filteredForms, setFilteredForms] = useState([]);
  const pathname = useLocation()?.pathname;

  function getValidationSchema(fields) {
    const schemaFields = {};

    fields.forEach((field) => {
      if (field.isRequired) {
        schemaFields[field.id] = Yup.string().required(field.errorMessage);
      } else {
        schemaFields[field.id] = Yup.string().nullable();
      }
    });

    return Yup.object().shape(schemaFields);
  }

  const getAllForms = async () => {
    const allForms = await getAllDocuments();
    const getPublishedForms = allForms.filter((form) => form?.isPublished);
    let previousForms = localStorage.getItem('submittedForm') || [];
    if (typeof previousForms === 'string') {
      previousForms = JSON.parse(previousForms);
    }
    const formsFiltered = getPublishedForms.filter((form) => !previousForms.includes(form.id));
    if (formsFiltered.length === 0) return;
    setFilteredForms(formsFiltered);
  };

  const userForm = useForm({
    initialValues: fields.reduce((acc, field) => {
      acc[field.id] = ''; // Initialize each field value
      return acc;
    }, {}),
    validate: (values) => {
      try {
        validationSchema.validateSync(values, { abortEarly: false });
        return {};
      } catch (err) {
        return err.inner.reduce((acc, currentError) => {
          acc[currentError.path] = currentError.message;
          return acc;
        }, {});
      }
    },
  });

  const handlePathChange = () => {
    if (filteredForms.length === 0) return;
    let visibleForm = null;

    // Get current date and time
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toTimeString().slice(0, 5); // "HH:mm" format

    // Filter forms that satisfy all enabled conditions
    const formsWithAllConditions = filteredForms.filter((form) => {
      const { urlEnabled, dateEnabled, timeEnabled, url, date, time } = form?.conditions || {};

      const isUrlMatch = urlEnabled ? url?.includes(pathname) : true;
      const isDateMatch = dateEnabled ? date?.includes(currentDate) : true;
      const isTimeMatch = timeEnabled ? time?.includes(currentTime) : true;

      return isUrlMatch && isDateMatch && isTimeMatch;
    });

    // Check forms without any conditions
    const formsWithoutConditions = filteredForms.filter(
      (form) => !(form?.conditions?.urlEnabled || form?.conditions?.dateEnabled || form?.conditions?.timeEnabled),
    );

    // Assign the visibleForm based on the conditions
    if (formsWithAllConditions.length !== 0) {
      visibleForm = formsWithAllConditions[0];
    } else if (formsWithoutConditions.length !== 0) {
      visibleForm = formsWithoutConditions[0];
    }
    if (!visibleForm) return;
    setFormDetails(visibleForm);
    setFields(visibleForm?.fields);
    setValidationSchema(getValidationSchema(visibleForm?.fields));
    setModalOpen(true);
  };

  useEffect(() => {
    getAllForms();
  }, []);

  useEffect(() => {
    handlePathChange();
  }, [pathname, filteredForms]);

  const handleClose = () => {
    setModalOpen(false);
    let previousForms = localStorage.getItem('submittedForm') || [];
    if (typeof previousForms === 'string') {
      previousForms = JSON.parse(previousForms);
    }
    previousForms.push(formDetails?.id);
    localStorage.setItem('submittedForm', JSON.stringify(previousForms));
    getAllForms();
  };

  const handleSubmit = async (values) => {
    const data = Object.entries(values).map(([key, value]) => {
      const field = fields.find((field) => field.id === key);
      return {
        id: key,
        value,
        label: field?.label || `Please Enter ${field?.type}`,
      };
    });
    await addDocument({ [formDetails?.id]: data, createdAt: Timestamp.now() });
    handleClose();
  };

  const RenderField = ({ field }) => {
    switch (field?.type) {
      case 'textarea':
        return (
          <Textarea
            {...userForm.getInputProps(field.id)}
            withAsterisk={field?.isRequired}
            label={field?.label || `Enter ${field.type}`}
            error={false}
          />
        );
      case 'numeric':
        const EmptySymbol = (number) => <Flex style={{ border: '1px solid gray', padding: '5px 15px' }}>{number}</Flex>;
        const FullSymbol = (number) => (
          <Flex style={{ border: '1px solid gray', padding: '5px 15px', background: '#5578f4', color: 'white' }}>
            {number}
          </Flex>
        );
        return (
          <Flex direction="column">
            <InputLabel required={field?.isRequired}>{field?.label || `Enter ${field.type}`}</InputLabel>
            <Rating
              {...userForm.getInputProps(field.id)}
              count={10}
              emptySymbol={EmptySymbol}
              fullSymbol={FullSymbol}
              highlightSelectedOnly
            />
          </Flex>
        );
      case 'star':
        return (
          <Flex direction="column">
            <InputLabel required={field?.isRequired}>{field?.label || `Enter ${field.type}`}</InputLabel>
            <Rating {...userForm.getInputProps(field.id)} size="xl" />
          </Flex>
        );
      case 'smiley':
        const outLineSmiley = [AngryOutlined, sadOutlined, duhOutlined, smileOutlined, happyOutlined];
        const filledSmiley = [AngryFilled, sadFilled, duhFilled, smileFilled, happyFilled];
        const EmptySmiley = (number) => <Image src={outLineSmiley[number - 1]} />;
        const FilledSmiley = (number) => <Image src={filledSmiley[number - 1]} />;
        return (
          <Flex direction="column">
            <InputLabel required={field?.isRequired}>{field?.label || `Enter ${field.type}`}</InputLabel>
            <Rating
              {...userForm.getInputProps(field.id)}
              emptySymbol={EmptySmiley}
              fullSymbol={FilledSmiley}
              highlightSelectedOnly
            />
          </Flex>
        );
      case 'single':
        return (
          <TextInput
            {...userForm.getInputProps(field.id)}
            withAsterisk={field?.isRequired}
            label={field?.label || `Enter ${field.type}`}
            error={false}
          />
        );
      case 'radio':
        return (
          <Flex direction="column">
            <InputLabel required={field?.isRequired}>{field?.label || `Enter ${field.type}`}</InputLabel>
            <Radio
              {...userForm.getInputProps(field.id, { type: 'radio' })}
              name={field?.id}
              value={field?.options?.[0] || 'Option 1'}
              label={field?.options?.[0] || 'Option 1'}
              error={false}
            />
            <Radio
              {...userForm.getInputProps(field.id, { type: 'radio' })}
              name={field?.id}
              value={field?.options?.[1] || 'Option 2'}
              label={field?.options?.[1] || 'Option 2'}
              error={false}
            />
            <Radio
              {...userForm.getInputProps(field.id, { type: 'radio' })}
              name={field?.id}
              value={field?.options?.[2] || 'Option 3'}
              label={field?.options?.[2] || 'Option 3'}
              error={false}
            />
          </Flex>
        );
      case 'categories':
        return (
          <Flex direction="column">
            <InputLabel required={field?.isRequired}>{field?.label || `Enter ${field.type}`}</InputLabel>
            <SegmentedControl
              {...userForm.getInputProps(field.id)}
              label={field?.label}
              isRequired={field?.isRequired}
              data={field?.options || ['1', '2', '3']}
            />
          </Flex>
        );
      default:
        return <></>;
    }
  };

  if (formLoading || responseLoading) {
    return <LoadingOverlay visible />;
  }

  return (
    <Modal opened={isModalOpen} withCloseButton={false} centered size="lg" onClose={handleClose}>
      <Text size="lg">{formDetails?.name}</Text>
      <Form onSubmit={handleSubmit} form={userForm}>
        <Flex justify="space-evenly" direction="column" style={{ padding: '20px 0', gap: '20px' }}>
          {fields?.map((field) => (
            <>
              {RenderField({ field })}
              {userForm.errors[field.id] && (
                <Text size="sm" style={{ color: 'red' }}>
                  {userForm.errors[field.id]}
                </Text>
              )}
            </>
          ))}
        </Flex>
        <Flex justify="flex-end" align="center" gap="lg">
          <Button color="red" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export { UserFormModal };
