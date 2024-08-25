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
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AdminHeader } from '../components/AdminHeader';

const CreateForm = () => {
  const [editField, setEditField] = useState(null);
  const isRadioInput = false;
  const [fields, setFields] = useState([]);

  const additionalInfoForm = useForm({
    mode: 'uncontrolled',
    name: 'field-additional-info-form',
    initialValues: {
      labelText: '',
      errorMessage: '',
      isRequired: false,
      option1: '',
      option2: '',
      option3: '',
    },
  });

  const RenderField = ({ field }) => {
    switch (field?.type) {
      case 'textarea':
        return <Textarea withAsterisk={field?.isRequired} label={field?.label} />;
      case 'numeric':
        return (
          <Flex direction="column">
            <InputLabel required={field?.isRequired}>{field?.label}</InputLabel>
            <Rating label={field?.label} />
          </Flex>
        );
      case 'star':
        return (
          <Flex direction="column">
            <InputLabel required={field?.isRequired}>{field?.label}</InputLabel>
            <Rating label={field?.label} />
          </Flex>
        );
      case 'smiley':
        return (
          <Flex direction="column">
            <InputLabel required={field?.isRequired}>{field?.label}</InputLabel>
            <Rating label={field?.label} />
          </Flex>
        );
      case 'single':
        return <TextInput withAsterisk={field?.isRequired} label={field?.label} />;
      case 'radio':
        return (
          <Flex direction="column">
            <InputLabel required={field?.isRequired}>{field?.label}</InputLabel>
            <Radio name={field?.id} value={field?.options?.[0]} label={field?.options?.[0] || 'Option 1'} />
            <Radio name={field?.id} value={field?.options?.[1]} label={field?.options?.[1] || 'Option 2'} />
            <Radio name={field?.id} value={field?.options?.[2]} label={field?.options?.[2] || 'Option 3'} />
          </Flex>
        );
      case 'categories':
        return (
          <Flex direction="column">
            <InputLabel required={field?.isRequired}>{field?.label}</InputLabel>
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

  return (
    <section>
      <AdminHeader />
      <main style={{ display: 'flex' }}>
        <Flex style={{ flex: '1', justifyContent: 'center' }}>
          <Card
            shadow="md"
            padding="0px"
            style={{ width: '50%', height: 'clamp(400px,100%,80vh)', margin: '20px 0', overflowY: 'auto' }}
          >
            <Flex style={{ background: '#5578F4', color: 'white', padding: '10px' }}>
              <Image />
              <Text>Create Form</Text>
              <Image />
            </Flex>
            {fields.length > 0 ? (
              <Flex direction="column" gap="10px">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={fields.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                    {fields.map((item) => (
                      <div key={item.id}>
                        <SortableItem key={item.id} id={item.id} field={item} />
                        <Button
                          onClick={() => {
                            setEditField(item);
                            additionalInfoForm.setFieldValue('labelText', item.label);
                            additionalInfoForm.setFieldValue('errorMessage', item.errorMessage);
                            additionalInfoForm.setFieldValue('isRequired', item.isRequired);
                            additionalInfoForm.setFieldValue('option1', item.options?.[0]);
                            additionalInfoForm.setFieldValue('option2', item.options?.[1]);
                            additionalInfoForm.setFieldValue('option3', item.options?.[2]);
                          }}
                        >
                          Edit
                        </Button>
                        <Button onClick={() => setFields(fields.filter((field) => field.id !== item.id))}>
                          Delete
                        </Button>
                      </div>
                    ))}
                  </SortableContext>
                </DndContext>
              </Flex>
            ) : (
              <Flex style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Text>Add Fields</Text>
              </Flex>
            )}
          </Card>
        </Flex>
        <Flex style={{ width: '30vw', padding: '10px' }}>
          <Card style={{ minHeight: 'calc(100vh - 80px)', width: '100%' }} shadow="md">
            {editField?.id ? (
              <Flex direction="column">
                <Flex>
                  <Image />
                  <Text>Back to Add Fields</Text>
                </Flex>
                <Form
                  form={additionalInfoForm}
                  onSubmit={(formData) => {
                    setEditField(null);
                    const newFieldData = {
                      ...editField,
                      label: formData.labelText,
                      errorMessage: formData.errorMessage,
                      isRequired: formData.isRequired,
                      options: [formData.option1, formData.option2, formData.option3],
                    };
                    setFields(fields.map((field) => (field.id === editField.id ? newFieldData : field)));
                    additionalInfoForm.reset();
                  }}
                >
                  <Flex direction="column">
                    <TextInput
                      {...additionalInfoForm.getInputProps('labelText')}
                      key={additionalInfoForm.key('labelText')}
                      type="text"
                    />
                    <Switch
                      labelPosition="left"
                      label="Is Required"
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
                      {...additionalInfoForm.getInputProps('errorMessage')}
                      key={additionalInfoForm.key('errorMessage')}
                      type="text"
                    />
                    <Flex>
                      <Button type="submit">Save</Button>
                      <Button
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
                <Flex direction="column" gap="2px">
                  <Text>Add Fields</Text>
                  <Flex style={{ padding: '10px', justifyContent: 'space-between' }}>
                    <Flex
                      onClick={() => {
                        setFields([...fields, { id: uuidv4(), index: (fields?.length || 0) + 1, type: 'textarea' }]);
                      }}
                    >
                      <Image />
                      <Text>Textarea</Text>
                    </Flex>
                    <Image />
                  </Flex>
                  <Flex style={{ padding: '10px', justifyContent: 'space-between' }}>
                    <Flex
                      onClick={() => {
                        setFields([...fields, { id: uuidv4(), index: (fields?.length || 0) + 1, type: 'numeric' }]);
                      }}
                    >
                      <Image />
                      <Text>Numeric Rating</Text>
                    </Flex>
                    <Image />
                  </Flex>
                  <Flex style={{ padding: '10px', justifyContent: 'space-between' }}>
                    <Flex
                      onClick={() => {
                        setFields([...fields, { id: uuidv4(), index: (fields?.length || 0) + 1, type: 'star' }]);
                      }}
                    >
                      <Image />
                      <Text>Star Rating</Text>
                    </Flex>
                    <Image />
                  </Flex>
                  <Flex style={{ padding: '10px', justifyContent: 'space-between' }}>
                    <Flex
                      onClick={() => {
                        setFields([...fields, { id: uuidv4(), index: (fields?.length || 0) + 1, type: 'smiley' }]);
                      }}
                    >
                      <Image />
                      <Text>Smiley Rating</Text>
                    </Flex>
                    <Image />
                  </Flex>
                  <Flex style={{ padding: '10px', justifyContent: 'space-between' }}>
                    <Flex
                      onClick={() => {
                        setFields([...fields, { id: uuidv4(), index: (fields?.length || 0) + 1, type: 'single' }]);
                      }}
                    >
                      <Image />
                      <Text>Single Line Input</Text>
                    </Flex>
                    <Image />
                  </Flex>
                  <Flex style={{ padding: '10px', justifyContent: 'space-between' }}>
                    <Flex
                      onClick={() => {
                        setFields([...fields, { id: uuidv4(), index: (fields?.length || 0) + 1, type: 'radio' }]);
                      }}
                    >
                      <Image />
                      <Text>Radio Button</Text>
                    </Flex>
                    <Image />
                  </Flex>
                  <Flex style={{ padding: '10px', justifyContent: 'space-between' }}>
                    <Flex
                      onClick={() => {
                        setFields([...fields, { id: uuidv4(), index: (fields?.length || 0) + 1, type: 'categories' }]);
                      }}
                    >
                      <Image />
                      <Text>Categories</Text>
                    </Flex>
                    <Image />
                  </Flex>
                </Flex>
                <Flex direction="column">
                  <Text>Add Logic</Text>
                  <Switch labelPosition="left" label="Show based on URL conditions" />
                  <TextInput placeholder="https://" />
                  <Switch labelPosition="left" label="Show based on URL conditions" />
                  <Input type="date" />
                  <Switch labelPosition="left" label="Show based on URL conditions" />
                  <Input type="time" />
                </Flex>
              </Flex>
            )}
          </Card>
        </Flex>
      </main>
    </section>
  );
};

export { CreateForm };
