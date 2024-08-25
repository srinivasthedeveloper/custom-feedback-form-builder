import { Accordion, Card, Flex, Image, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';
import { useFirestore } from '../hooks/useFirestore';
import { formatDate } from '../utils/date';

const FormDetail = () => {
  const { getAllDocuments } = useFirestore('forms-responses');
  const { getDocument } = useFirestore('forms');
  const formId = useParams().id;
  const [formResponses, setFormResponses] = useState([]);
  const [formDetails, setFormDetails] = useState({});
  console.log('🚀 ~ FormDetail ~ formDetails:', formDetails);

  const getFormResponses = async () => {
    const responses = await getAllDocuments();
    const filteredResponses = responses.filter((response) => response?.[formId]?.length);
    const form = await getDocument(formId);
    setFormDetails(form);
    setFormResponses(filteredResponses);
  };

  useEffect(() => {
    getFormResponses();
  }, []);

  return (
    <section>
      <AdminHeader />
      <main>
        <Card shadow="md" style={{ margin: '20px', padding: '0 0 20px' }}>
          <Flex style={{ background: '#5578F4', color: 'white', padding: '10px' }}>
            <Flex>
              <Image />
              <Text>{formDetails?.name}</Text>
            </Flex>
            <Text>Created date: {formatDate(formDetails?.createdAt?.toDate())}</Text>
          </Flex>
          <Flex direction="column" style={{ padding: '20px' }}>
            <Flex>
              <Flex>
                <Text>{formResponses?.length}</Text>
                <Text>Views</Text>
              </Flex>
              <Flex>
                <Text>{formResponses?.length}</Text>
                <Text>Submissions</Text>
              </Flex>
            </Flex>
            <Flex direction="column">
              <Text>Page URL contains {formDetails?.condition?.url || 'NA'}</Text>
              <Text>Date {formDetails?.condition?.date || 'NA'}</Text>
              <Text>Time {formDetails?.condition?.time || 'NA'}</Text>
            </Flex>
            <Flex direction="column">
              <Text>Feedback List</Text>
              <Accordion style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {formResponses.map((response, index) => (
                  <Accordion.Item key={response?.id} value={response?.id} style={{ boxShadow: '0px 0px 5px #aaa' }}>
                    <Accordion.Control>
                      <Flex>
                        <Text>Feedback {index + 1}</Text>
                        <Flex>{formatDate(response?.submitedAt)}</Flex>
                      </Flex>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Flex direction="column">
                        {response?.[formId].map((field) => (
                          <>
                            <Text>{field?.label}</Text>
                            <Text>{field?.value}</Text>
                          </>
                        ))}
                      </Flex>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Flex>
          </Flex>
        </Card>
      </main>
    </section>
  );
};
export { FormDetail };
