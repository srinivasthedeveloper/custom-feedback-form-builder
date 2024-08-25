import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Button,
  Card,
  Flex,
  Image,
  Input,
  InputLabel,
  Radio,
  Rating,
  SegmentedControl,
  Switch,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import AngryFilled from '../../assets/angryFilled.svg';
import AngryOutlined from '../../assets/angryOutline.svg';
import BackIcon from '../../assets/back.svg';
import categoriesIcon from '../../assets/cateIcon.svg';
import duhFilled from '../../assets/duhFilled.svg';
import duhOutlined from '../../assets/duhOutline.svg';
import greyDelete from '../../assets/greyDelete.svg';
import greyEdit from '../../assets/greyEdit.svg';
import happyFilled from '../../assets/happyFilled.svg';
import happyOutlined from '../../assets/happyOutline.svg';
import singleIcon from '../../assets/inputIcon.svg';
import numericIcon from '../../assets/numericalIcon.svg';
import PlusIcon from '../../assets/plusIcon.svg';
import radioIcon from '../../assets/radioIcon.svg';
import sadFilled from '../../assets/sadFilled.svg';
import sadOutlined from '../../assets/sadOutline.svg';
import smileFilled from '../../assets/smileFilled.svg';
import smileOutlined from '../../assets/smileOutline.svg';
import smileyIcon from '../../assets/smileyIcon.svg';
import starIcon from '../../assets/starIcon.svg';
import textareaIcon from '../../assets/textareaIcon.svg';
import whiteBack from '../../assets/whiteBack.svg';
import whiteEdit from '../../assets/whiteEdit.svg';

import { AdminHeader } from '../../components/AdminHeader';
import { FormNameEditorModal } from '../../components/FormNameEditorModal';
import { useFirestore } from '../../hooks/useFirestore';
import styles from './index.module.css';

