import { Button, Flex, Modal, TextInput } from '@mantine/core';

const FormNameEditorModal = ({
  title = 'Create',
  formName = '',
  setFormName = () => {},
  isModalOpen = false,
  handleSubmit = () => {},
  handleCancel = () => {},
  isError = false,
}) => (
  <Modal centered opened={isModalOpen} withCloseButton={false} title={title + ' Feedback Form'}>
    <div>
      <TextInput
        placeholder="Enter Form Name"
        value={formName}
        variant="transparent"
        error={isError}
        style={{ borderBottom: '1px solid #aaa' }}
        onChange={(e) => {
          setFormName(e.target.value);
        }}
      />
      <Flex justify="flex-end" gap="0px">
        <Button
          variant="transparent"
          onClick={() => {
            handleSubmit();
          }}
        >
          {title}
        </Button>
        <Button color="gray" variant="transparent" onClick={handleCancel}>
          Cancel
        </Button>
      </Flex>
    </div>
  </Modal>
);

export { FormNameEditorModal };