const CreateForm = () => {
  const [editField, setEditField] = useState(null);
  const [fields, setFields] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formName, setFormName] = useState('');
  const [formData, setFormData] = useState();
  const { getDocument, updateDocument } = useFirestore('forms');
  const formId = useParams().id;
  const navigate = useNavigate();

  const getFormData = async () => {
    if (!formId) return;
    const form = await getDocument(formId);
    setFormData(form);
    setFields(form?.fields || []);
    setFormName(form?.name);
    conditionDataForm.setValues(form?.conditions || {});
  };

  useEffect(() => {
    getFormData();
  }, []);

  const additionalInfoForm = useForm({
    mode: 'uncontrolled',
    name: 'field-additional-info-form',
    initialValues: {
      labelText: '',
      errorMessage: '',
      isRequired: false,
      option1: 'Option 1',
      option2: 'Option 2',
      option3: 'Option 3',
    },
  });

  const conditionDataForm = useForm({
    mode: 'uncontrolled',
    name: 'condition-form',
    initialValues: {
      url: '',
      urlEnabled: false,
      date: '',
      dateEnabled: false,
      time: '',
      timeEnabled: false,
    },
  });

  const availableFields = [
    {
      type: 'textarea',
      label: 'Textarea',
      icon: textareaIcon,
    },
    {
      type: 'numeric',
      label: 'Numeric Rating',
      icon: numericIcon,
    },
    {
      type: 'star',
      label: 'Star Rating',
      icon: starIcon,
    },
    {
      type: 'smiley',
      label: 'Smiley Rating',
      icon: smileyIcon,
    },
    {
      type: 'single',
      label: 'Single Line Input',
      icon: singleIcon,
    },
    {
      type: 'radio',
      label: 'Radio Button',
      icon: radioIcon,
    },
    {
      type: 'categories',
      label: 'Categories',
      icon: categoriesIcon,
    },
  ];

  const RenderAvailableFields = () => (
    <Flex direction="column" gap="2px">
      <Text size="xl" style={{ fontWeight: '500' }}>
        Add Fields
      </Text>
      {availableFields.map((field) => (
        <Flex key={field.type} className={styles.availableFields}>
          <Flex
            className={styles.fieldContainer}
            onClick={() => {
              setFields([...fields, { id: uuidv4(), index: (fields?.length || 0) + 1, type: field.type }]);
            }}
          >
            <Image src={field.icon} />
            <Text>{field.label}</Text>
          </Flex>
          <Image src={PlusIcon} style={{ height: '15px' }} />
        </Flex>
      ))}
    </Flex>
  );

  const RenderConditionContainer = () => {
    return (
      <Form form={conditionDataForm}>
        <Flex direction="column" className={styles.conditionContainer}>
          <Text size="xl" style={{ fontWeight: '500' }}>
            Add Logic
          </Text>
          <div>
            <Switch
              {...conditionDataForm.getInputProps('urlEnabled')}
              key={conditionDataForm.key('urlEnabled')}
              disabled={!conditionDataForm.getValues()?.url}
              labelPosition="left"
              label="Show based on URL conditions"
            />
            <TextInput
              {...conditionDataForm.getInputProps('url')}
              key={conditionDataForm.key('url')}
              placeholder="https://"
              variant="transparent"
              className={styles.textInputFieldBorder}
            />
          </div>
          <Switch
            {...conditionDataForm.getInputProps('dateEnabled')}
            key={conditionDataForm.key('dateEnabled')}
            disabled={!conditionDataForm.getValues()?.date}
            labelPosition="left"
            label="Show on a specific date"
          />
          <Input {...conditionDataForm.getInputProps('date')} key={conditionDataForm.key('date')} type="date" />
          <Switch
            {...conditionDataForm.getInputProps('timeEnabled')}
            key={conditionDataForm.key('timeEnabled')}
            disabled={!conditionDataForm.getValues()?.time}
            labelPosition="left"
            label="Show on a specific time"
          />
          <Input {...conditionDataForm.getInputProps('time')} key={conditionDataForm.key('time')} type="time" />
        </Flex>
      </Form>
    );
  };

  const RenderField = ({ field }) => {
    switch (field?.type) {
      case 'textarea':
        return <Textarea withAsterisk={field?.isRequired} label={field?.label || `Enter ${field.type}`} />;
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
            <Rating count={10} emptySymbol={EmptySymbol} fullSymbol={FullSymbol} highlightSelectedOnly />
          </Flex>
        );
      case 'star':
        return (
          <Flex direction="column">
            <InputLabel required={field?.isRequired}>{field?.label || `Enter ${field.type}`}</InputLabel>
            <Rating size="xl" />
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
            <Rating emptySymbol={EmptySmiley} fullSymbol={FilledSmiley} highlightSelectedOnly />
          </Flex>
        );
      case 'single':
        return <TextInput withAsterisk={field?.isRequired} label={field?.label || `Enter ${field.type}`} />;
      case 'radio':
        return (
          <Flex direction="column">
            <InputLabel required={field?.isRequired}>{field?.label || `Enter ${field.type}`}</InputLabel>
            <Radio
              name={field?.id}
              value={field?.options?.[0] || 'Option 1'}
              label={field?.options?.[0] || 'Option 1'}
            />
            <Radio
              name={field?.id}
              value={field?.options?.[1] || 'Option 2'}
              label={field?.options?.[1] || 'Option 2'}
            />
            <Radio
              name={field?.id}
              value={field?.options?.[2] || 'Option 3'}
              label={field?.options?.[2] || 'Option 3'}
            />
          </Flex>
        );
      case 'categories':
        return (
          <Flex direction="column">
            <InputLabel required={field?.isRequired}>{field?.label || `Enter ${field.type}`}</InputLabel>
            <SegmentedControl
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const SortableItem = ({ id, field }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      background: 'white',
      cursor: 'move',
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <RenderField field={field} />
      </div>
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleUpdate = async () => {
    const data = {
      ...formData,
      fields,
      conditions: conditionDataForm.getValues(),
      name: formName || formData?.name,
    };
    await updateDocument(formId, data);
    getFormData();
  };

  return (
    <section>
      <AdminHeader onSave={handleUpdate} />
      <main className={styles.formEditContainer}>
        <Flex className={styles.previewContainer}>
          <Card shadow="md" padding="0px" className={styles.previewCard}>
            <Flex className={styles.previewHeader}>
              <Flex
                onClick={() => {
                  navigate('/dashboard');
                }}
              >
                <Image src={whiteBack} />
              </Flex>
              <Text
                style={{ width: '90%', overflow: 'hidden', textOverflow: 'ellipsis' }}
                className={styles.previewTitle}
              >
                {formData?.name || 'Default Form Name'}
              </Text>
              <Image
                onClick={() => {
                  setModalOpen(true);
                }}
                src={whiteEdit}
                style={{ width: '1.2rem' }}
              />
            </Flex>
            {fields.length > 0 ? (
              <Flex direction="column" gap="10px" style={{ padding: '20px 10px' }}>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={fields.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                    {fields.map((item) => (
                      <Card
                        shadow="md"
                        key={item.id}
                        style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 5px 5px' }}
                      >
                        <SortableItem key={item.id} id={item.id} field={item} />
                        <Flex justify="flex-end" gap="15px">
                          <Image
                            src={greyEdit}
                            style={{ width: '1.2rem' }}
                            onClick={() => {
                              setEditField(item);
                              additionalInfoForm.setFieldValue('labelText', item.label || `Please Enter ${item.type}`);
                              additionalInfoForm.setFieldValue(
                                'errorMessage',
                                item.errorMessage || `Please Enter ${item.type}`,
                              );
                              additionalInfoForm.setFieldValue('isRequired', !!item.isRequired);
                              if (item?.type === 'radio' || item?.type === 'categories') {
                                additionalInfoForm.setFieldValue('option1', item.options?.[0]);
                                additionalInfoForm.setFieldValue('option2', item.options?.[1]);
                                additionalInfoForm.setFieldValue('option3', item.options?.[2]);
                              }
                            }}
                          />
                          <Image
                            src={greyDelete}
                            onClick={() => setFields(fields.filter((field) => field.id !== item.id))}
                          />
                        </Flex>
                      </Card>
                    ))}
                  </SortableContext>
                </DndContext>
              </Flex>
            ) : (
              <Flex className={styles.emptyPreview}>
                <Text className={styles.emptyTitle}>Add Fields</Text>
              </Flex>
            )}
          </Card>
        </Flex>
        <Flex style={{ width: '30vw', padding: '10px' }}>
          <Card style={{ minHeight: 'calc(100vh - 80px)', width: '100%' }} shadow="md">
            {editField?.id ? (
              <Flex direction="column" gap="20px">
                <Flex
                  style={{ cursor: 'pointer', padding: '10px 0', gap: '10px' }}
                  onClick={() => {
                    setEditField(null);
                  }}
                >
                  <Image src={BackIcon} />
                  <Text variant="lg" style={{ fontWeight: '500' }}>
                    Back to Add Fields
                  </Text>
                </Flex>
                <Form
                  form={additionalInfoForm}
                  onSubmit={(formData) => {
                    setEditField(null);
                    const newFieldData = {
                      ...editField,
                      label: formData.labelText || `Please Enter ${editField.type}`,
                      errorMessage: formData.errorMessage || `Please Enter ${editField.type}`,
                      isRequired: !!formData.isRequired,
                      ...(editField?.type === 'radio' || editField?.type === 'categories'
                        ? {
                            options: [
                              formData.option1 || 'Option 1',
                              formData.option2 || 'Option 2',
                              formData.option3 || 'Option 3',
                            ],
                          }
                        : {}),
                    };
                    setFields(fields.map((field) => (field.id === editField.id ? newFieldData : field)));
                    additionalInfoForm.reset();
                  }}
                >
                  <Flex direction="column" gap="15px">
                    <TextInput
                      {...additionalInfoForm.getInputProps('labelText')}
                      key={additionalInfoForm.key('labelText')}
                      type="text"
                      label="Label"
                    />
                    <Switch
                      labelPosition="right"
                      label="Required"
                      {...additionalInfoForm.getInputProps('isRequired')}
                      key={additionalInfoForm.key('isRequired')}
                    />
                    {editField?.type === 'radio' || editField?.type == 'categories' ? (
                      <Flex direction="column">
                        <Text>Options</Text>
                        <TextInput
                          {...additionalInfoForm.getInputProps('option1')}
                          key={additionalInfoForm.key('option1')}
                          type="text"
                        />
                        <TextInput
                          {...additionalInfoForm.getInputProps('option2')}
                          key={additionalInfoForm.key('option2')}
                          type="text"
                        />
                        <TextInput
                          {...additionalInfoForm.getInputProps('option3')}
                          key={additionalInfoForm.key('option3')}
                          type="text"
                        />
                      </Flex>
                    ) : null}
                    <TextInput
                      label="Error Message"
                      {...additionalInfoForm.getInputProps('errorMessage')}
                      key={additionalInfoForm.key('errorMessage')}
                      type="text"
                    />
                    <Flex gap="10px">
                      <Button type="submit">Save</Button>
                      <Button
                        color="gray"
                        onClick={() => {
                          setEditField(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </Flex>
                  </Flex>
                </Form>
              </Flex>
            ) : (
              <Flex direction="column" gap="40px">
                <RenderAvailableFields />
                {RenderConditionContainer()}
              </Flex>
            )}
          </Card>
        </Flex>
      </main>
      <FormNameEditorModal
        title="Update"
        formName={formName}
        setFormName={(name) => {
          setFormName(name);
        }}
        isModalOpen={isModalOpen}
        handleSubmit={() => {
          handleUpdate();
          setModalOpen(false);
        }}
        handleCancel={() => {
          setModalOpen(false);
        }}
      />
    </section>
  );
};

export { CreateForm };
